export class MovieData {
  constructor(
    public background: string,
    public id: number,
    public overview: string,
    public release_date: string,
    public popularity: number,
    public poster: string,
    public name?: string,
    public title?: string,
    public first_air_date?: string
  ){}
}