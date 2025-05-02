import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashbaord/dashbaord.component').then(m => m.DashbaordComponent),
            },
            {
                path: 'venues',
                loadChildren: () =>
                    import('./features/vanues/venues.routes').then(m => m.VENUE_ROUTES),
            },
            {
                path: 'menu-sections',
                loadChildren: () =>
                    import('./features/menu-sections/menu-sections.routes').then(m => m.MENU_SECTION_ROUTES),
            },
            {
                path: 'menu-items',
                loadChildren: () =>
                    import('./features/menu-items/menu-items.routes').then(m => m.MENU_ITEM_ROUTES),
            },
            {
                path: 'theme',
                loadComponent: () =>
                    import('./features/theme/theme.component').then(m => m.ThemeComponent),
            },
        ],
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login.component').then(
                (m) => m.LoginComponent
            ),
    },
];
