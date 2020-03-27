import { combineReducers } from 'redux';

import { reducer as admins } from './entities/admins';
import { reducer as businessTypes } from './entities/businessTypes';
import { reducer as carts } from './entities/carts';
import { reducer as categories } from './entities/categories';
import { reducer as customers } from './entities/customers';
import { reducer as domains } from './entities/domains';
import { reducer as login } from './entities/login';
import { reducer as orders } from './entities/orders';
import { reducer as permissions } from './entities/permissions';
import { reducer as posts } from './entities/posts';
import { reducer as products } from './entities/products';
import { reducer as register } from './entities/register';
import { reducer as resources } from './entities/resources';
import { reducer as roles } from './entities/roles';
import { reducer as store } from './entities/store';
import { reducer as supscriptionPlans } from './entities/supscriptionPlans';
import { reducer as tags } from './entities/tags';
import { reducer as themes } from './entities/themes';
import { reducer as vendors } from './entities/vendors';
import { reducer as verifyToken } from './entities/verifyToken';

export default combineReducers({
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