// src/layouts/Layout.tsx
import React from 'react';
import Sidebar from '../components/sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
