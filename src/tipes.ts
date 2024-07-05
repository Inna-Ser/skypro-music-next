export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type TrackItem = {
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
  setIsPlaying: (isPlaying: boolean) => void;
  currentTrack: TrackItem;
  setCurrentTrack: () => void;
  isLiked: boolean;
};

export type SigninFormType = {
  email: string;
  password: string;
};
