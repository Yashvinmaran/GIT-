// pages/RefundPolicyPage.js
import React from 'react';
import './RefundPolicyPage.css'; // Import CSS for styling

const RefundPolicyPage = () => {
  return (
    <div className="refund-policy-page">
      <div className="refund-container">
        <h1>Refund Policy</h1>
        <p className="last-updated">Last updated: [Date]</p>

        <section>
          <h2>1. Returns and Refunds</h2>
          <p>At FasalBazaar, we strive to ensure your satisfaction with every purchase. However, given the nature of agricultural products, our return and refund policy may vary depending on the specific product and seller.</p>
          <p>Please carefully review the individual product's return and refund terms before placing your order. This information can usually be found on the product page under the "Shipping and Returns" or similar section.</p>
        </section>

        <section>
          <h2>2. General Guidelines</h2>
          <p>While specific policies differ, here are some general guidelines that may apply:</p>
          <ul>
            <li><strong>Perishable Goods:</strong> Due to their nature, perishable goods like fresh fruits, vegetables, and dairy products may not be eligible for returns unless they arrive damaged or not as described. Any issues must be reported within [Number] hours of delivery, along with photographic evidence.</li>
            <li><strong>Non-Perishable Goods:</strong> Non-perishable items like grains, spices, and packaged goods may be eligible for return within [Number] days of delivery if they are unused, unopened, and in their original packaging.</li>
            <li><strong>Damaged or Incorrect Items:</strong> If you receive a damaged or incorrect item, please contact us within [Number] days of delivery with photographic evidence. We will arrange for a replacement or a full refund, including any shipping charges.</li>
          </ul>
        </section>

        <section>
          <h2>3. How to Request a Return or Refund</h2>
          <p>To request a return or refund, please follow these steps:</p>
          <ol>
            <li>Contact the seller directly through the "Contact Seller" option on your order details page or email us at <a href="mailto:support@fasalbazaar.com">support@fasalbazaar.com</a> with your order number and details of the issue.</li>
            <li>Provide clear photographic evidence of any damage or discrepancies.</li>
            <li>Follow the seller's or our support team's instructions for returning the item, if applicable.</li>
          </ol>
        </section>

        <section>
          <h2>4. Refund Process</h2>
          <p>Once your return is approved and the item is received (if applicable), your refund will be processed within [Number] business days. The refund will be credited to your original payment method.</p>
        </section>

        <section>
          <h2>5. Exceptions</h2>
          <p>Certain items may not be eligible for return or refund due to hygiene reasons or other specific conditions. These exceptions will be clearly stated in the product's return policy.</p>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>If you have any questions regarding our Refund Policy, please contact us at: <a href="mailto:support@fasalbazaar.com">support@fasalbazaar.com</a> or [Your Company Address in Bhopal, Madhya Pradesh].</p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicyPage;