import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpService } from "@infrastructure/http/http.service";

import { CreateUserComponent } from "./add-subjects/create-user.component";
import { UserRoutingModule } from "./subject-routing.module";
import { UserComponent } from "./subject.component";
import { UserListComponent } from "./subject-list/subject-list.component";
import { UserService } from "@core/services/user-service.interface";
import { UserRepository } from "@infrastructure/repositories/user.repository";
import { DocumentTypeService } from "@core/services/document-type-sevice.interface";

@NgModule({
  declarations: [UserComponent, CreateUserComponent, UserListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    HttpService,
    { provide: UserService, useClass: UserRepository },
  ],
  exports: [],
})
export class UserModule {}
