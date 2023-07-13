import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ap-lib 2';
  authenticated: boolean = false;
  authenticationToken: string = '';

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    // this.cookieService.set('authentication-token', '');
    this.authenticationToken = this.cookieService.get('authentication-token');
    console.log(this.authenticationToken);
    if (this.authenticationToken == '' || this.authenticationToken == null) {
      this.router.navigate(['/sign-in']);
    } else if (sessionStorage.getItem('page') == 'dashboard') {
      this.router.navigate(['/dashboard']);
    } else if (sessionStorage.getItem('page')  == 'discussion-room-booking') {
      this.router.navigate(['/discussion-room-booking']);
    } else if (sessionStorage.getItem('page') == null || sessionStorage.getItem('page') == '') {
      this.router.navigate(['/dashboard']);
    }
  }
}
