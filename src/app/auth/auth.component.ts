import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {catchError, tap} from "rxjs/operators";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {

    console.log('here1');

    if(!authForm.valid){
      console.log('here2');
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    this.isLoading = true;

    if(this.isLoginMode){
      console.log('here3');
    } else {
      console.log('here4');
      this.authService.signUp(email, password).pipe(
        tap((resData) => {
          console.log('resData -- ', resData);
          this.isLoading = false;
        }),
        catchError((errorRes) => {
          this.isLoading = false;

          this.error = errorRes;

          throw errorRes; // You can rethrow the errorRes if needed
        })
      ).subscribe();
    }

    console.log('here5');

    authForm.reset();

  }
}
