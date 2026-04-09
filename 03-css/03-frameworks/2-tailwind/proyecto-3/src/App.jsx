import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Results from "./pages/Results";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
