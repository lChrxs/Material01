export class ApiEndPoints {
  static GENRE_LIST: string = '/genre/movie/list?language=es-MX'

  static getMoviesByGenre(id: number, page: number){
    return `/discover/movie/?with_genres=${id}&language=es-MX&page=${page}`
  }
  
  static TRENDING: string = '/trending/all/day?language=es-MX'

  static getTrendingMovies(page: number){
    return `/trending/all/day?language=es-MX&page=${page}`
  }
  
  static getImage(path: string){
    return `https://image.tmdb.org/t/p/original${path}`
  }
}