import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    @ViewChild('profileMenu') profileMenu!: any;

    constructor(public layoutService: LayoutService, public authService: AuthService, public router: Router) { }



    profileItems: MenuItem[];

    settingsItems: MenuItem[];

    isDarkMode: boolean = false;

    ngOnInit() {
        this.profileItems = [
          {
            label: 'Sign Out',
            icon: 'pi pi-sign-out',
            command: () => this.signOut()
          }
        ];

        this.settingsItems = [
          {
            label: 'Dark Mode',
            icon: 'pi pi-moon',
            command: () => this.toggleDarkMode()
          }
        ];

        this.updateSettingsItems();
      }

      toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
          this.changeTheme('bootstrap4-dark-purple', 'dark')
        } else {
          this.changeTheme('bootstrap4-light-blue', 'light')
        }

        this.updateSettingsItems();
      }

      updateSettingsItems() {
        this.settingsItems = [
          {
            label: this.isDarkMode ? 'Light Mode' : 'Dark Mode',
            icon: this.isDarkMode ? 'pi pi-sun' : 'pi pi-moon',
            command: () => this.toggleDarkMode()
          }
        ];
      }

      changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
      }
    
      signOut() {
        this.authService.logout(); // Adjust this method according to your AuthService
        this.router.navigate(['/auth/login']);
      }

      set theme(val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: val,
        }));
      }
      get theme(): string {
          return this.layoutService.config().theme;
      }

      set colorScheme(val: string) {
          this.layoutService.config.update((config) => ({
              ...config,
              colorScheme: val,
          }));
      }
      get colorScheme(): string {
          return this.layoutService.config().colorScheme;
      }
}
