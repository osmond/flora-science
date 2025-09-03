export default function AddPlantForm() {
  return (
    <form className="space-y-4 p-4 rounded-lg bg-flora-bg dark:bg-flora-darkBg shadow-soft">
      <h2 className="font-scientific text-lg font-bold">Add a New Plant</h2>
      <input type="text" placeholder="Species" className="w-full p-2 border rounded" />
      <input type="text" placeholder="Pot Size" className="w-full p-2 border rounded" />
      <input type="text" placeholder="Light" className="w-full p-2 border rounded" />
      <button type="submit" className="bg-flora-leaf text-white px-4 py-2 rounded">Add Plant</button>
    </form>
  );
}
