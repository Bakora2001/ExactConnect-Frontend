import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import CustomButton from './CustomButton';

const ToastDemo = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
      variant: "default",
    });
  };

  const showErrorToast = () => {
    toast({
      title: "Error!",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  };

  const showLoadingToast = () => {
    setLoading(true);
    
    toast({
      title: "Loading...",
      description: "Please wait while we process your request.",
    });
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Completed",
        description: "Your request has been processed.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Toast Notification Demo</h2>
      
      <div className="flex flex-wrap gap-3">
        <CustomButton onClick={showSuccessToast} withArrow>
          Show Success Toast
        </CustomButton>
        
        <CustomButton 
          onClick={showErrorToast} 
          variant="destructive" 
          withArrow
        >
          Show Error Toast
        </CustomButton>
        
        <CustomButton 
          onClick={showLoadingToast} 
          loading={loading}
          variant="outline"
        >
          Show Loading Toast
        </CustomButton>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4">
        Click any button above to display different types of toast notifications.
      </p>
    </div>
  );
};

export default ToastDemo;
