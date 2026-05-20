/* ── admin.js ─────────────────────────────────────────────────────────────
   Portfolio — Portal de Administración Scoped Logic (CMS + Analytics)
   ─────────────────────────────────────────────────────────────────────────── */

(function initAdminPortal() {
  // Portal Elements
  const adminTrigger = document.getElementById('admin-trigger');
  const adminPortal = document.getElementById('admin-portal');
  const adminClose = document.getElementById('admin-portal-close');

  if (!adminPortal) return;

  // --- OPEN & CLOSE CONTROLLERS ---
  function openAdminPortal(e) {
    if (e) e.preventDefault();
    adminPortal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable scroll on portfolio
    
    // Auto-focus on email input if not logged in
    const emailInput = document.getElementById('login-email');
    if (emailInput && !auth.currentUser) {
      setTimeout(() => emailInput.focus(), 150);
    }
  }

  function closeAdminPortal() {
    adminPortal.style.display = 'none';
    document.body.style.overflow = ''; // Restore scroll
  }

  if (adminTrigger) adminTrigger.addEventListener('click', openAdminPortal);
  if (adminClose) adminClose.addEventListener('click', closeAdminPortal);

  // Esc key close helper
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && adminPortal.style.display === 'flex') {
      closeAdminPortal();
    }
  });


  // --- FIREBASE ADMIN LOGIC ---
  let projectsData = [];
  let currentUploadedImages = [];

  // Elements
  const loginSection = document.getElementById('login-section');
  const dashSection = document.getElementById('dashboard-section');
  const loginForm = document.getElementById('login-form');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const loginError = document.getElementById('login-error');
  const btnLogout = document.getElementById('btn-logout');

  const listContainer = document.getElementById('projects-admin-list');
  const projectForm = document.getElementById('project-form');
  const formTitle = document.getElementById('form-title');
  const btnCancel = document.getElementById('btn-cancel-edit');
  const btnDelete = document.getElementById('btn-delete-project');
  const imagesPreview = document.getElementById('images-preview-grid');
  const imageUploadInput = document.getElementById('image-upload-input');
  const imageUrlInput = document.getElementById('image-url-input');
  const btnAddImageUrl = document.getElementById('btn-add-image-url');

  const tableBody = document.getElementById('analytics-tbody');

  // --- AUTHENTICATION FLOW ---
  auth.onAuthStateChanged(user => {
    if (user) {
      // Authenticated
      if (loginSection) loginSection.style.display = 'none';
      if (dashSection) dashSection.style.display = 'flex';
      if (adminClose) adminClose.style.display = 'none'; // Hide close button when logged in
      loadProjectsCMS();
      loadAnalyticsDashboard();
    } else {
      // Unauthenticated
      if (loginSection) loginSection.style.display = 'flex';
      if (dashSection) dashSection.style.display = 'none';
      if (adminClose) adminClose.style.display = 'flex'; // Show close button when logged out (on login card)
      
      // Clear credentials
      if (loginForm) loginForm.reset();
      if (loginEmail) loginEmail.value = '';
      if (loginPassword) loginPassword.value = '';
    }
  });

  // Login Form Submit
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = loginEmail.value.trim();
      const pass = loginPassword.value;
      
      if (loginError) loginError.style.display = 'none';

      auth.signInWithEmailAndPassword(email, pass)
        .catch(err => {
          if (loginError) {
            loginError.textContent = "Error de credenciales: " + err.message;
            loginError.style.display = 'block';
          }
        });
    });
  }

  // Logout Button
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      auth.signOut();
    });
  }


  // --- TAB SWITCHER ---
  document.querySelectorAll('.dash-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(t => t.classList.remove('active'));
      
      btn.classList.add('active');
      const tabId = 'tab-' + btn.dataset.tab;
      const targetPane = document.getElementById(tabId);
      if (targetPane) targetPane.classList.add('active');
    });
  });


  // --- CMS PROJECTS LOGIC ---
  function loadProjectsCMS() {
    if (!listContainer) return;

    db.collection('projects').orderBy('year', 'desc').onSnapshot(snapshot => {
      projectsData = [];
      listContainer.innerHTML = '';
      
      if (snapshot.empty) {
        listContainer.innerHTML = '<div style="color: var(--color-text-secondary); font-size: 13px; text-align: center; padding: 40px 0;">No hay proyectos. ¡Crea el primero!</div>';
        return;
      }

      snapshot.forEach(doc => {
        const p = { id: doc.id, ...doc.data() };
        projectsData.push(p);

        const item = document.createElement('div');
        item.className = 'project-admin-item';
        item.dataset.id = p.id;
        item.innerHTML = `
          <div class="proj-admin-info">
            <span class="proj-admin-title">${p.title}</span>
            <span class="proj-admin-meta">${p.year} &middot; ${p.category === 'software' ? 'Software' : 'Diseño Industrial'}</span>
          </div>
          <div class="proj-admin-actions">
            <span class="pill ${p.category === 'software' ? '' : 'pill-amber'}" style="font-size: 9px; padding: 2px 6px;">${p.category}</span>
          </div>
        `;

        item.addEventListener('click', () => selectProjectForEdit(p));
        listContainer.appendChild(item);
      });
    }, err => {
      console.error("CMS read failed:", err);
      listContainer.innerHTML = `<div style="color: var(--color-danger); font-size: 13px; text-align: center; padding: 40px 0;">Acceso denegado: Revisa tus Reglas de Firestore.</div>`;
    });
  }

  // Reset Form
  function resetCMSForm() {
    if (projectForm) projectForm.reset();
    const idEl = document.getElementById('project-id');
    if (idEl) idEl.value = '';
    currentUploadedImages = [];
    renderImagesPreview();
    if (formTitle) formTitle.textContent = "Crear Nuevo Proyecto";
    if (btnCancel) btnCancel.style.display = 'none';
    if (btnDelete) btnDelete.style.display = 'none';
    document.querySelectorAll('.project-admin-item').forEach(i => i.classList.remove('active'));
  }

  const btnNewProj = document.getElementById('btn-new-project');
  if (btnNewProj) btnNewProj.addEventListener('click', resetCMSForm);
  if (btnCancel) btnCancel.addEventListener('click', resetCMSForm);

  // Image previews renderer
  function renderImagesPreview() {
    if (!imagesPreview) return;
    imagesPreview.innerHTML = '';
    currentUploadedImages.forEach((url, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'preview-thumb-wrap';
      thumb.innerHTML = `
        <img src="${url}" alt="Thumbnail">
        <button type="button" class="preview-thumb-delete" data-index="${index}">&times;</button>
      `;
      thumb.querySelector('.preview-thumb-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        currentUploadedImages.splice(index, 1);
        renderImagesPreview();
      });
      imagesPreview.appendChild(thumb);
    });
  }

  // Direct Image Upload Trigger
  if (imageUploadInput) {
    imageUploadInput.addEventListener('change', async e => {
      const files = e.target.files;
      if (!files.length) return;

      const progressBar = document.getElementById('upload-progress-bar');
      const progressFill = document.getElementById('upload-progress-fill');
      
      if (progressBar) progressBar.style.display = 'block';
      
      const idEl = document.getElementById('project-id');
      const projId = (idEl && idEl.value) || 'temp_' + Date.now();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const storageRef = storage.ref(`projects/${projId}/${Date.now()}_${file.name}`);
          const uploadTask = storageRef.put(file);

          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (progressFill) progressFill.style.width = progress + '%';
              }, 
              (error) => {
                console.error("Upload error:", error);
                reject(error);
              }, 
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  currentUploadedImages.push(downloadURL);
                  resolve();
                });
              }
            );
          });
        } catch (storageErr) {
          console.warn("Storage upload failed or not enabled. Using local file name fallback.", storageErr);
          const localPath = `assets/${file.name}`;
          currentUploadedImages.push(localPath);
          alert(`Storage no activo: se ha añadido la ruta '${localPath}' como referencia local.`);
        }
      }

      if (progressBar) progressBar.style.display = 'none';
      if (progressFill) progressFill.style.width = '0%';
      renderImagesPreview();
    });
  }

  // Add Manual Image URL/Path
  if (btnAddImageUrl) {
    btnAddImageUrl.addEventListener('click', () => {
      if (!imageUrlInput) return;
      const url = imageUrlInput.value.trim();
      if (url) {
        currentUploadedImages.push(url);
        renderImagesPreview();
        imageUrlInput.value = '';
      }
    });
  }

  if (imageUrlInput) {
    imageUrlInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (btnAddImageUrl) btnAddImageUrl.click();
      }
    });
  }

  // Select project for editing
  function selectProjectForEdit(p) {
    resetCMSForm();
    
    // Mark selected in list
    const selectedItem = document.querySelector(`.project-admin-item[data-id="${p.id}"]`);
    if (selectedItem) selectedItem.classList.add('active');

    if (formTitle) formTitle.textContent = `Editar: ${p.title}`;
    
    const idEl = document.getElementById('project-id');
    const titleEl = document.getElementById('project-title');
    const categoryEl = document.getElementById('project-category');
    const yearEl = document.getElementById('project-year');
    const summaryEl = document.getElementById('project-summary');
    const descEl = document.getElementById('project-description');
    const githubEl = document.getElementById('project-github');
    const demoEl = document.getElementById('project-demo');
    const tagsEl = document.getElementById('project-tags');
    const statusEl = document.getElementById('project-status');

    if (idEl) idEl.value = p.id;
    if (titleEl) titleEl.value = p.title;
    if (categoryEl) categoryEl.value = p.category;
    if (yearEl) yearEl.value = p.year;
    if (summaryEl) summaryEl.value = p.summary;
    if (descEl) descEl.value = p.description;
    if (githubEl) githubEl.value = p.github || '';
    if (demoEl) demoEl.value = p.demoPath || '';
    if (tagsEl) tagsEl.value = p.tags.join(', ');
    if (statusEl) statusEl.value = p.status || '';

    currentUploadedImages = [...p.images];
    renderImagesPreview();

    if (btnCancel) btnCancel.style.display = 'inline-flex';
    if (btnDelete) btnDelete.style.display = 'inline-flex';
  }

  // Submit project add/update
  if (projectForm) {
    projectForm.addEventListener('submit', e => {
      e.preventDefault();
      
      const id = document.getElementById('project-id').value;
      const title = document.getElementById('project-title').value.trim();
      const category = document.getElementById('project-category').value;
      const year = parseInt(document.getElementById('project-year').value, 10);
      const summary = document.getElementById('project-summary').value.trim();
      const description = document.getElementById('project-description').value.trim();
      const github = document.getElementById('project-github').value.trim();
      const demo = document.getElementById('project-demo').value.trim();
      const tags = document.getElementById('project-tags').value.split(',').map(t => t.trim()).filter(Boolean);
      const status = document.getElementById('project-status').value.trim();

      if (currentUploadedImages.length === 0) {
        alert("Sube al menos una imagen para el proyecto.");
        return;
      }

      const pData = {
        title,
        category,
        year,
        summary,
        description,
        github,
        demoPath: demo,
        tags,
        status,
        images: currentUploadedImages
      };

      const finalId = id || title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + '_' + Date.now().toString().slice(-4);

      db.collection('projects').doc(finalId).set(pData)
        .then(() => {
          resetCMSForm();
          alert("✓ Proyecto guardado correctamente en Firestore!");
        })
        .catch(err => {
          alert("Error al guardar: " + err.message);
        });
    });
  }

  // Delete project
  if (btnDelete) {
    btnDelete.addEventListener('click', () => {
      const id = document.getElementById('project-id').value;
      if (!id) return;

      if (confirm(`¿Estás seguro de que quieres eliminar este proyecto permanentemente de Firestore?`)) {
        db.collection('projects').doc(id).delete()
          .then(() => {
            resetCMSForm();
            alert("✓ Proyecto eliminado.");
          })
          .catch(err => {
            alert("Error al eliminar: " + err.message);
          });
      }
    });
  }


  // --- TRAZABILIDAD (ANALYTICS) DASHBOARD ---
  function loadAnalyticsDashboard() {
    if (!tableBody) return;

    db.collection('visits').orderBy('timestamp', 'desc').limit(150).onSnapshot(snapshot => {
      tableBody.innerHTML = '';
      
      if (snapshot.empty) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--color-text-secondary); padding: 40px 0;">No hay visitas registradas aún.</td></tr>';
        return;
      }

      let totalVisits = snapshot.size;
      let sumDuration = 0;
      let referrers = {};

      snapshot.forEach(doc => {
        const v = doc.data();
        sumDuration += (v.duration || 0);

        const r = v.referrer || 'direct';
        referrers[r] = (referrers[r] || 0) + 1;

        let dateStr = 'Sin Fecha';
        if (v.timestamp && v.timestamp.toDate) {
          const date = v.timestamp.toDate();
          dateStr = date.toLocaleString('es-ES', { 
            day: '2-digit', month: '2-digit', year: '2-digit', 
            hour: '2-digit', minute: '2-digit' 
          });
        }

        let durStr = '0s';
        if (v.duration !== undefined) {
          const min = Math.floor(v.duration / 60);
          const sec = v.duration % 60;
          durStr = min > 0 ? `${min}m ${sec}s` : `${sec}s`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${dateStr}</td>
          <td><span class="pill ${r === 'direct' ? 'pill-amber' : ''}">${r}</span></td>
          <td>${v.geo ? `${v.geo.city || 'Desconocido'}, ${v.geo.country || 'Desconocido'}` : 'Cargando...'}</td>
          <td style="font-family: monospace;">${v.geo && v.geo.ip ? v.geo.ip : '—'}</td>
          <td>${v.device ? `${v.device.browser} / ${v.device.platform}` : '—'}</td>
          <td>${v.device ? v.device.screen : '—'}</td>
          <td>${durStr}</td>
        `;
        tableBody.appendChild(tr);
      });

      // 1. Calculate Metric: Total
      const totalVisitsEl = document.getElementById('metric-total-visits');
      if (totalVisitsEl) totalVisitsEl.textContent = totalVisits;

      // 2. Calculate Metric: Average Duration
      const avg = totalVisits > 0 ? Math.round(sumDuration / totalVisits) : 0;
      const avgMin = Math.floor(avg / 60);
      const avgSec = avg % 60;
      const avgDurationEl = document.getElementById('metric-avg-duration');
      if (avgDurationEl) avgDurationEl.textContent = avgMin > 0 ? `${avgMin}m ${avgSec}s` : `${avgSec}s`;

      // 3. Calculate Metric: Popular Referrer
      let topRef = 'Ninguno';
      let maxCount = 0;
      for (const [key, val] of Object.entries(referrers)) {
        if (val > maxCount) {
          maxCount = val;
          topRef = key;
        }
      }
      const topRefEl = document.getElementById('metric-top-referrer');
      if (topRefEl) topRefEl.textContent = `${topRef} (${maxCount} v)`;

    }, err => {
      console.error("Analytics load failed:", err);
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-danger); padding: 40px 0;">Acceso denegado a analíticas. Configura reglas de Firestore.</td></tr>`;
    });
  }

})();
