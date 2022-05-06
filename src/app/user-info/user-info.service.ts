import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, Observable, retry,throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { User } from "../models/user.models";

@Injectable({
    providedIn: "root",
})
export class UserInfoService {
    url = environment.patapiUrl;
    userinfoUrl = this.url + "/user/userinfo";
    constructor(private http: HttpClient) {}
    
    getUserInfo(): Observable<User> {
        return this.http.get<User>(this.userinfoUrl).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    updateUserInfo(user: User): Observable<User> {
        return this.http.patch<User>(this.userinfoUrl, user).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    updateUserPassword(pwd: string){
        let pwdinterface = {
            password: pwd
        }
        return this.http.patch(this.userinfoUrl + "/pwd", pwdinterface).pipe(
            retry(1),
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpHeaderResponse | any) {
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errMsg = error.error.message;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errMsg = `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
        }
        console.error(errMsg);
        window.alert(errMsg);
        return throwError(errMsg);
    }
}