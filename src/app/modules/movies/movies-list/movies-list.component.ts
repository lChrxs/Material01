import { Component, Input, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MovieData } from '../../../models/movie-data.model';
import { ActivatedRoute } from '@angular/router';
import { MovieDbService } from '../../../services/movie-db.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  currentId!: number
  page: number = 1;
  movies: MovieData[] = []

  constructor(
    public route: ActivatedRoute,
    public movieS: MovieDbService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.movies = []
      this.page = 1
      if(JSON.stringify(params) == '{}'){
        this.getTrending()
      }else {
        this.currentId = parseInt(params['id'])
        
        this.getMovies()
      }
    })

  }

  detectPosition(e: any){
    // console.log(e);
    if (e.target.offsetHeight + e.target.scrollTop >= (e.target.scrollHeight - 200)) {
      this.page += 1
      // console.log(this.page);

      this.route.params.subscribe(params => {
        if(JSON.stringify(params) == '{}'){
          this.getTrending()
        }else {
          this.currentId = parseInt(params['id'])
          this.getMovies()
        }
      })

    }
  }

  getTrending(){
    this.movieS.getTrending(this.page).subscribe({
      next: (res => {
        if(this.movies){
          res.forEach((element: any) => {
            this.movies.push(element)
          });

        }else {
          this.movies = res

        }
        
      })
    })
  }
  
  getMovies(){
    this.movieS.getMoviesByGenre(this.currentId, this.page).subscribe({
      next: (res => {
        if(this.movies){
          res.forEach((element: any) => {
            this.movies.push(element)
          });

        }else {
          this.movies = res
        }
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
