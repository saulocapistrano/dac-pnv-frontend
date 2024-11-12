import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { IAuthRequest } from 'src/app/auth/IAuthRequest';
import { ICriarUsuarioRequest } from 'src/app/auth/ICriarUsuarioRequest';
import { UserService } from 'src/app/features/user/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginFormRegister = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.valid) {
      this.userService
        .authUser(this.loginForm.value as IAuthRequest)
        .subscribe({
          next: (response) => {
            if (response && response.token) {
              this.cookieService.set('USER_INFO', response.token);
              this.loginForm.reset();

              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Bem-vindo de volta, ${response?.name}!`,
                life: 2000,
              });

              this.router.navigate(['/app/dashboard']);
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao fazer login. Verifique suas credenciais.',
              life: 3000,
            });
          },
        });
    }
  }

  onSubmitLoginFormRegister(): void {
    if (this.loginFormRegister.valid) {
      this.userService
        .createUser(this.loginFormRegister.value as ICriarUsuarioRequest)
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Usuário criado com sucesso!',
              life: 2000,
            });
            this.loginFormRegister.reset();
            this.loginCard = true;
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar usuário. Tente novamente.',
              life: 3000,
            });
          },
        });
    }
  }
}
