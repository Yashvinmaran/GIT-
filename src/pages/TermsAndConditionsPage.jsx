// pages/TermsAndConditionsPage.js
import React from 'react';
import './TermsAndConditionsPage.css';

const TermsAndConditionsPage = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1>Terms and Conditions</h1>
        <p>Last updated: [Date]</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using FasalBazaar, you agree to be bound by these Terms and Conditions.
            If you do not agree to these terms, please do not use our platform.
          </p>
        </section>

        <section>
          <h2>2. User Accounts</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password and
            for restricting access to your computer. You agree to accept responsibility for all
            activities that occur under your account.
          </p>
        </section>

        <section>
          <h2>3. Buying and Selling</h2>
          <p>
            FasalBazaar is a platform for farmers to sell and consumers to buy agricultural products.
            We are not directly involved in the transactions between buyers and sellers.
          </p>
          <ul>
            <li>
              Sellers are responsible for the accuracy of their listings, including product
              descriptions, prices, and availability.
            </li>
            <li>
              Buyers are responsible for verifying the quality and suitability of the products before
              purchasing.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Payments</h2>
          <p>
            Payment methods and processing are handled by third-party providers. FasalBazaar does not
            directly handle payment processing.
          </p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>
            FasalBazaar shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages arising out of or relating to your use of the platform.
          </p>
        </section>

        <section>
          <h2>6. Governing Law</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the laws
            of India.
          </p>
        </section>

        <section>
          <h2>7. Changes to Terms</h2>
          <p>
            FasalBazaar reserves the right to modify these Terms and Conditions at any time. Your
            continued use of the platform after any such changes constitutes your acceptance of the
            new terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
