import { DocumentType } from "@core/models/document-type/document-type.model";
import { Observable } from "rxjs";

export abstract class DocumentTypeService {
  abstract getAll(): Observable<DocumentType[]>;
}
