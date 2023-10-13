import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { ItemDashboardComponent } from './itemDetails/item-dashboard/item-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ItemTableComponent } from './itemDetails/item-table/item-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table'
import { MultiSelectModule } from 'primeng/multiselect'
import { SliderModule } from 'primeng/slider'
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar'
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ItemSummaryComponent } from './itemDetails/item-summary/item-summary.component';
import { CookieService } from 'ngx-cookie-service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HomeComponent } from './homepage/home/home.component';
import { NotifierModule } from 'angular-notifier';
import { notifierDefaultOptions } from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ItemDashboardComponent,
    NavigationComponent,
    ItemTableComponent,
    PieChartComponent,
    DoughnutChartComponent,
    BarChartComponent,
    ItemSummaryComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgChartsModule,
    FontAwesomeModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    SliderModule,
    DropdownModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    NotifierModule.withConfig(notifierDefaultOptions)
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '841355690055-kbh38gpf8c04bk8v6dd6amh50cpsqqpf.apps.googleusercontent.com', {oneTapEnabled: false}
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
