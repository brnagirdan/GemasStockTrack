import {Component, Input} from 'angular2/core';
import {Http, Response,Headers} from 'angular2/http';
import {Router} from 'angular2/router';
import {ControlGroup, FormBuilder, Validators, NgClass, Control} from 'angular2/common';
import {Company} from '../../models/company';
import {AppValidators} from '../../validators';
import {ControlGroupHelper} from '../ControlGroupHelper';
import {FieldErrors} from '../../pipes/FieldErrors';


@Component({
  selector: 'company-form',
  moduleId: module.id,
  styleUrls: ['./company-form.css'],
  templateUrl: './company-form.html',
  pipes: [FieldErrors],
  directives: [NgClass]
})
export class CompanyFormComponent {

  company: Company = new Company();
  companyForm: ControlGroup;

  constructor(protected http: Http, protected router: Router, builder:FormBuilder) {
    this.companyForm = builder.group({
      Name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      Email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      Address: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      Phone: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
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
        ControlGroupHelper.setControlErrors(this.companyForm, field, fieldErrors);
      }
    }

    console.log(response);
  }

  @Input()
  set model (company: Company) {
    if (company) {
      this.company = company;
      ControlGroupHelper.updateControls(this.companyForm, this.company);
      console.log( (<Control>this.companyForm.controls['Name']).errors);
    }
  }

  onSubmit() {
    console.log(this.companyForm);
    if (!this.companyForm.valid) {
      return ;
    }

    this.company.attributes = this.companyForm.value;

    console.log("user bilgisi"+this.company.Name);

    if (this.company.Id) { // id varsa update
     console.log("UPDATEEEEEEEEEEEE");
     let headers = new Headers();
     let key = window.localStorage.getItem('auth_key');
     headers.append('Content-Type', 'application/json');
     headers.append('Authorization', `bearer ${key}`);
     console.log("keyyyyyyyyyyyy:" + key);
     let body=JSON.stringify(this.company);
      this.http.post('http://localhost:60709/api/Companies/Edit/' + this.company.Id,body,{headers:headers})
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.router.navigate(['CompanyList']);
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
         let body=JSON.stringify(this.company);
         this.http.post('http://localhost:60709/api/Companies/Add', body,{headers:headers}) // id yoksa create
           .map(res => res.json())
           .subscribe(
             (data) => {
               this.company.Id = data.Id;
               this.router.navigate(['CompanyList']);
             },
             (response: Response) => {
               this.handleError(response);
             }
           );
           


    }
  }

}
