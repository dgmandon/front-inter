import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { FtxErrorMessage } from "../../utils/ftx-error-messages";
@Component({
  selector: "app-ftx-input-password",
  templateUrl: "./ftx-input-password.component.html",
  styleUrl: "./ftx-input-password.component.css",
})
export class FtxInputPasswordComponent implements OnChanges, OnInit {
  @Input() viewLabel: boolean = true;

  @Input() label: string = "Label";
  @Input() placeholder: string = "Enter text";
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName!: string;
  @Input() validators: ValidatorFn[] = [];
  @Input() customErrorMessages: { [key: string]: string } = {};
  @Input() viewError: boolean = true;
  private ftxErrormsg!: FtxErrorMessage;
  public visibilitypassword: boolean = false;
  ngOnInit(): void {
    if (!this.formGroup) {
      throw new Error("The control of from be null");
    }
    this.ftxErrormsg = new FtxErrorMessage(this.control, this.controlName);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.formGroup) {
      throw new Error("The control of from be null");
    }
    if (changes["validators"] && this.formGroup) {
      const validators = [...this.validators];
      const control = this.formGroup.get(this.controlName);
      if (control) {
        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    }
  }

  get control(): FormControl {
    return this.formGroup.get(this.controlName) as FormControl;
  }

  getErrorMessage() {
    return this.ftxErrormsg.getErrorMessage();
  }
  togglepassword(): void {
    this.visibilitypassword = !this.visibilitypassword;
  }
}
