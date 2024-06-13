import { Component, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "ftx-dialog",
  templateUrl: "./ftx-dialog.component.html",
  styleUrl: "./ftx-dialog.component.css",
})
export class FtxDialogComponent {
  @Input() componet: boolean = false;
  constructor(
    private dialogRef: MatDialogRef<FtxDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { content: string }
  ) {}
  Confirm(element: boolean) {
    this.dialogRef.close(element);
  }
}
