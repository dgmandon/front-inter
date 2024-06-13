import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'ftx-paginator',
  templateUrl: './ftx-paginator.component.html',
  styleUrls: ['./ftx-paginator.component.css']
})
export class FtxPaginatorComponent {
  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Input() pageSizeOptions: number[];
  @Input() hidePageSize: boolean;
  @Input() showPageSizeOptions: boolean;
  @Input() showFirstLastButtons: boolean;
  @Input() disabled: boolean;

  @Output() page: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  constructor() {
    this.length = 50;
    this.pageSize = 5;
    this.pageIndex = 1;
    this.pageSizeOptions = [5, 10, 25];
    this.hidePageSize = false;
    this.showPageSizeOptions = true;
    this.showFirstLastButtons = true;
    this.disabled = false;
  }
  handlePageEvent(event: PageEvent) {
    this.page.emit(event);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
