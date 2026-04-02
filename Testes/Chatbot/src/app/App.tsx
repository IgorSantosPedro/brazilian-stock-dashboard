import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  options?: string[];
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensagem inicial
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
  }, []);

  const addBotMessage = (text: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'bot',
        timestamp: new Date(),
        options,
      };
      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
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
          'Posso esclarecer suas dúvidas sobre:\n\nQual tipo de cobertura você gostaria de saber?',
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
          '🏥 **Cobertura de Consultas**\n\nTodos os nossos planos incluem:\n- Clínico geral (ilimitado)\n- Cardiologia\n- Pediatria\n- Ginecologia\n- Ortopedia\n- Dermatologia\n- Oftalmologia\n- E mais de 30 especialidades!\n\nAgendamento online disponível 24h.',
          ['Agendar consulta', 'Ver especialidades completas', 'Voltar ao menu']
        );
        break;

      case 'Exames e procedimentos':
        addBotMessage(
          '🔬 **Cobertura de Exames**\n\n✅ Exames laboratoriais (sangue, urina, etc.)\n✅ Raio-X e ultrassom\n✅ Tomografia e ressonância (Premium e VIP)\n✅ Endoscopia\n✅ Ecocardiograma\n✅ Mamografia\n\nResultados online em até 24h!',
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
          '💳 **Solicitação de Carteirinha**\n\nPara solicitar sua carteirinha, preciso de algumas informações:\n\nVocê já é beneficiário?',
          ['Sim, sou beneficiário', 'Não, quero contratar']
        );
        break;

      case 'Sim, sou beneficiário':
        addBotMessage(
          'Perfeito! Para solicitar a 2ª via da carteirinha, informe:\n\n📱 Seu CPF\n📧 E-mail cadastrado\n\nA nova carteirinha será enviada em até 5 dias úteis no endereço cadastrado.\n\n*Digite "enviar dados" para falar com um atendente e concluir a solicitação.',
          ['Enviar dados por e-mail', 'Falar com atendente', 'Voltar ao menu']
        );
        break;

      case 'Não, quero contratar':
        addBotMessage(
          'Que ótimo! Vamos iniciar sua contratação.\n\nPrimeiro, vamos consultar os planos disponíveis?',
          ['Ver planos', 'Falar com consultor', 'Voltar ao menu']
        );
        break;

      case 'Agendar consulta':
        addBotMessage(
          '📅 **Agendamento de Consulta**\n\nVou te direcionar para nosso sistema de agendamento online.\n\nQual especialidade você precisa?',
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
          `Consultando disponibilidade para ${userOption}...\n\n✅ Horários disponíveis para esta semana:\n\n• Segunda-feira: 09h, 14h, 16h\n• Terça-feira: 10h, 15h, 17h\n• Quarta-feira: 08h, 11h, 16h30\n• Quinta-feira: 09h30, 14h, 15h30\n• Sexta-feira: 10h, 13h, 16h\n\n*Para confirmar o agendamento, fale com um atendente.`,
          ['Falar com atendente', 'Ver mais horários', 'Voltar ao menu']
        );
        break;

      case 'Falar com atendente':
        addBotMessage(
          '👤 **Transferindo para atendente humano**\n\nVocê será atendido em instantes!\n\n⏱ Tempo médio de espera: 2 minutos\n\n📞 Também pode ligar: 0800-123-4567\n💬 WhatsApp: (11) 98765-4321\n\nHorário de atendimento:\nSeg a Sex: 8h às 20h\nSáb: 8h às 14h',
          ['Aguardar atendente', 'Deixar mensagem', 'Voltar ao menu']
        );
        break;

      case 'Contratar agora':
        addBotMessage(
          '🎉 Excelente decisão!\n\nPara finalizar sua contratação com segurança, vou te conectar com nosso especialista.\n\nEle vai:\n✅ Confirmar seus dados\n✅ Explicar formas de pagamento\n✅ Enviar o contrato digital\n✅ Ativar seu plano imediatamente\n\nDeseja prosseguir?',
          ['Sim, continuar', 'Ver formas de pagamento', 'Voltar ao menu']
        );
        break;

      case 'Voltar ao menu':
      case 'Ver outros planos':
        addBotMessage(
          'Como posso ajudar você?',
          [
            'Consultar planos disponíveis',
            'Dúvidas sobre cobertura',
            'Solicitar carteirinha',
            'Agendar consulta',
            'Falar com atendente',
          ]
        );
        break;

      default:
        addBotMessage(
          'Desculpe, não entendi sua solicitação. Como posso ajudar?',
          [
            'Consultar planos disponíveis',
            'Dúvidas sobre cobertura',
            'Solicitar carteirinha',
            'Agendar consulta',
            'Falar com atendente',
          ]
        );
    }
  };

  return (
    <div className="size-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">ConvênioSaúde+</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-sm text-blue-100">Assistente Virtual Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-2xl rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-md'
                } p-4`}
              >
                <p className="whitespace-pre-line leading-relaxed">{message.text}</p>

                {message.options && message.options.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {message.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow-md p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>📞 0800-123-4567</span>
            <span>•</span>
            <span>💬 WhatsApp disponível</span>
            <span>•</span>
            <span>🕐 Seg-Sex 8h-20h</span>
          </div>
        </div>
      </div>
    </div>
  );
}