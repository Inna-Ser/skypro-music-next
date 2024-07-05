import { CategoryComponent } from "@/components/category/CategoryComponents";
import { categories } from "@/utils/categories";

type Props = {
  params: {
    id: string;
  };
};
const Category = ({ params }: Props) => {
  const category = categories.find((cat) => cat.id === Number(params.id));

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <h2 className="centerblockH2">{category.title}</h2>
      <CategoryComponent id={params.id} />
    </div>
  );
};

export default Category;
