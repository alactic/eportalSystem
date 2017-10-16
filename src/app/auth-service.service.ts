import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class AuthServiceService {

  constructor(private http:Http) { }

    postDetail(name, email, password){
      // const body=JSON.stringify({name:name, email:email, password:password});
       const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
       return this.http.post('http://localhost/ePortalDb/eportaldb/public/api/user',{name:name, email:email, password:password}, {headers:headers});
    }

    loginUser(email, password){
    //const body=JSON.stringify({email:email, password:password});
    const headers=new Headers({'X-Requested-With':'XMLHttpRequest'});
    return this.http.post('http://localhost/ePortalDb/eportaldb/public/api/user/signin',
        {email:email, password:password}, {headers:headers})
        .map((response:Response)=>{
           const token=response.json().token;
           const base64Url=token.split('.')[1];
           const base64=base64Url.replace('-', '+').replace('_', '/');
           return {token:token, decoded: JSON.parse(window.atob(base64))};
        }
        )
        .do(
            tokenData=>{
              localStorage.setItem('token', tokenData.token)
            }
        );
  }

  getToken(){
      return  localStorage.getItem('token');
  }
}
