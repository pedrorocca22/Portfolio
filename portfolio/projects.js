// ─── PORTFOLIO DATA ──────────────────────────────────────────────────────────
// To add a new project: append one object to the PROJECTS array below.
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = [
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
    images: ["assets/biolight/1.png","assets/biolight/2.png","assets/biolight/3.png"],
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
    images: ["assets/droplet_lab/1.png","assets/droplet_lab/2.png"],
    github: "https://github.com/pedrorocca22/Droplet-Lab",
    demoPath: "demos/droplet-lab/index.html?demo=1",
    history: {
      title: "Desarrollo del Orquestador",
      tracks: [
        {
          name: "Comunicación Serial",
          phases: [
            { name: "Driver WebSerial API", status: "past", date: "Q2 2025", desc: "Conexión directa puerto a puerto desde el navegador eliminando intermediarios de software." },
            { name: "Diseño e Interfaz", status: "current", date: "Marzo 2026", desc: "Implementación del asistente visual de 5 pasos y rejilla multiwell reactiva." },
            { name: "Nube y Exportación", status: "future", date: "Q3 2026", desc: "Guardado y compartición de plantillas en la nube para trazabilidad colectiva de ensayos." }
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
    description: `<p>Plataforma web avanzada para la orquestación, simulación y ejecución de protocolos de manejo de líquidos en entornos de laboratorio automatizados. La precisión matemática elimina la fricción al programar rutinas complejas en robots de pipeteo.</p><h4>Capacidades</h4><ul><li><strong>Configuración Dinámica de la Bandeja (Deck)</strong> — Rejilla gráfica de 6 posiciones con material de laboratorio universal y selección de pocillos mediante drag-and-drop.</li><li><strong>Asistentes Automatizados</strong> — Flujos de trabajo preprogramados para ELISA, AlamarBlue y diluciones seriadas.</li><li><strong>Simulador de Fluidos</strong> — Seguimiento de volumen en tiempo real pocillo por pocillo con alertas de escasez o desbordamiento.</li><li><strong>Primitivas</strong> — Transferir, distribuir, consolidar, aspirar, lavar, mezclar, pausar y comentar.</li><li><strong>Generación de G-Code</strong> — Traducción cinemática automática de pasos lógicos.</li><li><strong>Klipper-Ready</strong> — Inyección directa de firmware para el control remoto de robots.</li></ul>`,
    images: ["assets/labflow/1.png"],
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
];
