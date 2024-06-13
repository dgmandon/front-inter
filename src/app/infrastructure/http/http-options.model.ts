import {HttpHeaders, HttpParams} from "@angular/common/http";

export class Options{
  headers?: HttpHeaders;
  params?: HttpParams | { [params: string]: any };
}
