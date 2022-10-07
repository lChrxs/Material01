import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../../../services/movie-db.service';
import { MovieCategory } from '../../../models/movie-category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  genres: MovieCategory[] = []
  scrollBottom: number = 1

  constructor(public movieS: MovieDbService) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(){
    this.movieS.getGenres().subscribe({
      next: (res => {
        this.genres = res
      }),
      error: (err => {
        console.error(err);
      })
    })
  }

}
