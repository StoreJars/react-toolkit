import { ajax } from './operators';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export default class API {
  private URL: string;
  private tokenStorage: any;

  constructor(url: string, tokenStorage: any) {
    this.URL = url;
    this.tokenStorage = tokenStorage;
  }

  public get$(route: string) {
    const { token } = this.tokenStorage.get();

    return ajax({
      url: `${this.URL}${route}`,
      method: 'GET',
      headers: { ...headers, ...(token && { Authorization: `Bearer ${token}` }) },
    });
  }

  public post$(route: string, data: any) {
    const { token } = this.tokenStorage.get();

    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: { ...headers, ...(token && { Authorization: `Bearer ${token}` }) },
      body: data,
    });
  }

  public multipartPost$(route: string, data: any) {
    const { token } = this.tokenStorage.get();

    return ajax({
      url: `${this.URL}${route}`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data,
    });
  }

  public patch$(route: string, data: any) {
    const { token } = this.tokenStorage.get();

    return ajax({
      url: `${this.URL}${route}`,
      method: 'PATCH',
      headers: { ...headers, ...(token && { Authorization: `Bearer ${token}` }) },
      body: data,
    });
  }

  public put$(route: string, data: any) {
    const { token } = this.tokenStorage.get();

    return ajax({
      url: `${this.URL}${route}`,
      method: 'PUT',
      headers: { ...headers, ...(token && { Authorization: `Bearer ${token}` }) },
      body: data,
    });
  }

  public delete$(route: string, data: any) {
    const { token } = this.tokenStorage.get();

    return ajax({
      url: `${this.URL}${route}`,
      method: 'DELETE',
      headers: { ...headers, ...(token && { Authorization: `Bearer ${token}` }) },
      body: data,
    });
  }
}
