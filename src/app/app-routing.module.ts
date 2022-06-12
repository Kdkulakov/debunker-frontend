import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./shared/utils/auth.guard";
import {AnalysisPageComponent} from "./analysis-page/analysis-page.component";
import {SourcePageComponent} from "./source-page/source-page.component";
import {ArticleDashboardComponent} from "./article-dashboard/article-dashboard.component";
import {FactPageComponent} from "./article-dashboard/fact-page/fact-page.component";


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent}
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'newsanalysis', component: ArticleDashboardComponent},
      {path: 'newsanalysis/:id', component: ArticleDashboardComponent, children: [
          {path: ':id', component: FactPageComponent}]
      },
      {path: 'news', component: AnalysisPageComponent},
      {path: 'sources', component: SourcePageComponent,},
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
