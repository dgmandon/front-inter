import { AuthResponse } from "@core/models/login/auth-response.model";
import { Auth } from "@core/models/login/auth.model";
import { Observable } from "rxjs";

export abstract class LoginService {
  abstract login(auth: Auth): Observable<AuthResponse>;
}
