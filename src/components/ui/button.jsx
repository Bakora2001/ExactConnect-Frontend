// @/components/ui/button.jsx
import React from 'react';

const Button = React.forwardRef(({ 
  className = "",
  variant = "default",
  size = "default",
  asChild = false,
  disabled = false,
  children,
  ...props 
}, ref) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  // Size variants
  const sizeStyles = {
    default: "h-10 py-2 px-4 text-sm",
    sm: "h-9 px-3 text-xs",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10"
  };
  
  // Variant styles
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "underline-offset-4 hover:underline text-primary"
  };
  
  // Combine styles based on props
  const combinedClassName = `${baseStyles} ${sizeStyles[size] || sizeStyles.default} ${variantStyles[variant] || variantStyles.default} ${className}`;
  
  const Comp = asChild ? props.asChild : "button";
  
  return (
    <Comp
      className={combinedClassName}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button };