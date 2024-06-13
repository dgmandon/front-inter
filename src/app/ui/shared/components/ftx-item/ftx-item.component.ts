import { Component, Input } from "@angular/core";

@Component({
  selector: "ftx-item",
  templateUrl: "./ftx-item.component.html",
  styleUrl: "./ftx-item.component.css",
})
export class FtxItemComponent {
  @Input() Title: string = "Title";
  @Input() Icon!: string;
}
