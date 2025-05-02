import { Routes } from '@angular/router';

export const MENU_ITEM_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./menu-items.component').then(m => m.MenuItemsComponent),
    },
];
