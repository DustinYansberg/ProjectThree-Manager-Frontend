import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Employees', icon: 'pi pi-fw pi-users', routerLink: ['/employees'] },
                    { label: 'Accounts', icon: 'pi pi-fw pi-sitemap', routerLink: ['/accounts'] },
                    // view approve or deny requests from your employees
                    { label: 'Requests', icon: 'pi pi-fw pi-flag', routerLink: ['/requests'] },
                    // some frontend plugin or bonus feature
                    { label: 'IIQ Plugin', icon: 'pi pi-fw pi-check', routerLink: ['/plugin'] }
                ]
            }
        ];
    }
}
