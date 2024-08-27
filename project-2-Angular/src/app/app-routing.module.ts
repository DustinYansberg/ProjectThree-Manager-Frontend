import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component"; 

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [

                    { path: '', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'employees', loadChildren: () => import('./components/employees/employees.module').then(m => m.EmployeesModule) },
                    { path: 'employeedetail/:id', loadChildren: () => import('./components/employee-detail/employee-detail.module').then(m => m.EmployeeDetailModule) },
                    { path: 'accounts', loadChildren: () => import('./components/accounts/accounts.module').then(m => m.AccountsModule) },
                    { path: 'accountdetail/:id', loadChildren: () => import('./components/account-detail/account-detail.module').then(m => m.AccountDetailModule) },
                    { path: 'accountdetail/:id', loadChildren: () => import('./components/account-detail/account-detail.module').then(m => m.AccountDetailModule) },
                    { path: 'requests', loadChildren: () => import('./components/requests/requests.module').then(m => m.RequestsModule) },
                    { path: 'documents', loadChildren: () => import('./components/document/document.module').then(m => m.DocumentModule) },
                  { path: 'appointments', loadChildren: () => import('./components/appointments/appointment.module').then(m => m.AppointmentModule) },
                  { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },


                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'profile', loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule) },
                    { path: 'callback', loadChildren: () => import('./components/auth/callback/callback.module').then(m => m.CallbackModule) },

                ]
            },
            { path: 'landing', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
