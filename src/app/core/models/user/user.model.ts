export class User {
  id: string;
  name: string;
  document: string;
  email: string;
  rol: string;
  documentType: DocumentType;
  constructor(
    id: string,
    name: string,
    document: string,
    email: string,
    rol: string,
    documentType: DocumentType
  ) {
    this.id = id;
    this.name = name;
    this.document = document;
    this.email = email;
    this.rol = rol;
    this.documentType = documentType;
  }
}
