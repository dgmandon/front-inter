import { Component, Input } from "@angular/core";

@Component({
  selector: "ftx-card",
  templateUrl: "./ftx-card.component.html",
  styleUrl: "./ftx-card.component.css",
})
export class FtxCardComponent {
  @Input() header: boolean = true;
  @Input() content: boolean = true;
  @Input() subtitle: boolean = false;
  @Input() actions: boolean = false;
}
