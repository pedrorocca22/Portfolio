// ─── PORTFOLIO DATA ──────────────────────────────────────────────────────────
// To add a new project: append one object to the PROJECTS array below.
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "vam-studio",
    title: "VAM Studio",
    category: "software",
    tags: ["Volumetric 3D", "Computed Axial Lithography", "React", "PyTorch/CUDA"],
    year: 2026,
    status: "Activo",
    updated: "Mayo 2026",
    summary: "Suite profesional de optimización tomográfica y control para Manufactura Aditiva Volumétrica (VAM) y Litografía Axial Computada (CAL).",
    description: `<p>VAM Studio es una suite de software profesional e integrada de extremo a extremo para Manufactura Aditiva Volumétrica (VAM) y Litografía Axial Computada (CAL). Resuelve los complejos desafíos matemáticos y mecánicos de la fotopolimerización volumétrica continua mediante algoritmos avanzados de tomografía y un puente de comunicación de alta velocidad con el hardware.</p><h4>Características Clave</h4><ul><li><strong>Workspace Reactivo Moderno</strong> — Una interfaz dinámica con visualización de mallas STL en 3D en tiempo real (Three.js) y monitor de estado con telemetría integrada de la impresora (velocidad angular, FPS, fotogramas).</li><li><strong>Motor de Optimización GPU</strong> — Optimización tomográfica acelerada por hardware (PyTorch + CUDA) capaz de procesar sinogramas completos en resolución 256³ en menos de 40 segundos, reduciendo drásticamente el tiempo de cálculo.</li><li><strong>Cálculo Automático de Orientación</strong> — Algoritmo de refinamiento de orientación óptimo (Nelder-Mead) para minimizar auto-absorciones, aberraciones ópticas y sobreexposición en biotintas densas.</li><li><strong>Transmisión REST de Alta Velocidad</strong> — Empaquetado asíncrono y streaming de secuencias de proyección 1-bit / 8-bit con control de sincronización de movimiento rotatorio (6.0 FPS constantes) a una unidad de control Raspberry Pi CM4.</li><li><strong>Seguridad de Red y Filtros</strong> — Arquitectura desacoplada y segura con mitigación de vulnerabilidades de Path Traversal (Zip-Slip) y enlace local hardened.</li></ul><h4>Validación Física y Prototipo de Equipo</h4><p>El proyecto no se limita al software; incluye el diseño y ensamble de una plataforma experimental física funcional para VAM:</p><ul><li><strong>Cámara de Proyección Rotatoria</strong> — Diseño mecánico de un vial de cuarzo contenedor de resina/hidrogel sincronizado en rotación continua mediante un motor a pasos de alta precisión.</li><li><strong>Sincronización Óptico-Mecánica</strong> — Acople de velocidad angular exacta (6.0 FPS con una rotación estable de 6° por fotograma) con la ráfaga de imágenes del proyector DLP UV de 405 nm.</li><li><strong>Prototipo Funcional</strong> — Pruebas de fotocurado exitosas validando la homogeneidad de la dosis y la precisión cinemática en materiales de prueba.</li></ul>`,
    images: ["assets/vam_studio/vam_studio_hero.png", "assets/vam_studio/workflow_printing.mp4"],
    github: "https://github.com/pedrorocca22/VAM_app",
    demoPath: "demos/vam-studio/index.html?demo=1",
    history: {
      title: "Desarrollo y Simulación de Manufactura Volumétrica",
      tracks: [
        {
          name: "Motor Tomográfico & UI (Software)",
          phases: [
            { name: "Cálculo en GPU", status: "past", date: "Q4 2025", desc: "Desarrollo del solver de Radon inverso en PyTorch/CUDA y optimización MLEM." },
            { name: "Suite VAM Studio", status: "current", date: "Mayo 2026", desc: "Interfaz React unificada. Carga STL interactiva, optimizador de orientación Nelder-Mead y motor de empaquetado asíncrono activos." },
            { name: "Repositorio en la Nube", status: "future", date: "Q4 2026", desc: "Plataforma colaborativa en la nube para el intercambio de sinogramas y dosis de curado." }
          ]
        },
        {
          name: "Unidad Proyectora (Hardware)",
          phases: [
            { name: "Diseño Mecatrónico", status: "past", date: "Q1 2026", desc: "Diseño del rotor de vial, cálculos del sistema óptico DLP (405nm) y bus de comunicación SPI." },
            { name: "Prototipo de Proyección", status: "current", date: "Mayo 2026", desc: "Sistema de rotación física acoplado. Telemetría funcional a 6.0 FPS estables. En validaciones preliminares de polimerización." },
            { name: "Validación Multi-material", status: "future", date: "Q3 2026", desc: "Ensayos con GelMA funcionalizada y biotintas fotosensibles con células suspendidas." }
          ]
        }
      ]
    }
  },
  {
    id: "biolight",
    title: "Biolight",
    category: "software",
    tags: ["DLP Bioprinting", "Python", "React", "Three.js"],
    year: 2026,
    status: "Activo",
    updated: "Mayo 2026",
    summary: "Plataforma integrada de bioimpresión DLP con control de dosis de luz a nivel de píxel y patronaje de andamios biomiméticos.",
    description: `<p>Una plataforma de software integrada para bioimpresión Digital Light Processing (DLP). Cierra la brecha entre los flujos de trabajo de impresión 3D convencionales y las demandas específicas de trabajar con células vivas, hidrogeles y biotintas fotocurables.</p><h4>Características Clave</h4><ul><li><strong>Preparación de Escenas 3D</strong> — Viewport interactivo en Three.js, soporte multi-modelo y archivos de proyecto .bpp.</li><li><strong>Motor de Slicer</strong> — CLI de PrusaSlicer integrado con post-procesamiento .sl1 e inyección de mapas de intensidad.</li><li><strong>Control de Exposición</strong> — Calibración de escala de grises de 256 niveles para variación de potencia de luz píxel por píxel.</li><li><strong>Motor de Patrones</strong> — Seis patrones paramétricos de andamios (scaffolds): esponja, vascular, reticular (lattice), lineal, ruido y trabecular.</li><li><strong>Segmentación de Rangos</strong> — Parámetros de irradiancia planos o en gradiente por segmento vertical.</li><li><strong>Gestión de Experimentos</strong> — Historial respaldado por SQLite con metadatos y replicación.</li></ul>`,
    images: ["assets/biolight/1.png","assets/biolight/2.png","assets/biolight/3.png","assets/biolight/Prototype light system.mp4"],
    github: "https://github.com/pedrorocca22/Biolight",
    demoPath: "demos/biolight/index.html?demo=1",
    history: {
      title: "Evolución e Integración del Producto",
      tracks: [
        {
          name: "Software de Control",
          phases: [
            { name: "Fase Alpha", status: "past", date: "Q3 2025", desc: "Desarrollo de interfaz base en React y visor 3D paramétrico con Three.js." },
            { name: "Fase Beta", status: "current", date: "Mayo 2026", desc: "Software funcional. Motor de slicer activo y control fino de irradiancia a nivel de píxel. Requiere validación en equipo físico." },
            { name: "Validación Experimental", status: "future", date: "Q3 2026", desc: "Calibración de la potencia de curado y feedback de viabilidad celular en laboratorio." }
          ]
        },
        {
          name: "Integración en Equipo (Hardware)",
          phases: [
            { name: "Modelado y Óptica", status: "past", date: "Q4 2025", desc: "Diseño mecánico de la estructura en CAD y cálculo del sistema de proyección DLP UV (365 nm)." },
            { name: "Prototipo Físico Inicial", status: "current", date: "Mayo 2026", desc: "Ensamble estructural completado y pruebas mecánicas iniciales de ejes. Pendiente de fotos y pruebas de acople con software." },
            { name: "Producción Lote Beta", status: "future", date: "Q4 2026", desc: "Laminación de componentes finales e iteración del equipo con biólogos colaboradores." }
          ]
        }
      ]
    }
  },
  {
    id: "droplet-lab",
    title: "Droplet Lab",
    category: "software",
    tags: ["Web App", "Lab Automation", "WebSerial", "React", "G-Code"],
    year: 2025,
    status: "Activo",
    updated: "Marzo 2026",
    summary: "Interfaz web basada en asistentes para la deposición de precisión de biomateriales sobre sustratos de laboratorio estándar.",
    description: `<p>Aplicación web profesional para orquestar la deposición de hidrogeles, biomateriales y compuestos químicos sobre sustratos estándar de laboratorio mediante un sistema de dispensación automatizado.</p><h4>Flujo de Trabajo en 5 Pasos</h4><ol><li><strong>Login</strong> — Trazabilidad de usuarios y conexión de hardware.</li><li><strong>Selección de Sustrato</strong> — Placas multiwell SBS y plataformas personalizadas.</li><li><strong>Diseñador de Secuencias</strong> — Selección visual de puntos de deposición con seguimiento de volumen.</li><li><strong>Configuración de la Máquina</strong> — Calibración del eje Z y parámetros físicos.</li><li><strong>Ejecución</strong> — Terminal de G-Code en tiempo real y monitoreo de consola.</li></ol><p>Conexión directa del navegador a la máquina a través de la Web Serial API, sin necesidad de drivers externos. Compatible con Chrome, Edge y Opera.</p>`,
    images: ["assets/droplet_lab/1.png","assets/droplet_lab/2.png","assets/droplet_lab/Prototype moving system.mp4"],
    github: "https://github.com/pedrorocca22/Droplet-Lab",
    demoPath: "demos/droplet-lab/index.html?demo=1",
    history: {
      title: "Desarrollo del Orquestador",
      tracks: [
        {
          name: "Software de Control",
          phases: [
            { name: "Driver WebSerial API", status: "past", date: "Q2 2025", desc: "Conexión directa puerto a puerto desde el navegador eliminando intermediarios de software." },
            { name: "Asistente y Control", status: "current", date: "Marzo 2026", desc: "Implementación del asistente visual de 5 pasos y rejilla reactiva. Listo para empaquetado final." },
            { name: "Lanzamiento y Cloud", status: "future", date: "Q3 2026", desc: "Empaquetado definitivo y guardado de plantillas en la nube para ensayos." }
          ]
        },
        {
          name: "Validación en Equipo (IDEX Hardware)",
          phases: [
            { name: "Diseño y Construcción", status: "past", date: "Q4 2025", desc: "Diseño y fabricación de bioimpresora 3D con doble cabezal independiente (IDEX) como plataforma física." },
            { name: "Prototipo Funcional", status: "current", date: "Mayo 2026", desc: "Sistema de movimiento calibrado y funcional. Uso del equipo IDEX para validar las secuencias físicas del software." },
            { name: "Validación de Extrusión", status: "future", date: "Q3 2026", desc: "Pruebas finales de deposición multi-material coordinada y calibración de doble cabezal." }
          ]
        }
      ]
    }
  },
  {
    id: "f3d-studio",
    title: "F3D Studio",
    category: "software",
    tags: ["Bioprinting", "React", "TypeScript", "Three.js", "Python", "Flask"],
    year: 2026,
    status: "Activo",
    updated: "Abril 2026",
    summary: "Suite profesional para bioimpresión avanzada y FFF con laminado multizona, inyección de poros e integración en vivo con Klipper.",
    description: `<p>Completa suite de software de nivel profesional para flujos de trabajo avanzados de bioimpresión. Una interfaz moderna en React/Three.js respaldada por Python/Flask conecta los parámetros de laminado 3D con la generación de G-Code.</p><h4>Características Clave</h4><ul><li><strong>Viewport 3D en Tiempo Real</strong> — Renderizador de Three.js con simulación de G-Code y alternancia de wireframe.</li><li><strong>Laminado Multizona</strong> — CLI de PrusaSlicer con zonas Z paramétricas para control por segmento.</li><li><strong>Lógica de Inyección en Poros</strong> — Inyección de material biológico por segmento en los poros del infill.</li><li><strong>Integración de Hardware</strong> — Conexión directa con la API de Klipper/Moonraker.</li><li><strong>Galería de Protocolos</strong> — Guarda, etiqueta y recarga trabajos anteriores para garantizar la reproducibilidad.</li><li><strong>Monitoreo en Vivo</strong> — Dashboard de telemetría integrado.</li></ul><p><em>Concepto y diseño de flujo de trabajo por Pedro Rocca. Base de código implementada mediante desarrollo asistido por AI.</em></p>`,
    images: ["assets/f3d_studio/1.png","assets/f3d_studio/2.png","assets/f3d_studio/3.png","assets/f3d_studio/4.png"],
    github: "https://github.com/pedrorocca22/F3D-studio",
    demoPath: "demos/f3d-studio/index.html?demo=1",
    history: {
      title: "Desarrollo del Ecosistema F3D",
      tracks: [
        {
          name: "Laminador y Control",
          phases: [
            { name: "MVP de Comunicación", status: "past", date: "Q3 2025", desc: "Integración básica con API de Moonraker y lectura de estado de sensores de temperatura." },
            { name: "Algoritmo de Inyección", status: "current", date: "Abril 2026", desc: "Laminado multizona funcional e inyección paramétrica de celdas celulares en poros de andamios." },
            { name: "Compensación de Presión", status: "future", date: "Q3 2026", desc: "Algoritmos predictivos de flujo para evitar desbordes y vacíos en biotintas viscosas." }
          ]
        }
      ]
    }
  },
  {
    id: "labflow",
    title: "Labflow",
    category: "software",
    tags: ["Lab Automation", "React", "Vite", "G-Code", "Liquid Handling"],
    year: 2025,
    status: "Activo",
    updated: "Mayo 2026",
    summary: "Plataforma web avanzada para orquestar, simular y ejecutar protocolos de manejo de líquidos en robots de pipeteo automatizados.",
    description: `<p>Plataforma web avanzada para la orquestación, simulación y ejecución de protocolos de manejo de líquidos en entornos de laboratorio automatizados. La precisión matemática elimina la fricción al programar rutinas complejas en robots de pipeteo.</p><h4>Capacidades de Software</h4><ul><li><strong>Configuración Dinámica de la Bandeja (Deck)</strong> — Rejilla gráfica de 6 posiciones con material de laboratorio universal y selección de pocillos mediante drag-and-drop.</li><li><strong>Asistentes Automatizados</strong> — Flujos de trabajo preprogramados para ELISA, AlamarBlue y diluciones seriadas.</li><li><strong>Simulador de Fluidos</strong> — Seguimiento de volumen en tiempo real pocillo por pocillo con alertas de escasez o desbordamiento.</li><li><strong>Primitivas de Pipeteo</strong> — Transferir, distribuir, consolidar, aspirar, lavar, mezclar, pausar y comentar.</li><li><strong>Generación de G-Code</strong> — Traducción cinemática automática de pasos lógicos.</li><li><strong>Klipper-Ready</strong> — Inyección directa de firmware para el control remoto de robots.</li></ul><h4>Validación Física y Prototipo de Equipo</h4><p>Para validar experimentalmente la plataforma de software LABflow, diseñé y construí un sistema físico de dosificación de líquidos compuesto por:</p><ul><li><strong>Cabezal Dosificador Especializado</strong> — Equipado con un mecanismo de expulsión mecánica automática de pipetas para permitir el intercambio desatendido de puntas durante ensayos complejos.</li><li><strong>Adaptación a Gran Formato</strong> — Adapté y monté este cabezal dosificador sobre una impresora 3D convencional de gran formato, reconfigurándola mediante firmware para su uso en el manejo de fluidos.</li><li><strong>Mesa Experimental Organizada</strong> — Definí y calibré un deck experimental físico con bahías estandarizadas para elementos universales SBS, incluyendo placas multiwell, reservorios de reactivos y racks de puntas de pipeta.</li><li><strong>Pruebas Funcionales Preliminares</strong> — Realicé ensayos piloto ejecutando trayectorias cinemáticas completas generadas por el software, validando el correcto acople, aspiración, dispensación y expulsión automática de puntas.</li></ul>`,
    images: ["assets/labflow/1.png","assets/labflow/Prototype labflow system.mp4"],
    github: "https://github.com/pedrorocca22/LABflow",
    demoPath: "demos/labflow/index.html?demo=1",
    history: {
      title: "Desarrollo del Programador",
      tracks: [
        {
          name: "Motor de Simulación",
          phases: [
            { name: "Primitivas de Pipeteo", status: "past", date: "Q2 2025", desc: "Lógica interna de cálculo de diluciones y trayectorias básicas de pipeta." },
            { name: "Deck Visual e Intérprete", status: "current", date: "Mayo 2026", desc: "Editor de arrastrar y soltar con simulador de volúmenes reactivo y generación de G-Code." },
            { name: "Monitoreo por Visión", status: "future", date: "Q1 2027", desc: "Integración de cámara en el cabezal para verificar volúmenes ópticamente mediante computer vision." }
          ]
        },
        {
          name: "Validación en Equipo (Hardware)",
          phases: [
            { name: "Diseño de Cabezal Dosificador", status: "past", date: "Q3 2025", desc: "Diseño mecánico en CAD de un cabezal dosificador de líquidos equipado con un sistema automático de expulsión de pipetas." },
            { name: "Adaptación y Deck de Pruebas", status: "current", date: "Mayo 2026", desc: "Adaptación del cabezal a una impresora 3D convencional de gran formato. Creación del deck con bahías y elementos (multiwell, reservorio, rack de puntas) y realización de pruebas preliminares exitosas." },
            { name: "Validación del Software", status: "future", date: "Q4 2026", desc: "Ejecución automatizada de protocolos complejos de manejo de líquidos y calibración fina de volumen dosificado." }
          ]
        }
      ]
    }
  },
  {
    id: "lamps",
    title: "Luminaria",
    category: "industrial-design",
    tags: ["Industrial Design", "3D Printing", "Lighting", "Parametric Design"],
    year: 2025,
    status: "Finalizado",
    updated: "Diciembre 2025",
    summary: "Familia de luminarias impresas en 3D que explora cómo la geometría de las superficies modula la luz, las sombras y la atmósfera.",
    description: `<p>Este proyecto surge de una pregunta simple pero profunda: <em>¿cómo altera la forma el carácter de un espacio?</em></p><p>Diseñé y fabriqué una familia de luminarias impresas en 3D donde la geometría no es meramente estética, sino funcional. Cada pieza explora cómo las curvas, las capas onduladas y la topología de la superficie filtran, suavizan y proyectan la luz de formas distintas. La textura orgánica —con sus estrías que evocan sedimentos geológicos o el crecimiento de los corales— no es un adorno: es el mecanismo que transforma la fuente puntual de un LED en un brillo cálido y envolvente.</p><h4>Enfoque de Diseño</h4><ul><li><strong>Superficies Paramétricas</strong> — Ondulaciones continuas que modulan la intensidad de la luz y la direccionalidad a través de la carcasa.</li><li><strong>Objeto de Día y Noche</strong> — Presencia escultórica cuando está apagado; generador de atmósfera cuando está iluminado.</li><li><strong>Fabricación Aditiva</strong> — El filamento PLA impreso mediante FDM permite paredes delgadas, secciones variables y texturas imposibles de lograr con moldes.</li></ul><p>La colección incluye variantes colgantes y de mesa unificadas por un único lenguaje formal: la forma como herramienta para modelar la emotion de un lugar.</p>`,
    images: ["assets/lamps/8.png","assets/lamps/1.png","assets/lamps/2.png","assets/lamps/3.png","assets/lamps/4.png","assets/lamps/5.png","assets/lamps/6.png","assets/lamps/7.png","assets/lamps/9.png"],
    history: {
      title: "Desarrollo de Producto",
      tracks: [
        {
          name: "Luminaria Paramétrica",
          phases: [
            { name: "Modelado e Ideas", status: "past", date: "Julio 2025", desc: "Algoritmos paramétricos en Grasshopper para generar difusores de luz con micro-ondulaciones." },
            { name: "Prototipado en FDM", status: "past", date: "Septiembre 2025", desc: "Optimización de espesor de filamento PLA natural translúcido para regular la transparencia del foco." },
            { name: "Producto Finalizado", status: "current", date: "Diciembre 2025", desc: "Ensamble eléctrico final y distribución de variantes de mesa y techo colgantes." }
          ]
        }
      ]
    }
  },
  {
    id: "delta20",
    title: "Impresora 3D Delta20",
    category: "industrial-design",
    tags: ["Industrial Design", "3D Printing", "Delta Kinematics", "Professional Hardware", "Advanced Motion"],
    year: 2020,
    status: "Finalizado",
    updated: "Julio 2020",
    summary: "Evolución de la plataforma delta que maximiza la velocidad y el volumen de impresión mediante perfiles extrudidos y rigidez mejorada.",
    description: `<p>Delta20 representa la culminación y evolución de mis desarrollos basados en cinemática delta en 2020. Diseñada tres años después de la Delta17, este equipo consolida el aprendizaje de años de diseño estructural e instrumentación, refinando drásticamente la rigidez, la velocidad operativa y el volumen útil de fabricación.</p><h4>Evolución Estructural y Rigidez</h4><p>Mientras que Delta17 utilizaba brazos magnéticos experimentales y chapa autoportante fina, Delta20 adopta una estructura unificada que combina perfiles de extrusión de aluminio industrial de gran sección con placas de acople mecanizadas CNC a medida. Esta hibridación estructural reduce aún más el centro de gravedad e incrementa la rigidez contra vibraciones dinámicas, permitiendo duplicar las velocidades de aceleración angular sin producir 'ghosting' o artefactos visuales en las piezas impresas.</p><h4>Desafíos Mecatrónicos y Declive de la Tecnología</h4><p>Aunque hoy en día las máquinas delta han cedido terreno ante las cartesianas del tipo CoreXY debido a su gran volumen exterior respecto a su área de impresión, representaron hitos técnicos formidables. Delta20 destaca por su espectacular velocidad y precisión cinemática vertical. Cuenta con autonivelación de cama mediante sensores ópticos de alta precisión y un sistema de extrusión optimizado de bajo peso.</p><h4>Avances Técnicos</h4><ul><li><strong>Estructura Híbrida Reforzada</strong> — Perfiles rígidos y mecanizados CNC robustos que soportan mayores velocidades operativas.</li><li><strong>Calibración Óptica Avanzada</strong> — Sistema de autonivelado automático por sonda infrarroja que calcula desvíos de planicidad en microsegundos.</li><li><strong>Cámara de Impresión Optimizada</strong> — Mayor espacio volumétrico vertical útil para piezas cilíndricas esbeltas.</li></ul>`,
    images: [
      "assets/delta20/cb35dd85264337.5d76d0a57c767.jpg",
      "assets/delta20/2d9ba185264337.5d76d0a583780.jpg",
      "assets/delta20/739ece85264337.5d76d0a57f8f1.jpg",
      "assets/delta20/bf764585264337.5d76d0a57ac9a.jpg",
      "assets/delta20/f4cf1c85264337.5d76d0a57b9a1.jpg",
      "assets/delta20/f5600e85264337.5d76d0a5825bf.jpg"
    ],
    history: {
      title: "Desarrollo del Equipo",
      tracks: [
        {
          name: "Evolución y Ensayos",
          phases: [
            { name: "Rediseño de Placas", status: "past", date: "Enero 2020", desc: "Mecanizado de placas estructurales superiores e inferiores a partir de bloques macizos de aluminio." },
            { name: "Montaje y Sonda", status: "past", date: "Marzo 2020", desc: "Calibración del sensor de nivelación infrarrojo e integración en firmware de 32 bits de alta velocidad." },
            { name: "Ensayos Finales", status: "current", date: "Junio 2020", desc: "Impresión de andamios geométricos de prueba a más de 150 mm/s estables con alta fidelidad dimensional." }
          ]
        }
      ]
    }
  },
  {
    id: "cnc19",
    title: "Fresadora CNC19",
    category: "industrial-design",
    tags: ["Industrial Design", "CNC Milling", "Subtractive Manufacturing", "Precision Engineering", "Hardware Design"],
    year: 2019,
    status: "Finalizado",
    updated: "Diciembre 2019",
    summary: "Desarrollo de un equipo de corte y fresado CNC de escritorio para pruebas de precisión sobre acrílicos y metales blandos como aluminio.",
    description: `<p>CNC19 es un desarrollo de fresadora y equipo de corte CNC de escritorio, desarrollado en 2019. Fue mi único proyecto enfocado enteramente en tecnologías de manufactura sustractiva compacta, buscando llevar la potencia del mecanizado de precisión de taller a un formato portátil y accesible.</p><h4>Desarrollo de Hardware y Transmisión de Esfuerzos</h4><p>El mayor reto de una máquina sustractiva de escritorio es absorber las fuerzas laterales del fresado sin deformaciones estructurales en un espacio reducido. Utilizando chapa plegada de aluminio de alto espesor y mecanizados de precisión, se logró una bancada rígida. El equipo cuenta con un husillo (spindle) de baja potencia optimizado para trabajos de grabado y corte ligero.</p><h4>Pruebas de Materiales y Limitaciones</h4><p>Aunque el uso del equipo se vio limitado en entornos cerrados por el ruido acústico generado durante el fresado, el sistema demostró ser altamente capaz. Se realizaron pruebas de corte exitosas y grabados de alta precisión sobre diversos materiales como acrílicos, maderas técnicas y chapas finas de aluminio, validando la estabilidad geométrica del eje Z y la rigidez lateral.</p><h4>Especificaciones Técnicas</h4><ul><li><strong>Husillo Compacto</strong> — Spindle de bajas revoluciones adaptado para disipar calor de forma eficiente en pasadas continuas.</li><li><strong>Ejes de Transmisión</strong> — Husillos de bolas recirculantes en todos los ejes para garantizar una repetibilidad centesimal y resistir esfuerzos axiales.</li><li><strong>Carcasa Insonorizada</strong> — Concepto de cubierta integrada de protección para mitigar la dispersión de virutas y amortiguar el sonido.</li></ul>`,
    images: [
      "assets/cnc19/5b2afd85264337.5d76d0a588eb8.jpg",
      "assets/cnc19/19186e85264337.5d76d0a589317.jpg",
      "assets/cnc19/26c11f85264337.5d76d0a57263d.jpg",
      "assets/cnc19/3427b185264337.5d76d0a57592c.jpg",
      "assets/cnc19/4cf45085264337.5d76d0a583b5e.jpg",
      "assets/cnc19/5015d485264337.5d76d0a58803c.jpg",
      "assets/cnc19/55cf4085264337.5d76d0a58a05c.jpg",
      "assets/cnc19/6c6c2985264337.5d76d0a585ba0.jpg",
      "assets/cnc19/8bf47785264337.5d76d0a5851ec.jpg",
      "assets/cnc19/a1db9f85264337.5d76d0a584267.jpg",
      "assets/cnc19/ac252885264337.5d76d0a588a23.jpg",
      "assets/cnc19/c4da2c85264337.5d76d0a58aa99.jpg",
      "assets/cnc19/ce9be885264337.5d76d0a587049.jpg",
      "assets/cnc19/d13cf185264337.5d76d0a587b8a.jpg",
      "assets/cnc19/e3128b85264337.5d76d0a58844f.jpg",
      "assets/cnc19/e5689a85264337.5d76d0a5857f0.jpg",
      "assets/cnc19/efbaf285264337.5d76d0a5820dc.jpg"
    ],
    history: {
      title: "Desarrollo del Equipo",
      tracks: [
        {
          name: "Diseño y Ensayos",
          phases: [
            { name: "Modelado de Fuerzas", status: "past", date: "Marzo 2019", desc: "Análisis por elementos finitos (FEA) de la deformación de ejes ante fuerzas radiales de corte." },
            { name: "Ensamble y Cableado", status: "past", date: "Julio 2019", desc: "Montaje de guías de bolas y cableado de motores a pasos NEMA 23 de alto torque." },
            { name: "Ensayos de Fresado", status: "current", date: "Noviembre 2019", desc: "Pruebas exitosas de desbaste y acabado sobre acrílico y placas delgadas de aluminio." }
          ]
        }
      ]
    }
  },
  {
    id: "cartesiana18",
    title: "Impresora 3D Cartesiana18",
    category: "industrial-design",
    tags: ["Industrial Design", "3D Printing", "Cartesian Kinematics", "Precision Bending", "Metalworking"],
    year: 2018,
    status: "Finalizado",
    updated: "Noviembre 2018",
    summary: "Impresora 3D cartesiana de alta rigidez estructural, inspirada en estándares de fabricación aeroespacial con chasis de chapa de aluminio plegada.",
    description: `<p>Cartesiana18 es un desarrollo de impresora 3D cartesiana convencional completado en 2018, optimizado para ofrecer una rigidez mecánica insuperable. Este proyecto consolidó las lecciones aprendidas de la cinemática delta anterior, traduciéndolas a una estructura cartesiana robusta y altamente confiable.</p><h4>Rigidez Estructural e Influencia Industrial</h4><p>El diseño de Cartesiana18 parte de una premisa clara: eliminar la flexión estructural típica de las impresoras DIY de la época. Trabajando en ION Diseño Industrial para la industria aeroespacial argentina, apliqué técnicas de corte láser de alta definición y plegado CNC de chapa de aluminio grueso. La carcasa autoportante funciona como un exoesqueleto rígido que minimiza las vibraciones y garantiza una consistencia de capa óptima incluso en impresiones de larga duración.</p><h4>Ingeniería y Componentes de Precisión</h4><p>Se integraron sistemas de guiado lineal de calidad industrial y componentes mecanizados de precisión en aluminio. Esto permitió no solo reducir las tolerancias de fabricación sino también garantizar una larga vida útil sin holguras. El diseño aborda de forma unificada la ergonomía de uso, el orden de cables interno y la facilidad de mantenimiento.</p><h4>Características Destacadas</h4><ul><li><strong>Exoesqueleto de Aluminio</strong> — Estructura autoportante de chapa plegada con rigidez torsional mejorada.</li><li><strong>Guias de Precisión</strong> — Ejes guiados sobre rodamientos lineales de alta especificación para un movimiento libre de juego.</li><li><strong>Hardware Confiable</strong> — Extrusor de tracción directa calibrado para procesar materiales técnicos con gran consistencia térmica.</li></ul>`,
    images: [
      "assets/cartesiana18/18921985264337.5d76d0a57e00f.jpg",
      "assets/cartesiana18/23d7a985264337.5d76d0a574344.jpg",
      "assets/cartesiana18/34f0be85264337.5d76d0a57f337.jpg",
      "assets/cartesiana18/3bb82985264337.5d76d0a5791b0.jpg",
      "assets/cartesiana18/46b41a85264337.5d76d0a5812cf.jpg",
      "assets/cartesiana18/6cb9ae85264337.5d76d0a576412.jpg",
      "assets/cartesiana18/a66ee585264337.5d76d0a57da3c.jpg",
      "assets/cartesiana18/bd1f7485264337.5d76d0a57ec0e.jpg",
      "assets/cartesiana18/c7ddbf85264337.5d76d0a573e94.jpg"
    ],
    history: {
      title: "Desarrollo del Equipo",
      tracks: [
        {
          name: "Diseño y Fabricación",
          phases: [
            { name: "Cálculo y Modelado", status: "past", date: "Febrero 2018", desc: "Diseño paramétrico del exoesqueleto autoportante para plegado CNC." },
            { name: "Mecanizados e Integración", status: "past", date: "Mayo 2018", desc: "Mecanizado de soportes de ejes y montaje de guías de rodamiento lineal." },
            { name: "Validación de Calidad", status: "current", date: "Octubre 2018", desc: "Pruebas de impresión 3D a largo plazo para verificar consistencia geométrica y tolerancia de capas." }
          ]
        }
      ]
    }
  },
  {
    id: "delta17",
    title: "Impresora 3D Delta17",
    category: "industrial-design",
    tags: ["Industrial Design", "3D Printing", "Delta Kinematics", "Precision Bending", "DIY Hardware"],
    year: 2017,
    status: "Finalizado",
    updated: "Diciembre 2017",
    summary: "Impresora 3D de cinemática delta diseñada para explorar velocidades extremas y alta precisión a través de chapa de aluminio plegada.",
    description: `<p>Delta17 es una impresora 3D de alta velocidad basada en cinemática delta, desarrollada en 2017 durante mi etapa en ION Diseño Industrial. En una época en la que la impresión 3D comercial era incipiente y dominada por el ecosistema DIY, este proyecto nació como un desafío de experimentación en hardware, software y procesos avanzados de fabricación metalmecánica.</p><h4>Desafío Cinemático y Velocidad</h4><p>A diferencia de las máquinas cartesianas convencionales, los sistemas delta emplean tres brazos articulados controlados coordinadamente para mover el cabezal de impresión. Esto reduce la masa móvil en el efector final a su mínima expresión, permitiendo aceleraciones extremas y velocidades de traslación muy superiores, manteniendo una excelente precisión en la deposición de material.</p><h4>Diseño Estructural e Inspiración Aeroespacial</h4><p>El chasis del equipo refleja la influencia directa del trabajo diario para la industria aeroespacial argentina en ION. Está construido mediante chapa plegada de aluminio de alta precisión y mecanizados CNC a medida. Esta aproximación estructural elimina las vibraciones resonantes a altas velocidades sin comprometer la ligereza del conjunto, logrando piezas con tolerancias sumamente exigentes.</p><h4>Especificaciones de Fabricación</h4><ul><li><strong>Chasis Autoportante</strong> — Estructura monolítica rígida optimizada para plegado CNC en aluminio de aleación aeroespacial.</li><li><strong>Cinemática Delta Optimizada</strong> — Brazos articulados de fibra de carbono con rótulas magnéticas de juego cero para eliminar el 'backlash'.</li><li><strong>Electrónica de Control</strong> — Placas de procesamiento de 32 bits configuradas con algoritmos cinemáticos complejos para el cálculo en tiempo real de coordenadas delta.</li></ul>`,
    images: [
      "assets/delta17/b7b1ca85264337.5d76d0a584a06.jpg",
      "assets/delta17/34e21a85264337.5d76d0a57830f.jpg",
      "assets/delta17/480fc685264337.5d76d0a57a869.jpg",
      "assets/delta17/60cc0085264337.5d76d0a572ccd.jpg",
      "assets/delta17/871a9b85264337.5d76d0a57a161.jpg",
      "assets/delta17/8ad3f285264337.5d76d0a574dc4.jpg",
      "assets/delta17/9ff78d85264337.5d76d0a575cdb.jpg",
      "assets/delta17/b2e63585264337.5d76d0a574889.jpg"
    ],
    history: {
      title: "Desarrollo del Equipo",
      tracks: [
        {
          name: "Diseño Mecánico y Estructural",
          phases: [
            { name: "Modelado y Cinemática", status: "past", date: "Marzo 2017", desc: "Simulación de trayectorias cinemáticas delta y cálculo de esfuerzos en juntas." },
            { name: "Plegado y Mecanizado CNC", status: "past", date: "Mayo 2017", desc: "Fabricación de chasis en chapa plegada de aluminio aeroespacial y ensamble estructural." },
            { name: "Puesta en Marcha", status: "current", date: "Julio 2017", desc: "Calibración fina de juego cero en brazos articulados magnéticos y pruebas finales de impresión." }
          ]
        }
      ]
    }
  }
];

// ─── CV SPECIFIC PROJECTS ──────────────────────────────────────────────────
// These are the 6 official projects curated specifically for the resume sheets
// (matching the content in CV Pedro Rocca.pdf)
// ─────────────────────────────────────────────────────────────────────────────
const CV_PROJECTS = [
  {
    title: "Volumetric Bioprinting (Computed Axial Lithography / CAL)",
    year: 2026,
    category: "software",
    status: "Activo",
    tags: ["Computed Axial Lithography", "Tomografía Inversa", "Proyección UV", "GelMA/PEGDA"],
    summary: "Sistema de impresión volumétrica basado en proyección UV y reconstrucción tomográfica inversa para polimerizar material fotosensible dentro de un vial giratorio. Impresión sin capas, sin soportes, en segundos. Enfoque: bioimpresión con hidrogeles (GelMA, PEGDA), scaffolds, microfluídica. Control preciso dosis/irradiancia, calibración para repetibilidad. Proceso sin extrusión, baja agresión mecánica, compatible con trabajo celular. Desarrollo completo: algoritmo reconstrucción, control hardware (proyector DLP UV, motor, sincronización), interfaz, calibración óptica."
  },
  {
    title: "Biolight – Plataforma de Bioimpresión DLP UV",
    year: 2026,
    category: "software",
    status: "Activo",
    tags: ["DLP Bioprinting", "Algoritmo Voronoi", "Calibración Irradiancia", "Three.js"],
    summary: "Ecosistema de bioimpresión DLP UV de alta precisión. Algoritmos: generación redes microvasculares (Voronoi), corrección dispersión óptica (anti-bleeding), modulación rigidez tisular (grayscale). Integración HW/SW: control proyector DLP UV, calibración irradiancia, interfaz slicing. Orientado a ingeniería de tejidos: scaffolds con gradientes de rigidez y arquitecturas vasculares complejas reproducibles."
  },
  {
    title: "LABflow",
    year: 2026,
    category: "software",
    status: "Activo",
    tags: ["Lab Automation", "G-Code", "Manejo de Líquidos", "Validación Física"],
    summary: "Aplicación para diseñar, simular y ejecutar protocolos de manejo de líquidos. Interfaz intuitiva, integración con hardware (bombas, válvulas, sensores), validación por simulación. Incluye validación física mediante prototipo de cabezal dosificador con expulsión automática de pipetas adaptado a impresora 3D convencional de gran formato, con deck experimental (multiwell, reservorio, racks)."
  },
  {
    title: "UVLab Scan – Medidor portátil irradiancia UV (405nm)",
    year: 2025,
    category: "industrial-design",
    status: "Finalizado",
    tags: ["Instrumentación UV", "Medidor Portátil", "Calidad Bioimpresión", "Calibración Óptica"],
    summary: "Medidor portátil irradiancia UV (405nm): control potencia (mW/cm²), cálculo dosis. Validación sistemas DLP UV, cumplimiento normativas, control calidad bioimpresión. Diseñado bajo estándares de usabilidad, con carcasa ergonómica y sensor de alta precisión."
  },
  {
    title: "Scaffold Lab Designer",
    year: 2026,
    category: "software",
    status: "Activo",
    tags: ["Diseño Algorítmico", "Scaffolds", "Parametrización Canales", "Optimización Geometría"],
    summary: "Herramienta de diseño algorítmico para scaffolds: parametrización porosidad, tamaño poro, conectividad. Geometrías optimizadas para DLP/FDM. Generación paramétrica interactiva para control fino de la porosidad del andamio celular."
  },
  {
    title: "IDEX Bioprinter – Bioimpresora con doble extrusión independiente",
    year: 2026,
    category: "industrial-design",
    status: "Activo",
    tags: ["IDEX Bioprinting", "Multimaterial", "Klipper Firmware", "Prototipo Físico"],
    summary: "Bioimpresora con doble extrusión independiente (IDEX). Cada cabezal opera independientemente; cuando no imprime, se aparta (sin goteo/contaminación). Impresión multimaterial, control firmware Klipper, slicing adaptado. Utilizada activamente para la validación física en movimiento y deposición del software Droplet Lab."
  }
];
