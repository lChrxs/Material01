import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieData } from '../../../models/movie-data.model';
import { MovieDbService } from '../../../services/movie-db.service';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss']
})
export class MovieDialogComponent implements OnInit {

  movie!: MovieData

  constructor(
    public dialogRef: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MovieData,
    public movieS: MovieDbService
  ) { }

  ngOnInit(): void {
    this.movie = this.data
  }

  toggleMyList(){
    if(this.movieS.checkMovieFromList(this.data.id)){
      this.movieS.removeMovieFromList(this.data.id)
    }else {
      this.movieS.addMovieToList(this.data.id)
    }
  }

  toggleMyFav(){
    if(this.movieS.checkMovieFromFavorites(this.data.id)){
      this.movieS.removeMovieFromFavorites(this.data.id)
    }else {
      this.movieS.addMovieToFavorites(this.data.id)
    }
  }

  close(){
    this.dialogRef.close()
  }

}
