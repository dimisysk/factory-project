import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { customerOrAdminGuard } from './shared/guards/customer-or-admin.guard';
import { ProductCreateComponent } from './components/crud/product-create/product-create.component';
import { adminGuard } from './shared/guards/admin.guard';
import { ProductReadComponent } from './components/crud/product-read/product-read.component';
import { CustomerUpdateComponent } from './components/crud/customer-update/customer-update.component';
import { CustomerReadComponent } from './components/crud/customer-read/customer-read.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'customer/dashboard',
    component: CustomerDashboardComponent,
    canActivate: [customerOrAdminGuard],
  },
  {
    path: 'product/create',
    component: ProductCreateComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'product/all',
    component: ProductReadComponent,
    canActivate: [customerOrAdminGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [customerOrAdminGuard] },
  {
    path: 'customers/update/:id',
    component: CustomerUpdateComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'customer/get-all',
    component: CustomerReadComponent,
    canActivate: [adminGuard],
  },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: 'learn-more', component: LearnMoreComponent },
  { path: '**', redirectTo: 'not-authorized' },
];
