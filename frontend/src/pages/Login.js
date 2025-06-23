const Login = () => (
  <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" className="w-full border px-3 py-2 rounded" placeholder="Enter your email" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Enter your password" />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
    </form>
  </div>
);

export default Login; 