import { FormControl } from "@angular/forms";

export class FtxErrorMessage {
  private customErrorMessages: { [key: string]: string } = {};
  private control: FormControl;
  private name?: string = "";

  constructor(control: FormControl, name?: string) {
    this.control = control;
    this.name = name ? name : "";
  }

  getErrorMessage() {
    for (const validatorKey in this.control.errors) {
      if (this.control.errors.hasOwnProperty(validatorKey)) {
        return (
          this.customErrorMessages[validatorKey] ||
          this.defaultErrorMessages(validatorKey)
        );
      }
    }
    return "Campo " + this.name + " inválido";
  }

  private defaultErrorMessages(validatorKey: string): string {
    if (!this.control || !this.control.errors) {
      throw new Error("The control or its errors should not be null");
    }

    if (validatorKey === "required") {
      return "El campo " + this.name + " es obligatorio";
    } else if (validatorKey === "minlength") {
      const minLength = this.control["errors"][validatorKey]["requiredLength"];
      return `El campo ${this.name} debe contener al menos ${minLength} caracteres`;
    } else if (validatorKey === "maxlength") {
      const maxLength = this.control["errors"][validatorKey]["requiredLength"];
      return `El campo ${this.name} debe  contener como máximo ${maxLength} caracteres`;
    } else if (validatorKey === "pattern") {
      return "El valor del campo " + this.name + " ingresado no es válido";
    }
    return "Campo " + this.name + "inválido";
  }
}
