import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {AuthCheck} from './authcheck';
import {LoginComponent} from './login/login.component';


import {ProductList} from './components/products/list/product-list';
import {ProductCreate} from './components/products/create/product-create';
import {ProductUpdate} from './components/products/update/product-update';

import {CompanyList} from './components/companies/list/company-list';
import {CompanyCreate} from './components/companies/create/company-create';
import {CompanyUpdate} from './components/companies/update/company-update';

import {ProformaList} from './components/proformas/list/proforma-list';

import {InvoiceList} from './components/invoice/list/invoice-list';

import {InvoiceFormComponent} from './forms/invoice-form/invoice-form';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>',
    directives: [AuthCheck]
})

@RouteConfig([
    {path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true},
    { path: '/products/create', component: ProductCreate, name: 'ProductCreate' },
    { path: '/products/:id/update', component: ProductUpdate, name: 'ProductUpdate' },
    { path: '/products', component: ProductList, name: 'ProductList' },  
    { path: '/companies', component: CompanyList, name: 'CompanyList' },
    { path: '/companies/create', component: CompanyCreate, name: 'CompanyCreate' },
    { path: '/companies/:id/update', component: CompanyUpdate, name: 'CompanyUpdate' },
    { path: '/proformas', component: ProformaList, name: 'ProformaList' },
    { path: '/invoices', component: InvoiceList, name: 'InvoiceList' },
    { path: '/invoice-form', component: InvoiceFormComponent, name: 'InvoiceFormComponent' }
      
])
export class AppComponent { }
