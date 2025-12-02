import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

if (!YOCO_SECRET_KEY) {
  console.warn('⚠️ YOCO_SECRET_KEY is not set. Yoco checkout endpoint will not work correctly.');
}

app.use(express.json());

// Simple health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Yoco checkout endpoint
// This runs on the server and uses your Yoco secret key securely.
app.post('/api/yoco-checkout', async (req, res) => {
  try {
    const {
      amount,
      currency,
      tourId,
      tourName,
      guests,
      customerName,
      customerEmail,
      customerPhone,
    } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: 'Missing amount or currency' });
    }

    if (!YOCO_SECRET_KEY) {
      return res.status(500).json({ error: 'YOCO_SECRET_KEY not configured on server' });
    }

    const yocoResponse = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${YOCO_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
        // Adjust these URLs to your deployed domain
        cancelUrl: 'https://admtravelssa.com/payment/cancelled',
        successUrl: 'https://admtravelssa.com/payment/success',
        failureUrl: 'https://admtravelssa.com/payment/failed',
        metadata: {
          tourId,
          tourName,
          guests,
          customerName,
          customerEmail,
          customerPhone,
          source: 'admtravels-website',
        },
      }),
    });

    if (!yocoResponse.ok) {
      const text = await yocoResponse.text().catch(() => '');
      return res.status(yocoResponse.status).send(text || 'Failed to create checkout');
    }

    const checkout = await yocoResponse.json();

    if (!checkout || !checkout.redirectUrl) {
      return res.status(500).json({ error: 'Missing redirectUrl from Yoco response' });
    }

    // Return only data needed by the frontend
    res.json({
      id: checkout.id,
      redirectUrl: checkout.redirectUrl,
      amount: checkout.amount,
      currency: checkout.currency,
      status: checkout.status,
    });
  } catch (error) {
    console.error('Yoco checkout error:', error);
    res.status(500).json({ error: 'Failed to create checkout' });
  }
});

app.listen(PORT, () => {
  console.log(`Yoco checkout server listening on port ${PORT}`);
});
