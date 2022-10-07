import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './components/shared/material.module';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from './services/interceptors/api-key.interceptor';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    HttpClientModule,
    CdkScrollableModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
