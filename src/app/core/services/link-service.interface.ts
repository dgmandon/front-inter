import { Observable } from "rxjs";
import { Assign } from "@core/models/contents/assign.model";
import { Paginated } from "@core/models/paginated.interface";
import { Link } from "@core/models/orders/link.model";
import { AssignOne } from "@core/models/contents/assign-one.model";
export abstract class LinkService {
  public abstract assign(id: string, assign: Assign): Observable<any>;
  public abstract assignOne(id: string, content: AssignOne): Observable<any>;
  public abstract getLink(id: string): Observable<any>;
  public abstract getLinks(
    pageNumber: number,
    pageSize: number,
    orderId: string
  ): Observable<Paginated<Link>>;
}
