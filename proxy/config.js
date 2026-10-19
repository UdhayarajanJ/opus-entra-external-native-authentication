const path = require('path');

// Check if 'useenv' was passed as a command line argument (e.g., node proxy/server.js useenv development)
const hasUseEnvArg = process.argv.includes('useenv');

if (hasUseEnvArg) {
    // Find the environment name passed right after 'useenv' (default to 'development' if not specified)
    const useEnvIndex = process.argv.indexOf('useenv');
    const envArg = process.argv[useEnvIndex + 1] || 'local';
    const envFileName = `.env-${envArg}`;
    const envPath = path.join(__dirname, envFileName);
    require('dotenv').config({ path: envPath });
    console.log(`[Proxy Config] Loaded local environment file: ${envFileName}`);
} else {
    console.log('[Proxy Config] Skipping local .env file. Using system/deployed environment variables.');
}

const tenantSubdomain = process.env.TENANT_SUBDOMAIN;
const tenantId = process.env.TENANT_ID;

const config = {
    localApiPath: "/api",
    port: process.env.PORT || 3001,
    proxy: `https://${tenantSubdomain}.ciamlogin.com/${tenantId}`,
};

module.exports = config;