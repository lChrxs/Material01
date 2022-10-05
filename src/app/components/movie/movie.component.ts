import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieDbService } from '../../services/movie-db.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @ViewChild('imagen') imagen!: ElementRef
  @ViewChild('add') add!: ElementRef
  @ViewChild('like') like!: ElementRef

  movie: any
  liked: boolean = false

  constructor(
    public dialogRef: MatDialogRef<MovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public movieS: MovieDbService
  ) { }

  ngOnInit(): void {
    this.movieS.getMovieInfo(this.data).subscribe({
      next: (res => {
        // console.log(res);
        this.movie = res
      }),
      error: (err => {
        console.error(err);
      }),
      complete: () => {
        // console.info('Peticion completa')

        if(this.movieS.getLikedMovies().indexOf(this.data) >= 0){
          this.liked = true
        }

      }
    })
    
  }

  likeMovie(id: number){
    if(this.movieS.addLikedMovies(id)){
      this.liked = true
      return true

    }else {
      this.liked = false
      return false
    }
  }

  close(){
    this.dialogRef.close()
  }

}
