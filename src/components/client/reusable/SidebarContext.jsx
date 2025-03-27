// import React, { createContext, useState, useContext } from 'react';

// const SidebarContext = createContext(undefined);

// export const SidebarProvider = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const toggle = () => setIsOpen(prev => !prev);
//   const close = () => setIsOpen(false);

//   return (
//     <SidebarContext.Provider value={{ isOpen, toggle, close }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// export const useSidebar = () => {
//   const context = useContext(SidebarContext);
//   if (!context) {
//     throw new Error('useSidebar must be used within a SidebarProvider');
//   }
//   return context;
// };