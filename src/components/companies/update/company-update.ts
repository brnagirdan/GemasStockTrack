import {Component, OnInit} from 'angular2/core';
import {Company} from '../../../models/company';
import {CompanyFormComponent} from '../../../forms/company-form/company-form';
import {RouteParams,Router} from 'angular2/router';
import {Http,Headers} from 'angular2/http';


@Component({
  selector: 'company-create',
  templateUrl: './company-update.html',
  //styleUrls: ['./app.css'],
  moduleId: module.id,
  directives: [CompanyFormComponent]
})
export class CompanyUpdate implements OnInit {

  company: Company;
  Id: Number;

  constructor(private params: RouteParams, private http: Http,private _router:Router) {
    this.Id = parseInt(params.get('id'));
  }

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

  ngOnInit() {
     let headers = new Headers();
     let key = window.localStorage.getItem('auth_key');
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', `bearer ${key}`);
    this.http.get('http://localhost:60709/api/Companies/' + this.Id,{headers:headers})
      .map(res => res.json())
      .subscribe(
        (companyData) => {
          this.company = new Company(companyData);
          console.log(this.company);
        }
      );
  }

}