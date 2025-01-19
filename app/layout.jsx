import '@styles/globals.css';

import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Suspense } from 'react';

export const metadata = {
  title: 'BlogSphere',
  description: 'Discover & Read My Blog'
};
const RootLayout = ({ children }) => {
  return (
    <html>
      <body land="en">
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            <Suspense fallback={<div>Loading...</div>}>
            {children}
            </Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
