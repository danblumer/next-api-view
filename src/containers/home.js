import Link from "next/link";

export function Home() {
  return (
    <div>
      <h1>Home Page :)</h1>
      <hr />
      <Link href="/messages">
        <a>Messages</a>
      </Link>

      <hr />
    </div>
  );
}
