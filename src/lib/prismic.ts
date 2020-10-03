import Prismic from 'prismic-javascript';

export const API_ENDPOINT = 'https://devcommercce.cdn.prismic.io/api/v2';

export const client = (req = null) => {
  const options = req ? { req } : null;

  return Prismic.client(API_ENDPOINT, options);
};
