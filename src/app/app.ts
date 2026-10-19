import { Component, inject, signal } from '@angular/core';
import { SharedConstants } from './shared/shared.constants';
import { Auth } from './core/services/auth';

@Component({
  imports: [SharedConstants.ANGULAR_COMPONENTS, SharedConstants.APP_COMPONENTS],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('opus-entra-external-native-authentication');
  private authService = inject(Auth);
  authenticated = this.authService.authenticated;

}
