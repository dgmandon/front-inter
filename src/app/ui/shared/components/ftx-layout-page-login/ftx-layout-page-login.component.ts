import { Component, Input } from "@angular/core";

@Component({
  selector: "ftx-layout-page-login",
  templateUrl: "./ftx-layout-page-login.component.html",
  styleUrl: "./ftx-layout-page-login.component.css",
})
export class FtxLayoutPageLoginComponent {
  @Input() title: string = "Commercial Segment";
  @Input() urlBackIconImage: string = "../../../../assets/ico_circle.svg";
  @Input() srcIconImage: string = "../../../../assets/login.svg";
}
