import { combineReducers } from 'redux';

import { reducer as login } from './entities/login';
import { reducer as carts } from './entities/carts';
import { reducer as categories } from './entities/categories';
import { reducer as customers } from './entities/customers';
import { reducer as orders } from './entities/orders';
import { reducer as products } from './entities/products';
import { reducer as tags } from './entities/tags';
import { reducer as posts } from './entities/posts';

// import all entitiy reducers as one
export default combineReducers({
  login,
  categories,
  carts,
  customers,
  orders,
  products,
  tags,
  posts
});
