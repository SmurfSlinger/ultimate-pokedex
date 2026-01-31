import MoveListClient from "./MoveListClient";

type MoveListResponse = {
  results: { name: string }[];
};

export default async function MovesPage() {
  const result = await fetch(
    "https://pokeapi.co/api/v2/move?limit=1000", { cache: "force-cache" }
  );

  if (!result.ok) {
    throw new Error("Failed to fetch moves");
  }

  const data: MoveListResponse = await result.json();
  const moveNames = data.results.map((m) => m.name);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Moves</h1>
      <MoveListClient moves={moveNames} />
    </div>
  );
}