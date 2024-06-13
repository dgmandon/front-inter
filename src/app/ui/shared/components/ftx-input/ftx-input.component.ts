import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { FtxErrorMessage } from "../../utils/ftx-error-messages";
import { debounceTime } from "rxjs";

@Component({
  selector: "ftx-input",
  templateUrl: "./ftx-input.component.html",
  styleUrl: "./ftx-input.component.css",
})
export class FtxInputComponent implements OnChanges, OnInit {
  @Input() viewLabel: boolean = true;
  @Input() label: string = "Label";
  @Input() type: string = "text";

  @Input() placeholder: string = "Enter text";
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlName!: string;
  @Input() validators: ValidatorFn[] = [];
  @Input() customErrorMessages: { [key: string]: string } = {};
  @Input() viewError: boolean = true;
  private ftxErrormsg!: FtxErrorMessage;
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  ngOnInit(): void {
    this.control.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.searchEvent.emit(value);
    });
    if (!this.formGroup) {
      throw new Error("The control of from be null");
    }
    this.ftxErrormsg = new FtxErrorMessage(
      this.formGroup.get(this.controlName) as FormControl,
      this.controlName
    );
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
