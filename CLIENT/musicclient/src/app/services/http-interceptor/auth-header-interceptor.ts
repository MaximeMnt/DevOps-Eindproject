import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler) {
        let authToken
        let accessToken = JSON.parse(localStorage.getItem("idToken"));
        if (accessToken.token != null) {
            authToken = "Bearer " + accessToken.token; //authentication header moet hier nog bijkomen zonder te hardcoden
            const authReq = request.clone({
                setHeaders: { Authorization: authToken }
            });
            return next.handle(authReq);
        }
        else { return next.handle(request); }


    }
}