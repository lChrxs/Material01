export class ApiEndPoints {
  static GENRE_LIST: string = '/genre/movie/list?language=es-MX'

  static getMoviesByGenre(id: number){
    return `/discover/movie/?with_genres=${id}&language=es-MX`
  }
  
  static TRENDING: string = '/trending/all/day?language=es-MX'
  
  static getImage(path: string){
    return `https://image.tmdb.org/t/p/original${path}`
  }
}