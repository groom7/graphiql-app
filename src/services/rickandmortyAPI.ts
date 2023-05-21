import { createApi } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import graphqlServerBaseURL from '../utils/apiConstants';

export const rickandmortyAPI = createApi({
  baseQuery: graphqlRequestBaseQuery({ url: graphqlServerBaseURL }),
  endpoints: (build) => ({
    getGraphQLIntrospection: build.query<IntrospectionQuery, void>({
      query: () => ({
        document: getIntrospectionQuery(),
      }),
    }),
  }),
});

export const { useGetGraphQLIntrospectionQuery } = rickandmortyAPI;
