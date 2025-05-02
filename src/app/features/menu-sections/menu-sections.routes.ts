import { Routes } from '@angular/router';

export const MENU_SECTION_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./menu-sections.component').then(m => m.MenuSectionsComponent),
    }
];
