import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <h1 className="text-3xl font-bold">Stellar Payment Links</h1>
      <p className="text-gray-400">
        Create shareable payment links and QR codes for the Stellar network.
      </p>
      <div className="flex gap-4 mt-4">
        <Link
          href="/create"
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-colors"
        >
          Create a Link
        </Link>
        <Link
          href="/pay?destination=GEXAMPLEADDRESS&amount=10&asset=XLM"
          className="px-5 py-2.5 border border-gray-700 hover:border-gray-500 rounded-lg font-medium transition-colors"
        >
          View Example
        </Link>
      </div>
    </div>
  );
}
