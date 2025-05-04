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
                loadComponent: () => import('./features/dashbaord/dashbaord.component').then(c => c.DashbaordComponent),
            },
            {
                path: 'venue',
                loadComponent: () => import('./features/vanue/vanue.component').then(c => c.VanueComponent),
            },
            {
                path: 'menu-sections',
                loadChildren: () =>
                    import('./features/menu-sections/menu-sections.routes').then(c => c.MENU_SECTION_ROUTES),
            },
            {
                path: 'menu-items',
                loadChildren: () =>
                    import('./features/menu-items/menu-items.routes').then(c => c.MENU_ITEM_ROUTES),
            },
            {
                path: 'theme',
                loadComponent: () =>
                    import('./features/theme/theme.component').then(c => c.ThemeComponent),
            },
        ],
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login.component').then(
                (c) => c.LoginComponent
            ),
    },
];
