import {Model} from './model';

export class Company extends Model {

  Id:number;
  Name:string;
  Email:string;
  Address:string;
  Phone:string;

  attributeNames: string[] = ['Name', 'Email', 'Address','Phone'];

}
