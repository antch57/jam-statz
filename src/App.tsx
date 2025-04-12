import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-brand-bg-dark via-brand-bg-light to-brand-bg-dark">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 overflow-auto space-y-6 max-w-6xl mx-auto w-full px-4">
        {/* Your content goes here */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;