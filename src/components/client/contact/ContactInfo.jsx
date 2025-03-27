import { Mail } from 'lucide-react';
import PropTypes from 'prop-types';

const ContactMethod = ({ icon, title, description, action, link }) => {
  return (
    <div className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-[#131312] transition-all duration-300">
      <div className="mt-1 bg-gray-100 rounded-full p-3 h-12 w-12 flex items-center justify-center flex-shrink-0 dark:bg-[#131312]">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <a
          href={link}
          className="text-sm font-medium inline-block mt-1 border-b border-black pb-px hover:opacity-70 transition-opacity"
        >
          {action}
        </a>
      </div>
    </div>
  );
};

ContactMethod.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const ContactInfo = () => {
  return (
    <div className="space-y-4 w-full max-w-md">
      <ContactMethod
        icon={<Mail className="h-5 w-5" />}
        title="Email Us"
        description="Our friendly team is here to help."
        action="support@exactconnect.online"
        link="support@exactconnect.online"
      />
    </div>
  );
};

export default ContactInfo;
