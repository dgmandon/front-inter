import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ButtonType, IconPosition } from "./types/ButtonTypes";

@Component({
  selector: "ftx-button",
  templateUrl: "./ftx-button.component.html",
  styleUrl: "./ftx-button.component.css",
})
export class FtxButtonComponent {
  @Input() small: boolean = false;
  @Input() onlyIcon: boolean = false;
  @Input() positionIcon: IconPosition = "left";
  @Input() icon!: string;
  @Input() content: string = "button";
  @Input() buttonType: ButtonType = "primary";
  @Input() disabled: boolean = false;
  @Output() eventClick = new EventEmitter<any>();

  Click() {
    this.eventClick.emit();
  }
}
