import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  signUp(email: string, password: string){

    return this.httpClient.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpK3pIpkR_pZb3GU7ZZsishxwJnLc68yU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError((errorRes) => {

      let errorMessage = 'An error occurred: ' + errorRes.error.error.message;

      if(!errorRes.error || !errorRes.error.error || !errorRes.error.error.message){
        return throwError(() => errorMessage);
      }

      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists!';
      }
      return throwError(() => errorMessage);
    }));

  }

}
