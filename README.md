# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/8a0d8a9b-7520-44f0-b043-536e5a524adb

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/8a0d8a9b-7520-44f0-b043-536e5a524adb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/8a0d8a9b-7520-44f0-b043-536e5a524adb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## PayPal Integration Setup

This project uses PayPal Checkout for payment processing. To set up PayPal:

### 1. Get PayPal Credentials

1. **For Testing (Sandbox)**:
   - Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/sandbox)
   - Create a new app or use an existing one
   - Copy your **Sandbox Client ID**

2. **For Production (Live)**:
   - Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/applications/live)
   - Create a new app or use an existing one
   - Copy your **Live Client ID**

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# PayPal Client ID (Safe for frontend use)
# Get this from: https://developer.paypal.com/dashboard/applications/sandbox (for testing)
# or https://developer.paypal.com/dashboard/applications/live (for production)
VITE_PAYPAL_CLIENT_ID=your_sandbox_or_live_client_id

# PayPal Secret Key (Server-side only - NEVER expose in frontend)
# This should only be used in backend code if you have server-side logic
PAYPAL_SECRET=your_sandbox_or_live_secret_key

# Make.com Webhook URL (for booking notifications)
VITE_MAKE_WEBHOOK_URL=your_make_webhook_url
```

### 3. Switch to Live Credentials

Before deploying to production:
1. Replace `VITE_PAYPAL_CLIENT_ID` with your **Live Client ID**
2. Update the comment in `src/components/TourModal.jsx` (line 24-26) to indicate you're using live credentials
3. Test thoroughly with small amounts first

### 4. Testing

- **Sandbox Mode**: Use PayPal sandbox test accounts for testing
- **Payment Logging**: Payment details are logged to the console in sandbox mode for verification
- **Test Cards**: PayPal sandbox provides test card numbers for testing different scenarios

### Important Notes

- ✅ The **Client ID** is safe to use in frontend code (it's public)
- ❌ The **Secret Key** must NEVER appear in frontend code - only use it server-side
- 🔒 Always use sandbox credentials for testing
- 🚀 Switch to live credentials only when deploying to production
