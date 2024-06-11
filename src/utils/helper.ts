export const playShuffleTrack = (tracks) => {
  for (let i = tracks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
  }
  return tracks;
};

// export const setPrev=() => {
//   const currentTrackIndex = tracks.findIndex((track) => track.id === state.currentTrack.id);
//   if (currentTrackIndex === 0) {
//       return;
//   } else {
//       const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length
//       currentTrack = tracks[newIndex];
//   }
// },