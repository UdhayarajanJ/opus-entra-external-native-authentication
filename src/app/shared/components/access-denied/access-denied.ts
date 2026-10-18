import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-access-denied',
  styleUrl: './access-denied.scss',
  templateUrl: './access-denied.html',
  standalone:true
})
export class AccessDenied { }
