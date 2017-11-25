import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES,Router} from 'angular2/router';
import {Http,Headers,RequestOptions} from 'angular2/http';
import {Product} from '../../../models/product';


@Component({
  selector: 'product-list',
  templateUrl: './product-list.html',
  moduleId: module.id,

  directives: [ROUTER_DIRECTIVES]
})
export class ProductList implements OnInit{

   products: Product[] = [];
   filteredItems : Product[];
   items : Product[];
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
    this.http.get(`http://localhost:60709/api/products`,{headers:headers})  //ürünleri sunucudan alıyoruz
      .map(res => res.json())
      .subscribe(
        (products) => {
          products.forEach( (productData: Object) => {
            var product: Product = new Product(productData);
            this.products.push(product);
          });
          this.filteredItems = this.products;
          this.items=this.products;
          this.paging();
          this.bb(this.items);
          console.log("invoiceeeee ile aynı mııııııııııı : "+this.products);
          console.log("filterItem: "+this.filteredItems);
        }
      );
  }
  bb(items):any{
      this.alldata=items;
  }
  FilterByName(){
      this.filteredItems = [];
      if(this.inputName != ""){
            this.alldata.forEach(element => {
                if(element.Description_Tr.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                  this.filteredItems.push(element);
               }
            });
      }else{
         this.filteredItems = this.products;
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
               this.products = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
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
      this._router.navigate(['ProductList']);  
     }  
  deleteModel(product: Product) {
    if (confirm( product.Id + " nolu ürünü silmek istediğinden emin misin?")) {
    let headers = new Headers();
    let key = window.localStorage.getItem('auth_key');
    headers.append('Content-Type', 'application/json');
     headers.append('Authorization', `bearer ${key}`);
     let body=JSON.stringify({});
     console.log(key);
      this.http.post(`http://localhost:60709/api/Products/Delete/`+product.Id,body,{headers:headers})
        .subscribe(
          (response) => {
            console.log("response.status:"+response.status);
            this.refresh();
            if (response.status === 204) {
              this.products.forEach((u: Product, i: number) => {
                if (u.Id === product.Id) {
                  this.products.splice(i, 1)

                }
              });
              console.log(this.products);
        
            }
          }
        );
      
    }
    this.refresh();
  }
      
}
