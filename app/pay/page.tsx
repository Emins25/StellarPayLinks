"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import QRCode from "qrcode";

function PaymentRequest() {
  const params = useSearchParams();
  const destination = params.get("destination") ?? "";
  const amount = params.get("amount") ?? "";
  const asset = params.get("asset") ?? "XLM";
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  const paymentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/pay?destination=${destination}&amount=${amount}&asset=${asset}`
      : "";

  useEffect(() => {
    if (!destination) return;
    QRCode.toDataURL(paymentUrl, { width: 256, margin: 2 })
      .then(setQrDataUrl)
      .catch(console.error);
  }, [paymentUrl, destination]);

  if (!destination) {
    return (
      <div className="text-red-400 mt-6">
        Missing <code className="bg-gray-800 px-1 rounded">destination</code> parameter.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-4">
      <h1 className="text-2xl font-bold">Payment Request</h1>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
        <Row label="Destination" value={destination} mono />
        <Row label="Amount" value={`${amount} ${asset}`} />
        <Row label="Asset" value={asset} />
      </div>

      {qrDataUrl && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-400">Scan to pay</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt="Payment QR code"
            className="rounded-xl border border-gray-700"
            width={256}
            height={256}
          />
          <a
            href={qrDataUrl}
            download="stellar-payment-qr.png"
            className="px-4 py-2 text-sm border border-gray-700 hover:border-gray-500 rounded-lg transition-colors"
          >
            Download QR
          </a>
        </div>
      )}

      <div className="mt-2">
        <p className="text-xs text-gray-500 mb-1">Shareable link</p>
        <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-sm break-all text-indigo-300">
          {paymentUrl}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={`text-sm ${mono ? "font-mono break-all" : ""}`}>{value}</span>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div className="text-gray-400 mt-6">Loading...</div>}>
      <PaymentRequest />
    </Suspense>
  );
}
