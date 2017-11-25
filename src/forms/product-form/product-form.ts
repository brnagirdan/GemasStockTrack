import {Component, Input} from 'angular2/core';
import {Http, Response,Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators, NgClass, Control} from 'angular2/common';
import {Product} from '../../models/product';
import {AppValidators} from '../../validators';
import {ControlGroupHelper} from '../ControlGroupHelper';
import {FieldErrors} from '../../pipes/FieldErrors';


@Component({
  selector: 'product-form',
  moduleId: module.id,
  styleUrls: ['./product-form.css'],
  templateUrl: './product-form.html',
  pipes: [FieldErrors],
  directives: [NgClass]
})
export class ProductFormComponent {

  product: Product = new Product();
  productForm: ControlGroup;

  constructor(protected http: Http, protected router: Router, builder:FormBuilder) {
    this.productForm = builder.group({
      Description_Tr: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      Description_En: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      GemasCode: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      Price: ['', Validators.compose([Validators.minLength(2)])]
    });
  }


  /**
   * Handle errors
   * @param response
   */
  handleError(response: Response) {
    if (response.status === 422) {
      let errors : Object = response.json();
      console.log(errors);
      for (var field in errors) {
        var fieldErrors: string[] = (<any>errors)[field];
        ControlGroupHelper.setControlErrors(this.productForm, field, fieldErrors);
      }
    }

    console.log(response);
  }

  @Input()
  set model (product: Product) {
    if (product) {
      this.product = product;
      ControlGroupHelper.updateControls(this.productForm, this.product);
      console.log( (<Control>this.productForm.controls['Description_Tr']).errors);
    }
  }

  onSubmit() {
    console.log(this.productForm);
    if (!this.productForm.valid) {
      return ;
    }

    this.product.attributes = this.productForm.value;

    if (this.product.Id) { // id varsa update
     let headers = new Headers();
     let key = window.localStorage.getItem('auth_key');
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', `bearer ${key}`);
     console.log("keyyyyyyyyyyyy:" + key);
     let body=JSON.stringify(this.product);
      this.http.post('http://localhost:60709/api/Products/Edit/' + this.product.Id,body,{headers:headers})
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.router.navigate(['ProductList']);
          },
          (response: Response) => {
            this.handleError(response);
          }
        );
    } else {
      console.log("ADDDDDDDDDDDDDDDd");
     let headers = new Headers();
     let key = window.localStorage.getItem('auth_key');
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', `bearer ${key}`);
     console.log("keyyyyyyyyyyyy:" + key);
      console.log("Description_Trnnnnnnnn:" + this.product.Description_Tr);
     console.log("Description_Ennnnnnnn:" + this.product.Description_En);
      console.log("GemasCode:" + this.product.GemasCode);
       console.log("Price:nnnnnnnn:" + this.product.Price);
      let body=JSON.stringify(this.product);
      this.http.post('http://localhost:60709/api/Products/Add', body,{headers:headers}) // id yoksa create
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.product.Id = data.Id;
            this.router.navigate(['ProductList']);
          },
          (response: Response) => {
            this.handleError(response);
          }
        );
        
    }
  }

}
