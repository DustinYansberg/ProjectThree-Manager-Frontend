import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent {
  private auth = inject(AuthService);
  error$ = this.auth.error$;
  ngOnInit(): void {
    this.auth.error$.subscribe((error) => {
      console.error(error);
    });
  }
}
