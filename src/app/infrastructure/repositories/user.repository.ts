import { Injectable } from "@angular/core";
import { Paginated } from "@core/models/paginated.interface";
import { CreateUser } from "@core/models/user/create-user.model";
import { User } from "@core/models/user/user.model";
import { UserService } from "@core/services/user-service.interface";
import { environment, resources } from "@env/environment";
import { HttpService } from "@infrastructure/http/http.service";
import { Observable, concatMap, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserRepository extends UserService {
  override delete(id: string): Observable<void> {
    return this.httpService.doDelete(`${this.baseUrl}/${id}`);
  }
  baseUrl = `${environment.identityAppUrl}${environment.apiSuffix}${resources.user}`;
  constructor(protected httpService: HttpService) {
    super();
  }
  override createUser(user: CreateUser): Observable<void> {
    return this.postCreateUserId().pipe(
      concatMap((userId) => this.putCreateUser(userId, user))
    );
  }
  private postCreateUserId(): Observable<string> {
    return this.httpService
      .doPost<null, { userId: string }>(this.baseUrl, null)
      .pipe(map((result) => result.userId));
  }
  override putCreateUser(userId: string, user: CreateUser): Observable<void> {
    return this.httpService.doPut<CreateUser, void>(
      `${this.baseUrl}/${userId}`,
      user
    );
  }
  override getAll(
    pageNumber: number,
    pageSize: number,
    filter: string
  ): Observable<any> {
    return this.httpService.doGet<Paginated<User>>(
      `${this.baseUrl}` +
        `?pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}&companyId=${"3fa85f64-5717-4562-b3fc-2c963f66afa6"}`
    );
  }
}
