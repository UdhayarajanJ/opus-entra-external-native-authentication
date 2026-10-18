import { Component, signal } from '@angular/core';
import { SharedConstants } from './shared/shared.constants';

@Component({
  imports: [SharedConstants.ANGULAR_COMPONENTS, SharedConstants.APP_COMPONENTS],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('opus-entra-external-native-authentication');
}
