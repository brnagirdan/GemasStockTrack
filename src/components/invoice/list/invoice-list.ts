import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {Http,Headers,RequestOptions} from 'angular2/http';
import {Proforma} from '../../../models/proforma';
import {ProformaList} from '../../../models/proformalist';
import {Company} from '../../../models/company';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.html',
  moduleId: module.id,

  directives: [ROUTER_DIRECTIVES]
})

export class InvoiceList implements OnInit {

proformas: Proforma[] = [];
proformalists: ProformaList[] = [];

company: Company;

filteredItems : ProformaList[];
items :ProformaList[];
pages : number = 4;
pageSize : number = 8;
pageNumber : number = 0;
currentIndex : number = 1;
pagesIndex : Array<number>;
pageStart : number = 1;
inputName : string = '';
alldata;  



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
   
 ngOnInit() { 

      let headers = new Headers();
      let key = window.localStorage.getItem('auth_key');
      headers.append('Content-Type', 'application/json');
       headers.append('Authorization', `bearer ${key}`);
      this.http.get(`http://localhost:60709/api/Proformas`,{headers:headers})  
        .map(res => res.json())
        .subscribe(
          (proformas) => {
            proformas.forEach( (proformaData: Object) => {
              var proforma: Proforma = new Proforma(proformaData);
              this.proformas.push(proforma);
            });
            console.log("hdbthgthyju",proformas)
          }
        
        ); 

       // proformalist get
       this.http.get(`http://localhost:60709/api/ProformaLists`,{headers:headers})  
       .map(res => res.json())
       .subscribe(
         (proformalists) => {
           proformalists.forEach( (proformaData: Object) => {
             var proformalist: ProformaList = new ProformaList(proformaData);
             this.proformalists.push(proformalist);
           });
           this.filteredItems = this.proformalists;
           this.items=this.proformalists;
           this.paging();
           this.bb(this.items);
           console.log("invoiceeeee ile aynı mııııııııııı : "+this.proformalists);
           console.log("filterItem: "+this.filteredItems);
           console.log("hdbthgthyju",proformalists)
         }
       
       ); 

  }
  
  //paging

  bb(items):any{
    this.alldata=items;
}
FilterByName(){
    this.filteredItems = [];
    if(this.inputName != ""){
          this.alldata.forEach(element => {
              if(element.QuantityType.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                this.filteredItems.push(element);
             }
          });
    }else{
       this.filteredItems = this.proformalists;
    }
    console.log("item :" + this.filteredItems);
    this.paging();
 }

paging(){
  this.currentIndex = 1;
     this.pageStart = 1;
     this.pages = 4;

     this.pageNumber = parseInt(""+ (this.filteredItems.length / this.pageSize));
     if(this.filteredItems.length % this.pageSize != 0){
       this.pageNumber ++;
     }
  
     if(this.pageNumber  < this.pages){
       this.pages =  this.pageNumber;
      }
     
     this.refreshItems();
     console.log("this.pageNumber :  "+this.pageNumber);
     console.log("this.currentIndex :  "+this.currentIndex);
}

 fillArray(): any{
    var obj = new Array();
    for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
                obj.push(index);
    }
    return obj;
 }
 refreshItems(){
             this.proformalists = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
             this.pagesIndex =  this.fillArray();
 }
 prevPage(){
    if(this.currentIndex>1){
       this.currentIndex --;
    } 
    if(this.currentIndex < this.pageStart){
       this.pageStart = this.currentIndex;
    }
    this.refreshItems();
 }
 nextPage(){
    if(this.currentIndex < this.pageNumber){
          this.currentIndex ++;
    }
    if(this.currentIndex >= (this.pageStart + this.pages)){
       this.pageStart = this.currentIndex - this.pages + 1;
    }

    this.refreshItems();
 }
  setPage(index : number){
       this.currentIndex = index;
       this.refreshItems();
  }

  refresh(): void {
    this._router.navigate(['CompanyList']);
    this._router.navigate(['InvoiceList']);  
   }  
  // proformalist delete

  deleteModel(proformalist: ProformaList) {
    if (confirm( proformalist.Id + " nolu ürünü silmek istediğinden emin misin?")) {
    let headers = new Headers();
    let key = window.localStorage.getItem('auth_key');
    headers.append('Content-Type', 'application/json');
     headers.append('Authorization', `bearer ${key}`);
     let body=JSON.stringify({});
     console.log(key);
      this.http.post(`http://localhost:60709/api/ProformaLists/`+proformalist.Id,body,{headers:headers})
        .subscribe(
          (response) => {
            console.log("response.status:"+response.status);
            this.refresh();
            if (response.status === 204) {
              this.proformalists.forEach((u: ProformaList, i: number) => {
                if (u.Id === proformalist.Id) {
                  this.proformalists.splice(i, 1);
                }
              });
              console.log(this.proformalists); 
            }
          }       
        );
        this._router.navigate(['InvoiceList']);
    }
    this.refresh();
  }
  
 selectname='proformas';
 selectcompanyname;
 selectcompanyemail;
 selectcompanyaddress;
 selectcompanyphone;
 selectItem(id,name,company_id) {
        console.log("iddddddçeeeek+++"+id);
        var pid=id;
        console.log("nameçeeeek+++"+name);
        console.log("company_idçeeeek+++"+company_id);

        var pname=name;
        var pcompany_id=company_id;

        this.selectname=pname;

        let headers = new Headers();
        let key = window.localStorage.getItem('auth_key');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `bearer ${key}`);
        this.http.get(`http://localhost:60709/api/Companies/`+ pcompany_id,{headers:headers}) 
        .map(res => res.json())
      .subscribe(
        (companyData) => {
          this.company = new Company(companyData);
          console.log(this.company);
          this.selectcompanyname=this.company.Name;
          this.selectcompanyemail=this.company.Email;
          this.selectcompanyaddress=this.company.Address;
          this.selectcompanyphone=this.company.Phone;
        }
      );    
  }

  

}