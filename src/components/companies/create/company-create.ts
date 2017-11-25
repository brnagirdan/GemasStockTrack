import {Component} from 'angular2/core';
import {Company} from '../../../models/company';
import {ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {Http,Headers,RequestOptions} from 'angular2/http';
import {CompanyFormComponent} from '../../../forms/company-form/company-form';

@Component({
  selector: 'company-create',
  templateUrl: './company-create.html',
  //styleUrls: ['./app.css'],
  moduleId: module.id,
  directives: [CompanyFormComponent]
})
export class CompanyCreate {
  company:Company;

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
