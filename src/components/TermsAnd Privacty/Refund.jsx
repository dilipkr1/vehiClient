import React from "react";

const Refund = () => {
  return (
    <div className="prose max-w-2xl mx-auto mt-20 pt-10 py-8 px-4">
      <div className="lg:mt-4 lg:px-0">
        <h3 className="marginOnMob mt-3 text-4xl font-black   text-main">
          Refund Policy
        </h3>
      </div>
      <p className="mb-4">
        At Vehiconnect, we strive to ensure your satisfaction with our products
        and services. However, we understand that there may be instances where a
        refund is necessary. Please review our refund policy below:
      </p>

      <h3 className="text-lg font-semibold mb-2">1. Eligibility for Refund</h3>
      <p className="mb-4">
        Refunds may be issued under the following circumstances:
        <ul className="list-disc ml-8">
          <li>Product/service not delivered as described</li>
          <li>Technical issues preventing use of the product/service</li>
          <li>Unauthorized charges</li>
        </ul>
      </p>

      <h3 className="text-lg font-semibold mb-2">2. Refund Process</h3>
      <p className="mb-4">
        To request a refund, please contact our customer support team within [X]
        days of purchase. Provide details of the issue along with any relevant
        documentation. Our team will review your request and process the refund
        accordingly.
      </p>

      <h3 className="text-lg font-semibold mb-2">3. Refund Timeline</h3>
      <p className="mb-4">
        Refunds will be processed within [X] business days of approval. Please
        note that it may take additional time for the refund to reflect in your
        account depending on your payment method and financial institution.
      </p>

      <h3 className="text-lg font-semibold mb-2">4. Contact Us</h3>
      <p className="mb-4">
        If you have any questions or concerns about our refund policy, please
        feel free to contact us at [insert contact information].
      </p>
    </div>
  );
};

export default Refund;
