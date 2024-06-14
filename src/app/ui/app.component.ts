import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { MODULES } from "./routes.constants";
import { LoginService } from "@core/services/login-service.interface";
import { LoginRepository } from "@infrastructure/repositories/login.repository";
import { HttpService } from "@infrastructure/http/http.service";
import { AuthResponse } from "@core/models/login/auth-response.model";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, RouterLink ],
  providers: [ HttpService, { provide: LoginService, useClass: LoginRepository } ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  studentName!: string;
  userLogged: boolean = false;
  userRegister: boolean = false;
  MODULES = MODULES;

  constructor(private router: Router) 
  {    
  }

  ngOnInit(): void {
    let stringAuth: string | null = localStorage.getItem("auth");
    if (stringAuth) {
      let auth: AuthResponse = JSON.parse(stringAuth);
      this.studentName = auth.name;
      this.userLogged = true;
      this.router.navigate([MODULES.USERS.USER]);
    }
  }

  logout() {
    localStorage.removeItem("auth");
    this.studentName = '';
    this.userLogged = false;
  }
}
