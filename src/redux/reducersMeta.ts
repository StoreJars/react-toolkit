import { combineReducers } from 'redux';

import { metaReducer as login } from './entities/login';
import { metaReducer as carts } from './entities/carts';
import { metaReducer as orders } from './entities/orders';
import { metaReducer as categories } from './entities/categories';
import { metaReducer as customers } from './entities/customers';
import { metaReducer as products } from './entities/products';
import { metaReducer as tags } from './entities/tags';
import { metaReducer as posts } from './entities/posts';

// import all entitiy meta reducers as one
export default combineReducers({
  login,
  carts,
  orders,
  customers,
  categories,
  products,
  tags,
  posts
});
