export class Order {
  id: string;
  productionOrder: string;
  purchaseOrder: string;
  sku: string;
  amountQr: number;
  amountAvailable: number;
  company: Company;
  constructor(
    id: string,
    productionOrder: string,
    purchaseOrder: string,
    sku: string,
    amountAvailable: number,
    amountQr: number,
    company: Company
  ) {
    this.id = id;
    this.company = company;
    this.productionOrder = productionOrder;
    this.purchaseOrder = purchaseOrder;
    this.sku = sku;
    this.amountAvailable = amountAvailable;
    this.amountQr = amountQr;
  }
}

export class Company {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
