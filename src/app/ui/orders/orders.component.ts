import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { SearchService } from "../contents/services/services.service";
import { MODULES } from "../routes.constants";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrl: "./orders.component.css",
})
export class OrdersComponent implements OnInit {
  formControl!: FormGroup;
  filter!: string;
  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {}
  ngOnInit(): void {
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
