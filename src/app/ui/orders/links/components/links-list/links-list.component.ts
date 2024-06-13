import { Component, Input, OnInit } from "@angular/core";
import { Link } from "@core/models/orders/link.model";
import { ContenService } from "@core/services/content-service.interface";
import { LinkService } from "@core/services/link-service.interface";
import { Content } from "src/app/ui/contents/components/content";
@Component({
  selector: "app-links-list",
  templateUrl: "./links-list.component.html",
  styleUrl: "./links-list.component.css",
})
export class LinksListComponent implements OnInit {
  @Input() orderId!: string;
  contents: Content[] = [];

  dataSearch: string = "";
  totalItems = 50;
  itemsPerPage = 5;
  currentPage = 0;
  pageSizeOptions = [5, 10, 15];
  links: Link[] = [];

  constructor(
    private linkService: LinkService,
    private contentService: ContenService
  ) {}
  ngOnInit(): void {
    console.log(this.contents);
    this.fetchLinks(this.currentPage, this.itemsPerPage);
    this.fetchAllContents();
  }

  public fetchLinks(pageNumber: number, pageSize: number): void {
    this.linkService
      .getLinks(pageNumber, pageSize, this.orderId)
      .subscribe((result) => {
        this.links = result.data;
        this.totalItems = result.totalCount;
        this.itemsPerPage = result.pageSize;
      });
  }
  public fetchAllContents() {
    console.log("contents");
    this.contentService.getAllContent().subscribe((data) => {
      this.contents = data;
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.fetchLinks(this.currentPage + 1, this.itemsPerPage);
  }
}
