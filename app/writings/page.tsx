import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Writings · Yash Sehgal",
  description: "Writing by Yash Sehgal.",
};

export default function Page() {
  return (
    <div className="max-w-[300px]">
      <header className="page-header mb-8 flex flex-col gap-0.5">
        <Link href="/" className="mb-6 text-muted">
          Back
        </Link>
        <h1 className="text-base">Writings</h1>
      </header>
    </div>
  );
}
