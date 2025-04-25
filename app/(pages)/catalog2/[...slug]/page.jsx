import ContentPage from '../ContentPage';

async function getCategoryProducts(slug) {
    const res = await fetch(`http://90.156.134.142:1337/api/categories?filters[slug][$eq]=spetsodezhda&populate=*`,
        { next: { revalidate: 3600 } }
    );
    console.log('res!!' ,res)
  
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function generateMetadata({ params }) {
  return {
    title: `Категория ${params.categorySlug}`,
    description: `Товары из категории ${params.categorySlug}`
  };
}

export default async function CategoryPage({ params }) {
  const { categorySlug } = params;
  const { data: products } = await getCategoryProducts(categorySlug);

  console.log('products!!',products);
  return (
    <div className="category-page">
      <ContentPage data={products} />
    </div>
  );
}