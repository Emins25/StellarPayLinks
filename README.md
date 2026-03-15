# ✦ StellarPay Links

An open-source web app for generating Stellar payment links and QR codes.

## Features

- **Create Link** (`/create`) — Enter a Stellar address, amount, and asset to generate a shareable payment URL
- **Payment Page** (`/pay`) — Displays payment details and a scannable QR code
- Address validation via the Stellar SDK
- QR code generation with `qrcode`

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- [@stellar/stellar-sdk](https://github.com/stellar/js-stellar-sdk)
- [qrcode](https://github.com/soldair/node-qrcode)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
git clone https://github.com/your-username/StellarPayLinks.git
cd StellarPayLinks
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage

### Generate a payment link

Go to `/create`, fill in:
- Destination — a valid Stellar public key (`G...`)
- Amount — e.g. `10`
- Asset — e.g. `XLM`

Click **Generate Link** to get a shareable URL like:

```
http://localhost:3000/pay?destination=GABC...&amount=10&asset=XLM
```

### Share the link

Anyone opening the link sees the payment details and a QR code they can scan with a Stellar wallet.

## License

MIT
