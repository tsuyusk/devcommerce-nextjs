import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import PrismicDOM from 'prismic-dom';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';

import { client } from '@/lib/prismic';
import Link from 'next/link';

const AddToCardModal = dynamic(() => import('@/components/AddToCardModal'), {
  loading: () => <p>Loading...</p>,
});

interface ProductProps {
  product: Document;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(state => !state);
  }
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link href="/">Go to landing page</Link>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>
      <img
        src={product.data.thumbnail.url}
        alt={product.data.thumbnail.alt}
        width={400}
        height={200}
      />

      {product.data.description.map(description => (
        <p key={description.text}>{description.text}</p>
      ))}

      <h2>
        {(product.data.price as number)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })
          .replace('.', ',')}
      </h2>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCardModal />}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);

  const paths = products.results.map(product => ({
    params: { slug: product.uid },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async context => {
  const { slug } = context.params;

  const product = await client().queryFirst([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.at('my.product.uid', 'node-js-trousers'),
  ]);

  return {
    props: {
      product,
    },
  };
};
