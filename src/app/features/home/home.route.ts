import { Routes } from '@angular/router';
import { Home } from './home';
import { roleGuard } from '../../core/guards/role-guard';

export const HOME_ROUTES: Routes = [{
    path: '',
    component: Home,
    title: 'Home',
    canActivate: [roleGuard],
    data: ["User,Admin,Coordinator"]
}];