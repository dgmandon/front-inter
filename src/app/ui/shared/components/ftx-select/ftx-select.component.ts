import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { FtxErrorMessage } from "../../utils/ftx-error-messages";
import { SelectFormat } from "./models/selectFormat.model";

@Component({
  selector: "ftx-select",
  templateUrl: "./ftx-select.component.html",
  styleUrl: "./ftx-select.component.css",
})
export class FtxSelectComponent implements OnChanges, OnInit {
  @Input() label: string = "Label";
  @Input() elements: SelectFormat[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName!: string;
  @Input() validators: ValidatorFn[] = [];
  @Input() customErrorMessages: { [key: string]: string } = {};
  @Input() viewError: boolean = true;

  private ftxErrormsg!: FtxErrorMessage;

  ngOnInit(): void {
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
}
