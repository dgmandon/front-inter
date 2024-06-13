import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ORDERS } from "../routes.constants";
import { OrdersComponent } from "./orders.component";
import { LinksComponent } from "./links/links.component";
const routes: Routes = [
  { path: ORDERS.ORDER, component: OrdersComponent },
  { path: ORDERS.LINKS, component: LinksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
