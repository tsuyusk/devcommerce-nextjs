import { GetServerSideProps } from 'next';
import Link from 'next/link';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import { Container } from '../styles/pages/Home';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';

interface HomeProps {
  recommendedProducts: Document[];
  categories: Document[];
}

export default function Home({ recommendedProducts, categories }: HomeProps) {
  return (
    <Container>
      <SEO
        title="DevCommerce, your favourite e-commerce for dev products!"
        shouldExcludeTitleSuffix
      />
      <section>
        <Link href="/search">Search</Link>
        <br />

        <h1>Products</h1>
        <ul>
          {recommendedProducts.map(recommendedProduct => (
            <li key={recommendedProduct.id}>
              <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                <a>
                  {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <h1>Categories</h1>

        <ul>
          {categories.map(category => (
            <li key={category.id}>
              <Link href={`/catalog/categories/${category.uid}`}>
                <a>{PrismicDOM.RichText.asText(category.data.title)}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);

  const categories = await client().query([
    Prismic.Predicates.at('document.type', 'category'),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
      categories: categories.results,
    },
  };
};
