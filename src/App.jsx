import { Routes, Route } from 'react-router-dom';
import ServicePage from './pages/ServicePage.jsx';

export default function App() {
  return (
    <Routes>
      {/* Пример: /service/30001 — тип поста и id как в endpoint dotsoft.gr */}
      <Route path="/service/:id" element={<ServicePage type="service" />} />
      <Route path="/:type/:id" element={<ServicePage />} />
      <Route path="/" element={<ServicePage type="service" id="30001" />} />
    </Routes>
  );
}
