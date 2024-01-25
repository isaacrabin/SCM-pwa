import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginResponse } from "../shared/interfaces/login.interface";
import { StorageService } from "./storage.service";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageSrv: StorageService,
    private router: Router
  ) { }

  login(loginPayload: { email: string, password: string }) {
    return this.http.post<LoginResponse>(environment.BASE_URL + 'login', loginPayload)
      .pipe(
        tap((resp) => {
          if (resp && resp.token) {
            this.setSession(resp)
            // sessionStorage.setItem('auth-token', resp.token);
          }
        })
      )
  }

  private async setSession(resp: LoginResponse) {
    await this.storageSrv.set('auth-token', resp.token);
    await this.storageSrv.set('token-expires-in', resp.expires_in);
    await this.storageSrv.set('session-state', "active");
  }

  async logout() {
    sessionStorage.removeItem('token');
    await this.storageSrv.remove(['auth-token', 'token-expires-in']);
    this.router.navigateByUrl('/login');
  }

  isAuthorized(): boolean{
   const tokenExists =  sessionStorage.getItem('token');
    if(tokenExists){
      return true;
    }
    else{
      return false;
    }
  }
}
