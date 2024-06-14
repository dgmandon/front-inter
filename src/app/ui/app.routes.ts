import { Routes } from "@angular/router";
import { USERS } from "./routes.constants";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: USERS.NAME,
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
];
