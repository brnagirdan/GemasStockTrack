import {Model} from './model';

export class ProformaList extends Model {

  Id:number;
  ProductId:number;
  Quantity:number;
  QuantityType:string;
  DiscountRate:number;
  FinalAmount:string;
  TotalAmount:string;

  attributeNames: string[] = ['ProductId', 'Quantity', 'QuantityType','DiscountRate','FinalAmount','TotalAmount'];

}