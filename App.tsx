import React, { useState, useEffect, useCallback } from 'react';
// FIX: The errors suggest a module resolution issue with react-router-dom. Using a namespace import is a potential workaround for such issues.
import * as ReactRouterDOM from 'react-router-dom';
import { Home, Users, HeartPulse, UserPlus, GitCommitHorizontal, BookOpen, Menu, X, FileCode, ChevronRight } from 'lucide-react';

import DashboardPage from './pages/DashboardPage';
import PatientsListPage from './pages/PatientsListPage';
import PairsListPage from './pages/PairsListPage';
import PatientDetailPage from './pages/PatientDetailPage';
import PairDetailPage from './pages/PairDetailPage';
import RegisterPatientPage from './pages/RegisterPatientPage';
import UserManualPage from './pages/UserManualPage';
import DevPromptPage from './pages/DevPromptPage';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navLinkClasses = "group flex items-center px-4 py-3.5 text-slate-600 hover:bg-slate-50 hover:text-primary-600 rounded-xl transition-all duration-200 mx-2 font-medium";
  const activeLinkClasses = "bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100";
  const location = ReactRouterDOM.useLocation();

  // Close sidebar on navigation
  useEffect(() => {
    onClose();
  }, [location, onClose]);


  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      
      <aside className={`w-72 bg-white border-r border-slate-200 flex flex-col fixed top-0 left-0 h-full z-30 transform transition-transform duration-300 ease-out lg:translate-x-0 shadow-xl lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center bg-gradient-to-b from-white to-slate-50/50">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-2.5 rounded-xl shadow-lg shadow-primary-500/30">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">TransplantFlow</h1>
                <p className="text-xs text-primary-600 font-semibold tracking-wide uppercase mt-1">Medical Suite</p>
              </div>
            </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-slate-800 transition-colors" aria-label="Close menu">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <div className="px-4 pb-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Main Menu</p>
          </div>
          
          <ReactRouterDOM.NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`} end>
            <Home className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" /> 
            Dashboard
            {location.pathname === '/' && <ChevronRight className="w-4 h-4 ml-auto text-primary-400" />}
          </ReactRouterDOM.NavLink>
          
          <ReactRouterDOM.NavLink to="/patients" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
            <Users className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" /> 
            Patients
             {location.pathname.includes('/patients') && <ChevronRight className="w-4 h-4 ml-auto text-primary-400" />}
          </ReactRouterDOM.NavLink>
          
          <ReactRouterDOM.NavLink to="/pairs" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
            <GitCommitHorizontal className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" /> 
            Pairs
             {location.pathname.includes('/pairs') && <ChevronRight className="w-4 h-4 ml-auto text-primary-400" />}
          </ReactRouterDOM.NavLink>
          
          <ReactRouterDOM.NavLink to="/register" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
            <UserPlus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" /> 
            Register Patient
             {location.pathname === '/register' && <ChevronRight className="w-4 h-4 ml-auto text-primary-400" />}
          </ReactRouterDOM.NavLink>

          <div className="px-4 py-4 mt-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resources</p>
          </div>

          <ReactRouterDOM.NavLink to="/manual" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
              <BookOpen className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" /> 
              User Manual
          </ReactRouterDOM.NavLink>
          
          <ReactRouterDOM.NavLink to="/dev-prompt" className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}>
              <FileCode className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" /> 
              Dev Prompt
          </ReactRouterDOM.NavLink>
        </nav>
        
        <div className="p-4 m-2 bg-slate-50 rounded-xl border border-slate-100">
           <div className="flex items-center space-x-3 mb-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-xs font-medium text-slate-600">System Operational</p>
           </div>
          <p className="text-[10px] text-center text-slate-400">&copy; 2024 TransplantFlow v2.0</p>
        </div>
      </aside>
    </>
  );
};

const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => (
    <header className="sticky top-0 lg:hidden bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 z-20 flex items-center shadow-sm">
        <button onClick={onMenuClick} className="text-slate-600 hover:text-slate-900 transition-colors" aria-label="Open menu">
            <Menu className="h-6 w-6" />
        </button>
        <div className="flex-1 text-center pr-6"> {/* pr-6 to offset menu button space */}
            <div className="flex items-center justify-center space-x-2">
                <HeartPulse className="h-6 w-6 text-primary-600" />
                <h1 className="text-lg font-bold text-slate-800">TransplantFlow</h1>
            </div>
        </div>
    </header>
);

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <ReactRouterDOM.HashRouter>
      <div className="flex h-screen bg-slate-50 font-sans">
        <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
        <main className="flex-1 lg:ml-72 overflow-y-auto w-full scroll-smooth">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="animate-fade-in">
                <ReactRouterDOM.Routes>
                <ReactRouterDOM.Route path="/" element={<DashboardPage />} />
                <ReactRouterDOM.Route path="/patients" element={<PatientsListPage />} />
                <ReactRouterDOM.Route path="/patients/:id" element={<PatientDetailPage />} />
                <ReactRouterDOM.Route path="/pairs" element={<PairsListPage />} />
                <ReactRouterDOM.Route path="/pairs/:id" element={<PairDetailPage />} />
                <ReactRouterDOM.Route path="/register" element={<RegisterPatientPage />} />
                <ReactRouterDOM.Route path="/manual" element={<UserManualPage />} />
                <ReactRouterDOM.Route path="/dev-prompt" element={<DevPromptPage />} />
                </ReactRouterDOM.Routes>
            </div>
          </div>
        </main>
      </div>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;