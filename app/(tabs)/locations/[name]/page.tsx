import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import { formatName } from "@/app/utils/text";

type LocationResponse = {
  name: string;
  region: {
    name: string;
  } | null;
  areas: {
    name: string;
  }[];
};

type LocationAreaResponse = {
  pokemon_encounters: {
    pokemon: {
      name: string;
    };
  }[];
};

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const result = await fetch(
    `https://pokeapi.co/api/v2/location/${name}`
  );

  if (!result.ok) {
    throw new Error("Failed to fetch location");
  }

  const location: LocationResponse = await result.json();

  const areaResponses: LocationAreaResponse[] =
    await Promise.all(
      location.areas.map((area) =>
        fetch(
          `https://pokeapi.co/api/v2/location-area/${area.name}`
        ).then((res) => res.json())
      )
    );

  const pokemonSet = new Set<string>();

  areaResponses.forEach((area) => {
    area.pokemon_encounters.forEach((encounter) => {
      pokemonSet.add(encounter.pokemon.name);
    });
  });

  const pokemonNames = Array.from(pokemonSet);
return (
<div className="mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-3 sm:px-6 space-y-4">
  <BackButton />

  <div className="rounded-md border bg-gray-50 p-4 space-y-2">
    <h1 className="font-semibold text-lg text-center">
      {formatName(location.name)}
    </h1>

    <p className="text-sm text-gray-700 text-center">
      <strong>Region:</strong>{" "}
      {location.region
        ? formatName(location.region.name)
        : "Unknown"}
    </p>
  </div>

  <div className="rounded-md border bg-gray-50 p-4 space-y-3">
    <h2 className="font-semibold text-sm">
      Pokémon Found Here
    </h2>

    {pokemonNames.length === 0 ? (
      <p className="text-sm text-gray-600">
        No Pokémon found at this location.
      </p>
    ) : (
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {pokemonNames.map((pokemon) => (
          <li key={pokemon}>
            <Link
              href={`/pokemon/${pokemon}`}
              className="block rounded border px-3 py-2 text-sm hover:bg-gray-100 text-center"
            >
              {formatName(pokemon)}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
);


}
