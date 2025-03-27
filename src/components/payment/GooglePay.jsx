//Merchant ID BCR2DN4T76F75KJG
import GooglePayButton from '@google-pay/button-react';
import { SERVER_URL } from '../../services/data';

const GooglePay = () => {
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['VISA'], //Cards accepted
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example', //This is valid in test environement
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: 'BCR2DN4T76F75KJG',
      merchantName: 'Exact Connect',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '1',
      currencyCode: 'USD',
      countryCode: 'US',
    },
  };

  const onLoadPaymentData = async (paymentData) => {
    console.log('Payment Data:', paymentData);
    // Handle the payment data here, e.g., send it to your server
    try {
      const response = await fetch(`${SERVER_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      console.log('Payment processed:', result);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <GooglePayButton
      environment="TEST"
      paymentRequest={paymentRequest}
      onLoadPaymentData={onLoadPaymentData}
      onError={(error) => console.error('Error:', error)}
      existingPaymentMethodRequired={false}
      buttonColor="black"
      buttonType="buy"
      className="w-full text-center font-semibold rounded-lg"
    />
  );
};

export default GooglePay;
