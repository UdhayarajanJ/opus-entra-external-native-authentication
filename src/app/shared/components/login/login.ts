import { Component, inject } from '@angular/core';
import { MsalNativeAuthConfig } from '../../../core/config/msal-native-auth-config';
import { Auth } from '../../../core/services/auth';
import { RedirectRequest } from '@azure/msal-browser';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(Auth);
  async startSignUpWithSocial(provider: string, scope: string[]) {
    const loginRequest: RedirectRequest = {
      authority: MsalNativeAuthConfig.getConfig(provider).auth.authority,
      scopes: scope,
      redirectUri: MsalNativeAuthConfig.getConfig(provider).auth.redirectUri,
      prompt: 'login',
      domainHint: provider
    };

    try {
      const client = await this.authService.getClient(provider);
      await client.loginRedirect(loginRequest);
    } catch (error) {
      console.log(error instanceof Error ? error.message : 'Unexpected error');
    }
  }
}
