

export interface MovieType{
    id: number,
   tagline?: string,
    runtime?: string,
    overview?: string,
    genres?: Genre[] ,
    release_date?: Date ,
    poster_path?: string,
  vote_average?: string,
  original_title?: string,
  userId: string | null
    budget?: number 
  movie: string[]
  
  }


  

  export interface MovieCardProps {
    movie: MovieType 
    showBtn?: boolean,
          updateFavorites?: (updatedFavorites: MovieType[]) => void;   
          updateWatchList?: (updatedWatchList: MovieType[]) => void;   
          userId: string
       
  }


export type Movie = {
    id: number,
    favorite?: boolean,
userId?: string | null,

  }

  export type Genre = {
    id: number,
    name: string
    
  }

  export type CarouselProps = {
movies?: Movie[],
userId: string
  }

  export type FavoriteProps = {
   
    userId?: string
  }


  export type WatchListProps = {
   
    userId?: string
  }