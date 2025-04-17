import { Phone, AlertCircle } from 'lucide-react';
import { useContext } from 'react';
import { DarkModeContext } from '@/context/DarkModeContext';

const NonVoipPage = () => {
  const { darkMode } = useContext(DarkModeContext);
  
  return (
    <div className="animate-fade-in">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-sm p-6 mb-6`}>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>Non-VOIP Numbers</h1>
        
        {/* Coming Soon placeholder */}
        <div className={`rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} p-8`}>
          <div className="flex flex-col items-center justify-center text-center">
            <div className={`w-16 h-16 ${darkMode ? 'bg-purple-900' : 'bg-exactconnect-100'} rounded-full flex items-center justify-center text-exactconnect mb-4`}>
              <Phone className={`h-8 w-8 ${darkMode ? 'text-purple-300' : ''}`} />
            </div>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Non-VOIP Numbers Coming Soon</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-md`}>
              We're currently working on this feature. You'll soon be able to manage your Non-VOIP numbers from this dashboard.
            </p>
            
            <div className={`mt-6 flex items-center p-4 ${darkMode ? 'bg-yellow-900/20 text-yellow-300 border-yellow-800' : 'bg-yellow-50 text-yellow-800 border-yellow-200'} rounded-lg border`}>
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>This page is under development. Check back soon for updates!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NonVoipPage;