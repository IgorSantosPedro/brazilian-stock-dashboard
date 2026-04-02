import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  options?: string[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !initialized) {
      setInitialized(true);
      addBotMessage(
        'Olá! Seja bem-vindo(a) ao atendimento virtual do ConvênioSaúde+! 👋\n\nComo posso ajudar você hoje?',
        [
          'Consultar planos disponíveis',
          'Dúvidas sobre cobertura',
          'Solicitar carteirinha',
          'Agendar consulta',
          'Falar com atendente',
        ]
      );
    }
  }, [isOpen, initialized]);

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          sender: 'bot',
          timestamp: new Date(),
          options,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date(),
      },
    ]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    handleResponse(option);
  };

  const handleResponse = (userOption: string) => {
    switch (userOption) {
      case 'Consultar planos disponíveis':
        addBotMessage(
          'Temos 3 opções de planos para você:\n\n💼 **Plano Básico** - R$ 199/mês\n- Consultas ilimitadas\n- Exames básicos\n- Rede credenciada ampla\n\n💎 **Plano Premium** - R$ 349/mês\n- Tudo do Básico +\n- Internações\n- Cirurgias\n- Exames complexos\n\n⭐ **Plano VIP** - R$ 549/mês\n- Tudo do Premium +\n- Atendimento domiciliar\n- Rede internacional\n- Sem carência\n\nQual plano deseja conhecer melhor?',
          ['Plano Básico', 'Plano Premium', 'Plano VIP', 'Voltar ao menu']
        );
        break;

      case 'Plano Básico':
      case 'Plano Premium':
      case 'Plano VIP':
        addBotMessage(
          `Excelente escolha! O ${userOption} é ideal para quem busca ${
            userOption === 'Plano Básico'
              ? 'um plano completo com ótimo custo-benefício'
              : userOption === 'Plano Premium'
              ? 'cobertura completa para toda a família'
              : 'o máximo em atendimento de saúde sem preocupações'
          }.\n\nGostaria de contratar ou tirar mais dúvidas?`,
          ['Contratar agora', 'Mais informações', 'Ver outros planos', 'Voltar ao menu']
        );
        break;

      case 'Dúvidas sobre cobertura':
        addBotMessage(
          'Posso esclarecer suas dúvidas sobre cobertura.\n\nQual tipo você gostaria de saber?',
          [
            'Consultas e especialidades',
            'Exames e procedimentos',
            'Internação e cirurgias',
            'Atendimento de emergência',
            'Voltar ao menu',
          ]
        );
        break;

      case 'Consultas e especialidades':
        addBotMessage(
          '🏥 **Cobertura de Consultas**\n\nTodos os planos incluem:\n- Clínico geral (ilimitado)\n- Cardiologia\n- Pediatria\n- Ginecologia\n- Ortopedia\n- Dermatologia\n- Oftalmologia\n- +30 especialidades!\n\nAgendamento online disponível 24h.',
          ['Agendar consulta', 'Ver especialidades completas', 'Voltar ao menu']
        );
        break;

      case 'Exames e procedimentos':
        addBotMessage(
          '🔬 **Cobertura de Exames**\n\n✅ Exames laboratoriais\n✅ Raio-X e ultrassom\n✅ Tomografia e ressonância (Premium e VIP)\n✅ Endoscopia\n✅ Ecocardiograma\n✅ Mamografia\n\nResultados online em até 24h!',
          ['Onde fazer exames', 'Voltar ao menu']
        );
        break;

      case 'Internação e cirurgias':
        addBotMessage(
          '🏨 **Cobertura de Internação**\n\nPlanos Premium e VIP incluem:\n✅ Internação em quarto privativo\n✅ Cirurgias de todas as especialidades\n✅ UTI\n✅ Materiais e medicamentos\n✅ Acompanhante 24h\n\n*Sujeito a carência de 180 dias (exceto urgências)',
          ['Hospitais credenciados', 'Voltar ao menu']
        );
        break;

      case 'Atendimento de emergência':
        addBotMessage(
          '🚨 **Atendimento de Emergência**\n\nDisponível 24/7 em todos os planos:\n✅ Pronto-socorro\n✅ Atendimento de urgência\n✅ Ambulância (Premium e VIP)\n\n*Sem carência para urgências e emergências',
          ['Unidades de emergência', 'Voltar ao menu']
        );
        break;

      case 'Solicitar carteirinha':
        addBotMessage(
          '💳 **Solicitação de Carteirinha**\n\nVocê já é beneficiário?',
          ['Sim, sou beneficiário', 'Não, quero contratar']
        );
        break;

      case 'Sim, sou beneficiário':
        addBotMessage(
          'Para solicitar a 2ª via, informe:\n\n📱 Seu CPF\n📧 E-mail cadastrado\n\nA carteirinha será enviada em até 5 dias úteis.\n\n*Digite com um atendente para concluir.',
          ['Enviar dados por e-mail', 'Falar com atendente', 'Voltar ao menu']
        );
        break;

      case 'Não, quero contratar':
        addBotMessage(
          'Que ótimo! Vamos consultar os planos disponíveis?',
          ['Ver planos', 'Falar com consultor', 'Voltar ao menu']
        );
        break;

      case 'Agendar consulta':
        addBotMessage(
          '📅 **Agendamento de Consulta**\n\nQual especialidade você precisa?',
          [
            'Clínico Geral',
            'Cardiologia',
            'Pediatria',
            'Ortopedia',
            'Outras especialidades',
            'Voltar ao menu',
          ]
        );
        break;

      case 'Clínico Geral':
      case 'Cardiologia':
      case 'Pediatria':
      case 'Ortopedia':
        addBotMessage(
          `Horários disponíveis para ${userOption} esta semana:\n\n• Segunda: 09h, 14h, 16h\n• Terça: 10h, 15h, 17h\n• Quarta: 08h, 11h, 16h30\n• Quinta: 09h30, 14h, 15h30\n• Sexta: 10h, 13h, 16h\n\n*Fale com um atendente para confirmar.`,
          ['Falar com atendente', 'Ver mais horários', 'Voltar ao menu']
        );
        break;

      case 'Falar com atendente':
        addBotMessage(
          '👤 **Transferindo para atendente**\n\nVocê será atendido em instantes!\n\n⏱ Espera média: 2 minutos\n\n📞 0800-123-4567\n💬 WhatsApp: (11) 98765-4321\n\nSeg a Sex: 8h às 20h | Sáb: 8h às 14h',
          ['Aguardar atendente', 'Deixar mensagem', 'Voltar ao menu']
        );
        break;

      case 'Contratar agora':
        addBotMessage(
          '🎉 Excelente decisão!\n\nNosso especialista vai:\n✅ Confirmar seus dados\n✅ Explicar formas de pagamento\n✅ Enviar o contrato digital\n✅ Ativar seu plano imediatamente\n\nDeseja prosseguir?',
          ['Sim, continuar', 'Ver formas de pagamento', 'Voltar ao menu']
        );
        break;

      case 'Voltar ao menu':
      case 'Ver outros planos':
      case 'Ver planos':
        addBotMessage('Como posso ajudar você?', [
          'Consultar planos disponíveis',
          'Dúvidas sobre cobertura',
          'Solicitar carteirinha',
          'Agendar consulta',
          'Falar com atendente',
        ]);
        break;

      default:
        addBotMessage('Desculpe, não entendi sua solicitação. Como posso ajudar?', [
          'Consultar planos disponíveis',
          'Dúvidas sobre cobertura',
          'Solicitar carteirinha',
          'Agendar consulta',
          'Falar com atendente',
        ]);
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-3rem)] h-[580px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm">ConvênioSaúde+</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse"></span>
                  <p className="text-xs text-teal-100">Assistente Virtual • Online</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Fechar chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] ${
                    message.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-2xl rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100'
                  } p-3`}
                >
                  <p className="whitespace-pre-line leading-relaxed text-sm">{message.text}</p>

                  {message.options && message.options.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="w-full text-left px-3 py-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-100 hover:border-teal-300 transition-all duration-150 text-sm font-medium"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="text-xs opacity-50 mt-1.5">
                    {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 p-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <p className="text-center text-xs text-gray-400">📞 0800-123-4567 • Seg-Sex 8h-20h</p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center group"
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {/* Notification dot */}
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
          </>
        )}
      </button>
    </>
  );
}
