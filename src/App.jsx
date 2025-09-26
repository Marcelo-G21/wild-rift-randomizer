import { useState } from 'react';

function importAll(glob) {
  return Object.entries(glob).map(([path, mod]) => {
    const src = typeof mod === 'string' ? mod : mod.default;
    const fileName = path
      .split('/')
      .pop()
      .replace(/\.[^/.]+$/, '');
    return { name: fileName, src };
  });
}

const champions = importAll(
  import.meta.glob('./assets/champions/*.{png,jpg,jpeg,webp}', { eager: true }),
);
const spells = importAll(
  import.meta.glob('./assets/spells/*.{png,jpg,jpeg,webp}', { eager: true }),
);
const boots = importAll(import.meta.glob('./assets/boots/*.{png,jpg,jpeg,webp}', { eager: true }));
const items = importAll(import.meta.glob('./assets/items/*.{png,jpg,jpeg,webp}', { eager: true }));
const runes = importAll(import.meta.glob('./assets/runes/*.{png,jpg,jpeg,webp}', { eager: true }));

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomUnique = (arr, count) => {
  const copy = [...arr];
  const result = [];
  while (result.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
};

function App() {
  const [build, setBuild] = useState(generateBuild());

  function generateBuild() {
    return {
      champion: getRandomElement(champions),
      spells: getRandomUnique(spells, 2),
      boots: getRandomElement(boots),
      items: getRandomUnique(items, 5),
      rune: getRandomElement(runes),
    };
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-xl md:text-3xl font-bold mb-6 ">Wild Rift Build Random</h1>

      {/* Campeón */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={build.champion.src}
          alt={build.champion.name}
          className="w-14 h-14 md:w-22 md:h-22"
        />
        <p className="mt-2 text-lg font-semibold">{build.champion.name}</p>
      </div>

      {/* Hechizos */}
      <div className="flex gap-6 mb-6">
        {build.spells.map((spell, i) => (
          <div key={i} className="flex flex-col items-center">
            <img src={spell.src} alt={spell.name} className="w-10 h-10 md:w-16 md:h-16" />
            <p className="mt-1 text-sm">{spell.name}</p>
          </div>
        ))}
      </div>

      {/* Botas */}
      <div className="flex flex-col items-center mb-6">
        <img src={build.boots.src} alt={build.boots.name} className="w-10 h-10 md:w-16 md:h-16" />
        <p className="mt-2 text-sm">{build.boots.name}</p>
      </div>

      {/* Ítems */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {build.items.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <img src={item.src} alt={item.name} className="w-10 h-10 md:w-14 md:h-14" />
            <p className="mt-1 text-xs text-center">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Runa */}
      <h2 className="text-2xl font-semibold mb-2">Runa</h2>
      <div className="flex flex-col items-center mb-6">
        <img src={build.rune.src} alt={build.rune.name} className="w-10 h-10 md:w-14 md:h-14" />
        <p className="mt-1 text-sm">{build.rune.name}</p>
      </div>

      {/* Botón */}
      <button
        onClick={() => setBuild(generateBuild())}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
      >
        Generar Nuevo
      </button>
    </div>
  );
}

export default App;
