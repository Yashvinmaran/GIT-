// pages/PrivacyPolicyPage.js
import React from 'react';
// import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1>Privacy Policy</h1>
        <p>Last updated: [Date]</p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>
            We collect personal information when you register on our platform, place an order, or
            communicate with us. This may include your name, email address, phone number, address,
            and payment information.
          </p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to process transactions, personalize your experience, improve our
            platform, and communicate with you about orders and updates.
          </p>
        </section>

        <section>
          <h2>3. Data Security</h2>
          <p>
            We take reasonable measures to protect your personal information from unauthorized access,
            use, or disclosure. However, no internet transmission is completely secure.
          </p>
        </section>

        <section>
          <h2>4. Sharing Your Information</h2>
          <p>
            We may share your information with third-party service providers who assist us in
            operating our platform, processing payments, or delivering services to you. We will not
            sell your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2>5. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You can manage
            your account settings or contact us directly to exercise these rights.
          </p>
        </section>

        <section>
          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your browsing experience and collect
            usage information. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at [Your Contact
            Information].
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
