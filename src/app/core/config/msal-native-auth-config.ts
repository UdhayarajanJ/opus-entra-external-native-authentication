import { CustomAuthConfiguration, LogLevel } from "@azure/msal-browser/custom-auth";
import { environment } from "../../../environments/environment";

export class MsalNativeAuthConfig {
    public static readonly MSAL_AUTH: CustomAuthConfiguration = {
        customAuth: {
            challengeTypes: ["oob", "redirect"],
            authApiProxyUrl: environment.proxy_auth_url,
        },
        auth: {
            clientId: environment.clientId,
            authority: environment.authority,
            redirectUri: window.location.origin + "/",
            postLogoutRedirectUri: window.location.origin + "/",
        },
        cache: {
            cacheLocation: "sessionStorage",
        },
        system: {
            loggerOptions: {
                loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                    if (containsPii) {
                        return;
                    }
                    switch (level) {
                        case LogLevel.Error:
                            console.error(message);
                            return;
                        case LogLevel.Info:
                            console.info(message);
                            return;
                        case LogLevel.Verbose:
                            console.debug(message);
                            return;
                        case LogLevel.Warning:
                            console.warn(message);
                            return;
                    }
                },
            },
        },
    };
}