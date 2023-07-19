import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ItemDashboardComponent } from './itemDetails/item-dashboard/item-dashboard.component';
import { ItemTableContentComponent } from './itemDetails/item-table-content/item-table-content.component';
import { ItemSummaryComponent } from './itemDetails/item-summary/item-summary.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'item-dashboard', component: ItemDashboardComponent },
  { path: 'item-table', component: ItemTableContentComponent },
  { path: 'item-summary', component: ItemSummaryComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
