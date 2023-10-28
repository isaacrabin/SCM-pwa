import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RegisterUserPayload, RegisterUserResponse } from "../shared/interfaces/register.interface";

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  registerNewUser(registerInfo: RegisterUserPayload) {
    return this.http.post<RegisterUserResponse>(environment.BASE_URL + 'register', registerInfo)
  }
}
