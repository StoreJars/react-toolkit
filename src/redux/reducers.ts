import { combineReducers } from 'redux';

import { reducer as admins } from './entities/admins';
import { reducer as businessTypes } from './entities/businessTypes';
import { reducer as carts } from './entities/carts';
import { reducer as categories } from './entities/categories';
import { reducer as customers } from './entities/customers';
import { reducer as domains } from './entities/domains';
import { reducer as orders } from './entities/orders';
import { reducer as posts } from './entities/posts';
import { reducer as products } from './entities/products';
import { reducer as auth } from './entities/auth';
import { reducer as store } from './entities/store';
import { reducer as tags } from './entities/tags';
import { reducer as themes } from './entities/themes';
import { reducer as vendors } from './entities/vendors';

export default combineReducers({
  admins,
  auth,
  businessTypes,
  carts,
  customers,
  categories,
  domains,
  orders,
  posts,
  products,
  store,
  tags,
  themes,
  vendors
});
