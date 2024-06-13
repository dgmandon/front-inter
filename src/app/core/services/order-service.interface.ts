import { Observable } from "rxjs";
import { Order } from "@core/models/orders/order.model";
import { Paginated } from "@core/models/paginated.interface";
export abstract class OrderService {
  public abstract findOrder(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<Paginated<Order>>;
}
