function Header() {
  return (
    <header className="relative w-full h-96 overflow-hidden border-b border-brand-surface-border backdrop-blur-md z-10">
      <img
        src="/src/assets/band.png"
        alt="Live Band Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-5xl font-bold tracking-wide drop-shadow-lg">JamStats</h1>
        <p className="text-white text-xl mt-2 font-light drop-shadow">– track live shows –</p>
      </div>
    </header>
  );
}

export default Header;
