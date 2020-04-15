import ApolloClient, { gql } from 'apollo-boost';

import { from } from './operators';
import config from '../config';
import tokenStorage from '../storage/tokenStorage';

class API {
  private URL: string;
  private client;

  constructor(url: string) {
    this.URL = url;

    /**
     * If on server, mock out mutate and client functions
     */
    this.client = config.isClient ? new ApolloClient({ uri: this.URL }) : {
      mutate: () => { },
      query: () => { },
    };
  }

  public query$(query: any) {
    const { token } = tokenStorage.get();

    const client = new ApolloClient({
      uri: this.URL,
      headers: { Authorization: token }
    });

    return from(client.query({ query: gql`${query}` }));
  }

  public mutate$(query: any, payload: object) {
    const { token } = tokenStorage.get();

    const client = new ApolloClient({
      uri: this.URL,
      headers: { Authorization: token }
    });

    return from(client.mutate({
      mutation: query,
      variables: { input: payload },

    }));
  }
}

export const api = new API(config.GATEWAY_URL);
