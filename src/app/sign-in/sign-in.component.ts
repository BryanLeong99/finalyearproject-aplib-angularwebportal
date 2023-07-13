import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthenticateFailedAlertComponent } from '../authenticate-failed-alert/authenticate-failed-alert.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthenticateService } from '../service/authenticate/authenticate.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  // signInFormControl = new FormControl('');
  // signInFormGroup = this.formBuilder.group({
  //   username: '',
  //   password: '',
  // });

  public loading = false;

  constructor(
    private formBuilder: FormBuilder, 
    public dialog: MatDialog, 
    private authService: AuthenticateService,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onSubmit(signInForm: NgForm): void {
    console.log(signInForm.value);  // { first: '', last: '' }
    console.log(signInForm.valid);
    this.loading = true;
    
    this.authService.authenticate(signInForm.value.username, signInForm.value.password).subscribe(data => {
      console.log(data);
      this.loading = false;
      if (JSON.parse(data).status == 'success') {
        this.cookieService.set('authentication-token', JSON.parse(data).authenticationToken);
        sessionStorage.setItem('page', 'dashboard');
        // this.router.navigate(['']);
        location.reload();
      } else {
        this.openDialog();
      }
    });
    // false
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthenticateFailedAlertComponent, {
      width: '390px',
      height: '300px'
      // data: {name: this.name, animal: this.animal}
    });
  }

}
