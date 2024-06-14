import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@core/services/user-service.interface";
import { NotificationService } from "../../shared/services/notification.service";
import { CreateUser } from "@core/models/user/create-user.model";
import { SelectFormat } from "../../shared/components/ftx-select/models/selectFormat.model";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrl: "./create-user.component.css",
})
export class CreateUserComponent implements OnInit {
  public tipoNits: DocumentType[] = [];
  public tipoNitsFormated: SelectFormat[] = [];

  public companySegments: any[] = [];
  public companySegmentsFormated: SelectFormat[] = [];
  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.userForm = this.formBuilder.group({
      Name: ["", Validators.required],
      Surname: ["", Validators.required],
      Document: ["", Validators.required],
      Email: ["", Validators.required],
      IdentityDocumentType: ["", Validators.required],
    });
  }
  public userForm!: FormGroup;
  public isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,

    private notificationService: NotificationService
  ) {}

  save(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const createUser: CreateUser = new CreateUser(
        this.userForm.get("Name")?.value,
        this.userForm.get("Surname")?.value,
        this.userForm.get("Email")?.value,
        "AuxiliarCustomer",
        this.userForm.get("IdentityDocumentType")?.value,
        this.userForm.get("Document")?.value,
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      );

      this.userService.createUser(createUser).subscribe({
        next: () => {
          this.notificationService.showSuccess("Usuario creado con exito");
          this.userForm.get("Name")?.patchValue(""),
            this.userForm.get("Surname")?.patchValue(""),
            this.userForm.get("Document")?.patchValue(""),
            this.userForm.get("Email")?.patchValue(""),
            this.userForm.get("Rol")?.patchValue(""),
            this.userForm.markAsUntouched();
        },
        error: (error) => {
          this.notificationService.showError("Error al crear el usuario");
          console.log(error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
