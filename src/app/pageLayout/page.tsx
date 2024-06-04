import { CategoryComponent } from "@/components/category/CategoryComponent";
import { MainComponent } from "@/components/mainComponent/MainComponent";
import { MyPlayListComponent } from "@/components/myPlayListComponent/MyPlayListComponent";
import { PageLayout } from "@/components/pageLayout/PageLayout";

export default function HomePage() {
    const currentPath = window.location.pathname;

  return (
    <PageLayout>
      {currentPath === "/" && <MainComponent />}
      {currentPath === "/playList" && <MyPlayListComponent />}
      {currentPath.startsWith("/category/") && <CategoryComponent />}
    </PageLayout>
  );
}
