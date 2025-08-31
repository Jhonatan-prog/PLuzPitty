
import React from 'react';
import Sidebar from '../components/pagInicio/sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      {/*"children" representa todo lo que pongamos dentro del componente Layout. */}
      {children}
    </div>
  );
};
 
export default Layout;
