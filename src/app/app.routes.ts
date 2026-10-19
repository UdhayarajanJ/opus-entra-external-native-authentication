import { Routes } from '@angular/router';
import { Notfound } from './shared/components/notfound/notfound';
import { AccessDenied } from './shared/components/access-denied/access-denied';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home/home.route').then(m => m.HOME_ROUTES),
    },
    {
        path: 'page-not-found',
        component: Notfound,
        title: 'Page Not Found'
    },
    {
        path: 'access-denied-user',
        component: AccessDenied,
        title: 'Access Denied User'
    },
    {
        path: '**',
        redirectTo: 'page-not-found',
        pathMatch: 'full'
    }
];
