<script>
  // Initial course data
  const initialCourses = [
    {
      id: 'unas-profesionales-desde-cero',
      category: 'belleza',
      title: 'Uñas profesionales desde cero',
      badge: 'Ruta recomendada',
      img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85',
      meta: 'Belleza',
      desc: 'Aprende preparación, esmaltado, decoración y atención al cliente con una ruta pensada para comenzar a ofrecer el servicio.',
      creatorName: 'Mariana Ruiz',
      creatorInitials: 'MR',
      facts: ['18 módulos', 'Acceso online', 'Para emprender'],
      priceNum: 39,
      priceStr: 'US$39',
      featured: true,
      link: '/cursos/unas-profesionales-desde-cero',
      saved: false
    },
    {
      id: 'pasteleria-para-emprender',
      category: 'cocina',
      title: 'Pastelería para emprender',
      badge: 'Más buscado',
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
      meta: 'Pastelería',
      desc: 'Recetas, decoración, costos y presentación para comenzar a vender.',
      creatorName: 'Laura Castillo',
      creatorInitials: 'LC',
      facts: ['Video', 'Recetarios'],
      priceNum: 29,
      priceStr: 'US$29',
      featured: false,
      link: '/cursos/pasteleria-para-emprender',
      saved: false
    },
    {
      id: 'reparacion-de-celulares',
      category: 'oficios',
      title: 'Reparación de celulares',
      badge: 'Nueva habilidad',
      img: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=900&q=85',
      meta: 'Tecnología',
      desc: 'Diagnóstico, herramientas y procedimientos esenciales para comenzar.',
      creatorName: 'Diego Acosta',
      creatorInitials: 'DA',
      facts: ['21 módulos', 'Práctico'],
      priceNum: 45,
      priceStr: 'US$45',
      featured: false,
      link: '/cursos/reparacion-de-celulares',
      saved: false
    },
    {
      id: 'ia-para-trabajar-y-crear',
      category: 'digital',
      title: 'Inteligencia artificial para negocios',
      badge: 'Tendencia',
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85',
      meta: 'Digital',
      desc: 'Automatiza tareas, crea contenido y organiza procesos con herramientas accesibles.',
      creatorName: 'Andrés Peña',
      creatorInitials: 'AP',
      facts: ['12 módulos', 'Plantillas'],
      priceNum: 34,
      priceStr: 'US$34',
      featured: false,
      link: '/cursos/ia-para-trabajar-y-crear',
      saved: false
    },
    {
      id: 'costura-creativa-desde-cero',
      category: 'creatividad',
      title: 'Costura creativa desde cero',
      badge: null,
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85',
      meta: 'Creatividad',
      desc: 'Conoce tu máquina y crea piezas sencillas con acabados cuidados.',
      creatorName: 'Sofía Rivas',
      creatorInitials: 'SR',
      facts: ['Proyectos', 'Patrones'],
      priceNum: 25,
      priceStr: '$25',
      featured: false,
      link: '#',
      saved: false
    },
    {
      id: 'marketing-para-servicios-locales',
      category: 'digital',
      title: 'Marketing para servicios locales',
      badge: 'Emprendimiento',
      img: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=900&q=85',
      meta: 'Digital',
      desc: 'Cómo conseguir tus primeros clientes sin presupuestos gigantescos.',
      creatorName: 'Sebastián Cruz',
      creatorInitials: 'SC',
      facts: ['14 lecciones', 'Plantillas', 'Google Maps'],
      priceNum: 41,
      priceStr: '$41',
      featured: false,
      link: '#',
      saved: false
    },
    {
      id: 'costura-y-arreglos-express',
      category: 'oficios',
      title: 'Costura y arreglos express',
      badge: 'Rápida salida',
      img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=85',
      meta: 'Oficios',
      desc: 'Aprende ajustes, dobladillos y reformas para ofrecer un servicio buscado.',
      creatorName: 'Lucía Fernández',
      creatorInitials: 'LF',
      facts: ['16 guías', 'Técnicas a mano/máquina'],
      priceNum: 32,
      priceStr: '$32',
      featured: false,
      link: '#',
      saved: false
    },
    {
      id: 'repostería-creativa-y-mesas-dulces',
      category: 'cocina',
      title: 'Repostería creativa y mesas dulces',
      badge: 'Eventos',
      img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=900&q=85',
      meta: 'Cocina',
      desc: 'Montaje, costeo y combinaciones para cumpleaños y celebraciones.',
      creatorName: 'Camila Torres',
      creatorInitials: 'CT',
      facts: ['20 módulos', 'Calculadora de costos'],
      priceNum: 49,
      priceStr: '$49',
      featured: false,
      link: '/cursos/reparacion-de-celulares',
      saved: false
    }
  ];

  let courses = initialCourses.map(c => ({ ...c }));
  let searchQuery = '';
  let selectedCategory = 'todos';
  let maxPrice = 120;
  let sortBy = 'Recomendados';
  let showMobileFilter = false;

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'belleza', label: 'Belleza y uñas' },
    { id: 'cocina', label: 'Pastelería y cocina' },
    { id: 'oficios', label: 'Oficios y reparación' },
    { id: 'digital', label: 'Digital e IA' },
    { id: 'creatividad', label: 'Costura y creatividad' }
  ];

  function clearFilters() {
    searchQuery = '';
    selectedCategory = 'todos';
    maxPrice = 120;
    sortBy = 'Recomendados';
  }

  function toggleSave(id) {
    courses = courses.map(c => c.id === id ? { ...c, saved: !c.saved } : c);
  }

  $: filteredCourses = courses.filter(c => {
    const categoryOk = selectedCategory === 'todos' || c.category === selectedCategory;
    const searchOk = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const priceOk = c.priceNum <= maxPrice;
    return categoryOk && searchOk && priceOk;
  }).sort((a, b) => {
    if (sortBy === 'Precio: menor a mayor') return a.priceNum - b.priceNum;
    if (sortBy === 'Precio: mayor a menor') return b.priceNum - a.priceNum;
    return 0;
  });
</script>

<header class="hero">
  <div class="container">
    <div class="hero-grid">
      <div>
        <span class="eyebrow">Catálogo seleccionado</span>
        <h1 class="display">Encuentra algo que puedas <span>dominar.</span></h1>
        <p>No necesitas otro catálogo infinito. Explora formaciones organizadas por habilidad, nivel y objetivo para tomar una mejor decisión.</p>
      </div>
      <aside class="hero-note">
        <div class="hero-note-badge">
          <span class="eyebrow">Selección Domina</span>
          <span class="badge-tag">✦ Calidad Curada</span>
        </div>
        <strong>Menos opciones vacías. Más rutas que sí tienen sentido.</strong>
        <p>Revisamos el enfoque, la claridad de la oferta y su aplicación práctica antes de recomendar.</p>
        <div class="hero-stats">
          <div class="hero-stat-item">
            <strong>+50</strong>
            <span>Cursos evaluados</span>
          </div>
          <div class="hero-stat-item">
            <strong>100%</strong>
            <span>Práctico y directo</span>
          </div>
          <div class="hero-stat-item">
            <strong>Rutas</strong>
            <span>Por nivel y objetivo</span>
          </div>
        </div>
      </aside>
    </div>
    <form class="search-shell" on:submit|preventDefault>
      <label class="search">
        <span class="search-icon">⌕</span>
        <input bind:value={searchQuery} type="search" placeholder="Busca uñas, pastelería, reparación, IA..." aria-label="Buscar cursos" />
      </label>
      <button class="btn" type="submit">Buscar cursos ↗</button>
    </form>
  </div>
</header>

<div class="category-strip">
  <div class="container">
    <div class="chips">
      {#each categories as cat}
        <button
          class="chip {selectedCategory === cat.id ? 'active' : ''}"
          on:click={() => selectedCategory = cat.id}
        >
          {cat.label}
        </button>
      {/each}
    </div>
  </div>
</div>

<section class="catalog" id="catalogo">
  <div class="container catalog-layout">
    <aside class="filters {showMobileFilter ? 'show-mobile' : ''}">
      <div class="filter-head">
        <h2>Filtrar cursos</h2>
        <button class="clear" on:click={clearFilters}>Limpiar</button>
      </div>
      <div class="filter-group">
        <h3>Objetivo</h3>
        <label class="check"><input type="checkbox" /> Empezar desde cero</label>
        <label class="check"><input type="checkbox" /> Emprender</label>
        <label class="check"><input type="checkbox" /> Mejorar una técnica</label>
      </div>
      <div class="filter-group">
        <h3>Formato</h3>
        <label class="check"><input type="checkbox" /> Curso en video</label>
        <label class="check"><input type="checkbox" /> Ebook + recursos</label>
        <label class="check"><input type="checkbox" /> Comunidad</label>
      </div>
      <div class="filter-group">
        <h3>Precio máximo: ${maxPrice}</h3>
        <input type="range" min="10" max="200" step="5" bind:value={maxPrice} />
        <div class="range-labels">
          <span>$10</span>
          <span>$200</span>
        </div>
      </div>
    </aside>

    <div>
      <div class="results-top">
        <div>
          <button class="btn mobile-filter" on:click={() => showMobileFilter = !showMobileFilter}>
            ☰ Filtros
          </button>
          <h2>Todos los cursos</h2>
          <p>{filteredCourses.length} curso{filteredCourses.length === 1 ? '' : 's'} seleccionado{filteredCourses.length === 1 ? '' : 's'}</p>
        </div>
        <select class="sort" bind:value={sortBy} aria-label="Ordenar cursos">
          <option>Recomendados</option>
          <option>Más recientes</option>
          <option>Precio: menor a mayor</option>
          <option>Precio: mayor a menor</option>
        </select>
      </div>

      <div class="grid">
        {#each filteredCourses as course (course.id)}
          <article class="card {course.featured ? 'featured' : ''}">
            <div class="media">
              {#if course.badge}
                <span class="badge">{course.badge}</span>
              {/if}
              <button class="save" on:click={() => toggleSave(course.id)} style="color: {course.saved ? '#FF5C35' : ''}">
                {course.saved ? '♥' : '♡'}
              </button>
              <img src={course.img} alt={course.title} />
            </div>
            <div class="body">
              <div class="meta">{course.meta}</div>
              <h3>{course.title}</h3>
              <p class="desc">{course.desc}</p>
              <div class="creator">
                <span class="avatar">{course.creatorInitials}</span> Por {course.creatorName}
              </div>
              <div class="facts">
                {#each course.facts as fact}
                  <span class="fact">{fact}</span>
                {/each}
              </div>
              <div class="card-foot">
                <div class="price">
                  <small>Desde</small>
                  <strong>{course.priceStr}</strong>
                </div>
                <a class="link" href={course.link}>Ver {course.featured ? 'curso ' : ''}↗</a>
              </div>
            </div>
          </article>
        {/each}
      </div>

      <div class="load">
        <button class="btn" type="button">Cargar más cursos ↓</button>
      </div>
    </div>
  </div>
</section>

<section class="curation">
  <div class="container curation-grid">
    <div>
      <span class="eyebrow">Cómo elegimos</span>
      <h2 class="display">No todo curso merece tu tiempo.</h2>
      <p>Domina organiza y presenta opciones con una lógica clara. La recomendación final debe ayudarte a entender qué aprenderás, para quién sirve y cómo podrías aplicar esa habilidad.</p>
    </div>
    <div class="criteria">
      <div class="criterion">
        <strong>Aplicación práctica</strong>
        <p>Debe llevarte de la teoría a una habilidad demostrable.</p>
      </div>
      <div class="criterion">
        <strong>Oferta comprensible</strong>
        <p>Contenido, formato y alcance explicados sin humo.</p>
      </div>
      <div class="criterion">
        <strong>Ruta adecuada</strong>
        <p>Nivel y objetivo claros antes de comprar.</p>
      </div>
      <div class="criterion">
        <strong>Valor real</strong>
        <p>Recursos y metodología acordes al precio.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 64px 0 34px;
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
  }
  .hero h1 {
    font-size: clamp(4rem, 7.5vw, 7.5rem);
    max-width: 900px;
  }
  .hero h1 span {
    color: var(--orange);
  }
  .hero p {
    font-size: 1.12rem;
    line-height: 1.7;
    color: #535a6a;
    max-width: 680px;
    margin: 24px 0 0;
  }
  .hero-note {
    background: var(--lime);
    padding: 30px;
    border-radius: 28px;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.05);
  }
  .hero-note-badge {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .badge-tag {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: rgba(255, 255, 255, 0.7);
    padding: 4px 10px;
    border-radius: 999px;
    color: var(--ink);
  }
  .hero-note strong {
    font: 800 1.85rem / 1.1 "Manrope", sans-serif;
    display: block;
    letter-spacing: -0.04em;
    color: var(--ink);
    margin: 4px 0 0;
  }
  .hero-note p {
    font-size: 0.95rem;
    line-height: 1.55;
    margin: 0;
    color: #2b3240;
  }
  .hero-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
    padding-top: 18px;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }
  .hero-stat-item {
    background: rgba(255, 255, 255, 0.75);
    padding: 10px 12px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .hero-stat-item strong {
    font: 800 1.15rem / 1.1 "Manrope", sans-serif;
    color: var(--ink);
    margin: 0;
  }
  .hero-stat-item span {
    font-size: 0.72rem;
    font-weight: 700;
    color: #4a5160;
    line-height: 1.2;
  }
  .search-shell {
    margin-top: 40px;
    background: var(--ink);
    border-radius: 30px;
    padding: 18px;
    box-shadow: var(--shadow);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
  }
  .search {
    background: white;
    border-radius: 18px;
    display: flex;
    align-items: center;
    padding: 0 18px;
    gap: 12px;
  }
  .search input {
    width: 100%;
    border: 0;
    outline: 0;
    background: transparent;
    font-size: 1rem;
    padding: 16px 0;
  }
  .search-icon {
    font-size: 1.2rem;
  }
  .search-shell .btn {
    border-color: var(--lime);
    background: var(--lime);
    color: var(--ink);
  }

  .category-strip {
    padding: 20px 0 34px;
  }
  .chips {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 8px;
    cursor: grab;
    user-select: none;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--orange, #f36438) transparent;
  }
  .chips::-webkit-scrollbar {
    height: 5px;
  }
  .chips::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
  .chips::-webkit-scrollbar-track {
    background: transparent;
    border: none;
  }
  .chips::-webkit-scrollbar-thumb {
    background: var(--orange, #f36438);
    border-radius: 999px;
    border: none;
  }
  .chips::-webkit-scrollbar-thumb:hover {
    background: #e54d26;
  }
  .chip {
    white-space: nowrap;
    border: 1px solid var(--line);
    background: white;
    border-radius: 999px;
    padding: 11px 16px;
    font-weight: 700;
    cursor: pointer;
  }
  .chip.active {
    background: var(--ink);
    color: white;
    border-color: var(--ink);
  }

  .catalog {
    padding: 34px 0 100px;
  }
  .catalog-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 28px;
  }
  .filters {
    position: sticky;
    top: 100px;
    align-self: start;
    background: var(--cream);
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 22px;
  }
  .filter-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .filter-head h2 {
    font: 800 1.15rem "Manrope", sans-serif;
    margin: 0;
  }
  .clear {
    border: 0;
    background: none;
    text-decoration: underline;
    color: var(--muted);
    cursor: pointer;
  }
  .filter-group {
    padding: 18px 0;
    border-top: 1px solid var(--line);
  }
  .filter-group h3 {
    font: 800 0.95rem "Manrope", sans-serif;
    margin: 0 0 13px;
  }
  .check {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 11px 0;
    color: #505666;
    cursor: pointer;
  }
  .check input {
    accent-color: var(--orange);
    width: 17px;
    height: 17px;
  }
  .range {
    width: 100%;
    accent-color: var(--orange);
  }

  .results-top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 22px;
  }
  .results-top h2 {
    font: 800 clamp(2rem, 4vw, 4rem) / 1 "Manrope", sans-serif;
    letter-spacing: -0.05em;
    margin: 0;
  }
  .results-top p {
    color: var(--muted);
    margin: 8px 0 0;
  }
  .sort {
    border: 1px solid var(--line);
    background: white;
    border-radius: 999px;
    padding: 12px 16px;
    outline: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }
  .card {
    background: white;
    border: 1px solid var(--line);
    border-radius: 24px;
    overflow: hidden;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
  }
  .card:hover {
    transform: translateY(-7px);
    box-shadow: var(--shadow);
  }
  .media {
    height: 210px;
    position: relative;
  }
  .badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: var(--lime);
    padding: 7px 10px;
    border-radius: 999px;
    font-size: 0.72rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .save {
    position: absolute;
    right: 14px;
    top: 14px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 0;
    background: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 1.1rem;
  }
  .body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .meta {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    font-weight: 800;
    color: var(--muted);
  }
  .card h3 {
    font: 800 1.28rem / 1.15 "Manrope", sans-serif;
    letter-spacing: -0.035em;
    margin: 9px 0;
  }
  .desc {
    color: #626878;
    line-height: 1.55;
    font-size: 0.94rem;
    margin: 0 0 16px;
  }
  .creator {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 0.86rem;
    color: #596071;
  }
  .avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--violet);
    display: grid;
    place-items: center;
    font-weight: 800;
    color: var(--ink);
  }
  .facts {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 16px 0;
  }
  .fact {
    background: var(--cream);
    border-radius: 999px;
    padding: 7px 9px;
    font-size: 0.78rem;
    color: #505666;
  }
  .card-foot {
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .price small {
    display: block;
    color: var(--muted);
    font-size: 0.72rem;
  }
  .price strong {
    font: 800 1.3rem "Manrope", sans-serif;
  }
  .link {
    font-weight: 800;
  }
  .featured {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--violet);
  }
  .featured .media {
    height: 100%;
    min-height: 330px;
  }
  .featured .body {
    padding: 28px;
  }
  .featured h3 {
    font-size: 2rem;
  }
  .featured .fact {
    background: rgba(255, 255, 255, 0.56);
  }

  .load {
    display: flex;
    justify-content: center;
    margin-top: 34px;
  }
  .mobile-filter {
    display: none;
  }

  .curation {
    padding: 90px 0;
    background: var(--ink);
    color: white;
  }
  .curation-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  .curation h2 {
    font-size: clamp(3rem, 6vw, 6.2rem);
  }
  .curation p {
    color: #bbc0cc;
    line-height: 1.7;
    max-width: 610px;
  }
  .criteria {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .criterion {
    background: #171e32;
    border: 1px solid rgba(255, 255, 255, 0.09);
    padding: 22px;
    border-radius: 20px;
  }
  .criterion strong {
    font: 800 1.1rem "Manrope", sans-serif;
  }
  .criterion p {
    font-size: 0.9rem;
    margin: 7px 0 0;
  }

  @media (max-width: 1050px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
    .hero-note {
      max-width: 100%;
    }
    .catalog-layout {
      grid-template-columns: 1fr;
    }
    .filters {
      display: none;
    }
    .filters.show-mobile {
      display: block;
      margin-bottom: 20px;
    }
    .mobile-filter {
      display: inline-flex;
    }
    .grid {
      grid-template-columns: 1fr 1fr;
    }
    .featured {
      grid-column: span 2;
    }
    .curation-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 680px) {
    .hero {
      padding-top: 38px;
    }
    .hero h1 {
      font-size: clamp(3.4rem, 16vw, 5rem);
    }
    .search-shell {
      grid-template-columns: 1fr;
      padding: 12px;
    }
    .search-shell .btn {
      width: 100%;
    }
    .results-top {
      align-items: flex-start;
      flex-direction: column;
    }
    .sort {
      width: 100%;
    }
    .grid {
      grid-template-columns: 1fr;
    }
    .featured {
      grid-column: auto;
      display: flex;
      flex-direction: column;
    }
    .featured .media {
      min-height: 220px;
    }
    .featured h3 {
      font-size: 1.45rem;
    }
    .criteria {
      grid-template-columns: 1fr;
    }
  }
</style>
