import { combineReducers } from 'redux';

import { metaReducer as admins } from './entities/admins';
import { metaReducer as auth } from './entities/auth';
import { metaReducer as businessTypes } from './entities/businessTypes';
import { metaReducer as carts } from './entities/carts';
import { metaReducer as categories } from './entities/categories';
import { metaReducer as customers } from './entities/customers';
import { metaReducer as domains } from './entities/domains';
import { metaReducer as orders } from './entities/orders';
import { metaReducer as posts } from './entities/posts';
import { metaReducer as products } from './entities/products';
import { metaReducer as store } from './entities/stores';
import { metaReducer as tags } from './entities/tags';
import { metaReducer as themes } from './entities/themes';
import { metaReducer as vendors } from './entities/vendors';

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
  vendors,
});
