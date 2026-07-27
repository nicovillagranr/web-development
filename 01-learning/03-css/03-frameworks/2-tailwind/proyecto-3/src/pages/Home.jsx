import { useState } from "react";
import { useNavigate } from "react-router";
import TextForm from "../components/TextForm";
import Loader from "../components/Loader";
import { analyzeText } from "../services/analyzeText";

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (text) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeText(text);
      navigate("/results", { state: { result, originalText: text } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-12">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          AI Text Analyzer
        </h1>
        <p className="text-lg text-neutral">
          Ingresá un texto y obtene un resumen, análisis de sentimiento e ideas clave.
        </p>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <TextForm onSubmit={handleAnalyze} isLoading={isLoading} />
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-negative/20 bg-negative/5 p-4 text-sm text-negative">
          {error}
        </div>
      )}
    </div>
  );
}
