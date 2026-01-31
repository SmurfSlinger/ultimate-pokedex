"use client";

import {useState} from "react";
import Link from "next/link";
import { formatName } from "@/app/utils/text";

export default function MoveListClient({ moves }: { moves: string[] }) {
  const [search, setSearch] = useState("");

  const filteredMoves = moves.filter((name) =>
    name.includes(search.toLowerCase())
  );

  return (
<>
  <div className="mx-auto max-w-lg px-3 sm:px-6">
    <input
      type="text"
      placeholder="Search Moves..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="mb-4 w-full rounded border px-2 py-1 text-sm"
    />
  </div>

  <ul
    className="
      mx-auto
      max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl
      grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
      gap-3
      px-3 sm:px-6
    "
  >
    {filteredMoves.map((name) => (
      <li key={name}>
        <Link
          href={`/moves/${name}`}
          className="block rounded border px-3 py-2 text-sm hover:bg-gray-100 text-center"
        >
          {formatName(name)}
        </Link>
      </li>
    ))}
  </ul>
</>
  );
}