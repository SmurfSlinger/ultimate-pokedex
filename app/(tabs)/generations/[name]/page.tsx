type GenerationResponse = {
  name: string;
  main_region: {
    name: string;
  };
  pokemon_species: {
    name: string;
  }[];
};

import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import { formatName } from "@/app/utils/text";
import { formatGeneration } from "@/app/utils/text";

export default async function GenerationDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const result = await fetch(
    `https://pokeapi.co/api/v2/generation/${name}`
  );

  if (!result.ok) {
    throw new Error("Failed to fetch generation");
  }

  const generation: GenerationResponse = await result.json();

  return (
 <div className="mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-3 sm:px-6 space-y-4">
  <BackButton />

  <div className="rounded-md border bg-gray-50 p-4 space-y-2">
    <h1 className="font-semibold text-lg text-center capitalize">
      {formatGeneration(generation.name)}
    </h1>

    <p className="text-sm text-gray-700 text-center">
      <strong>Main region:</strong>{" "}
      {formatName(generation.main_region.name)}
    </p>
  </div>

  <div className="rounded-md border bg-gray-50 p-4 space-y-3">
    <h2 className="font-semibold text-sm">
      Pokémon In This Generation
    </h2>

    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {generation.pokemon_species.map((p) => (
        <li key={p.name}>
          <Link
            href={`/pokemon/${p.name}`}
            className="block rounded border px-3 py-2 text-sm hover:bg-gray-100 text-center"
          >
            {formatName(p.name)}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>
);

}
