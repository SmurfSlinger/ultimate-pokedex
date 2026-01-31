import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import { formatName } from "@/app/utils/text";
import LearnedByPokemonClient from "../LearnedByPokemonClient";

type MoveResponse = {
  name: string;
  accuracy: number | null;
  power: number | null;
  pp: number;
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
    version_group: {
      name: string;
    };
  }[];
  learned_by_pokemon: {
    name: string;
  }[];
};

export default async function MoveDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const result = await fetch(
    `https://pokeapi.co/api/v2/move/${name}`
  );

  if (!result.ok) {
    throw new Error("Failed to fetch move");
  }

  const move: MoveResponse = await result.json();


  const flavorByVersion: Record<string, string> = {};

  move.flavor_text_entries
    .filter((f) => f.language.name === "en")
    .forEach((f) => {
      if (!flavorByVersion[f.version_group.name]) {
        flavorByVersion[f.version_group.name] =
          f.flavor_text.replace(/\f/g, " ");
      }
    });

  const learnedPokemon = move.learned_by_pokemon.map(
    (p) => p.name
  );
return (
<div className="mx-auto max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl px-3 sm:px-6 space-y-6">
  <BackButton />

  <div className="rounded-md border bg-gray-50 p-4">
    <h1 className="font-semibold text-lg text-center">
      {formatName(move.name)}
    </h1>
  </div>

  <div className="rounded-md border bg-gray-50 p-4">
    <div className="grid grid-cols-3 gap-4 text-center text-sm">
      <div>
        <div className="font-semibold mb-1">Accuracy</div>
        <div>{move.accuracy ?? "—"}</div>
      </div>
      <div>
        <div className="font-semibold mb-1">PP</div>
        <div>{move.pp}</div>
      </div>
      <div>
        <div className="font-semibold mb-1">Power</div>
        <div>{move.power ?? "—"}</div>
      </div>
    </div>
  </div>

  <div className="rounded-md border bg-gray-50 p-4 space-y-3">
    <h2 className="font-semibold text-sm">
      Flavor Text
    </h2>

    <ul className="space-y-4">
      {Object.entries(flavorByVersion).map(([version, text]) => (
        <li key={version} className="space-y-1">
          <div className="font-semibold text-sm">
            {formatName(version)}
          </div>
          <p className="text-sm text-gray-700">
            {text}
          </p>
        </li>
      ))}
    </ul>
  </div>

  <LearnedByPokemonClient pokemon={learnedPokemon} />
</div>
);


}
