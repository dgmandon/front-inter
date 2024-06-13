import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpService } from "@infrastructure/http/http.service";

import { CreateUserComponent } from "./create-user/create-user.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserService } from "@core/services/user-service.interface";
import { UserRepository } from "@infrastructure/repositories/user.repository";
import { DocumentTypeService } from "@core/services/document-type-sevice.interface";
import { DocumentTypeRepository } from "@infrastructure/repositories/document-type.repository";

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
    { provide: DocumentTypeService, useClass: DocumentTypeRepository },
  ],
  exports: [],
})
export class UserModule {}
