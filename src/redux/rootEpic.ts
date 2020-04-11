import { combineEpics } from 'redux-observable';

import { epic as admins } from './entities/admins';
import { epic as auth } from './entities/auth';
import { epic as businessTypes } from './entities/businessTypes';
import { epic as carts } from './entities/carts';
import { epic as categories } from './entities/categories';
import { epic as customers } from './entities/customers';
import { epic as domains } from './entities/domains';
import { epic as orders } from './entities/orders';
import { epic as posts } from './entities/posts';
import { epic as products } from './entities/products';
import { epic as store } from './entities/store';
import { epic as tags } from './entities/tags';
import { epic as themes } from './entities/themes';
import { epic as vendors } from './entities/vendors';

export default combineEpics(
  admins,
  businessTypes,
  carts,
  customers,
  categories,
  domains,
  orders,
  posts,
  products,
  auth,
  store,
  tags,
  themes,
  vendors,
);
