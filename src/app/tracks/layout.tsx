import { Navigator } from "@/components/navigator/Navigator";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { ClientComponent } from "@/components/clientComponentAudioplayer/ClientComponentAudioplayer";
import { Search } from "@/components/centerblock/Centerblock";
import { Filter } from "@/components/filterItem/Filter";

export default function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="main">
      <Navigator />
      <div>
        <Search />
        {children}
      </div>
      <Sidebar />
      <div>
        <ClientComponent />
      </div>
    </div>
  );
}
