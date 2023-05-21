import { IntrospectionQuery, buildClientSchema, printSchema } from 'graphql';

const introspectionToString = (graphQLIntrospection: IntrospectionQuery) => {
  const graphQLSchema = buildClientSchema(graphQLIntrospection);
  const schema = printSchema(graphQLSchema);

  return schema;
};

export default introspectionToString;
