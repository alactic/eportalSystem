import { Injectable, Optional} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Injectable()
export class SharedHttpServiceService {
  private SERVER_URL="http://localhost/myProject/eportaldb/public/api";
  private HEADERS=new Headers({'X-Requested-With': 'XMLHttpRequest'});
  loginStatus:string;
  constructor(private http:Http) { }
  loginService(url, data){
    return this.http.post(this.SERVER_URL+'/'+url, data,{headers:this.HEADERS})
        .map((response:Response)=>{
              this.loginStatus=response.json().status;
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

  postService(endPoint, data){
    return this.http.post(this.SERVER_URL+'/'+endPoint, data, {headers:this.HEADERS})
        .map((response:Response)=>response.json().message)
        .retry(6)
        .catch((err)=>err.message);
  }

  getService(endPoint, @Optional()parameter){
      if(parameter==null){
          return this.http.get(this.SERVER_URL+'/'+endPoint)
              .map((response:Response)=>response.json().message);
      }else{
          return this.http.get(this.SERVER_URL+'/'+endPoint+'/'+ parameter)
              .map((response:Response)=>response.json().message);
      }

  }

}
