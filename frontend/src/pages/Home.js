const Home = () => (
  <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 className="text-4xl font-bold mb-4 text-blue-700">Welcome to ClinicApp</h1>
    <p className="text-lg text-gray-600 mb-6">A modern clinic management platform for doctors, patients, and admins.</p>
    <div className="flex gap-4">
      <a href="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</a>
      <a href="/register" className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Register</a>
    </div>
  </section>
);

export default Home; 