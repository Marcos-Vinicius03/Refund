import { useEffect, useState } from 'react'
import ListaSolicitacoes from './components/ListaSolicitacoes'
import SolicitacaoForm from './components/SolicitacaoForm'

export default function App() {
  const [telaAtiva, setTelaAtiva] = useState('lista')

  const [solicitacoes, setSolicitacoes] = useState([
    {
      titulo: 'Almoço com cliente',
      categoria: 'Alimentação',
      valor: 'R$ 150,00',
      descricao: 'Reunião externa',
      data: '12/05/2025',
      status: 'Pendente',
      arquivo: 'comprovante.pdf',
    },
    {
      titulo: 'Uber para reunião',
      categoria: 'Transporte',
      valor: 'R$ 42,90',
      descricao: 'Corrida para reunião',
      data: '10/05/2025',
      status: 'Aprovado',
      arquivo: 'uber.png',
    },
    {
      titulo: 'Hotel em São Paulo',
      categoria: 'Hospedagem',
      valor: 'R$ 890,00',
      descricao: 'Evento corporativo',
      data: '08/05/2025',
      status: 'Aprovado',
      arquivo: 'hotel.pdf',
    },
    {
      titulo: 'Material de escritório',
      categoria: 'Outros',
      valor: 'R$ 75,30',
      descricao: 'Compra de materiais',
      data: '05/05/2025',
      status: 'Recusado',
      arquivo: 'nota.pdf',
    },
    {
      titulo: 'Jantar de equipe',
      categoria: 'Alimentação',
      valor: 'R$ 320,00',
      descricao: 'Confraternização',
      data: '02/05/2025',
      status: 'Pendente',
      arquivo: 'jantar.png',
    },
  ])

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('solicitacoes')

    if (dadosSalvos) {
      setSolicitacoes(JSON.parse(dadosSalvos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes))
  }, [solicitacoes])

  return (
    <div className="min-h-screen bg-[#F3F4F6] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {telaAtiva === 'lista' ? (
          <ListaSolicitacoes
            solicitacoes={solicitacoes}
            onNovaSolicitacao={() => setTelaAtiva('form')}
          />
        ) : (
          <SolicitacaoForm
            solicitacoes={solicitacoes}
            setSolicitacoes={setSolicitacoes}
            onVoltar={() => setTelaAtiva('lista')}
          />
        )}
      </div>
    </div>
  )
}
