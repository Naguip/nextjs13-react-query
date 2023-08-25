import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav>
        <Link href="/server">
          <h1>Server Example</h1>
        </Link>
        <Link href="/client">
          <h1>Client Example</h1>
        </Link>
        <Link href="/client-users">
          <h1>Client Users Example</h1>
        </Link>
      </nav>
    </main>
  );
}
