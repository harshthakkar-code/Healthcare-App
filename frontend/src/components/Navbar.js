import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-white shadow px-4 py-2 flex items-center justify-between">
    <div className="font-bold text-xl text-blue-600">ClinicApp</div>
    <div className="space-x-4">
      <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
      <Link to="/doctor/dashboard" className="text-gray-700 hover:text-blue-600">Doctor</Link>
      <Link to="/patient/dashboard" className="text-gray-700 hover:text-blue-600">Patient</Link>
      <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">Admin</Link>
      <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
    </div>
  </nav>
);

export default Navbar; 