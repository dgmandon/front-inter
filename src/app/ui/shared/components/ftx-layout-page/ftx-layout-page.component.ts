import { Component, Input } from "@angular/core";

@Component({
  selector: "ftx-layout-page",
  templateUrl: "./ftx-layout-page.component.html",
  styleUrl: "./ftx-layout-page.component.css",
})
export class FtxLayoutPageComponent {
  @Input() title: string = "Commercial Segment";
  @Input() urlBackIconImage: string = "../../../../assets/ico_circle.svg";
  @Input() srcIconImage: string = "../../../../assets/icon_mi_empresa.svg";
}
