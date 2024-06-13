import { UserType } from "./user.type";

export class CreateUser {
  name: string;
  surName: string;
  email: string;
  rol: UserType;
  documentTypeId: string;
  document: string;
  companyId: string;
  constructor(
    name: string,
    surName: string,
    email: string,
    rol: UserType,
    documentTypeId: string,
    document: string,
    companyId: string
  ) {
    this.email = email;
    this.rol = rol;
    this.name = name;
    this.surName = surName;
    this.documentTypeId = documentTypeId;
    this.document = document;
    this.companyId = companyId;
  }
}
