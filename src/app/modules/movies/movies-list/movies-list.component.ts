import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MovieData } from '../../../models/movie-data.model';
import { ActivatedRoute } from '@angular/router';
import { MovieDbService } from '../../../services/movie-db.service';
import { LocalizedString } from '@angular/compiler';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  currentId!: number
  movies: MovieData[] = []

  constructor(
    public route: ActivatedRoute,
    public movieS: MovieDbService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(JSON.stringify(params) == '{}'){
        this.getTrending()
      }else {
        this.currentId = parseInt(params['id'])
        this.getMovies()
      }
    })

  }

  getTrending(){
    this.movieS.getTrending().subscribe({
      next: (res => {
        this.movies = res
        console.log(res);
        
      })
    })
  }
  
  getMovies(){
    this.movieS.getMoviesByGenre(this.currentId).subscribe({
      next: (res => {
        this.movies = res
        console.log(res);
      })
    })
  }

  openModal(movie: MovieData){
    const modalConfig = new MatDialogConfig()
    modalConfig.width = '80vw'
    modalConfig.height = '95vh'
    modalConfig.data = movie
    modalConfig.hasBackdrop = true
    modalConfig.panelClass = 'modalBg'
    this.dialog.open(MovieDialogComponent, modalConfig)
  }

}
