import Link from "next/link";

export default function AppGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <a href="https://itzkore.cz/cybersurvivor" target="_blank" rel="noopener noreferrer"
         className="block rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
        <div className="h-32 rounded-md bg-black/60 border border-white/10 flex items-center justify-center text-gray-400">
          CyberSurvivor – náhled
        </div>
        <h3 className="mt-3 text-lg font-semibold text-neonCyan drop-shadow-neonCyan">CyberSurvivor</h3>
        <p className="text-sm text-gray-300">Akční survival minihra dostupná online.</p>
      </a>
      {/* Další appky přidáme později */}
    </div>
  );
}
