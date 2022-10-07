import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';
import { MaterialModule } from '../../components/shared/material.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    MoviesListComponent,
    MovieDialogComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule
  ]
})
export class MoviesModule { }
