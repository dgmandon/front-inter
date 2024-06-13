import { Content } from "./../../../../contents/components/content";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Link } from "@core/models/orders/link.model";
import { LinkService } from "@core/services/link-service.interface";
import { Option } from "src/app/ui/shared/ftx-autocomplete/type/option.interface";
import { NotificationService } from "src/app/ui/shared/services/notification.service";

@Component({
  selector: "app-link-item",
  templateUrl: "./link-item.component.html",
  styleUrl: "./link-item.component.css",
})
export class LinkItemComponent implements OnInit, OnChanges {
  @Input() link!: Link;
  @Input() contents: Content[] = [];
  options!: Option[];
  isSelect: boolean = false;
  constructor(
    private linkService: LinkService,
    private notificationService: NotificationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.contents) {
      this.options = this.contents.map((content) => {
        return { id: content.id, value: content.tag };
      });
    }
  }
  selectContent() {
    this.isSelect = !this.isSelect;
  }

  ngOnInit() {}

  assign(event: any) {
    this.selectContent();
    const option: Option = event.option.value;
    const content: Content = { id: option.id, tag: option.value };

    if (this.link.content) {
      if (this.link.content.id != content.id) {
        this.assignContent(content);
      }
    } else {
      this.assignContent(content);
    }
  }
  assignContent(content: Content) {
    this.linkService.assignOne(this.link.id, { content: content }).subscribe({
      next: () => {
        this.notificationService.showSuccess("se asignó el contenido");
        this.link.content = content;
      },
    });
  }
}
