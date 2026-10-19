import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth';

@Component({
  imports: [],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header implements OnInit {
  protected authService = inject(Auth);
  userName = signal<string>('');
  userEmail = signal<string>('');
  userInitial = signal<string>('');

  ngOnInit() {
    const account = this.authService.getCurrentAccountDetails();
    if (account) {
      const name = account.idTokenClaims?.name || 'User';
      const email = account.idTokenClaims ? account.idTokenClaims['email'] as string : '';
      this.userName.set(name);
      this.userEmail.set(email);
      this.userInitial.set(name.charAt(0).toUpperCase());
    }
  }

  async logout() {
    await this.authService.logout();
  }
}
