// /components/ui/dialog.jsx
import * as React from "react"

const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
        onClick={onClose}
      />
      <div 
        className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95"
      >
        {children}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M18 6L6 18"></path>
            <path d="M6 6L18 18"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
};

const DialogHeader = ({ className, ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className || ""}`}
    {...props}
  />
);

const DialogFooter = ({ className, ...props }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className || ""}`}
    {...props}
  />
);

const DialogTitle = ({ className, ...props }) => (
  <h2
    className={`text-lg font-semibold leading-none tracking-tight ${className || ""}`}
    {...props}
  />
);

const DialogDescription = ({ className, ...props }) => (
  <p
    className={`text-sm text-gray-500 dark:text-gray-400 ${className || ""}`}
    {...props}
  />
);
// Add these components to dialog.jsx
const DialogContent = ({ className, children, ...props }) => (
    <div 
      className={`grid gap-4 py-4 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
  
  const DialogOverlay = ({ className, onClick, ...props }) => (
    <div 
      className={`fixed inset-0 z-40 bg-black/80 ${className || ""}`}
      onClick={onClick}
      {...props}
    />
  );

export {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogOverlay
};