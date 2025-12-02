const handlePayment = async (amount, currency = "ZAR") => {
  try {
    const yocoSecretKey = "sk_test_940fed59vKWeypb05104ba98d3ee";

    const url = "https://payments.yoco.com/api/checkouts";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${yocoSecretKey}`,
        "Content-Type": "application/json",
      },
      body: `{"amount":${amount},"currency":"${currency}"}`,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default handlePayment;
