export interface Review {
  trackId: string;
  trackName: string;
  albumName: string | null;
  artistName: string; 
  albumImageUrl: string | null;
  playerUri: string | null;
  rating: number;
  comment: string | null;
  }