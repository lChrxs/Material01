import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  private actionMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=28'
  private comedyMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=35'
  private dramaMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=18'

  private movieInfo: string = 'https://api.themoviedb.org/3/movie/{{id}}?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX'

  constructor(public http: HttpClient) { }

  getActionMovies(): Observable<any>{
    return this.http.get(this.actionMovies).pipe(
      map((res: any) => {
        let response: any[] = []
        res.results.forEach((el: any) => {
          let newRes = {
            id: el.id,
            poster: el.poster_path
          }
          response.push(newRes)
        });
        
        return response
      })
    )
  }

  getComedyMovies(): Observable<any>{
    return this.http.get(this.comedyMovies).pipe(
      map((res: any) => {
        let response: any[] = []
        res.results.forEach((el: any) => {
          let newRes = {
            id: el.id,
            poster: el.poster_path
          }
          response.push(newRes)
        });
        
        return response
      })
    )
  }

  getDramaMovies(): Observable<any>{
    return this.http.get(this.dramaMovies).pipe(
      map((res: any) => {
        let response: any[] = []
        res.results.forEach((el: any) => {
          let newRes = {
            id: el.id,
            poster: el.poster_path
          }
          response.push(newRes)
        });
        
        return response
      })
    )
  }

  getMovieInfo(id: number): Observable<any>{
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX`).pipe(
      map((res: any) => {
        let newRes = {
          poster: res.poster_path,
          genres: res.genres,
          date: res.release_date,
          title: res.title,
          overview: res.overview,
          background: res.backdrop_path
        }
        return newRes
      })
    )
  }

  getLikedMovies(): number[]{
    if(localStorage.getItem('likedMovies')){
      return JSON.parse(localStorage.getItem('likedMovies')!)
    }else return []
  }

  addLikedMovies(id: number){
    let likedMovies: any[] = this.getLikedMovies()

    if(likedMovies.indexOf(id) >= 0){
      let index = likedMovies.indexOf(id)
      likedMovies.splice(index, 1)
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
      return false

    }else {
      likedMovies.push(id)
      localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
      return true
    }
  }
}
