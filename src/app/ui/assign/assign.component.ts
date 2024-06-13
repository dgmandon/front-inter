import { Component, OnInit, ViewChild } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "@core/services/order-service.interface";
import { OrderRepository } from "@infrastructure/repositories/order.repository";
import { HttpService } from "@infrastructure/http/http.service";
import { Assign } from "@core/models/contents/assign.model";
import { NotificationService } from "../shared/services/notification.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TableColumn } from "../shared/components/ftx-table/models/table-column.model";
import { LinkService } from "@core/services/link-service.interface";
import { LinkRepository } from "@infrastructure/repositories/link.repository";

@Component({
  selector: "app-assign",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    HttpService,
    { provide: OrderService, useClass: OrderRepository },
    { provide: LinkService, useClass: LinkRepository },
  ],
  templateUrl: "./assign.component.html",
  styleUrl: "./assign.component.css",
})
export class AssignComponent implements OnInit {
  displayedColumns: string[] = [
    "ordenes",
    "cantTotal",
    "cantRestante",
    "asignar",
    "accion",
  ];
  dataSource!: MatTableDataSource<any[]>;
  filterValue: string = "";
  loading: boolean = false;
  filter: string = "";
  ordersTableColumns!: TableColumn[];
  elementosPorPagina: number = 5;
  totalElementos = 0;
  defaultPageSize = 5;
  pageIndex = 0;
  paginaActual = 1;
  companyId: any = "";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  datosEntrada: any = [];
  dataOrder: any;
  tagName: String = "";

  constructor(
    private route: ActivatedRoute,
    private linkService: LinkService,
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["mensaje"]) {
        this.datosEntrada = JSON.parse(params["mensaje"]);
        this.tagName = this.datosEntrada.tag;
      }
      this.initColumns();
    });
  }

  async initColumns(): Promise<void> {
    this.ordersTableColumns = [
      {
        name: "Ordenes",
        dataKey: "productionOrder",
      },
      {
        name: "Cant Total",
        dataKey: "amountQr",
      },
      {
        name: "Cant Restante",
        dataKey: "amountAvailable",
      },
    ];
    await this.findOrder();
  }

  async findOrder() {
    this.loading = true;
    await this.orderService
      .findOrder(this.paginaActual, this.elementosPorPagina, this.filter)
      .subscribe(
        (result) => {
          this.dataOrder = result.data;
          this.dataSource = new MatTableDataSource(this.dataOrder);
          this.defaultPageSize = result.pageSize;
          this.pageIndex = result.currentPage - 1;
          this.totalElementos = result.totalCount;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error("Error al obtener órdenes:", error);
        }
      );
  }

  assign(row: any) {
    const assign: Assign = {
      content: { id: this.datosEntrada.id, tag: this.datosEntrada.tag },
      amountToAssociate: row.assignedQuantity,
    };
    if (row.assignedQuantity > 0) {
      if (row.amountAvailable >= row.assignedQuantity) {
        this.linkService.assign(row.id + "", assign).subscribe(
          (result) => {
            this.notificationService.showSuccess("Orden Asignada");
            this.findOrder();
          },
          (error) => {
            this.notificationService.showError("Error al asignar la orden");
          }
        );
      } else {
        console.log(row.amountAvailable, row.assignedQuantity);
        console.log(assign);
        this.notificationService.showError(
          "No se puede asignar cantidad mayor a la disponible en la orden"
        );
      }
    } else {
      this.notificationService.showError(
        "La cantidad a asignar no puede ser cero"
      );
    }
  }

  applyFilter(event: Event) {
    this.paginaActual = 1;
    this.findOrder();
    /*const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }*/
  }

  pagination(evento: any) {
    this.elementosPorPagina = evento.pageSize;
    this.paginaActual = evento.pageIndex + 1;
    this.findOrder();
  }
}
