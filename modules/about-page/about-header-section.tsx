export function AboutHeaderSection() {
  return (
    <header className="flex flex-col md:flex-row md:items-start md:justify-evenly md:gap-24">
      <h1 className="w-md max-w-full font-semibold uppercase text-2xl">About</h1>
      <div className="hidden w-80 shrink-0 md:block" aria-hidden />
    </header>
  );
}
