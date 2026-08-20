// A CONFIG DE CURSO — o que muda entre SKUs mora AQUI e só aqui.

export const curso = {
  sku: 'curso-reinounido-es',
  /** Idioma do comprador (a voz-guia). Espanhol PENINSULAR — o turista espanhol no Reino Unido. */
  buyerLang: 'es',
  /** Idioma do destino (a fala nativa ensinada). Inglês BRITÂNICO — reusa a
   * camada-alvo criada em curso-reinounido-fr. Derivação: só a camada de guia
   * (espanhola peninsular) é nova. */
  targetLang: 'en',
  translatorPair: { sl: 'es', tl: 'en' },
  destCurrency: 'GBP',
  /** O comprador espanhol usa euro; o destino, libra. Conversão real. */
  homeCurrencies: ['EUR'] as string[],
  timeZone: 'Europe/London',
  cidadeExibicao: 'Londres',
  /**
   * Faixas do dia, narradas em ESPANHOL, sobre o ritmo BRITÂNICO. Aqui o
   * choque é o MAIOR do catálogo: o espanhol janta às 21h-22h, o britânico
   * às 18h-19h30 — quase duas horas de diferença, e a cozinha já fechou bem
   * antes do que ele espera. PROVISÓRIO, revisar antes de tratar como padrão.
   */
  faixasNow: [
    { de: 0, linha: 'Las cocinas están cerradas, pero un kebab o una chip shop de madrugada todavía te salvan.' },
    { de: 5 * 60, linha: 'Casi nada abre aún. Las cafeterías y las grandes cadenas abren sobre las seis.' },
    { de: 7 * 60, linha: 'Breakfast: un full English caliente, o simplemente café y tostadas. Aquí se desayuna pronto.' },
    { de: 9 * 60 + 30, linha: 'Mañana tranquila. Las cafeterías sirven café y bollería — vas pronto, no tarde.' },
    { de: 11 * 60 + 30, linha: 'Empieza el lunch. A menudo un meal deal (sándwich + snack + bebida) o un plato de pub, rápido.' },
    { de: 12 * 60, linha: 'Hora del lunch: hasta las 14h se llena todo deprisa. Más ligero y más rápido que en casa.' },
    { de: 14 * 60, linha: 'El lunch va cayendo. Las cafeterías siguen abiertas para un té y un pastel — el famoso afternoon tea.' },
    { de: 16 * 60, linha: 'El hueco tranquilo antes de la noche. Un té o una pinta temprana en el pub hacen esperar.' },
    { de: 17 * 60, linha: 'After-work en el pub: la primera pinta de la noche, muchas veces antes incluso de cenar.' },
    { de: 18 * 60, linha: 'Dinnertime: aquí se cena PRONTO — casi cuatro horas antes que en España. Las cocinas ya van a tope.' },
    { de: 20 * 60 + 30, linha: 'La cena se acaba. Muchas cocinas cierran antes de lo que crees — pregunta por la last order.' },
    { de: 22 * 60 + 30, linha: 'Tarde. El pub sigue sirviendo bebida (last orders ~23h), pero la cocina suele estar ya cerrada.' }
  ] as { de: number; linha: string }[]
} as const;

export type CursoConfig = typeof curso;
