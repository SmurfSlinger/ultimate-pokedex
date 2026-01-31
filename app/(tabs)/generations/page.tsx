import GenerationListClient from "./GenerationListClient";

type GenerationListResponse = {
  results: { name: string }[];
};

export default async function GenerationsPage() {
  const result = await fetch(
    "https://pokeapi.co/api/v2/generation", { cache: "force-cache" }
  );

  if (!result.ok) {
    throw new Error("Failed to fetch generations");
  }

  const data: GenerationListResponse = await result.json();
  const generationNames = data.results.map((g) => g.name);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        Generations
      </h1>

      <GenerationListClient generations={generationNames} />
    </div>
  );
}
