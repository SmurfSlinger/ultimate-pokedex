import PokemonListClient from "./PokemonListClient"


type PokemonListResponse = {
  results: { name: string }[];
};

export default async function PokemonPage() {
  const result = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=1300", { cache: "force-cache" }
  );

  if (!result.ok) {
    throw new Error("Failed to fetch Pokémon");
  }

  const data: PokemonListResponse = await result.json();

  const pokemonNames = data.results.map((p) => p.name);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 rounded-lg border bg-gray-50 p-4">Pokémon</h1>
      <PokemonListClient pokemon={pokemonNames} />
    </div>
  );
}