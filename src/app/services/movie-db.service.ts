import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieData } from '../models/movie-data.model';
import { ApiEndPoints } from '../utils/apiendpoints.class';
import { Constants } from '../utils/constants.class';
import { MovieCategory } from '../models/movie-category.model';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  // private actionMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=28'
  // private comedyMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=35'
  // private dramaMovies: string = 'https://api.themoviedb.org/3/discover/movie?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX&region=MX&sort_by=primary_release_date.desc&page=1&with_genres=18'

  // private movieInfo: string = 'https://api.themoviedb.org/3/movie/{{id}}?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX'

  constructor(public http: HttpClient) { }

  getGenres(): Observable<any>{
    return this.http.get(environment.MOVIES_URL + ApiEndPoints.GENRE_LIST).pipe(
      map((res: any) => {
        let response: MovieCategory[] = res.genres
        return response
      })
    );
  }

  getTrending(page: number): Observable<any>{
    return this.http.get(environment.MOVIES_URL + ApiEndPoints.getTrendingMovies(page)).pipe(
      map((res: any) => {
        
        let response: MovieData[] = []
        res.results.forEach((el: any) => {
          let newRes: MovieData = {
            id: el.id,
            title: el.title,
            name: el.name,
            first_air_date: el.first_air_date,
            background: el.backdrop_path,
            overview: el.overview,
            release_date: el.release_date,
            popularity: el.vote_average,
            poster: el.poster_path
          }
          response.push(newRes)
        });
        return response
      })
    );
  }

  getMoviesByGenre(id: number, page: number): Observable<any>{
    return this.http.get(environment.MOVIES_URL + ApiEndPoints.getMoviesByGenre(id, page)).pipe(
      map((res: any) => {
        let response: MovieData[] = []
        res.results.forEach((el: any) => {
          let newRes: MovieData = {
            id: el.id,
            title: el.title,
            name: el.name,
            first_air_date: el.first_air_date,
            background: el.backdrop_path,
            overview: el.overview,
            release_date: el.release_date,
            popularity: el.vote_average,
            poster: el.poster_path
          }
          response.push(newRes)
        });
        return response
      })
    );
  }

  getMovieImage(path: string): string{
    return ApiEndPoints.getImage(path)
  }

  addMovie(id: number, key: string){
    let list = JSON.parse(localStorage.getItem(key) ?? '[]')
    if(list.indexOf(id) == -1){
      list.push(id)
      localStorage.setItem(key, JSON.stringify(list))
    }
  }

  addMovieToList(id: number){
    this.addMovie(id, Constants.MY_LIST)
  }
  
  addMovieToFavorites(id: number){
    this.addMovie(id, Constants.MY_FAVS)
  }

  removeMovie(id: number, key: string){
    let list = JSON.parse(localStorage.getItem(key) ?? '[]')
    let index = list.indexOf(id)
    if(index > -1){
      list.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(list))
    }
  }

  removeMovieFromList(id: number){
    this.removeMovie(id, Constants.MY_LIST)
  }
  
  removeMovieFromFavorites(id: number){
    this.removeMovie(id, Constants.MY_FAVS)
  }

  checkMovie(id: number, key: string): boolean {
    let list = JSON.parse(localStorage.getItem(key) ?? '[]')
    return (list.indexOf(id) > -1)
  }

  checkMovieFromList(id: number): boolean{
    return this.checkMovie(id, Constants.MY_LIST)
  }

  checkMovieFromFavorites(id: number): boolean{
    return this.checkMovie(id, Constants.MY_FAVS)
  }
  



  // getActionMovies(): Observable<any>{
  //   return this.http.get(this.actionMovies).pipe(
  //     map((res: any) => {
  //       let response: any[] = []
  //       res.results.forEach((el: any) => {
  //         let newRes = {
  //           id: el.id,
  //           poster: el.poster_path
  //         }
  //         response.push(newRes)
  //       });
        
  //       return response
  //     })
  //   )
  // }

  // getComedyMovies(): Observable<any>{
  //   return this.http.get(this.comedyMovies).pipe(
  //     map((res: any) => {
  //       let response: any[] = []
  //       res.results.forEach((el: any) => {
  //         let newRes = {
  //           id: el.id,
  //           poster: el.poster_path
  //         }
  //         response.push(newRes)
  //       });
        
  //       return response
  //     })
  //   )
  // }

  // getDramaMovies(): Observable<any>{
  //   return this.http.get(this.dramaMovies).pipe(
  //     map((res: any) => {
  //       let response: any[] = []
  //       res.results.forEach((el: any) => {
  //         let newRes = {
  //           id: el.id,
  //           poster: el.poster_path
  //         }
  //         response.push(newRes)
  //       });
        
  //       return response
  //     })
  //   )
  // }

  // getMovieInfo(id: number): Observable<any>{
  //   return this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d9fcc7f29e753b9cb143cab8e654a131&language=es-MX`).pipe(
  //     map((res: any) => {
  //       let newRes = {
  //         poster: res.poster_path,
  //         genres: res.genres,
  //         date: res.release_date,
  //         title: res.title,
  //         overview: res.overview,
  //         background: res.backdrop_path
  //       }
  //       return newRes
  //     })
  //   )
  // }

  // getLikedMovies(): number[]{
  //   if(localStorage.getItem('likedMovies')){
  //     return JSON.parse(localStorage.getItem('likedMovies')!)
  //   }else return []
  // }

  // addLikedMovies(id: number){
  //   let likedMovies: any[] = this.getLikedMovies()

  //   if(likedMovies.indexOf(id) >= 0){
  //     let index = likedMovies.indexOf(id)
  //     likedMovies.splice(index, 1)
  //     localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
  //     return false

  //   }else {
  //     likedMovies.push(id)
  //     localStorage.setItem('likedMovies', JSON.stringify(likedMovies))
  //     return true
  //   }
  // }
}
