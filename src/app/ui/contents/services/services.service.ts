import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  event: EventEmitter<any> = new EventEmitter();

  public emitEvent(filter?: any): void {
    this.event.emit(filter);
  }
}
