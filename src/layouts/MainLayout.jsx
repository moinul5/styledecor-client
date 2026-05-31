import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Navbar will be added in Milestone 2 */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer will be added in Milestone 2 */}
    </div>
  );
};

export default MainLayout;
