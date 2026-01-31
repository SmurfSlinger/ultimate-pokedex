"use client";

import { useState } from "react";
import Link from "next/link";
import { formatName } from "@/app/utils/text";

export default function LearnedByPokemonClient({
  pokemon,
}: {
  pokemon: string[];
}) {
  const [search, setSearch] = useState("");

  const filtered = pokemon.filter((name) =>
    name.includes(search.toLowerCase())
  );

  return (
<div className="rounded-md border bg-gray-50 p-4 space-y-3">
  <h2 className="font-semibold text-sm">
    Learned By Pokémon
  </h2>


  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
    {filtered.map((name) => (
      <li key={name}>
        <Link
          href={`/pokemon/${name}`}
          className="block rounded border px-3 py-2 text-sm hover:bg-gray-100 text-center"
        >
          {formatName(name)}
        </Link>
      </li>
    ))}
  </ul>
</div>
  );
}
