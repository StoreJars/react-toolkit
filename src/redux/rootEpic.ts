import { combineEpics } from 'redux-observable';

import { epic as login } from './entities/login';
import { epic as customers } from './entities/customers';
import { epic as carts } from './entities/carts';
import { epic as orders } from './entities/orders';
import { epic as categories } from './entities/categories';
import { epic as products } from './entities/products';
import { epic as tags } from './entities/tags';
import { epic as posts } from './entities/posts';

export default combineEpics(
  login,
  customers,
  carts,
  orders,
  categories,
  products,
  tags,
  posts
);
