import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return this.authService.userSubject.pipe(
      take(1),
      exhaustMap(userModel => {

        if(!userModel){
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', userModel.token)
      });
        return next.handle(modifiedReq);
      })
    );
  }

}
