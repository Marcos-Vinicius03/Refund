export default function Paginacao({
  paginaAtual,
  totalPaginas,
  paginaAnterior,
  proximaPagina,
}) {
  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
      <button
        onClick={paginaAnterior}
        disabled={paginaAtual === 1}
        className="cursor-pointer rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Anterior
      </button>

      <span className="text-sm text-gray-900">
        Página {paginaAtual} de {totalPaginas || 1}
      </span>

      <button
        onClick={proximaPagina}
        disabled={paginaAtual === totalPaginas || totalPaginas === 0}
        className="cursor-pointer rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}