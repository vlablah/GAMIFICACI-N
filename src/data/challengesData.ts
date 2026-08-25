import { ChallengeDefinition } from '../types';

export const CHALLENGES_DATA: ChallengeDefinition[] = [
  {
    id: 1,
    code: 'EXP-001',
    title: 'Expediente 1: El vehículo en movimiento',
    pedagogicalPurpose: 'Introducir la fórmula de energía cinética con un caso simple y muy guiado, apropiado para estudiantes que inician la especialidad en Física.',
    mobilizedCapability: 'Aplicación directa de Ec = ½mv² a una situación concreta e interpretación física del resultado.',
    relatedContent: 'Fórmula de energía cinética (Ec = ½mv²)',
    hasRouteSelection: false,
    formulaReminder: {
      formula: 'E_c = \\frac{1}{2} m v^2',
      explanation: 'La energía cinética cuantifica la capacidad de un cuerpo en movimiento para realizar trabajo debido a su velocidad.',
      variables: [
        { symbol: 'E_c', name: 'Energía cinética', unit: 'Joules (J) o kilojoules (kJ)' },
        { symbol: 'm', name: 'Masa del cuerpo', unit: 'Kilogramos (kg)' },
        { symbol: 'v', name: 'Velocidad instantánea', unit: 'Metros por segundo (m/s)' },
      ],
    },
    singleRoute: {
      id: 'A',
      title: 'Móvil de calibración en pista horizontal',
      subtitle: 'Caso introductorio guiado',
      description: 'El laboratorio ha recibido el registro telemétrico de un vehículo de pruebas que circula a velocidad uniforme en una recta horizontal del centro de ensayos.',
      scenarioData: {
        'Masa del vehículo (m)': '1200 kg',
        'Velocidad registrada (v)': '20 m/s (equivalente a 72 km/h)',
        'Condición de la pista': 'Rectilínea horizontal sin pendiente',
      },
      expectedCalculation: {
        kineticEnergy: 240000, // 240 kJ
      },
      calculationTolerance: 0.05,
      calculationFields: [
        {
          key: 'kineticEnergy',
          label: 'Energía Cinética calculada (Ec)',
          unit: 'Joules (J)',
          placeholder: 'Ej. 240000',
          expectedValue: 240000,
          step: '1000',
        },
      ],
      hint: {
        title: 'Guía de resolución: Relación masa-velocidad',
        content: 'Recuerda que para calcular la energía cinética debes multiplicar la mitad de la masa (½ · m) por el cuadrado de la velocidad (v²). Observa con atención que la velocidad se eleva al cuadrado antes de multiplicarse por la masa.',
        guidingQuestions: [
          '¿Cuál es la masa en kilogramos del vehículo?',
          '¿Cuál es el valor de v elevado al cuadrado (20²)?',
          '¿Qué ocurre con la energía cinética si duplicamos la velocidad a 40 m/s?',
        ],
      },
      keyVariables: ['masa', 'velocidad', '1200', '20', 'cuadrado', 'joule', 'julios', '240000', '240'],
      keyConcepts: ['energía cinética', 'movimiento', 'cuadrado de la velocidad', 'dependencia', 'capacidad', 'trabajo'],
    },
  },
  {
    id: 2,
    code: 'EXP-002',
    title: 'Expediente 2: Teorema trabajo-energía',
    pedagogicalPurpose: 'Aplicar el teorema del trabajo y la energía cinética a una situación de aplicación real, favoreciendo la autonomía mediante la elección de ruta de investigación.',
    mobilizedCapability: 'Relacionar el trabajo neto realizado sobre un objeto con el cambio exacto en su energía cinética (W_neto = ΔEc).',
    relatedContent: 'Teorema del trabajo y la energía cinética (W_neto = Ec_f - Ec_i)',
    hasRouteSelection: true,
    formulaReminder: {
      formula: 'W_{neto} = \\Delta E_c = E_{c,final} - E_{c,inicial} = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2',
      explanation: 'El trabajo neto efectuado por la suma de todas las fuerzas sobre un objeto produce una variación equivalente en su energía cinética.',
      variables: [
        { symbol: 'W_{neto}', name: 'Trabajo neto', unit: 'Joules (J)' },
        { symbol: 'ΔE_c', name: 'Variación de energía cinética', unit: 'Joules (J)' },
        { symbol: 'v_i / v_f', name: 'Velocidad inicial y final', unit: 'm/s' },
      ],
    },
    routes: {
      A: {
        id: 'A',
        title: 'Ruta A: Frenado disipativo en pista de pruebas',
        subtitle: 'Análisis de pérdida de energía por fricción de frenos',
        description: 'Un automóvil de pruebas de masa m = 800 kg viaja a 25 m/s (90 km/h) y aplica los frenos en línea recta, reduciendo su velocidad a 10 m/s (36 km/h) a lo largo de una distancia de frenado de d = 50 m.',
        scenarioData: {
          'Masa del automóvil (m)': '800 kg',
          'Velocidad inicial (v_i)': '25 m/s (90 km/h)',
          'Velocidad final (v_f)': '10 m/s (36 km/h)',
          'Distancia de frenado (d)': '50 m',
        },
        expectedCalculation: {
          deltaEc: -210000,
          workNet: -210000,
          brakingForce: 4200,
        },
        calculationTolerance: 0.05,
        calculationFields: [
          {
            key: 'initialEc',
            label: 'Energía Cinética Inicial (Ec_i)',
            unit: 'Joules (J)',
            placeholder: '½ · 800 · 25²',
            expectedValue: 250000,
          },
          {
            key: 'finalEc',
            label: 'Energía Cinética Final (Ec_f)',
            unit: 'Joules (J)',
            placeholder: '½ · 800 · 10²',
            expectedValue: 40000,
          },
          {
            key: 'workNet',
            label: 'Trabajo neto de frenado (W_neto = ΔEc)',
            unit: 'Joules (J)',
            placeholder: 'Ec_f - Ec_i',
            expectedValue: -210000,
          },
        ],
        hint: {
          title: 'Pista Ruta A: Trabajo negativo y disipación',
          content: 'El trabajo neto es igual a la variación de energía cinética (Ec_final - Ec_inicial). Dado que el automóvil se desacelera, la energía cinética final es menor que la inicial, por lo que el trabajo neto resultante es negativo, indicando que la fuerza de frenado se opone al desplazamiento.',
          guidingQuestions: [
            '¿Cuál es la energía cinética inicial (½ · 800 · 25²)?',
            '¿Cuál es la energía cinética final (½ · 800 · 10²)?',
            '¿Qué significado físico tiene el signo negativo en el trabajo neto de frenado?',
          ],
        },
        keyVariables: ['800', '25', '10', '250000', '40000', '-210000', '210', 'fuerza', 'frenado', 'disipacion'],
        keyConcepts: ['teorema trabajo-energía', 'variación', 'trabajo negativo', 'fricción', 'disipación', 'disminución de velocidad'],
      },
      B: {
        id: 'B',
        title: 'Ruta B: Aceleración por fuerza tractora constante',
        subtitle: 'Análisis de ganancia de energía por propulsión',
        description: 'Un carro de laboratorio de masa m = 50 kg se encuentra inicialmente en reposo (v_i = 0 m/s). Se le aplica una fuerza horizontal tractora constante neta de F = 180 N a lo largo de una distancia d = 20 m sobre un riel de baja fricción.',
        scenarioData: {
          'Masa del carro (m)': '50 kg',
          'Velocidad inicial (v_i)': '0 m/s (en reposo)',
          'Fuerza neta aplicada (F)': '180 N constante',
          'Distancia recorrida (d)': '20 m',
        },
        expectedCalculation: {
          workNet: 3600,
          finalEc: 3600,
          finalVelocity: 12,
        },
        calculationTolerance: 0.05,
        calculationFields: [
          {
            key: 'workNet',
            label: 'Trabajo neto realizado (W = F · d)',
            unit: 'Joules (J)',
            placeholder: '180 N · 20 m',
            expectedValue: 3600,
          },
          {
            key: 'finalEc',
            label: 'Energía Cinética Final (Ec_f = W_neto)',
            unit: 'Joules (J)',
            placeholder: 'Igual al trabajo neto transferido',
            expectedValue: 3600,
          },
          {
            key: 'finalVelocity',
            label: 'Velocidad final alcanzada (v_f = √(2Ec/m))',
            unit: 'm/s',
            placeholder: '√(2 · 3600 / 50)',
            expectedValue: 12,
          },
        ],
        hint: {
          title: 'Pista Ruta B: Trabajo positivo y transferencia de energía',
          content: 'El trabajo realizado por la fuerza tractora constante es W = F · d. Como el objeto parte del reposo (Ec_i = 0), todo el trabajo realizado se transfiere íntegramente como energía cinética final (W = Ec_f = ½ m v_f²). Despeja v_f como √(2W/m).',
          guidingQuestions: [
            '¿Cuánto trabajo mecánico entrega la fuerza de 180 N a lo largo de 20 m?',
            'Si partió del reposo, ¿cuánta energía cinética tiene al final?',
            '¿Cómo se relaciona la energía cinética acumulada con la velocidad final?',
          ],
        },
        keyVariables: ['50', '180', '20', '3600', '12', 'fuerza', 'distancia', 'reposo'],
        keyConcepts: ['teorema trabajo-energía', 'trabajo positivo', 'transferencia energética', 'aceleración', 'velocidad final'],
      },
    },
  },
  {
    id: 3,
    code: 'EXP-003',
    title: 'Expediente 3: Conservación de la energía mecánica',
    pedagogicalPurpose: 'Introducir la conservación de la energía mecánica como puente hacia el caso integrador, reforzando la autonomía mediante la selección de ruta.',
    mobilizedCapability: 'Relacionar energía cinética y potencial bajo el principio de conservación en sistemas mecánicos (Emec = Ec + Ep = cte).',
    relatedContent: 'Conservación de la energía mecánica (Emec = Ec + Ep = constante, g = 9.8 m/s²)',
    hasRouteSelection: true,
    formulaReminder: {
      formula: 'E_{mec} = E_c + E_p = \\frac{1}{2}mv^2 + mgh = \\text{Constante}',
      explanation: 'En ausencia de fuerzas no conservativas (como rozamiento severo), la energía mecánica total del sistema permanece invariable.',
      variables: [
        { symbol: 'E_{mec}', name: 'Energía mecánica total', unit: 'Joules (J)' },
        { symbol: 'E_p', name: 'Energía potencial gravitatoria (m·g·h)', unit: 'Joules (J)' },
        { symbol: 'E_c', name: 'Energía cinética (½·m·v²)', unit: 'Joules (J)' },
        { symbol: 'g', name: 'Aceleración gravitacional estándar', unit: '9.8 m/s² (o 10 m/s²)' },
      ],
    },
    routes: {
      A: {
        id: 'A',
        title: 'Ruta A: Caída libre controlada de sonda instrumental',
        subtitle: 'Transformación vertical de Ep en Ec',
        description: 'Una sonda de registro de masa m = 2.0 kg se libera desde el reposo a una altura h = 45.0 m respecto a la base del laboratorio de caída. Se asume resistencia del aire despreciable en este tramo (g = 9.8 m/s²).',
        scenarioData: {
          'Masa de la sonda (m)': '2.0 kg',
          'Altura inicial (h_1)': '45.0 m',
          'Velocidad inicial (v_1)': '0 m/s (liberada del reposo)',
          'Gravedad local (g)': '9.8 m/s²',
        },
        expectedCalculation: {
          initialEp: 882, // 2 * 9.8 * 45
          midEc: 441,    // at h=22.5m
          finalEc: 882,  // at h=0m
          finalVelocity: 29.7, // sqrt(2*9.8*45) = 29.698 m/s
        },
        calculationTolerance: 0.08,
        calculationFields: [
          {
            key: 'initialEp',
            label: 'Energía Mecánica Total / Ep inicial a 45 m',
            unit: 'Joules (J)',
            placeholder: 'm · g · h = 2 · 9.8 · 45',
            expectedValue: 882,
          },
          {
            key: 'midEc',
            label: 'Energía Cinética a media altura (h = 22.5 m)',
            unit: 'Joules (J)',
            placeholder: 'Emec - Ep(22.5 m)',
            expectedValue: 441,
          },
          {
            key: 'finalVelocity',
            label: 'Velocidad de impacto final al llegar al suelo (h = 0 m)',
            unit: 'm/s',
            placeholder: 'v = √(2 · g · h)',
            expectedValue: 29.7,
            step: '0.1',
          },
        ],
        hint: {
          title: 'Pista Ruta A: Transformación continua de energía',
          content: 'En lo más alto (h = 45 m), toda la energía es potencial (Ep = mgh) y Ec = 0. Conforme cae, la altura disminuye y la velocidad aumenta, transformando exactamente cada Joule de energía potencial en energía cinética. Justo antes del impacto (h = 0), toda la energía se ha transformado en cinética.',
          guidingQuestions: [
            '¿Cuál es la energía potencial gravitatoria máxima al inicio?',
            'A media altura, ¿cómo se reparte la energía entre potencial y cinética?',
            '¿Por qué la energía mecánica total se mantiene constante durante toda la trayectoria?',
          ],
        },
        keyVariables: ['2', '45', '882', '441', '29.7', '9.8', 'altura', 'gravedad', 'conservacion'],
        keyConcepts: ['conservación de la energía mecánica', 'transformación de energía', 'energía potencial', 'energía cinética', 'caída libre'],
      },
      B: {
        id: 'B',
        title: 'Ruta B: Descenso en rampa curva de bajo rozamiento',
        subtitle: 'Transformación a lo largo de un perfil curvo',
        description: 'Un carro experimental de masa m = 4.0 kg se suelta desde el reposo en la cúspide de una pista curva pulida de prueba a una altura vertical h = 5.0 m sobre el nivel de referencia.',
        scenarioData: {
          'Masa del carro (m)': '4.0 kg',
          'Altura vertical en la cima (h_1)': '5.0 m',
          'Velocidad en la cima (v_1)': '0 m/s',
          'Fricción en la pista': 'Despreciable (superficie pulida)',
          'Gravedad (g)': '9.8 m/s²',
        },
        expectedCalculation: {
          initialEp: 196, // 4 * 9.8 * 5
          finalEc: 196,
          finalVelocity: 9.9, // sqrt(2*9.8*5) = 9.899
        },
        calculationTolerance: 0.08,
        calculationFields: [
          {
            key: 'initialEp',
            label: 'Energía Mecánica Total / Ep en la cúspide (h = 5 m)',
            unit: 'Joules (J)',
            placeholder: 'm · g · h = 4 · 9.8 · 5',
            expectedValue: 196,
          },
          {
            key: 'finalEc',
            label: 'Energía Cinética en la base de la rampa (h = 0 m)',
            unit: 'Joules (J)',
            placeholder: 'Toda la Ep se convierte en Ec',
            expectedValue: 196,
          },
          {
            key: 'finalVelocity',
            label: 'Velocidad al final de la rampa',
            unit: 'm/s',
            placeholder: 'v = √(2 · Ec / m) = √(2 · g · h)',
            expectedValue: 9.9,
            step: '0.1',
          },
        ],
        hint: {
          title: 'Pista Ruta B: Independencia de la trayectoria en fuerzas conservativas',
          content: 'El peso es una fuerza conservativa. No importa la forma de la curva de la rampa: si no hay fricción, la energía potencial perdida m·g·h depende únicamente del desnivel vertical y se transforma íntegramente en energía cinética ½·m·v² al pie de la rampa.',
          guidingQuestions: [
            '¿Cuánta energía potencial tiene el carro en la parte superior?',
            '¿Qué ocurre con la energía potencial al llegar al nivel cero de referencia?',
            '¿Por qué la velocidad final depende de la altura vertical y no de la longitud de la curva?',
          ],
        },
        keyVariables: ['4', '5', '196', '9.9', '9.8', 'altura', 'rampa', 'potencial', 'cinetica'],
        keyConcepts: ['conservación de la energía mecánica', 'independencia de la trayectoria', 'fuerzas conservativas', 'energía cinética', 'energía potencial'],
      },
    },
  },
  {
    id: 4,
    code: 'EXP-004',
    title: 'Expediente 4: Caso de integración multi-fase',
    pedagogicalPurpose: 'Integrar los tres contenidos trabajados (Ec = ½mv², teorema W-Ec y conservación de energía mecánica) en un solo caso con menor andamiaje.',
    mobilizedCapability: 'Identificar qué principios rigen cada fase del fenómeno físico, realizar cálculos acoplados y articular una explicación integral coherente.',
    relatedContent: 'Integración: Trabajo motor, conservación de energía en desnivel y disipación por trabajo de frenado.',
    hasRouteSelection: false,
    singleRoute: {
      id: 'A',
      title: 'Sistema experimental de transporte mecánico',
      subtitle: 'Caso multi-fase acoplado: Impulso + Desnivel + Frenado',
      description: 'Un vagón de pruebas de masa m = 600 kg pasa por tres etapas sucesivas en el circuito de pruebas:\n\n• Fase 1 (Impulso motor): Parte del reposo (v_0 = 0) en tramo plano y un motor le transfiere un trabajo neto W_motor = 108,000 J (108 kJ).\n• Fase 2 (Ascenso conservativo): El vagón asciende por una rampa sin fricción hasta una plataforma elevada a altura h = 10.0 m.\n• Fase 3 (Tramo de frenado horizontal): En la plataforma elevada entra en una zona rugosa donde una fuerza de frenado constante de F_freno = 2460 N lo detiene por completo (v_final = 0).',
      scenarioData: {
        'Masa del vagón (m)': '600 kg',
        'Fase 1: Trabajo motor entregado': '108,000 J (108 kJ)',
        'Fase 2: Desnivel vertical ganado (h)': '10.0 m (g = 9.8 m/s², sin fricción)',
        'Fase 3: Fuerza de frenado en plataforma': '2460 N constante hasta detenerse',
      },
      expectedCalculation: {
        phase1Velocity: 18.97, // sqrt(2*108000/600) = sqrt(360) = 18.9736 m/s
        phase2Ec: 49200,      // 108000 - (600*9.8*10 = 58800) = 49200 J
        phase2Velocity: 12.8,  // sqrt(2*49200/600) = sqrt(164) = 12.806 m/s
        phase3StoppingDistance: 20.0, // 49200 / 2460 = 20 m
      },
      calculationTolerance: 0.08,
      calculationFields: [
        {
          key: 'phase1Velocity',
          label: 'Velocidad al final de la Fase 1 (Impulso motor)',
          unit: 'm/s',
          placeholder: '√(2 · W_motor / m)',
          expectedValue: 18.97,
          step: '0.1',
        },
        {
          key: 'phase2Ec',
          label: 'Energía Cinética remanente en la cima a h = 10 m (Fase 2)',
          unit: 'Joules (J)',
          placeholder: 'Emec_inicial - m·g·h = 108000 - 58800',
          expectedValue: 49200,
        },
        {
          key: 'phase3StoppingDistance',
          label: 'Distancia recorrida en la zona de frenado hasta detenerse (Fase 3)',
          unit: 'metros (m)',
          placeholder: 'd = |ΔEc| / F_freno = 49200 / 2460',
          expectedValue: 20.0,
          step: '0.1',
        },
      ],
      hint: {
        title: 'Pista de Integración: Desglose por fases físicas',
        content: 'Divide tu análisis en las tres fases claras:\n1) En la Fase 1, el trabajo del motor se convierte en energía cinética inicial.\n2) En la Fase 2, la energía mecánica se conserva: parte de la energía cinética se convierte en energía potencial (m·g·h = 600·9.8·10 = 58800 J), quedando un remanente cinético.\n3) En la Fase 3, el teorema trabajo-energía establece que el trabajo de fricción (-F·d) debe consumir exactamente la energía cinética restante hasta anularla.',
        guidingQuestions: [
          '¿Cuánta energía cinética tenía el vagón antes de comenzar a subir la rampa?',
          '¿Cuánta energía potencial ganó al alcanzar los 10 metros de elevación?',
          '¿Cuánta energía cinética le quedó al llegar arriba para ser disipada por la fuerza de frenado?',
        ],
      },
      keyVariables: ['600', '108000', '10', '58800', '49200', '18.97', '19', '12.8', '2460', '20'],
      keyConcepts: ['trabajo motor', 'conservación de energía mecánica', 'energía potencial gravitatoria', 'energía cinética remanente', 'trabajo de frenado disipativo', 'distancia de detención'],
    },
  },
  {
    id: 5,
    code: 'EXP-005',
    title: 'Expediente 5: Informe final del laboratorio',
    pedagogicalPurpose: 'Cerrar la experiencia con un caso auténtico, complejo y sin desglose guiado de fases, simulando la redacción de un informe técnico profesional de auditoría energética.',
    mobilizedCapability: 'Interpretación y análisis completo, riguroso y autónomo de un fenómeno real aplicando de forma integrada la energía cinética, el teorema trabajo-energía y la conservación con fuerzas disipativas.',
    relatedContent: 'Integración completa: Balance general de energía mecánica y trabajo de fuerzas no conservativas (ΔEmec = W_nc).',
    hasRouteSelection: false,
    singleRoute: {
      id: 'A',
      title: 'Auditoría Técnica: Rampa de Escape y Emergencia para Transporte Pesado',
      subtitle: 'Caso Integrador Auténtico — Auditoría de Seguridad Vial',
      description: 'El laboratorio ha sido comisionado para emitir el dictamen físico pericial sobre una rampa de escape de emergencia para camiones en una carretera de montaña con pendiente pronunciada.\n\nDatos de la situación crítica investigada:\n• Un camión de transporte de carga con masa total combinada m = 15,000 kg sufre falla total del sistema de frenos en la bajada y entra a la rampa de escape a una velocidad crítica de v_1 = 30.0 m/s (108 km/h).\n• La rampa está diseñada con una pendiente ascendente que alcanza una elevación vertical total de h = 12.0 m respecto al punto de entrada.\n• La superficie de la rampa consiste en un lecho profundo de grava suelta que ejerce una fuerza de fricción disipativa media constante de F_grava = 45,000 N sobre las ruedas y chasis del camión hasta detenerlo por completo (v_2 = 0 m/s).\n\nComo investigador/a principal, debes redactar el Informe Pericial de Seguridad Energética que explique y cuantifique cómo se distribuye y extingue la enorme energía cinética del vehículo.',
      scenarioData: {
        'Masa total del camión de carga (m)': '15,000 kg',
        'Velocidad crítica de ingreso a la rampa (v_1)': '30.0 m/s (108 km/h)',
        'Elevación vertical ganada por la rampa (h)': '12.0 m (g = 9.8 m/s²)',
        'Fuerza de frenado disipativa por grava (F_grava)': '45,000 N constante',
        'Estado final del vehículo': 'Detenido por completo en la rampa (v_2 = 0 m/s)',
      },
      expectedCalculation: {
        initialEc: 6750000,    // 0.5 * 15000 * 900 = 6,750,000 J = 6.75 MJ
        finalEp: 1764000,      // 15000 * 9.8 * 12 = 1,764,000 J = 1.764 MJ
        dissipatedWork: 4986000, // 6750000 - 1764000 = 4,986,000 J = 4.986 MJ
        requiredGravelLength: 110.8, // 4986000 / 45000 = 110.8 m
      },
      calculationTolerance: 0.08,
      calculationFields: [
        {
          key: 'initialEc',
          label: 'Energía Cinética Inicial total del camión (Ec_i)',
          unit: 'Joules (J)',
          placeholder: '½ · 15000 · 30² = 6750000 J',
          expectedValue: 6750000,
          step: '1000',
        },
        {
          key: 'finalEp',
          label: 'Energía Potencial gravitatoria ganada en la elevación (Ep_h)',
          unit: 'Joules (J)',
          placeholder: 'm · g · h = 15000 · 9.8 · 12 = 1764000 J',
          expectedValue: 1764000,
          step: '1000',
        },
        {
          key: 'dissipatedWork',
          label: 'Energía que debe disipar la grava (W_disipado = Ec_i - Ep_h)',
          unit: 'Joules (J)',
          placeholder: '6750000 - 1764000 = 4986000 J',
          expectedValue: 4986000,
          step: '1000',
        },
        {
          key: 'requiredGravelLength',
          label: 'Longitud mínima requerida del lecho de grava (L_grava)',
          unit: 'metros (m)',
          placeholder: 'L = W_disipado / F_grava = 4986000 / 45000',
          expectedValue: 110.8,
          step: '0.1',
        },
      ],
      hint: {
        title: 'Pista General: Balance Energético Global (ΔEmec = W_no_conservativo)',
        content: 'Aplica el balance energético general:\n1) Al inicio, a nivel de piso (h=0), toda la energía es cinética (Ec_i = 6.75 MJ).\n2) Al detenerse (v=0) a una altura de 12 m, una porción de esa energía se almacena como energía potencial gravitatoria (1.764 MJ).\n3) La energía restante (4.986 MJ) no desaparece: es disipada en forma de calor, deformación y rozamiento por el trabajo de la fuerza no conservativa de la grava (-F_grava · L).\n4) El informe debe detallar cómo ambos mecanismos (desnivel gravitacional + rozamiento de grava) actúan sinérgicamente para detener el camión con seguridad.',
        guidingQuestions: [
          '¿Qué porcentaje de la energía original absorbe la gravedad al subir los 12 m frente a la absorbida por la fricción de la grava?',
          '¿Cómo se conectan los cálculos numéricos con las recomendaciones de seguridad para evitar que el camión retroceda o no alcance a frenar?',
          '¿Cuál es la conclusión física global de la auditoría energética?',
        ],
      },
      keyVariables: ['15000', '30', '6750000', '6.75', '12', '1764000', '1.76', '4986000', '4.98', '45000', '110.8', '111'],
      keyConcepts: ['balance general de energía', 'fuerzas no conservativas', 'disipación térmica', 'energía potencial gravitatoria', 'energía cinética inicial', 'seguridad vial', 'freno de emergencia'],
    },
  },
];

export const INITIAL_BADGES = {
  conceptual_mastery: {
    id: 'conceptual_mastery' as const,
    name: 'Investigador/a con dominio conceptual',
    meaning: 'Reconoce que el estudiante demostró comprensión sólida y correcta de los tres contenidos trabajados (fórmula Ec, teorema trabajo-energía y conservación) a lo largo del laboratorio.',
    pedagogicalRecognition: 'Dominio conceptual riguroso y articulación física en las explicaciones entregadas en los expedientes.',
    criteriaDescription: 'Superar los 5 retos con explicaciones que cumplen los criterios de calidad (identificación de variables, formulación correcta y conexión explicativa) en al menos 4 de los 5 retos, incluyendo obligatoriamente el Reto 5 (Informe final).',
    iconName: 'Award',
    obtained: false,
  },
  laboratory_strategist: {
    id: 'laboratory_strategist' as const,
    name: 'Estratega del laboratorio',
    meaning: 'Reconoce la calidad de las decisiones de investigación tomadas por el estudiante: la pertinencia de la ruta elegida y la solidez de sus justificaciones.',
    pedagogicalRecognition: 'Autonomía y argumentación en la toma de decisiones investigativas en los expedientes con bifurcación.',
    criteriaDescription: 'Elegir ruta en los Retos 2 y 3 y justificar por escrito de forma clara, reflexiva y pertinente el porqué de su elección en ambos casos.',
    iconName: 'Compass',
    obtained: false,
  },
};
