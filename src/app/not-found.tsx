import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell flex min-h-[70vh] flex-col items-start justify-center gap-6 py-24">
      <p className="eyebrow">404</p>
      <h1 className="section-title max-w-2xl">Page not found</h1>
      <p className="copy">
        The page you requested does not exist or was moved.
      </p>
      <Link href="/" className="button-secondary">
        Back to portfolio
      </Link>
    </main>
  );
}
