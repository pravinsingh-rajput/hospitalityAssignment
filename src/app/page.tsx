import HospitalityExplorer from "./components/hospitality-explorer";

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50  to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-950 mb-2 tracking-tighter">
            Hospitality Experience Explorer
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse and filter hositality experince and projects
          </p>
        </div>

        <HospitalityExplorer />
      </div>
    </main>
  );
};

export default Home;
