//Component for displaying the terms and conditions

import Footer from '../reusables/Footer';
import NavBar from '../reusables/Navbar';

const TermsAndPrivacy = () => {
  return (
    <div>
      <div className="  py-10 sm:py-12">
        <NavBar />
      </div>
      <div className="max-w-4xl mx-auto p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          Terms of Service
        </h1>
        <p className="mb-4 dark:text-gray-300">
          Welcome to ExactConnect! These Terms of Service ("Terms") govern your
          use of our website and services. By accessing or using ExactConnect,
          you agree to comply with these Terms.
        </p>
        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          1. Use of Services
        </h2>
        <ul className="list-disc ml-6 mb-4 dark:text-gray-300">
          <li>
            You must provide accurate information during account creation.
          </li>
          <li>
            You agree not to use our services for any unlawful or prohibited
            activities.
          </li>
          <li>
            We reserve the right to suspend or terminate your account if you
            violate these Terms.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          2. Payment & Refunds
        </h2>
        <p className="mb-4 dark:text-gray-300">
          Payments are required for purchasing proxies and server services. All
          transactions are final, and refunds are granted at our discretion.
        </p>

        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          3. Account Termination
        </h2>
        <p className="mb-4  dark:text-gray-300">
          You may request account deletion when we roll out this feature. We
          reserve the right to terminate accounts involved in fraud, abuse, or
          policy violations.
        </p>

        <h2 className="text-xl font-semibold mt-4 dark:text-white ">
          4. Changes to Terms
        </h2>
        <p className="mb-4  dark:text-gray-300">
          We may update these Terms from time to time. Continued use of our
          services implies acceptance of any modifications.
        </p>

        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          5. Contact Information
        </h2>
        <p className="mb-8  dark:text-gray-300">
          For any concerns regarding these Terms, contact us at{' '}
          <strong>support@exactconnect.online</strong>.
        </p>

        <h1 className="text-3xl font-bold mb-6 dark:text-white">
          Privacy Policy
        </h1>
        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          1. Information We Collect
        </h2>
        <ul className="list-disc ml-6 mb-4  dark:text-gray-300">
          <li>First and last name</li>
          <li>Email address</li>
          <li>Country</li>
          <li>Phone number</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          2. How We Use Your Information
        </h2>
        <p className="mb-4  dark:text-gray-300">
          We use your data solely for account creation, processing payments, and
          customer support.
        </p>

        <h2 className="text-xl font-semibold mt-4 dark:text-white ">
          3. Data Retention
        </h2>
        <p className="mb-4  dark:text-gray-300">
          We retain your data as long as you continue using our services. If you
          wish to delete your account, this feature will be available soon.
        </p>

        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          4. Data Security
        </h2>
        <p className="mb-4  dark:text-gray-300">
          We implement security measures to protect your personal data. However,
          no online service is completely secure.
        </p>

        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          5. Updates to This Policy
        </h2>
        <p className="mb-4  dark:text-gray-300">
          We may update this Privacy Policy periodically. We encourage users to
          review it regularly.
        </p>

        <h2 className="text-xl font-semibold mt-4 dark:text-white">
          6. Contact Information
        </h2>
        <p className="mb-4  dark:text-gray-300">
          If you have questions about this Privacy Policy, reach out to us at{' '}
          <strong className="text-purple-600">
            support@exactconnect.online
          </strong>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndPrivacy;
