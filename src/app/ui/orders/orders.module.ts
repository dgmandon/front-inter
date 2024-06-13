import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpService } from "@infrastructure/http/http.service";
import { OrderService } from "@core/services/order-service.interface";
import { OrderRepository } from "@infrastructure/repositories/order.repository";
import { SharedModule } from "../shared/shared.module";
import { OrdersComponent } from "./orders.component";
import { OrderListComponent } from "./components/order-list/order-list.component";
import { OrdersRoutingModule } from "./orders-routings.module";
import { LinksComponent } from "./links/links.component";
import { LinksListComponent } from "./links/components/links-list/links-list.component";
import { LinkItemComponent } from "./links/components/link-item/link-item.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ContenService } from "@core/services/content-service.interface";
import { ContentRepository } from "@infrastructure/repositories/content.repository";
import { LinkRepository } from "@infrastructure/repositories/link.repository";
import { LinkService } from "@core/services/link-service.interface";

@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    LinksComponent,
    LinksListComponent,
    LinkItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpService,
    { provide: ContenService, useClass: ContentRepository },
    { provide: OrderService, useClass: OrderRepository },
    { provide: LinkService, useClass: LinkRepository },
  ],
  exports: [],
})
export class OrdersModule {}
