import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TokenInterceptor} from "./shared/utils/token.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { SwiperModule } from 'swiper/angular';
//Модули из библиотеки Material
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
// Кастомные компоненты
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import { LoginPageComponent } from './login-page/login-page.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {SourcePageComponent} from './source-page/source-page.component';
import {ArticleDashboardComponent} from "./article-dashboard/article-dashboard.component";
import {FactPageComponent} from './article-dashboard/fact-page/fact-page.component';
import {ModalComponent} from "./shared/layouts/site-layout/modal-component";
// Кастомные шаблоны, которые используются в кастомных компонентах
import { GradeComponent } from './components/grade/grade.component';
import { CommentComponent } from './components/comment/comment.component';
import { CardComponent } from './components/card/card.component';
import { SliderComponent } from './components/slider/slider.component';
import {DecisionComponent} from "./components/grade/decision-component";
import {LoaderComponent} from "./components/loader/loader.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SiteLayoutComponent,
    ArticleDashboardComponent,

    AnalysisPageComponent,
    SourcePageComponent,
    ModalComponent,
    LoaderComponent,
    FactPageComponent,
    GradeComponent,
    CommentComponent,
    CardComponent,
    SliderComponent,
    DecisionComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatDividerModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatTooltipModule,
        SwiperModule,
        MatOptionModule,
        MatSelectModule,
        MatRadioModule,
        MatSnackBarModule,
        MatAutocompleteModule,
    ],
  providers: [
    {
      // Этим interceptor`ом  добавляется auth header
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
