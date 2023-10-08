import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ItemDashboardComponent } from './itemDetails/item-dashboard/item-dashboard.component';
import { ItemTableContentComponent } from './itemDetails/item-table-content/item-table-content.component';
import { ItemSummaryComponent } from './itemDetails/item-summary/item-summary.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './homepage/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'item-dashboard', component: ItemDashboardComponent, canActivate: [AuthGuard] },
  { path: 'comments', component: ItemTableContentComponent, canActivate: [AuthGuard] },
  { path: 'summary', component: ItemSummaryComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
