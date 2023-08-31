import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  userSubject = new BehaviorSubject<UserModel>(null);


  constructor(private httpClient: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string){

    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpK3pIpkR_pZb3GU7ZZsishxwJnLc68yU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
      )
    );

  }

  login(email: string, password: string){
    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpK3pIpkR_pZb3GU7ZZsishxwJnLc68yU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
      tap(resData => {
          this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }
      ));
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number){

    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const userModel = new UserModel(email, userId, token, expirationDate);

    this.userSubject.next(userModel);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';

    if(!errorRes.error || !errorRes.error.error || !errorRes.error.error.message){
      return throwError(() => errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
    }
    return throwError(() => errorMessage);
  }

  navigateToRecipes() {
    this.router.navigate(['/recipes']).then(() => {
      console.log("done")
    })
      .catch(error => {
      console.error('Navigation error:', error);
    });
  }

}
