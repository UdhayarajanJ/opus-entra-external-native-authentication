import { Component, inject } from '@angular/core';
import { RedirectRequest } from '@azure/msal-browser';
import { MsalNativeAuthConfig } from '../../../core/config/msal-native-auth-config';
import { Auth } from '../../../core/services/auth';

@Component({
  imports: [],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(Auth);
  async startSignUpWithSocial(domainHint: string,scope:string[]) {
    const loginRequest: RedirectRequest = {
      authority: MsalNativeAuthConfig.MSAL_AUTH.auth.authority,
      scopes: scope,
      redirectUri: MsalNativeAuthConfig.MSAL_AUTH.auth.redirectUri || "",
      prompt: "login",
      domainHint:domainHint,
    };

    try {
      const client = await this.authService.getClient();
      await client.loginRedirect(loginRequest);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred while logging in with popup");
      }
    }
  }
}
