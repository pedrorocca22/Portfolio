/* ─── main.js ─────────────────────────────────────────────────────────────
   Portfolio — Interactions & WebGL ambient background
   ─────────────────────────────────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════════════════════════════════
   1. WebGL Ambient Background
   ═══════════════════════════════════════════════════════════════════════════ */
(function initWebGL() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;

  // DOM fallback: if WebGL not supported, leave canvas transparent
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) return;

  // Pointer state
  let mouse = { x: .5, y: .5 };
  let targetMouse = { x: .5, y: .5 };

  window.addEventListener('mousemove', e => {
    targetMouse.x = e.clientX / window.innerWidth;
    targetMouse.y = 1 - e.clientY / window.innerHeight;
  });

  // Vertex Shader
  const vsSource = `
    attribute vec4 aPos;
    void main() { gl_Position = aPos; }
  `;

  // Fragment Shader — soft bloom haze, pointer-reactive drift
  const fsSource = `
    precision mediump float;
    uniform vec2  uRes;
    uniform float uTime;
    uniform vec2  uMouse;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1,0)), u.x),
        mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
        u.y
      );
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / uRes;

      // Gentle pointer parallax
      vec2 shift = (uMouse - vec2(0.5)) * 0.04;
      uv += shift;

      // Layered noise drift
      float t = uTime * 0.12;
      float n1 = noise(uv * 3.0 + vec2(t, t * 0.7));
      float n2 = noise(uv * 6.0 - vec2(t * 0.5, t * 1.1));
      float n  = n1 * 0.65 + n2 * 0.35;

      // Radial bloom — centred haze
      float dist = length(uv - 0.5);
      float bloom = exp(-dist * dist * 2.8);

      // Palette: white-to-slate, very soft
      vec3 colA = vec3(0.98, 0.99, 1.00);  // near white
      vec3 colB = vec3(0.88, 0.92, 0.96);  // light slate
      vec3 col  = mix(colA, colB, n * 0.5 + bloom * 0.15);

      // Very subtle vignette
      col *= 1.0 - dist * 0.25;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function compileShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  const prog = gl.createProgram();
  gl.attachShader(prog, compileShader(gl.VERTEX_SHADER,   vsSource));
  gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fsSource));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // Full-screen quad
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

  const aPosLoc  = gl.getAttribLocation(prog, 'aPos');
  const uResLoc  = gl.getUniformLocation(prog, 'uRes');
  const uTimeLoc = gl.getUniformLocation(prog, 'uTime');
  const uMouseLoc= gl.getUniformLocation(prog, 'uMouse');

  gl.enableVertexAttribArray(aPosLoc);
  gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

  function resize() {
    canvas.width  = window.innerWidth  * (window.devicePixelRatio || 1);
    canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener('resize', resize);
  resize();

  let startTime = performance.now();

  function render() {
    // Smooth mouse lerp
    mouse.x += (targetMouse.x - mouse.x) * 0.06;
    mouse.y += (targetMouse.y - mouse.y) * 0.06;

    const t = (performance.now() - startTime) / 1000;
    gl.uniform2f(uResLoc,   canvas.width, canvas.height);
    gl.uniform1f(uTimeLoc,  t);
    gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }

  render();
})();


/* ═══════════════════════════════════════════════════════════════════════════
   2. Native anchor scroll + GSAP ScrollTrigger
   ═══════════════════════════════════════════════════════════════════════════ */
(function initAnchorScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   3. Scroll Reveal (GSAP ScrollTrigger)
   ═══════════════════════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
})();


/* ═══════════════════════════════════════════════════════════════════════════
   3. Project Filter
   ═══════════════════════════════════════════════════════════════════════════ */
(function initFilter() {
  const btns  = document.querySelectorAll('.filter-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      // Traceability Event
      if (typeof umami !== 'undefined') {
        umami.track('Filter Projects', { category: filter });
      }

      // Query cards dynamically inside click handler because cards are re-rendered from Firestore
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
})();


/* ═══════════════════════════════════════════════════════════════════════════
   4. Modal + Carousel
   ═══════════════════════════════════════════════════════════════════════════ */
(function initModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const track    = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  const prevBtn  = document.getElementById('carousel-prev');
  const nextBtn  = document.getElementById('carousel-next');
  const titleEl  = document.getElementById('modal-title');
  const metaEl   = document.getElementById('modal-meta');
  const tagsEl   = document.getElementById('modal-tags');
  const descEl   = document.getElementById('modal-description');
  const demoBtn  = document.getElementById('modal-demo-btn');
  const demoWrap = document.getElementById('modal-demo');
  const demoBack = document.getElementById('modal-demo-back');
  const iframe   = document.getElementById('modal-iframe');
  const githubBtn = document.getElementById('modal-github');
  const demoHint = document.getElementById('modal-demo-hint');

  let currentSlide = 0;
  let totalSlides  = 0;
  let currentDemoPath = null;
  let currentProject = null;

  function enterDemo() {
    if (!currentDemoPath) return;
    iframe.src = currentDemoPath;
    backdrop.classList.add('demo-active');

    if (typeof umami !== 'undefined' && currentProject) {
      umami.track('Run Demo', { id: currentProject.id, title: currentProject.title });
    }
  }

  function exitDemo() {
    backdrop.classList.remove('demo-active');
    iframe.src = '';
  }

  function goTo(idx) {
    currentSlide = (idx + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => goTo(currentSlide - 1));
  nextBtn.addEventListener('click', () => goTo(currentSlide + 1));

  function openModal(project) {
    currentProject = project;

    // Traceability Event
    if (typeof umami !== 'undefined') {
      umami.track('View Project', { id: project.id, title: project.title, category: project.category });
    }

    // Populate carousel
    track.innerHTML = '';
    dotsWrap.innerHTML = '';
    totalSlides = project.images.length;
    currentSlide = 0;

    project.images.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.setAttribute('playsinline', '');
        video.playsInline = true;
        video.controls = true;
        slide.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${project.title} screenshot ${i + 1}`;
        img.loading = 'lazy';
        slide.appendChild(img);
      }
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    // Show/hide nav arrows
    const showArrows = totalSlides > 1;
    prevBtn.style.display = showArrows ? 'flex' : 'none';
    nextBtn.style.display = showArrows ? 'flex' : 'none';
    dotsWrap.style.display = showArrows ? 'flex' : 'none';

    track.style.transform = 'translateX(0)';

    // Populate text
    titleEl.textContent = project.title;
    metaEl.innerHTML    = `${project.year} &middot; <span class="modal-category-wrap card-${project.category}"><span class="category-dot"></span>${project.category === 'software' ? 'Software' : 'Diseño Industrial'}</span> &middot; <span class="modal-status-badge badge-${project.status ? project.status.toLowerCase() : ''}">${project.status || ''}</span>`;
    tagsEl.innerHTML    = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
    descEl.innerHTML    = project.description;

    // Render milestone history timeline
    const historySection = document.getElementById('modal-history-section');
    if (historySection) {
      if (project.history) {
        historySection.style.display = 'block';
        historySection.innerHTML = `
          <div class="history-header-row">
            <h3 class="history-section-title">${project.history.title || 'Evolución del Proyecto'}</h3>
            ${project.updated ? `<span class="history-update-badge">Última act.: ${project.updated}</span>` : ''}
          </div>
          <div class="history-tracks-grid">
            ${project.history.tracks.map(track => `
              <div class="history-track">
                <h4 class="history-track-title">${track.name}</h4>
                <div class="history-timeline">
                  ${track.phases.map(phase => {
                    let statusClass = phase.status || 'future';
                    let badgeHtml = phase.status === 'current' ? '<span class="milestone-current-badge">Fase Actual</span>' : '';
                    return `
                      <div class="history-milestone milestone-${statusClass}">
                        <div class="milestone-marker">
                          <div class="milestone-dot"></div>
                          <div class="milestone-line"></div>
                        </div>
                        <div class="milestone-content">
                          <div class="milestone-header">
                            <span class="milestone-name">${phase.name}</span>
                            <span class="milestone-date">${phase.date}</span>
                          </div>
                          <p class="milestone-desc">${phase.desc}</p>
                          ${badgeHtml}
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        historySection.style.display = 'none';
        historySection.innerHTML = '';
      }
    }

    // Demo button & GitHub link
    currentDemoPath = project.demoPath || null;
    if (demoBtn) demoBtn.style.display = currentDemoPath ? 'inline-flex' : 'none';
    if (demoHint) demoHint.style.display = currentDemoPath ? 'block' : 'none';
    if (githubBtn) {
      if (project.github) {
        githubBtn.href = project.github;
        githubBtn.style.display = 'inline-flex';
      } else {
        githubBtn.style.display = 'none';
      }
    }
    exitDemo();

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(exitDemo, 250); // clear after transition
  }

  closeBtn.addEventListener('click', closeModal);
  if (demoBtn) demoBtn.addEventListener('click', enterDemo);
  if (demoBack) demoBack.addEventListener('click', exitDemo);

  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (!backdrop.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft')  goTo(currentSlide - 1);
    if (e.key === 'ArrowRight') goTo(currentSlide + 1);
  });

  // Event delegation on the projects grid to open modal (supports dynamically loaded cards)
  const grid = document.getElementById('projects-grid');
  if (grid) {
    grid.addEventListener('click', e => {
      // Find the closest project card that was clicked
      const card = e.target.closest('.project-card');
      if (!card) return;
      
      // If click was on a github link, let the browser handle it naturally
      if (e.target.closest('.card-github')) return;
      
      const id = card.dataset.id;
      const project = PROJECTS.find(p => p.id === id);
      if (project) openModal(project);
    });
  }
})();


/* ═══════════════════════════════════════════════════════════════════════════
   5. Card Reveal + Parallax (GSAP ScrollTrigger)
   ═══════════════════════════════════════════════════════════════════════════ */
(function initCardAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray('.project-card');

  // Staggered reveal
  gsap.fromTo(cards,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#projects-grid',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );

  // Parallax on card images
  cards.forEach(card => {
    const img = card.querySelector('.card-image-wrap img');
    if (!img) return;

    gsap.to(img, {
      yPercent: -4,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   6. Hero Scroll Animation (subtle fade only)
   ═══════════════════════════════════════════════════════════════════════════ */
(function initHeroScroll() {
  const hero = document.querySelector('#hero .hero-inner');
  if (!hero) return;

  gsap.to(hero, {
    opacity: 0.25,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '80% top',
      scrub: 1,
    },
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   7. Umami Traceability Events (Contact Clicks)
   ═══════════════════════════════════════════════════════════════════════════ */
(function initUmamiTracking() {
  // Outbound and Contact Clicks
  document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href*="linkedin.com"], a[href*="github.com"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof umami !== 'undefined') {
        const href = link.getAttribute('href');
        let type = 'Outbound';
        if (href.startsWith('mailto:')) type = 'Email';
        else if (href.startsWith('tel:')) type = 'Phone';
        else if (href.includes('linkedin.com')) type = 'LinkedIn';
        else if (href.includes('github.com')) type = 'GitHub Profile';

        umami.track('Contact Click', { type: type, value: href });
      }
    });
  });
})();

/* ═══════════════════════════════════════════════════════════════════════════
   8. Dynamic CV Controller (2 Levels & Relocated Print Trigger)
   ═══════════════════════════════════════════════════════════════════════════ */
(function initDynamicCV() {
  const levelBtns = document.querySelectorAll('.cv-level-btn');
  const downloadBtn = document.getElementById('download-pdf-btn');
  
  const profileSection = document.getElementById('cv-profile-section');
  const profileText = document.getElementById('cv-profile-text');
  const projectsSection = document.getElementById('cv-projects-section');
  const projectsList = document.getElementById('cv-projects-list');

  let currentLevel = 'bio';

  function renderCV(level) {
    // Normalise level to support both strings ('bio', 'proyectos') and legacy numbers ('1', '2', '3')
    let normLevel = 'bio';
    if (level === 'proyectos' || level === '2' || level === '3' || level === 2 || level === 3) {
      normLevel = 'proyectos';
    } else {
      normLevel = 'bio';
    }
    currentLevel = normLevel;

    // Update active state in UI buttons
    levelBtns.forEach(btn => {
      const btnLevel = btn.dataset.level;
      const btnNorm = (btnLevel === 'proyectos' || btnLevel === '2' || btnLevel === '3') ? 'proyectos' : 'bio';
      btn.classList.toggle('active', btnNorm === currentLevel);
    });

    // Both levels (bio and proyectos) include the "Sobre mí" profile section
    if (profileSection) {
      profileSection.style.display = 'block';
      // Extract dynamically from DOM about intro
      const aboutIntro = document.querySelector('.about-intro');
      if (aboutIntro && profileText) {
        profileText.textContent = aboutIntro.textContent.trim();
      }
    }

    if (currentLevel === 'bio') {
      // Level Bio: Hide Projects
      if (projectsSection) projectsSection.style.display = 'none';
    } else if (currentLevel === 'proyectos') {
      // Level Proyectos: Show dynamic Projects from projects.js
      if (projectsSection && projectsList && typeof PROJECTS !== 'undefined') {
        projectsSection.style.display = 'block';
        projectsList.innerHTML = PROJECTS.map(p => `
          <div class="cv-project-item">
            <div class="cv-project-header">
              <span class="cv-project-title">${p.title}</span>
              <span class="cv-project-year">${p.year}</span>
            </div>
            <span class="cv-project-meta">${p.category === 'software' ? 'Software' : 'Diseño Industrial'} &middot; ${p.status} &middot; ${p.tags.join(', ')}</span>
            <p class="cv-project-summary">${p.summary}</p>
          </div>
        `).join('');
      }
    }
  }

  // Bind clicks to levels
  levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const level = btn.dataset.level;
      renderCV(level);

      // Traceability Event
      if (typeof umami !== 'undefined') {
        umami.track('Configure CV Level', { level: level });
      }
    });
  });

  // Bind print click
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Traceability Event
      if (typeof umami !== 'undefined') {
        umami.track('Download CV PDF', { level: currentLevel });
      }
      
      window.print();
    });
  }

  // Set default render (Level Bio)
  renderCV('bio');
})();


