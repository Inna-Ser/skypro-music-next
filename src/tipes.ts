export type Tracks = {
    isLoading?: boolean;
    setCurrentTrack: (track: any) => void;
    tracks: Array<{
      id: number;
      name: string;
      author: string;
      album: string;
      genre: string
      duration_in_seconds: number;
      isLiked: boolean;
    }>;
  };

export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}  

export  type TrackItem ={
  id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string;
  duration_in_seconds: number;
  album: string;
  logo: string | null;
  track_file: string;
  stared_user: User[];
  isPlaying: boolean;
  setCurrentTrack: (track: any) => void;
  }