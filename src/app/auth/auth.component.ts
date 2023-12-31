import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {catchError, tap} from "rxjs/operators";
import {Observable} from "rxjs";

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

    if(!authForm.valid){
      console.log('here2');
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode){
      authObs= this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.pipe(
      tap((resData) => {
        this.isLoading = false;
        this.authService.navigateToRecipes();
      }),
      catchError((errorRes) => {
        this.isLoading = false;
        this.error = errorRes;
        throw errorRes; // You can rethrow the errorRes if needed
      })
    ).subscribe();

    authForm.reset();

  }
}
