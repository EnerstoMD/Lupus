import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, Observable, retry,throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from "../models/user.models";
import { GPSLocation } from "../models/home.models";
import {Promise} from 'es6-promise';

@Injectable({
    providedIn: "root",
})
export class HomeService {
    url = environment.patapiUrl;
    userinfoUrl = this.url + "/user/userinfo";

    tokeninfo: {name:string};

    constructor(private http: HttpClient) {
        this.getTokenInfo()
    }

    getTokenInfo() {
        const token = localStorage.getItem("token");
        if (token) {
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(token);
            this.tokeninfo = {
                name: decodedToken.name,
            };
        }
    }

    getName(){
        return this.tokeninfo.name
    }

    getPosition(): Promise<GPSLocation>{
        return new Promise((resolve,reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(new GPSLocation(position.coords.longitude,position.coords.latitude))
                },
                (error) => {
                    reject(error)
                }
            )
        })
    }
}
