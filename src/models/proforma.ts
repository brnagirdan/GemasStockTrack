import {Model} from './model';
import {Company} from './company';

export class Proforma extends Model {

    Id:number;
    Name:string;
    ProformaDate:Date;
    ProformaInvoiceNo:string;
    OrderRevNo:number;
    OrderNo:string;
    OrderDate:Date;
    CompanyId:number;
    Company: Company;

  attributeNames: string[] = ['Name', 'ProformaDate', 'ProformaInvoiceNo','OrderRevNo','OrderNo','OrderDate','CompanyId'];

}
