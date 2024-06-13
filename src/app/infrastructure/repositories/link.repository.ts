import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "@infrastructure/http/http.service";
import { environment, resources } from "@env/environment";
import { LinkService } from "@core/services/link-service.interface";
import { AssignOne } from "@core/models/contents/assign-one.model";
import { Link } from "@core/models/orders/link.model";
import { Paginated } from "@core/models/paginated.interface";
import { Assign } from "@core/models/contents/assign.model";

@Injectable({
  providedIn: "root",
})
export class LinkRepository extends LinkService {
  baseUrl = `${environment.orderAppUrl}${environment.apiSuffix}${resources.link}`;
  constructor(protected httpService: HttpService) {
    super();
  }

  public override assignOne(id: string, content: AssignOne): Observable<any> {
    return this.httpService.doPatch(`${this.baseUrl}/` + id, content);
  }

  public override getLinks(
    pageNumber: number,
    pageSize: number,
    orderId: string
  ): Observable<Paginated<Link>> {
    return this.httpService.doGet<Paginated<Link>>(
      this.baseUrl +
        `?pageNumber=${pageNumber}&pageSize=${pageSize}&orderId=${orderId}`
    );
  }

  public assign(id: string, assign: Assign): Observable<void> {
    return this.httpService.doPatch(
      `${environment.orderAppUrl}${environment.apiSuffix}${resources.order}/` +
        id +
        "/links",
      assign
    );
  }

  public getLink(id: string): Observable<any> {
    return this.httpService.doGet<any>(this.baseUrl + id);
  }
}
