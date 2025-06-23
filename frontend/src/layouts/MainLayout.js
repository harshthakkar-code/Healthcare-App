import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => (
  <div>
    <Navbar />
    <main className="max-w-7xl mx-auto p-4">{children}</main>
  </div>
);

export default MainLayout; 