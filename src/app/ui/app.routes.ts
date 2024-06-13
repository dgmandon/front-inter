import { Routes } from "@angular/router";
import { CONTENTS, ORDERS, USERS } from "./routes.constants";
import { ContentsComponent } from "./contents/contents.component";
import { AssignComponent } from "./assign/assign.component";
import { PruebaComponent } from "./prueba/prueba.component";

export const routes: Routes = [
  {
    path: CONTENTS.NAME,
    loadChildren: () =>
      import("./contents/contents.module").then((m) => m.ContentsModule),
  },
  {
    path: CONTENTS.CONTENT,
    component: ContentsComponent,
    data: { showMenu: true },
  },
  {
    path: CONTENTS.NEW_CONTENT,
    component: PruebaComponent,
    data: { showMenu: true },
  },
  {
    path: CONTENTS.ASSIGN_CONTENT,
    component: AssignComponent,
    data: { showMenu: true },
  },

  {
    path: USERS.NAME,
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },

  {
    path: ORDERS.NAME,
    loadChildren: () =>
      import("./orders/orders.module").then((m) => m.OrdersModule),
  },
];
