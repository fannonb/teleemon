import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-teleemon-blue-400/70 to-teleemon-blue-700/50 px-6 text-center text-teleemon-blue-1000">
      <div className="w-full max-w-md rounded-2xl bg-teleemon-blue-100/80 px-10 py-8 shadow-2xl">
        <h1 className="text-7xl font-bold text-teleemon-blue-900">404</h1>
        <p className="mt-2 text-lg">It seems you have tried to view a page that doesn&apos;t exist on our site.</p>
        <Link href="/" className="btn-primary mt-6">
          Back to Teleemon Home
        </Link>
      </div>
    </main>
  );
}
