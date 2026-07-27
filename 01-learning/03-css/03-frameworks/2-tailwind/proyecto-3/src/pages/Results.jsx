import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import ResultCard from "../components/ResultCard";
import SentimentBadge from "../components/SentimentBadge";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  useEffect(() => {
    if (!state?.result) navigate("/", { replace: true });
  }, [state, navigate]);

  if (!state?.result) return null;

  const { result, originalText } = state;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <button
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-1 text-sm font-medium text-neutral transition-colors hover:text-primary"
      >
        &larr; Nuevo análisis
      </button>

      <div className="flex flex-col gap-6">
        {/* Resumen */}
        <ResultCard icon="📝" title="Resumen">
          <p className="leading-relaxed text-gray-700">{result.summary}</p>
        </ResultCard>

        {/* Sentimiento */}
        <ResultCard icon="💡" title="Sentimiento">
          <div className="flex flex-col gap-2">
            <SentimentBadge sentiment={result.sentiment} />
            {result.sentimentExplanation && (
              <p className="text-sm leading-relaxed text-gray-600">
                {result.sentimentExplanation}
              </p>
            )}
          </div>
        </ResultCard>

        {/* Ideas Clave */}
        <ResultCard icon="🔑" title="Ideas Clave">
          <ul className="flex flex-col gap-2">
            {result.keyIdeas.map((idea, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {idea}
              </li>
            ))}
          </ul>
        </ResultCard>

        {/* Texto original (colapsable) */}
        <details className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <summary className="cursor-pointer font-semibold text-gray-900">
            Ver texto original
          </summary>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
            {originalText}
          </p>
        </details>
      </div>
    </div>
  );
}
