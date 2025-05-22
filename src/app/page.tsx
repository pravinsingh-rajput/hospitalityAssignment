import HospitalityExplorer from "./components/hospitality-explorer";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-gray-950 mb-2">
          Hospitality Experience Explorer
        </h1>
        <p className="text-gray-600 mb-8">
          Browse and filter hositality experince and projects
        </p>
        <HospitalityExplorer />
      </div>
    </main>
  );
};

export default Home;
