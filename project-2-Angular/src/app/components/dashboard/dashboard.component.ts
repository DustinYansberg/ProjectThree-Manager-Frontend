import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../demo/api/product';
import { ProductService } from '../../demo/service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    identityId: string;

    constructor(private productService: ProductService, public layoutService: LayoutService, private userService: UserService) {
        // this.userService.getEmployeeId().subscribe(data => {
        // this.userService.idSubject.next(data.body.id);
        //     this.userService.idObservable.subscribe(id => {
        //         this.identityId = id;
        //     });
        //     console.log(this.identityId);
        // });
        
        console.log("hello")
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    //ngOnInit() {
    //    this.initChart();
    //    this.productService.getProductsSmall().then(data => this.products = data);

    //    this.items = [
    //        { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    //        { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    //    ];
  //}

  ngOnInit() {
    /* These stacked subscribe methods populate the
       identityId by the current gmail for the rest of the user session */
    this.userService.getEmployeeId().subscribe(data => {
      this.userService.idSubject.next(data.body.id);
      this.userService.idObservable.subscribe(id => {
        this.identityId = id
        // --------------------

      });
    });

  }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
