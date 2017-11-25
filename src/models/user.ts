import {Model} from './model';

export class User extends Model {

  Description_Tr:string;
  Description_En:string;
  GemasCode:string;
  Price:number;

  attributeNames: string[] = ['Description_Tr', 'Description_En', 'GemasCode','Price'];

}
