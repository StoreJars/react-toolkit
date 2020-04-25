import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client/lib/index';
import gql from 'graphql-tag';

import { from } from './operators';
import config from '../config';
import tokenStorage from '../storage/tokenStorage';

class API {
  private URL: string;
  private client;

  constructor(url: string) {
    this.URL = url;
    const { token } = tokenStorage.get();
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
          headers: { Authorization: token }
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

export const api = new API(config.GATEWAY_URL);
