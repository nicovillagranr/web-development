import { useState } from "react";

export default function TextForm({ onSubmit, isLoading }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) onSubmit(text.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pegue o escriba el texto que desea analizar..."
        rows={8}
        className="w-full resize-none rounded-2xl border border-gray-200 bg-white p-4 text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral">
          {text.length > 0 ? `${text.length} caracteres` : ""}
        </span>
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="rounded-xl bg-primary px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Analizando..." : "Analizar"}
        </button>
      </div>
    </form>
  );
}
