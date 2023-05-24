import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { graphqlServerBaseURL } from '../utils/constants';

export const rickandmortyAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: graphqlServerBaseURL }),
  endpoints: (build) => ({
    getGraphQLIntrospection: build.query<IntrospectionQuery, void>({
      query: () => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          query: getIntrospectionQuery(),
        },
      }),
      transformResponse: ({ data }: { data: IntrospectionQuery }) => data,
    }),
    getGraphQLData: build.mutation({
      query: (payload) => ({
        url: '',
        method: 'POST',
        body: { query: payload },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      transformResponse: ({ data }) => JSON.stringify(data, null, 2),
    }),
  }),
});

export const { useGetGraphQLIntrospectionQuery, useGetGraphQLDataMutation } = rickandmortyAPI;
