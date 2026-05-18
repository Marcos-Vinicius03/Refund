import { useState } from 'react'
import { ArrowLeft, Upload } from 'lucide-react'

export default function SolicitacaoForm({
  solicitacoes,
  setSolicitacoes,
  onVoltar,
}) {
  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [descricao, setDescricao] = useState('')
  const [arquivo, setArquivo] = useState(null)

  const [erro, setErro] = useState('')

  function handleArquivo(e) {
    const file = e.target.files[0]

    if (!file) return

    const tiposPermitidos = ['image/png', 'image/jpeg', 'application/pdf']

    if (!tiposPermitidos.includes(file.type)) {
      setErro('Arquivo inválido')
      return
    }

    setErro('')
    setArquivo(file)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!titulo || !valor || !descricao || !categoria) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }

    const novaSolicitacao = {
      titulo,
      valor: `R$ ${Number(valor).toFixed(2)}`,
      categoria,
      descricao,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Pendente',
      arquivo: arquivo ? arquivo.name : 'Sem comprovante',
    }

    setSolicitacoes([novaSolicitacao, ...solicitacoes])

    onVoltar()
  }

  return (
    <div className="space-y-8">
      <button
        onClick={onVoltar}
        className="flex cursor-pointer items-center gap-2 text-lg font-medium text-gray-700 transition hover:text-gray-900"
      >
        <ArrowLeft size={22} />
        Voltar
      </button>

      <div>
        <h1 className="text-5xl font-bold text-gray-900">Nova Solicitação</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-3xl bg-white p-10 shadow-sm"
      >
        <div className="space-y-3">
          <label className="text-lg font-medium text-gray-800">Título</label>

          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-gray-900"
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <label className="text-lg font-medium text-gray-800">
              Valor (R$)
            </label>

            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className={`w-full rounded-2xl border px-5 py-4 outline-none transition ${
                erro ? 'border-red-500' : 'border-gray-300'
              }`}
            />

            {erro && <p className="text-red-500">Informe um valor válido.</p>}
          </div>

          <div className="space-y-3">
            <label className="text-lg font-medium text-gray-800">
              Categoria
            </label>

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-gray-900"
            >
              <option value="">Selecione uma categoria</option>

              <option>Alimentação</option>

              <option>Transporte</option>

              <option>Hospedagem</option>

              <option>Outros</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-lg font-medium text-gray-800">Descrição</label>

          <textarea
            rows="5"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-gray-900"
          />
        </div>

        <div className="space-y-3">
          <label className="text-lg font-medium text-gray-800">
            Anexar comprovante
          </label>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 px-6 py-14 text-center transition hover:border-gray-500">
            <Upload size={36} className="mb-4 text-gray-400" />

            <p className="text-lg font-medium text-gray-700">
              Clique ou arraste um arquivo
            </p>

            <p className="mt-2 text-sm text-gray-400">JPG, PNG ou PDF</p>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleArquivo}
              className="hidden"
            />
          </label>

          <div className="rounded-2xl bg-gray-100 px-5 py-4 text-gray-600">
            {arquivo ? arquivo.name : 'Nenhum arquivo selecionado'}
          </div>
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-[#0F172A] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
        >
          Enviar solicitação
        </button>
      </form>
    </div>
  )
}
