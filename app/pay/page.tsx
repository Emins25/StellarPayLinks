"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import QRCode from "qrcode";
import { Row } from "@/components/Row";
import { buildPaymentUrl } from "@/lib/stellar";

function PaymentRequest() {
  const params = useSearchParams();
  const destination = params.get("destination") ?? "";
  const amount = params.get("amount") ?? "";
  const asset = params.get("asset") ?? "XLM";
  const memo = params.get("memo") ?? "";
  const memoType = params.get("memoType") ?? "";
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // Reconstruct the canonical URL so the QR code always encodes a clean link.
  const paymentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/pay?destination=${destination}&amount=${amount}&asset=${asset}${memo ? `&memo=${memo}&memoType=${memoType}` : ""}`
      : "";

  useEffect(() => {
    if (!destination || !paymentUrl) return;
    QRCode.toDataURL(paymentUrl, { width: 256, margin: 2 })
      .then(setQrDataUrl)
      .catch(console.error);
  }, [paymentUrl, destination]);

  if (!destination) {
    return (
      <div className="text-red-400 mt-6">
        Missing <code className="bg-gray-800 px-1 rounded">destination</code>{" "}
        parameter.
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
        {memo && <Row label="Memo" value={memo} mono />}
        {memo && <Row label="Memo Type" value={memoType} />}
      </div>

      {qrDataUrl && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-gray-400">Scan to pay</p>
          {/* Using <img> intentionally — QR data URL is generated client-side */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt="Payment QR code"
            className="rounded-xl border border-gray-700"
            width={256}
            height={256}
          />
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

export default function PayPage() {
  return (
    <Suspense fallback={<div className="text-gray-400 mt-6">Loading...</div>}>
      <PaymentRequest />
    </Suspense>
  );
}
