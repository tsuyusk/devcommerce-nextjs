import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Document } from 'prismic-javascript/types/documents';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import { client } from '@/lib/prismic';

interface SearchProps {
  searchResults: Document[];
}

export default function Search({ searchResults }: SearchProps) {
  const router = useRouter();
  const [searchInputContent, setSearchInputContent] = useState('');

  function handleSearch(event: FormEvent) {
    event.preventDefault();

    router.push(`/search?q=${encodeURIComponent(searchInputContent)}`);

    setSearchInputContent('');
  }

  return (
    <div>
      <Link href="/">Go to landing page</Link>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchInputContent}
          onChange={event => setSearchInputContent(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map(searchResult => (
          <li key={searchResult.id}>
            <Link href={`/catalog/products/${searchResult.uid}`}>
              <a>{PrismicDOM.RichText.asText(searchResult.data.title)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async context => {
  const { q } = context.query;

  if (!q) {
    return {
      props: { searchResults: [] },
    };
  }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', String(q)),
  ]);

  return {
    props: {
      searchResults: searchResults.results,
    },
  };
};
