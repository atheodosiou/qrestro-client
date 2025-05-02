import { Routes } from '@angular/router';

export const VENUE_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./vanues.component').then(m => m.VanuesComponent),
    },
];
