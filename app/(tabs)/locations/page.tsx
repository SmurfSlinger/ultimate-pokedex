import LocationListClient from "./LocationListClient";

type LocationListResponse = {
  results: { name: string }[];
};

export default async function LocationsPage() {
  const result = await fetch(
    "https://pokeapi.co/api/v2/location?limit=1000", { cache: "force-cache" }
  );

  if (!result.ok) {
    throw new Error("Failed to fetch locations");
  }

  const data: LocationListResponse = await result.json();
  const locationNames = data.results.map((l) => l.name);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Locations</h1>
      <LocationListClient locations={locationNames} />
    </div>
  );
}
