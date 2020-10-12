import { ajax } from './operators';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export default class API {
  private URL: string;
  private token: string;

  constructor(url: string, token: string | null) {
    this.URL = url;
    this.token = token;
  }

  public get$(route: string) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'GET',
      headers: { ...headers, Authorization: `Bearer ${this.token}` },
    });
  }

  public post$(route: string, data: any) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${this.token}` },
      body: data,
    });
  }

  public multipartPost$(route: string, data: any) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { Accept: 'application/json', Authorization: `Bearer ${this.token}` },
      body: data,
    });
  }

  public patch$(route: string, data: any) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'PATCH',
      headers: { ...headers, Authorization: `Bearer ${this.token}` },
      body: data,
    });
  }

  public put$(route: string, data: any) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'PUT',
      headers: { ...headers, Authorization: `Bearer ${this.token}` },
      body: data,
    });
  }

  public delete$(route: string, data: any) {
    return ajax({
      url: `${this.URL}${route}`,
      method: 'DELETE',
      headers: { ...headers, Authorization: `Bearer ${this.token}` },
      body: data,
    });
  }
}
