import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    username: string = '';

    loading: boolean = false;

    constructor(private authService: AuthService, private router: Router, public layoutService: LayoutService) {}

    onSubmit() {
        this.loading = true;
        this.authService.login(this.username, this.password).subscribe(success => {
        if (success) {
            this.router.navigate(['/']);
            this.loading = false;
        } else {
            this.loading = false;
            alert('Login failed');
        }
        });
    }
}
