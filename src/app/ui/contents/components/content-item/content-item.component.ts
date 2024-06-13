import { Component, Input } from "@angular/core";
import { Content } from "../content";
import { FtxDialogComponent } from "src/app/ui/shared/components/ftx-dialog/ftx-dialog.component";
import { ContenService } from "@core/services/content-service.interface";
import { SearchService } from "../../services/services.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
  selector: "app-content-item",
  templateUrl: "./content-item.component.html",
  styleUrl: "./content-item.component.css",
})
export class ContentItemComponent {
  @Input() content!: Content;
  constructor(
    private contentService: ContenService,
    private searchService: SearchService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  public showModalDelete(): void {
    const dialogResult = this.dialog.open(FtxDialogComponent, {
      data: { content: "¿Desea eliminar este tag?" },
    });

    dialogResult.afterClosed().subscribe((result) => {
      if (result) {
        this.contentService.deleteContent(this.content.id).subscribe(() => {
          this.searchService.emitEvent();
        });
      }
    });
  }

  public showEdit(content:any){
   console.log(content);
   this.router.navigate(['/new'], { queryParams: { mensaje: JSON.stringify(content) } });
  }


  public assign(content:any){
    this.router.navigate(['/assign'], { queryParams: { mensaje: JSON.stringify(content) } });
  }
}
