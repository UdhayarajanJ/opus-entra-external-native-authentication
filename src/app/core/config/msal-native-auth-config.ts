import { CustomAuthConfiguration, LogLevel } from "@azure/msal-browser/custom-auth";
import { environment } from "../../../environments/environment";
import { AzureCloudInstance } from "@azure/msal-browser";

export class MsalNativeAuthConfig {
    public static getConfig(provider?: string): CustomAuthConfiguration {
        const config: CustomAuthConfiguration = {
            customAuth: {
                challengeTypes: ["password", "oob", "redirect"],
                authApiProxyUrl: environment.proxy_auth_url,
            },
            auth: {
                clientId: environment.clientId,
                authority: environment.authority,
                redirectUri: environment.redirectURI,
                postLogoutRedirectUri: environment.postLogOutURI,
                knownAuthorities: [environment.knownAuthorities],
                verifySSO: true,

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
        }

        if (provider === 'login.live.com') {
            config.auth.azureCloudOptions = {
                azureCloudInstance: AzureCloudInstance.AzurePublic,
                tenant: environment.tenantId,
            };
        }
        return config;
    }
}