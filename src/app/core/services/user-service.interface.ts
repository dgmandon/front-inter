import { Paginated } from "@core/models/paginated.interface";
import { CreateUser } from "@core/models/user/create-user.model";
import { User } from "@core/models/user/user.model";
import { Observable } from "rxjs";

export abstract class UserService {
  abstract createUser(user: CreateUser): Observable<void>;
  abstract getAll(
    pageNumber: number,
    pageSize: number,
    filter?: string
  ): Observable<Paginated<User>>;
  abstract delete(id: string): Observable<void>;
  abstract putCreateUser(userId: string, user: CreateUser): Observable<void>;
}
