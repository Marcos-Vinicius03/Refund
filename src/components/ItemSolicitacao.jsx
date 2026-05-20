import { Paperclip } from 'lucide-react'

export default function ItemSolicitacao({
  titulo,
  categoria,
  valor,
  data,
  status,
  arquivo,
}) {
  const statusClasses = {
    Pendente: 'bg-yellow-100 text-yellow-700',
    Aprovado: 'bg-green-100 text-green-700',
    Recusado: 'bg-red-100 text-red-700',
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {categoria}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>{valor}</span>

            <span>{data}</span>

            <div className="flex items-center gap-1">
              <Paperclip size={16} />

              <span>{arquivo}</span>
            </div>
          </div>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${statusClasses[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  )
}
