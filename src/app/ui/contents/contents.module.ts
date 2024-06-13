import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpService } from "@infrastructure/http/http.service";
import { ContentsComponent } from "./contents.component";
import { ContentListComponent } from "./components/content-list/content-list.component";
import { ContentItemComponent } from "./components/content-item/content-item.component";
import { ContentRoutingModule } from "./contents-routing.module";
import { ContenService } from "@core/services/content-service.interface";
import { ContentRepository } from "@infrastructure/repositories/content.repository";
import { OrderService } from "@core/services/order-service.interface";
import { OrderRepository } from "@infrastructure/repositories/order.repository";
import { LinkRepository } from "@infrastructure/repositories/link.repository";
import { LinkService } from "@core/services/link-service.interface";

@NgModule({
  declarations: [ContentsComponent, ContentListComponent, ContentItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ContentRoutingModule,
  ],
  providers: [
    HttpService,
    { provide: ContenService, useClass: ContentRepository },
    { provide: OrderService, useClass: OrderRepository },
    { provide: LinkService, useClass: LinkRepository },
  ],
  exports: [],
})
export class ContentsModule {}
