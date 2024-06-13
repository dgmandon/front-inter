import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Order } from "@core/models/orders/order.model";
import { ContenService } from "@core/services/content-service.interface";
import { OrderService } from "@core/services/order-service.interface";
import { Content } from "src/app/ui/contents/components/content";
import { SearchService } from "src/app/ui/contents/services/services.service";
import { MODULES } from "src/app/ui/routes.constants";

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrl: "./order-list.component.css",
})
export class OrderListComponent implements OnInit {
  ngOnInit(): void {
    this.fetchOrders(this.currentPage, this.itemsPerPage, this.dataSearch);
  }
  filter: string = "";
  dataSearch: string = "";

  totalItems = 50;
  itemsPerPage = 5;
  currentPage = 0;
  pageSizeOptions = [5, 10, 15];
  orders: Order[] = [];
  constructor(
    private orderService: OrderService,
    private searchService: SearchService,

    private router: Router
  ) {
    this.searchService.event.subscribe((data) => {
      this.dataSearch = data;
      this.fetchOrders(this.currentPage, this.itemsPerPage, this.dataSearch);
    });
  }

  public fetchOrders(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): void {
    this.orderService
      .findOrder(pageNumber, pageSize, filter)
      .subscribe((result) => {
        this.orders = result.data;
        this.totalItems = result.totalCount;
        this.itemsPerPage = result.pageSize;
      });
  }
  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.fetchOrders(this.currentPage + 1, this.itemsPerPage, this.dataSearch);
  }
  public assign(order: Order) {
    this.router.navigate([MODULES.ORDERS.LINKS], {
      queryParams: {
        mensaje: JSON.stringify(order),
      },
    });
  }
  protected readonly MODULES = MODULES;
}
