import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URI,
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
  cache: new InMemoryCache(),
});
