import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { SharedConstants } from '../../shared.constants';

@Component({
  imports: [SharedConstants.ANGULAR_COMPONENTS],
  selector: 'app-notfound',
  styleUrl: './notfound.scss',
  templateUrl: './notfound.html',
})
export class Notfound {
  private readonly location = inject(Location);

  goBack(): void {
    this.location.back();
  }
}
