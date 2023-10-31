import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginResponse } from "../shared/interfaces/login.interface";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  login(loginPayload: { email: string, password: string }) {
    return this.http.post<LoginResponse>(environment.BASE_URL + 'login', loginPayload)
      .pipe(
        tap((resp) => {
          if (resp && resp.token) {
            sessionStorage.setItem('auth-token', resp.token);
          }
        })
      )
  }
}
