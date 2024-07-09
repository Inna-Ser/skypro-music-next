"use client";
import { Centerblock } from "@/components/centerblock/Centerblock";
import { useAppSelector } from "@/hooks/store";

const Favorite = () => {
  const likeedTracks = useAppSelector((state) => state.tracks.likedTracks);

  return (
    <div>
      <h2 className="centerblockH2">Мои треки</h2>
      <Centerblock filterPlaylist={likeedTracks} />
    </div>
  );
};

export default Favorite;
