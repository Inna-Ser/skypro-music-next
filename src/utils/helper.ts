import { TrackItem } from "@/tipes";

export function playShuffleTrack(tracks: TrackItem[]): TrackItem[] {
  // Перемешиваем массив треков
  for (let i = tracks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
  }
  return tracks;
}