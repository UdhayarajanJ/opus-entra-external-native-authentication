const http = require("http");
const https = require("https");
const url = require("url");
const proxyConfig = require("./config");
const path = require('path');
const fs = require('fs');

const extraHeaders = [
    "x-client-SKU",
    "x-client-VER",
    "x-client-OS",
    "x-client-CPU",
    "x-client-current-telemetry",
    "x-client-last-telemetry",
    "client-request-id",
];

const requestHandler = (req, res) => {
    const reqUrl = url.parse(req.url);
    const domain = url.parse(proxyConfig.proxy).hostname;

    const requestedHeaders = req.headers["access-control-request-headers"];
    const allowedHeaders = requestedHeaders || ("Content-Type, Authorization, " + extraHeaders.join(", "));

    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": allowedHeaders,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
    };

    if (req.method === "OPTIONS") {
        res.writeHead(204, corsHeaders);
        res.end();
        return;
    }

    if (reqUrl.pathname.startsWith(proxyConfig.localApiPath)) {
        const targetUrl = proxyConfig.proxy + reqUrl.pathname?.replace(proxyConfig.localApiPath, "") + (reqUrl.search || "");

        console.log("Incoming request -> " + req.url + " ===> " + reqUrl.pathname);

        const newHeaders = {};
        for (let [key, value] of Object.entries(req.headers)) {
            if (key !== 'origin') {
                newHeaders[key] = value;
            }
        }

        const proxyReq = https.request(
            targetUrl,
            {
                method: req.method,
                headers: {
                    ...newHeaders,
                    host: domain,
                },
            },
            (proxyRes) => {
                res.writeHead(proxyRes.statusCode, {
                    ...proxyRes.headers,
                    ...corsHeaders,
                });

                proxyRes.pipe(res);
            }
        );

        proxyReq.on("error", (err) => {
            console.error("Error with the proxy request:", err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Proxy error.");
        });

        req.pipe(proxyReq);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
};

// 2. Check for SSL certificates and initialize the appropriate server type
let server;
const sslCertPath = path.join(__dirname, "../ssl/localhost.crt");
const sslKeyPath = path.join(__dirname, "../ssl/localhost.key");
if (fs.existsSync(sslCertPath) && fs.existsSync(sslKeyPath)) {
    const serverOptions = {
        key: fs.readFileSync(sslKeyPath),
        cert: fs.readFileSync(sslCertPath),
    };
    server = https.createServer(serverOptions, requestHandler);
} else {
    server = http.createServer(requestHandler);
}

server.listen(proxyConfig.port, () => {
    const protocol = fs.existsSync(sslCertPath) && fs.existsSync(sslKeyPath) ? "https" : "http";
    console.log(`CORS proxy running on ${protocol}://localhost:${proxyConfig.port}`);
    console.log("Proxying from " + proxyConfig.localApiPath + " ===> " + proxyConfig.proxy);
});