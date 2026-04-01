import { StrKey } from "@stellar/stellar-sdk";

/** Supported asset tickers shown in the create form. */
export const SUPPORTED_ASSETS = ["XLM", "USDC", "USDT", "BTC", "ETH"] as const;
export type SupportedAsset = (typeof SUPPORTED_ASSETS)[number];

/**
 * Returns true if the given string is a valid Stellar Ed25519 public key (G...).
 */
export function isValidStellarAddress(address: string): boolean {
  return StrKey.isValidEd25519PublicKey(address);
}

/**
 * Builds the full /pay URL for a given payment request.
 * Falls back to a relative path when `origin` is not provided (e.g. during SSR).
 */
export function buildPaymentUrl(
  origin: string,
  destination: string,
  amount: string,
  asset: string
): string {
  const params = new URLSearchParams({ destination, amount, asset });
  return `${origin}/pay?${params.toString()}`;
}
