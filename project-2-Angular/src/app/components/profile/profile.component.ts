import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private auth = inject(AuthService);
  user$ = this.auth.user$;
  code$ = this.user$.pipe(map((user) => JSON.stringify(user, null, 2)));
  title = 'Decoded ID Token';
  encodedIdToken: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.auth.idTokenClaims$.subscribe((claims) => {
      this.encodedIdToken = claims?.__raw || null;
      console.log(this.encodedIdToken);
    });
  }

  goToRoot(): void {
    this.router.navigate(['/']);
  }
}
