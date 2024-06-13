import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "@core/services/order-service.interface";
import { NotificationService } from "../../shared/services/notification.service";
import { SearchService } from "../../contents/services/services.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MODULES } from "../../routes.constants";

@Component({
  selector: "app-links",
  templateUrl: "./links.component.html",
  styleUrl: "./links.component.css",
})
export class LinksComponent implements OnInit {
  datosEntrada: any = [];
  formControl!: FormGroup;
  filter!: string;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["mensaje"]) {
        this.datosEntrada = JSON.parse(params["mensaje"]);
      }
    });
    this.CreateForm();
  }
  private CreateForm(): void {
    this.formControl = this.formBuilder.group({
      user: [""],
    });
  }

  handleSearchEvent(filter: string) {
    this.searchService.emitEvent(filter);
  }
  protected readonly MODULES = MODULES;
}
