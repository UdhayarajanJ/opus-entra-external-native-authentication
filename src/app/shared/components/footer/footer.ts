import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
  readonly env_name = environment.name;
}
