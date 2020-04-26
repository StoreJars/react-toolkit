import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client/lib/index';
import gql from 'graphql-tag';

import { from } from './operators';

export default class API {
  private URL: string;
  private client;
  private token: string | null;

  constructor(url: string, token: string | null) {
    this.URL = url;
    this.token = token;
    /**
 * If on server, mock out mutate and client functions
 */
    this.client = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.forEach((message, locations, path) => {
              console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
            })
          }
          if (networkError) {
            console.log(`[Network error]: ${networkError}`);
          }
        }),
        createUploadLink({
          uri: this.URL,
          credentials: 'same-origin',
          headers: { Authorization: this.token }
        })
      ]),
      cache: new InMemoryCache()
    })
  }

  public query$(query: any, payload = {}) {
    return from(this.client.query({
      query: gql`${query}`,
      variables: { input: payload },
    }));
  }

  public mutate$(query: any, payload: object) {
    return from(this.client.mutate({
      mutation: query,
      variables: { input: payload },
    }));
  }
}