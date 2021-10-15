export function formatPrice(amount: any) {
  const res = new Intl.NumberFormat().format(parseInt(amount, 10));
  return '\u20A6' + res;
}

export function calculateTotal(cart) {
  try {
    return cart?.reduce(
      (accumulator, item) => parseFloat(item.price) * (1 - (item.discount || 0) / 100) * item.quantity + accumulator,
      0,
    );
  } catch (error) {
    return 0;
  }
}

export function resizeImage(url: string, size: string) {
  return url.split('upload')[0] + 'upload/' + size + url.split('upload')[1];
}

const isProd = process.env.NODE_ENV === 'production';
const cdn = 'https://storage.googleapis.com/storejars.appspot.com/themes/';

export function basePath(theme: string) {
  return isProd ? cdn + theme : '';
}

export function productLink(name: string, id: string) {
  try {
    return `/product/${formatProductLink(name.toLowerCase())}-${id}`;
  } catch (error) {
    return '';
  }
}

function formatProductLink(string: string) {
  return string.replace(/ /g, '-');
}

export function getProductId(string: string) {
  const splittedLink = string.split('-');
  return splittedLink[splittedLink.length - 1];
}

export class FilterProducts {
  products: Array<any>;

  constructor(products: Array<any>) {
    this.products = products;
  }

  getProductsInPriceRange(amount: any) {
    return this.filterByPriceRange(amount);
  }

  filterByPriceRange(amount: any) {
    let [minPrice, maxPrice] = amount.split(' - ');
    minPrice = minPrice.slice(1);
    maxPrice = maxPrice.slice(1);
    return this.products.filter((product) => {
      return parseInt(minPrice, 10) <= product.price && product.price <= parseInt(maxPrice, 10);
    });
  }

  getProductsByName(name: any) {
    return this.filterByName(name);
  }

  filterByName(name: any) {
    return this.products.filter((product) => {
      return product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
    });
  }

  getProductById(id: any) {
    return this.products.find(({ shortId }) => `${shortId}` === `${id}`);
  }
}
