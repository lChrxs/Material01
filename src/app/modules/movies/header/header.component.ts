import { Component, Input, OnInit } from '@angular/core';
import { MovieCategory } from '../../../models/movie-category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  menu: MovieCategory[] = []

  @Input() set data(param: MovieCategory[]){
    this.menu = param
  }


  constructor() { }

  ngOnInit(): void { }

}
