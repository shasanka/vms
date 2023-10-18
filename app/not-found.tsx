import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        href="/home"
        className="w-3 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md text-white"
      >
        Return Home
      </Link>
    </div>
  );
}
