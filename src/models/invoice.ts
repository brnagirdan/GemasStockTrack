import {Model} from './model';

export class Invoice extends Model { //proforma

  Id:number;
  Name:string;
  ProformaDate:string;
  ProformaInvoiceNo:string;
  OrderRevNo:number;
  OrderNo: string;
  OrderDate:string;
  CompanyId :number;

  attributeNames: string[] = ['Name', 'ProformaDate', 'ProformaInvoiceNo','OrderRevNo','OrderNo','OrderDate','  CompanyId' ];

}
