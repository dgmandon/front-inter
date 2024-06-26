import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@core/services/user-service.interface";
import { NotificationService } from "../../shared/services/notification.service";
import { CreateUser } from "@core/models/user/create-user.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrl: "./create-user.component.css",
})
export class CreateUserComponent implements OnInit {
  ngOnInit(): void {
    this.createForm();
  }
  private createForm(): void {
    this.userForm = this.formBuilder.group({
      Name: ["", Validators.required],
      Identification: ["", Validators.required],
    });
  }
  public userForm!: FormGroup;
  public isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private location: Location,
    private notificationService: NotificationService
  ) {}

  save(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const createUser: CreateUser = new CreateUser(
        this.userForm.get("Name")?.value,
        this.userForm.get("Identification")?.value,
      );

      this.userService.createUser(createUser).subscribe({
        next: () => {
          this.notificationService.showSuccess("Usuario creado con exito");
          this.userForm.get("Name")?.patchValue(""),
            this.userForm.get("Identification")?.patchValue(""),
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

  back() {
   this.location.back();
  }
}
