type PokemonResponse = {
  name: string;
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
};

type EncounterResponse = {
  location_area: {
    name: string;
  };
};


import Image from "next/image";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import { formatName } from "@/app/utils/text";

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const pokemonRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`
  );

  if (!pokemonRes.ok) {
    throw new Error("Failed to fetch Pokémon");
  }

  const pokemon: PokemonResponse = await pokemonRes.json();

  const encounterRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}/encounters`
  );

  const encounters: EncounterResponse[] = encounterRes.ok
    ? await encounterRes.json()
    : [];

const locationSet = new Set<string>();

const areaDetails = await Promise.all(
  encounters.map((e) =>
    fetch(
      `https://pokeapi.co/api/v2/location-area/${e.location_area.name}`
    ).then((res) => res.json())
  )
);

areaDetails.forEach((area) => {
  if (area.location?.name) {
    locationSet.add(area.location.name);
  }
});

const locations = Array.from(locationSet);
const MAX_STAT = 255;

 return (
  <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-3 sm:px-6 space-y-6">
    <BackButton />

    <div className="rounded-md border bg-gray-50 p-4">
      <h1 className="font-semibold text-lg text-center">
        {formatName(pokemon.name)}
      </h1>
    </div>

    <div className="rounded-md border bg-gray-50 p-4">
      <div className="flex justify-center gap-4 flex-wrap">
        {pokemon.sprites.front_default && (
          <div className="rounded border bg-white p-2">
            <p className="text-sm text-center text-gray-700 mb-1">
              Normal
            </p>
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={175}
              height={175}
            />
          </div>
        )}

        {pokemon.sprites.front_shiny && (
          <div className="rounded border bg-white p-2">
            <p className="text-sm text-center text-gray-700 mb-1">
              Shiny
            </p>
            <Image
              src={pokemon.sprites.front_shiny}
              alt={`${pokemon.name} shiny`}
              width={175}
              height={175}
            />
          </div>
        )}
      </div>
    </div>

    <section className="rounded-md border bg-gray-50 p-4 space-y-3">
      <h2 className="font-semibold text-sm">Stats</h2>

      <div className="space-y-3">
        {pokemon.stats.map((s) => {
          const percentage = Math.min(
            (s.base_stat / MAX_STAT) * 100,
            100
          );

          return (
            <div key={s.stat.name}>
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-medium">
                  {formatName(s.stat.name)}
                </span>
                <span>{s.base_stat}</span>
              </div>

              <div className="h-2 w-full rounded bg-gray-200">
                <div
                  className="h-2 rounded bg-blue-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>

    <div className="rounded-md border bg-gray-50 p-4 space-y-3">
      <h2 className="font-semibold text-sm">Locations</h2>

      {locations.length === 0 ? (
        <p className="text-sm text-gray-600">
          This Pokémon is not found in the wild.
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {locations.map((loc) => (
            <li key={loc}>
              <Link
                href={`/locations/${loc}`}
                className="block rounded border px-3 py-2 text-sm hover:bg-gray-100 text-center"
              >
                {formatName(loc)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>

    <div className="rounded-md border bg-gray-50 p-4 space-y-3">
      <h2 className="font-semibold text-sm">Moves</h2>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {pokemon.moves.map((m) => (
          <li key={m.move.name}>
            <Link
              href={`/moves/${m.move.name}`}
              className="block rounded border px-3 py-2 text-sm hover:bg-gray-100 text-center"
            >
              {formatName(m.move.name)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}
