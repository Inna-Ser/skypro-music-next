import { getCategoryTracks } from "@/api/Api";
import { Centerblock } from "../centerblock/Centerblock";
import { Filter } from "../filterItem/Filter";

export const CategoryComponent = async ({ id }: { id: string }) => {
  // здесь прокидывать пропс или создавать в редуксе новое состояние?
  const categoryTracks = await getCategoryTracks(id);

  return (
    <div>
      <Centerblock allTracks={categoryTracks} />
    </div>
  );
};
