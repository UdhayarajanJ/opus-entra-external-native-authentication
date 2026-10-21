import { Service, signal } from '@angular/core';
import { CustomAuthPublicClientApplication, ICustomAuthPublicClientApplication } from '@azure/msal-browser/custom-auth';
import { MsalNativeAuthConfig } from '../config/msal-native-auth-config';
import { AccountInfo } from '@azure/msal-browser';

@Service()
export class Auth {
    private authClientPromise!: Promise<ICustomAuthPublicClientApplication>;
    private authClient: ICustomAuthPublicClientApplication | null = null;
    authenticated = signal(false);

    private async init(provider: string,): Promise<ICustomAuthPublicClientApplication> {
        this.authClient = await CustomAuthPublicClientApplication.create(MsalNativeAuthConfig.getConfig(provider));
        try {
            await this.authClient.handleRedirectPromise?.();
        } catch (error) {
            console.error("Error handling redirect promise:", error);
        }

        // Check if an account already exists in cache/session storage
        const accountResult = this.authClient.getCurrentAccount();
        if (accountResult && accountResult.isCompleted && accountResult.isCompleted()) {
            this.authenticated.set(true);
        }

        return this.authClient;
    }

    getCurrentAccountDetails(): AccountInfo | null {
        if (!this.authClient) return null;
        const accountResult = this.authClient.getCurrentAccount();
        if (accountResult && accountResult.isCompleted && accountResult.isCompleted()) {
            return accountResult.data?.getAccount() || null;
        }

        return null;
    }

    getClient(provider: string): Promise<ICustomAuthPublicClientApplication> {
        this.authClientPromise = this.init(provider);
        return this.authClientPromise;
    }

    async logout() {
        if (!this.authClient) return;
        try {
            const account = this.getCurrentAccountDetails();
            this.authenticated.set(false);
            await this.authClient.logoutRedirect({
                account: account || undefined,
                postLogoutRedirectUri: MsalNativeAuthConfig.getConfig().auth.postLogoutRedirectUri
            });
        } catch (error) {
            console.error("Logout failed:", error);
            sessionStorage.clear();
            window.location.href = '/';
        }
    }
}
