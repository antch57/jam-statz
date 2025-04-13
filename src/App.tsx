import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-brand-bg-dark via-brand-bg-light to-brand-bg-dark">
      {/* Header */}
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gradient-to-br from-brand-bg-dark via-brand-bg-light to-brand-bg-dark p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-center text-brand-text-primary mb-4">Welcome to Jam Statz</h2>
          <p className="text-center text-brand-text-secondary mb-4">Your one-stop solution for all your statistics needs.</p>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-lg shadow-md">Feature 1</li>
            <li className="bg-white p-4 rounded-lg shadow-md">Feature 2</li>
            <li className="bg-white p-4 rounded-lg shadow-md">Feature 3</li>
          </ul>
        </div>
      </div>

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
