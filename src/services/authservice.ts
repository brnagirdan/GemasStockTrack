import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';


@Injectable()
export class AuthService {
    isLoggedin: boolean;
    
    constructor(private http:Http) {
        
    }
    
    loginfn(usercreds) {
        this.isLoggedin = false;
        var headers = new Headers();
        var creds = 'grant_type=password&username=' + usercreds.username + '&password=' + usercreds.password;
        
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        
        return new Promise((resolve) => {
            
        
        
        this.http.post(`http://localhost:60709/token`, creds, {headers: headers}).subscribe((data) => {
             console.log("posttt iciiiii");
              console.log(creds);
               console.log(data.json());
                console.log("token:"+data.json().access_token);
            
         
                 console.log("if------ic");
                window.localStorage.setItem('auth_key', data.json().access_token);
                this.isLoggedin = true;
                let key = window.localStorage.getItem('auth_key');
                console.log("key:" + key);
                resolve(this.isLoggedin)
            
                
            }
        )
        
        })
    }
    
    
}