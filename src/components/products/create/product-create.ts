import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {Http,Headers,RequestOptions} from 'angular2/http';
import {Product} from '../../../models/product';
import {ProductFormComponent} from '../../../forms/product-form/product-form';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.html',
  //styleUrls: ['./app.css'],
  moduleId: module.id,
  directives: [ProductFormComponent]
})
export class ProductCreate {
  product: Product;

   constructor(private http: Http, private _router:Router) {}
 
  // yönlendirme fonksiyonları
  logout() {
    window.localStorage.removeItem('auth_key');
    this._router.navigate(['Login']);
}

goProducts() {
    
        this._router.navigate(['ProductList']);    
    }
goCompanies() {
    
        this._router.navigate(['CompanyList']);    
    }
goProformas() {
    
        this._router.navigate(['ProformaList']);    
    }
goInvoice() {
    
        this._router.navigate(['InvoiceList']);    
    }

}
