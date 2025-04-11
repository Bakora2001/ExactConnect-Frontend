import { FileImage, AlertCircle } from 'lucide-react';

const TemplatesPage = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">PSD Templates</h1>
        
        {/* Coming Soon placeholder */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-exactconnect-100 rounded-full flex items-center justify-center text-exactconnect mb-4">
              <FileImage className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">PSD Templates Coming Soon</h2>
            <p className="text-gray-600 max-w-md">
              We're currently working on this feature. You'll soon be able to browse and download PSD templates from this dashboard.
            </p>
            
            <div className="mt-6 flex items-center p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>This page is under development. Check back soon for updates!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;