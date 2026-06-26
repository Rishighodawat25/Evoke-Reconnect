import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LeadPage from './pages/LeadPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import AdminImport from './pages/AdminImport';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/import" element={<AdminImport />} />

        {/* Lead personalized pages */}
        <Route path="/:slug" element={<LeadPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
