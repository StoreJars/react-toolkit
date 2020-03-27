import { combineEpics } from 'redux-observable';

import { epic as admins } from './entities/admins';
import { epic as businessTypes } from './entities/businessTypes';
import { epic as carts } from './entities/carts';
import { epic as categories } from './entities/categories';
import { epic as customers } from './entities/customers';
import { epic as domains } from './entities/domains';
import { epic as login } from './entities/login';
import { epic as orders } from './entities/orders';
import { epic as permissions } from './entities/permissions';
import { epic as posts } from './entities/posts';
import { epic as products } from './entities/products';
import { epic as register } from './entities/register';
import { epic as resources } from './entities/resources';
import { epic as roles } from './entities/roles';
import { epic as store } from './entities/store';
import { epic as supscriptionPlans } from './entities/supscriptionPlans';
import { epic as tags } from './entities/tags';
import { epic as themes } from './entities/themes';
import { epic as vendors } from './entities/vendors';
import { epic as verifyToken } from './entities/verifyToken';

export default combineEpics({
  admins,
  businessTypes,
  carts,
  customers,
  categories,
  domains,
  login,
  orders,
  permissions,
  posts,
  products,
  register,
  resources,
  roles,
  store,
  supscriptionPlans,
  tags,
  themes,
  vendors,
  verifyToken
});
