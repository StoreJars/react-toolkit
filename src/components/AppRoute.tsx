import React from 'react';

export default function AppRoute({ component: Component, layout: Layout, router: Route, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
