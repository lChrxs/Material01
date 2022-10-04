import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'category/home'},
  {path: 'category/home', component: HomeComponent},
  {path: 'category/anime', component: HomeComponent},
  {path: 'category/comedia', component: HomeComponent},
  {path: 'category/drama', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
