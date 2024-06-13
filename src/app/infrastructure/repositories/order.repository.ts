import { Injectable } from "@angular/core";
import { OrderService } from "@core/services/order-service.interface";
import { Observable } from "rxjs";
import { HttpService } from "@infrastructure/http/http.service";
import { Assign, ContentDto } from "@core/models/contents/assign.model";
import { Paginated } from "@core/models/paginated.interface";
import { Order } from "@core/models/orders/order.model";
import { Link } from "@core/models/orders/link.model";
import { AssignOne } from "@core/models/contents/assign-one.model";
import { environment, resources } from "@env/environment";

@Injectable({
  providedIn: "root",
})
export class OrderRepository extends OrderService {
  baseUrl = `${environment.orderAppUrl}${environment.apiSuffix}${resources.order}`;
  constructor(protected httpService: HttpService) {
    super();
  }

  public findOrder(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<any> {
    return this.httpService.doGet<Paginated<Order>>(
      this.baseUrl +
        `?pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}`
    );
  }
}
