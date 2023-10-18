import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="w-3 bg-slate-400 hover:bg-slate-500 px-2 py-1 rounded-md text-white"
      >
        Return Home
      </Link>
    </div>
  );
}
