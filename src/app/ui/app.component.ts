import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { SharedModule } from "./shared/shared.module";
import { MODULES } from "./routes.constants";
import { MatSidenav } from "@angular/material/sidenav";
interface menu {
  id: Number;
  name: string;
  router: string;
  icon: string;
  alt: string;
}
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SharedModule, RouterLink],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  protected readonly MODULES = MODULES;

  menu!: menu[];
  @ViewChild("sidenav")
  title: string = "test";
  menuOpened = true;
  menuWidth = 250;
  sidenav!: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = true;
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor() {
    this.menu = [
      {
        id: 1,
        name: "Contenidos",
        router: MODULES.CONTENTS.CONTENT,
        icon: "../../assets/icon_menu_empresa.svg",
        alt: "icon_menu_empresa",
      },
      {
        id: 2,
        name: "Usuarios",
        router: MODULES.USERS.USER,
        icon: "../../assets/icon_admon_usuario.svg",
        alt: "icon_parametros",
      },
      {
        id: 3,
        name: "Ordenes",
        router: MODULES.ORDERS.ORDER_SERVICE,
        icon: "../../assets/icon_mi_empresa.svg",
        alt: "icon_parametros",
      },
    ];
  }

  ngOnInit(): void {
    localStorage.setItem("companyId", "4713bf89-dc12-4ac5-56fc-08dc24260235");
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
