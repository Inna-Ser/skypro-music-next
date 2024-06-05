import { Audioplayer } from "@/components/audioplayer/Audioplayer";
import { CategoryComponent } from "@/components/category/CategoryComponent";
import { MainComponent } from "@/components/mainComponent/MainComponent";
import { MyPlayListComponent } from "@/components/myPlayListComponent/MyPlayListComponent";
import { Navigator } from "@/components/navigator/Navigator";
import { PageLayout } from "@/components/pageLayout/PageLayout";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useRouter } from "next/router";

export default function HomePage() {
    const router = useRouter();
  const currentPath = router.pathname;


  return (
    <PageLayout>
        
      {currentPath === "/" && <MainComponent />}
      {currentPath === "/playList" && <MyPlayListComponent />}
      {currentPath.startsWith("/category/") && <CategoryComponent />}
    </PageLayout>
  );
}
