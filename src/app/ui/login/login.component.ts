import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { NotificationService } from "../shared/services/notification.service";
import { Router } from "@angular/router";
import { LoginService } from "@core/services/login-service.interface";
import { Auth } from "@core/models/login/auth.model";
import { MODULES } from "../routes.constants";
import { AuthResponse } from "@core/models/login/auth-response.model";
import { SharedModule } from "../shared/shared.module";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {

  studentName!: string;
  userLogged: boolean = false;
  userRegister: boolean = false;
  MODULES = MODULES;
  
  ngOnInit(): void {
    let stringAuth: string | null = localStorage.getItem("auth");
    if (stringAuth) {
      let auth: AuthResponse = JSON.parse(stringAuth);
      this.studentName = auth.name;
      this.userLogged = true;
      this.router.navigate([MODULES.USERS.USER]);
    }
    this.createForm();
  }

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private notification: NotificationService,
    private router: Router) 
  {}
  
  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      Identification: ["", Validators.required]
    });
  }

  public loginForm!: FormGroup;

  login() {
    let identification: string = this.loginForm.get('Identification')?.value;
    let auth = new Auth(identification);
    this.loginService.login(auth).subscribe(response => {
      this.studentName = response.name;
      this.loginForm.get('Identification')?.reset();
      localStorage.setItem("auth", JSON.stringify(response));
      this.userLogged = true;
      this.router.navigate([MODULES.USERS.USER]);
    }, (error) => {this.notification.showError('Falló al iniciar sesión');
    });
  }

  registerUser() {
    this.userRegister = true;
    this.router.navigate([MODULES.USERS.CREATE]);    
  }
    
}
