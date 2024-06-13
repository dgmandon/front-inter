import { Component, OnInit } from "@angular/core";
import { Content } from "../content";
import { ContenService } from "@core/services/content-service.interface";
import { SearchService } from "../../services/services.service";
@Component({
  selector: "app-content-list",
  templateUrl: "./content-list.component.html",
  styleUrl: "./content-list.component.css",
})
export class ContentListComponent implements OnInit {
  totalItems = 50;
  itemsPerPage = 2;
  currentPage = 0;
  pageSizeOptions = [2, 4, 8];
  public contents: Content[] = [];
  dataSearch: string = "";
  constructor(
    private contentService: ContenService,
    private searchService: SearchService
  ) {
    this.searchService.event.subscribe((data) => {
      this.dataSearch = data;
      this.fetchContents(this.currentPage, this.itemsPerPage, this.dataSearch);
    });
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.fetchContents(
      this.currentPage + 1,
      this.itemsPerPage,
      this.dataSearch
    );
  }
  public fetchContents(
    pageNumber: number,
    pageSize: number,
    filter?: string
  ): void {
    this.contentService
      .getAllContentPaginated(pageNumber, pageSize, filter)
      .subscribe((result) => {
        this.contents = result.data;
        this.totalItems = result.totalCount;
        this.itemsPerPage = result.pageSize;
      });
  }
  public contentPaginated!: any[];
  ngOnInit(): void {
    this.fetchContents(this.currentPage, this.itemsPerPage, this.dataSearch);
    console.log();
  }
}
