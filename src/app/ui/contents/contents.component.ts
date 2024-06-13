import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MODULES } from "../routes.constants";
import { SearchService } from "./services/services.service";

@Component({
  selector: "app-contents",
  templateUrl: "./contents.component.html",
  styleUrl: "./contents.component.css",
})
export class ContentsComponent implements OnInit {
  formControl!: FormGroup;
  filter!: string;
  handleSearchEvent(filter: string) {
    this.searchService.emitEvent(filter);
  }
  search(): void {
    this.filter = this.formControl.get("tag")?.value;
    console.log(this.filter);
    this.searchService.emitEvent(this.filter);
  }
  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {}
  private CreateForm(): void {
    this.formControl = this.formBuilder.group({
      tag: [""],
    });
  }
  ngOnInit(): void {
    this.CreateForm();
  }

  protected readonly MODULES = MODULES;
}
