"use client";

import { useState } from "react";
import { StrKey } from "@stellar/stellar-sdk";
import Link from "next/link";

const ASSETS = ["XLM", "USDC", "USDT", "BTC", "ETH"];

export default function CreatePage() {
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState("XLM");
  const [memo, setMemo] = useState("");
  const [memoType, setMemoType] = useState("text");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [error, setError] = useState("");

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setGeneratedUrl("");

    if (!StrKey.isValidEd25519PublicKey(destination)) {
      setError("Invalid Stellar address. Must be a valid G... public key.");
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Enter a valid positive amount.");
      return;
    }

    const base = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    let url = `${base}/pay?destination=${encodeURIComponent(destination)}&amount=${encodeURIComponent(amount)}&asset=${encodeURIComponent(asset)}`;
    if (memo) {
      url += `&memo=${encodeURIComponent(memo)}&memoType=${encodeURIComponent(memoType)}`;
    }
    setGeneratedUrl(url);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedUrl);
  }

  return (
    <div className="flex flex-col gap-6 mt-4">
      <h1 className="text-2xl font-bold">Create Payment Link</h1>

      <form onSubmit={handleGenerate} className="flex flex-col gap-4">
        <Field label="Destination Address">
          <input
            type="text"
            placeholder="G..."
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-500"
            required
          />
        </Field>

        <Field label="Amount">
          <input
            type="number"
            placeholder="0.00"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
            required
          />
        </Field>

        <Field label="Asset">
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
          >
            {ASSETS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </Field>

        <Field label="Memo Type">
          <select
            value={memoType}
            onChange={(e) => setMemoType(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="text">Text</option>
            <option value="id">ID</option>
            <option value="hash">Hash</option>
          </select>
        </Field>

        <Field label="Memo">
          <input
            type="text"
            placeholder="Optional memo"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
          />
        </Field>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="mt-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
        >
          Generate Link
        </button>
      </form>

      {generatedUrl && (
        <div className="flex flex-col gap-3 mt-2 p-5 bg-gray-900 border border-gray-800 rounded-xl">
          <p className="text-sm text-gray-400">Your payment link</p>
          <div className="text-sm break-all text-indigo-300 font-mono">{generatedUrl}</div>
          <div className="flex gap-3 mt-1">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 text-sm border border-gray-700 hover:border-gray-500 rounded-lg transition-colors"
            >
              Copy
            </button>
            <Link
              href={typeof window !== 'undefined' ? generatedUrl.replace(window.location.origin, "") : ""}
              className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              Preview
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-400">{label}</label>
      {children}
    </div>
  );
}
