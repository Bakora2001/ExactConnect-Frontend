import React, { useState } from "react";

const Collapsible = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

const CollapsibleTrigger = ({ children, className = "", onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const CollapsibleContent = ({ children, className = "", isOpen = false }) => {
  if (!isOpen) return null;
  return <div className={className}>{children}</div>;
};

// Creating a wrapper component for easier usage
const CollapsibleWrapper = ({ children, className = "", triggerClassName = "", contentClassName = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Find trigger and content children
  let triggerElement = null;
  let contentElement = null;
  
  React.Children.forEach(children, child => {
    if (child.type === CollapsibleTrigger) {
      triggerElement = React.cloneElement(child, {
        onClick: () => {
          setIsOpen(!isOpen);
          if (child.props.onClick) {
            child.props.onClick();
          }
        },
        className: `${child.props.className || ""} ${triggerClassName}`
      });
    } else if (child.type === CollapsibleContent) {
      contentElement = React.cloneElement(child, {
        isOpen,
        className: `${child.props.className || ""} ${contentClassName}`
      });
    }
  });
  
  return (
    <Collapsible className={className}>
      {triggerElement}
      {contentElement}
    </Collapsible>
  );
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent, CollapsibleWrapper };