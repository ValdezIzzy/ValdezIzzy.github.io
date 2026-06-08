(()=>{
  const STORAGE_KEY = 'iv_portfolio_projectOrder_v1';
  const THEME_KEY = 'iv_theme_v1';

  const projectList = document.getElementById('project-list');
  const aboutEl = document.getElementById('about-content');
  const themeToggle = document.getElementById('theme-toggle');

  function loadTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    if(saved==='dark') document.documentElement.classList.add('dark');
    updateToggleLabel();
  }

  function toggleTheme(){
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark? 'dark' : 'light');
    updateToggleLabel();
  }

  function updateToggleLabel(){
    const isDark = document.documentElement.classList.contains('dark');
    themeToggle.textContent = isDark? '☀️' : '🌙';
  }

  function saveOrder(ids){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }

  function readSavedOrder(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null }catch(e){return null}
  }

  function render(){
    const data = window.SITE || {projects:[],about:''};
    aboutEl.textContent = data.about || '';

    const saved = readSavedOrder();
    let projects = Array.from(data.projects || []);
    if(saved && Array.isArray(saved)){
      const map = new Map(projects.map(p=>[p.id,p]));
      projects = saved.map(id=>map.get(id)).filter(Boolean).concat(projects.filter(p=>!saved.includes(p.id)));
    }

    projectList.innerHTML = '';
    projects.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'card';
      card.setAttribute('draggable','true');
      card.dataset.id = p.id;

      card.innerHTML = `
        <div>
          <h3 class="title">${p.title}</h3>
          <p class="desc">${p.desc}</p>
        </div>
        <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="actions"><a class="btn" href="${p.link}">View</a></div>
      `;

      addDnD(card);
      projectList.appendChild(card);
    });
  }

  function addDnD(card){
    card.addEventListener('dragstart', e=>{
      e.dataTransfer.setData('text/plain', card.dataset.id);
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', ()=>{
      card.classList.remove('dragging');
      persistCurrentOrder();
    });

    card.addEventListener('dragover', e=>{
      e.preventDefault();
      const after = getDragAfterElement(projectList, e.clientY);
      const dragging = document.querySelector('.card.dragging');
      if(!dragging) return;
      if(after==null) projectList.appendChild(dragging);
      else projectList.insertBefore(dragging, after);
    });
  }

  function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
    return draggableElements.reduce((closest, child)=>{
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height/2;
      if(offset<0 && offset>closest.offset){
        return {offset, element: child};
      }else return closest;
    }, {offset:Number.NEGATIVE_INFINITY}).element || null;
  }

  function persistCurrentOrder(){
    const ids = [...projectList.children].map(c=>c.dataset.id);
    saveOrder(ids);
  }

  // Init
  loadTheme();
  render();

  themeToggle.addEventListener('click', toggleTheme);

  // Allow keyboard users to reorder with simple controls (move up/down)
  document.addEventListener('keydown', e=>{
    const active = document.activeElement.closest?.('.card') || null;
    if(!active) return;
    if(e.key === 'ArrowUp'){
      const prev = active.previousElementSibling; if(prev){ active.parentNode.insertBefore(active, prev); persistCurrentOrder(); }
    }
    if(e.key === 'ArrowDown'){
      const next = active.nextElementSibling; if(next){ active.parentNode.insertBefore(next, active); persistCurrentOrder(); }
    }
  });

})();
