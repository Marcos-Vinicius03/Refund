import { useState } from 'react'
import ItemSolicitacao from './ItemSolicitacao'
import Paginacao from './Paginacao'
import { Search, Plus } from 'lucide-react'

export default function ListaSolicitacoes({ solicitacoes, onNovaSolicitacao }) {
  const [busca, setBusca] = useState('')
  const [paginaAtual, setPaginaAtual] = useState(1)

  const itensPorPagina = 5

  const solicitacoesFiltradas = solicitacoes.filter((item) =>
    item.titulo.toLowerCase().includes(busca.toLowerCase()),
  )

  const indiceInicial = (paginaAtual - 1) * itensPorPagina
  const indiceFinal = indiceInicial + itensPorPagina

  const itensPagina = solicitacoesFiltradas.slice(indiceInicial, indiceFinal)

  const totalPaginas = Math.ceil(solicitacoesFiltradas.length / itensPorPagina)

  function paginaAnterior() {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1)
    }
  }

  function proximaPagina() {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-900">Reembolsos</h1>
        </div>

        <button
          onClick={onNovaSolicitacao}
          disabled={false} // ou uma condição real
          className={`flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white transition hover:opacity-90 ${
            false
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-[#0F172A] cursor-pointer'
          }`}
        >
          <Plus size={20} />
          Nova solicitação
        </button>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3 focus-within:border-gray-900">
          <Search size={20} className="text-gray-400" />

          <input
            type="text"
            placeholder="Buscar por título..."
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value)
              setPaginaAtual(1)
            }}
            className="w-full bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="space-y-5">
        {itensPagina.length > 0 ? (
          itensPagina.map((item, index) => (
            <ItemSolicitacao
              key={index}
              titulo={item.titulo}
              categoria={item.categoria}
              valor={item.valor}
              data={item.data}
              status={item.status}
              arquivo={item.arquivo}
            />
          ))
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">Nenhuma solicitação encontrada.</p>
          </div>
        )}
      </div>

      <Paginacao
        paginaAtual={paginaAtual}
        totalPaginas={totalPaginas}
        paginaAnterior={paginaAnterior}
        proximaPagina={proximaPagina}
      />
    </div>
  )
}
