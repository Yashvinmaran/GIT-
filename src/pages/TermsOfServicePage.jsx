// pages/TermsOfServicePage.js
import React from 'react';
import './TermsOfServicePage.css'; // Import CSS for styling

const TermsOfServicePage = () => {
  return (
    <div className="terms-of-service-page">
      <div className="terms-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: [Date]</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using FasalBazaar, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>
        </section>

        <section>
          <h2>2. User Accounts</h2>
          <p>You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password.</p>
        </section>

        <section>
          <h2>3. User Conduct</h2>
          <p>You agree not to use the Site to:</p>
          <ul>
            <li>Upload, transmit, or distribute any computer viruses, worms, or any software intended to damage or alter a computer system or data.</li>
            <li>Harvest, collect, gather or assemble information or data regarding other users, including e-mail addresses, without their consent.</li>
            <li>Interfere with, disrupt, or create an undue burden on the Site or the networks or services connected to the Site.</li>
            <li>Attempt to impersonate another user or person.</li>
          </ul>
        </section>

        <section>
          <h2>4. Buying and Selling</h2>
          <p>FasalBazaar provides a platform for farmers to sell and consumers to buy agricultural products. We are not directly involved in the transactions between buyers and sellers. We do not guarantee the quality, safety, or legality of items advertised, the truth or accuracy of listings, the ability of sellers to sell items, or the ability of buyers to pay for items.</p>
        </section>

        <section>
          <h2>5. Intellectual Property Rights</h2>
          <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws.</p>
        </section>

        <section>
          <h2>6. Termination</h2>
          <p>We reserve the right to terminate or suspend your account and bar access to the Site immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </section>

        <section>
          <h2>7. Disclaimer of Warranty</h2>
          <p>The site is provided on an "as is" and "as available" basis. You agree that your use of the site and our services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the site and your use thereof.</p>
        </section>

        <section>
          <h2>8. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of [Your State], without regard to its conflict of law provisions.</p>
        </section>

        <section>
          <h2>9. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        </section>

        <section>
          <h2>10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at: <a href="mailto:legal@fasalbazaar.com">legal@fasalbazaar.com</a> or [Your Company Address in Bhopal, Madhya Pradesh].</p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;