import { combineReducers } from 'redux';

import { metaReducer as admins } from './entities/admins';
import { metaReducer as auth } from './entities/auth';
import { metaReducer as businessTypes } from './entities/businessTypes';
import { metaReducer as carts } from './entities/carts';
import { metaReducer as categories } from './entities/categories';
import { metaReducer as customers } from './entities/customers';
import { metaReducer as domains } from './entities/domains';
import { metaReducer as orders } from './entities/orders';
import { metaReducer as permissions } from './entities/permissions';
import { metaReducer as posts } from './entities/posts';
import { metaReducer as products } from './entities/products';
import { metaReducer as resources } from './entities/resources';
import { metaReducer as roles } from './entities/roles';
import { metaReducer as store } from './entities/store';
import { metaReducer as supscriptionPlans } from './entities/supscriptionPlans';
import { metaReducer as tags } from './entities/tags';
import { metaReducer as themes } from './entities/themes';
import { metaReducer as vendors } from './entities/vendors';
import { metaReducer as verifyToken } from './entities/verifyToken';

export default combineReducers({
  admins,
  auth,
  businessTypes,
  carts,
  customers,
  categories,
  domains,
  orders,
  permissions,
  posts,
  products,
  resources,
  roles,
  store,
  supscriptionPlans,
  tags,
  themes,
  vendors,
  verifyToken
});
