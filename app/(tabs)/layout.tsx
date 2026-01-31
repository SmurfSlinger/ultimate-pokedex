import Link from "next/link";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <div>
       
    
      <nav className="flex gap-4 border-b p-4 justify-center">
        <Link href="/pokemon" className="font-medium">
          Pokémon
        </Link>
        <Link href="/locations" className="font-medium">
          Locations
        </Link>
        <Link href="/moves" className="font-medium">
          Moves
        </Link>
        <Link href="/generations" className="font-medium">
          Generations
        </Link>
      </nav>
      

      <main>{children}</main>
      
    </div>
    
  );
}