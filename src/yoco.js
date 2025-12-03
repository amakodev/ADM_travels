const handlePayment = async ({
  amount,
  currency = "ZAR",
  cancelUrl,
  successUrl,
  failureUrl,
  metadata,
} = {}) => {
  try {
    const url = "https://adm-backend-mu.vercel.app/checkout";
    if (!amount) {
      throw new Error("Payment amount is required");
    }

    const payload = {
      amount,
      currency,
      cancelUrl,
      successUrl,
      failureUrl,
      metadata,
    };

    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined || payload[key] === null) {
        delete payload[key];
      }
    });

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify(payload),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log('payment data', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default handlePayment;
