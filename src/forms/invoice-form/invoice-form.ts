import {Component, Input} from 'angular2/core';
import {Http, Response,Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators, NgClass, Control} from 'angular2/common';
import {Product} from '../../models/product';
import {ProformaList} from '../../models/proformalist';
import {AppValidators} from '../../validators';
import {ControlGroupHelper} from '../ControlGroupHelper';
import {FieldErrors} from '../../pipes/FieldErrors';


@Component({
  selector: 'invoice-form',
  moduleId: module.id,
  templateUrl: './invoice-form.html',
  pipes: [FieldErrors],
  directives: [NgClass]
})
export class InvoiceFormComponent {

  productId: number=0;
  quantity: number=0;
  quantityType: string="";
  discountRate: number=0;
  totalAmount: string="";
  finalAmount: string="";
  
  proformalist: ProformaList[]=[];
  proforma: ProformaList=new ProformaList();
  

  product: Product = new Product();
  invoiceForm: ControlGroup;
  products: Product[] = [];

  constructor(protected http: Http, protected router: Router, builder:FormBuilder) {
    this.invoiceForm = builder.group({
      Quantity: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      QuantityType: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      DiscountRate: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
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
        ControlGroupHelper.setControlErrors(this.invoiceForm, field, fieldErrors);
      }
    }

    console.log(response);
  }

  @Input()
  set model (product: Product) {
    if (product) {
      this.product = product;
      ControlGroupHelper.updateControls(this.invoiceForm, this.product);
      console.log( (<Control>this.invoiceForm.controls['Description_Tr']).errors);
    }
  }

ngOnInit() {
    let headers = new Headers();
    let key = window.localStorage.getItem('auth_key');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${key}`);
    this.http.get(`http://localhost:60709/api/products`,{headers:headers}) 
      .map(res => res.json())
      .subscribe(
        (products) => {
         products.forEach( (productData: Object) => {
            var product: Product = new Product(productData);
            this.products.push(product);
          });
          console.log("invoiceeee"+ this.products);
          console.log("invoiceeee"+ this.products);
        }
      );
     
  }

 selectname='Ürünler';
 selectproductdescription_tr;
 selectproductprice;
 selectItem(id,description_tr,price) {
        console.log("iddddddçeeeek+++"+id);
        var pid=id;
        console.log("nameçeeeek+++"+description_tr);
        console.log("company_idçeeeek+++"+price);
        var pdescription_tr=description_tr;
        var pprice=price;

        this.selectname=pdescription_tr;

        this.productId=pid;
        this.selectproductprice=price;
        this.finalAmount=this.selectproductprice;
    
  }

  kaydet(){
    this.proforma.ProductId=this.productId;
    this.proforma.Quantity=this.quantity;
    this.proforma.QuantityType=this.quantityType;
    this.proforma.DiscountRate=this.discountRate;
    this.proforma.FinalAmount=this.finalAmount;
    //this.proforma.TotalAmount=((parseFloat(this.proforma.FinalAmount)-((this.discountRate)/100)*parseFloat(this.proforma.FinalAmount))    * this.proforma.Quantity).toString();

    this.proforma.TotalAmount=((parseFloat(this.proforma.FinalAmount)-(parseFloat(this.proforma.FinalAmount)*((this.discountRate)/100)))* this.proforma.Quantity).toString();
    console.log("productId",this.proforma.ProductId);
    console.log("quantity", this.proforma.Quantity);
    console.log("quantityType",  this.proforma.QuantityType);
    console.log("discountRate",this.discountRate);  

    console.log("ADDDDDDDDDDDDDDDd");
    let headers = new Headers();
    let key = window.localStorage.getItem('auth_key');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `bearer ${key}`);
    console.log("keyyyyyyyyyyyy:" + key);
    console.log("55555555555555555555555:","dddddfff");
     let body=JSON.stringify(this.proforma);
     this.http.post('http://localhost:60709/api/ProformaLists', body,{headers:headers})
       .map(res => res.json())
       .subscribe(
         (data) => {
          console.log("111111111111111111111111111111111:","dddddfff");
           this.proforma.Id = data.Id;
           this.router.navigate(['InvoiceList']);
         },
         (response: Response) => {
           this.handleError(response);
         }
       );

  }
//////////////////////////////////////////////////////////////////////////////////////////777
  onSubmit() {
    console.log(this.invoiceForm);
    if (!this.invoiceForm.valid) {
      return ;
    }

    this.product.attributes = this.invoiceForm.value;

    console.log("user bilgisi"+this.product.Description_Tr);

    if (this.product.Id) { // id varsa update
     console.log("UPDATEEEEEEEEEEEE");
     let headers = new Headers();
     let key = window.localStorage.getItem('auth_key');
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', `bearer ${key}`);
     console.log("keyyyyyyyyyyyy:" + key);
     let body=JSON.stringify(this.product);
      this.http.post('http://localhost:60709/api/Companies/Edit/' + this.product.Id,body,{headers:headers})
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.router.navigate(['InvoiceList']);
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
      let body=JSON.stringify(this.product);
      this.http.post('http://localhost:60709/api/Companies/Add', body,{headers:headers}) // id yoksa create
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.product.Id = data.Id;
            this.router.navigate(['InvoiceList']);
          },
          (response: Response) => {
            this.handleError(response);
          }
        );
    }
  }

}
