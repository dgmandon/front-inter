import { Injectable } from "@angular/core";
import { DocumentType } from "@core/models/document-type/document-type.model";
import { DocumentTypeService } from "@core/services/document-type-sevice.interface";
import { environment, resources } from "@env/environment";
import { HttpService } from "@infrastructure/http/http.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DocumentTypeRepository extends DocumentTypeService {
  baseUrl = `${environment.identityAppUrl}${environment.apiSuffix}${resources.documentTypes}`;

  constructor(protected httpService: HttpService) {
    super();
  }
  public override getAll(): Observable<DocumentType[]> {
    return this.httpService.doGet<DocumentType[]>(this.baseUrl);
  }
}
