import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthRequest } from 'src/app/auth/IAuthRequest';
import { ICriarUsuarioRequest } from 'src/app/auth/ICriarUsuarioRequest';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private apiUrl = 'http://localhost:8080/pessoas'

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  // Autenticar usuário
  authUser(authRequest: IAuthRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, authRequest);
  }

  // Criar novo usuário
  createUser(createUserRequest: ICriarUsuarioRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, createUserRequest);
  }

  // Verificar se o usuário está logado
  isLoggedIn(): boolean {
    return !!this.cookieService.get('USER_INFO');
  }
}
