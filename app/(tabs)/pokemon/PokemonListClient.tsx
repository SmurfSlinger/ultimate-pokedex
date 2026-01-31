"use client";

import { useState } from "react";
import Link from "next/link";
import { formatName } from "@/app/utils/text";

export default function PokemonListClient({
  pokemon,
}: {
  pokemon: string[];
}) {
  const [search, setSearch] = useState("");

  const filteredPokemon = pokemon.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

return (
  <>
    <div className="mx-auto max-w-lg px-3 sm:px-6">
      <input
        type="text"
        placeholder="Search Pokémon..."
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
      {filteredPokemon.map((name) => (
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
  </>
);
}
