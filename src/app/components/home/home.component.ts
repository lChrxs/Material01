import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieDbService } from '../../services/movie-db.service';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  actionMovies: any[] = []
  comedyMovies: any[] = []
  dramaMovies: any[] = []

  constructor(
    public movieS: MovieDbService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // this.movieS.getActionMovies().subscribe({
    //   next: (res => {
    //     // console.log(res);
    //     this.actionMovies = res
    //   })
    // })
    
    // this.movieS.getComedyMovies().subscribe({
    //   next: (res => {
    //     // console.log(res);
    //     this.comedyMovies = res
    //   })
    // })
    
    // this.movieS.getDramaMovies().subscribe({
    //   next: (res => {
    //     // console.log(res);
    //     this.dramaMovies = res
    //   })
    // })
  }

  openModal(id: number){
    const modalConfig = new MatDialogConfig()
    modalConfig.width = '80vw'
    modalConfig.height = '95vh'
    modalConfig.data = id
    modalConfig.hasBackdrop = true
    modalConfig.panelClass = 'modalBg'
    this.dialog.open(MovieComponent, modalConfig)
  }

}
