import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password!: string;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/']);
      } else {
        alert('Login failed');
      }
      this.loading = false;
    });
  }
}
