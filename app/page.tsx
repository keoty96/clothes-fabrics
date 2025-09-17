import MaterialForm from "./components/MaterialForm";


export default function Home() {
  return (
    <main className="bg-lime-200 text-pink-900 font-serif min-h-svh pt-16 flex flex-col gap-12">
      <h1 className="text-6xl text-center italic">Clothes Fabrics</h1>
      <MaterialForm />
    </main>
  );
}
