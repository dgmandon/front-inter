import { Paginated } from "@core/models/paginated.interface";
import { CreateUser } from "@core/models/user/create-user.model";
import { User } from "@core/models/user/user.model";
import { Observable } from "rxjs";

export abstract class UserService {
  abstract createUser(user: CreateUser): Observable<void>;
  abstract getAll(identification: string, subjectId: string): Observable<User[]>;
}
