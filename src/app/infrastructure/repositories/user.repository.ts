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
  baseUrl = `${environment.apiUrl}${environment.apiSuffix}${resources.user}`;
  constructor(protected httpService: HttpService) {
    super();
  }
  override createUser(user: CreateUser): Observable<void> {
    return this.httpService.doPost<CreateUser, void>(this.baseUrl, user);
  }

  override getAll(
    identification: string,
    subjectId: string
  ): Observable<any> {
    return this.httpService.doGet<User[]>(
      `${this.baseUrl}/${identification}/${subjectId}`
    );
  }
}
