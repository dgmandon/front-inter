import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { USERS } from "../routes.constants";
import { UserComponent } from "./user.component";
import { CreateUserComponent } from "./create-user/create-user.component";

const routes: Routes = [
  {
    path: USERS.USER,
    component: UserComponent,
  },
  {
    path: USERS.CREATE,
    component: CreateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
