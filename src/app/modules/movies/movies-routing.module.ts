import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

const routes: Routes = [
  {path: '', component: HomeComponent, 
    children: [
      {path: ':id', component: MoviesListComponent},
      {path: '', pathMatch: 'full', component: MoviesListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
