import { Routes, Route } from 'react-router-dom';
import ServicePage from './pages/ServicePage.jsx';
import CookiePolicy from './pages/CookiePolicy.jsx';
import TermsOfUse from './pages/TermsOfUse.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';

const DEFAULT_POST_ID = import.meta.env.VITE_APP_POST_ID || '30001';

export default function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<ServicePage id={DEFAULT_POST_ID} />} 
      />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
