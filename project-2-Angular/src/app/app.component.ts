import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LayoutService } from './layout/service/app.layout.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.changeTheme('bootstrap4-light-blue', 'light')
        this.ripple = true;
    }

    changeTheme(theme: string, colorScheme: string) {
        this.theme = theme;
        this.colorScheme = colorScheme;
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

      set ripple(_val: boolean) {
        this.layoutService.config.update((config) => ({
            ...config,
            ripple: _val,
        }));
    }
}
