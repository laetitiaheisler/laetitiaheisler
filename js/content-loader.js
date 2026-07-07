async function loadJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function loadWorks() {
  try {
    const res = await fetch('/_content/works/');
    if (!res.ok) return;
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = [...doc.querySelectorAll('a[href]')]
      .map(a => a.getAttribute('href'))
      .filter(h => h.endsWith('.md'));
    const items = await Promise.all(
      links.map(async (link) => {
        const res2 = await fetch(link);
        if (!res2.ok) return null;
        const md = await res2.text();
        const frontmatter = {};
        const match = md.match(/^---\n([\s\S]*?)\n---\n/);
        if (match) {
          match[1].split('\n').forEach(line => {
            const sep = line.indexOf(': ');
            if (sep > 0) {
              const key = line.slice(0, sep).trim();
              const val = line.slice(sep + 2).trim().replace(/^"(.*)"$/, '$1');
              frontmatter[key] = val;
            }
          });
        }
        return frontmatter;
      })
    );
    const valid = items.filter(Boolean).sort((a, b) => (a.order || 0) - (b.order || 0));
    const grid = document.querySelector('.works-grid');
    if (!grid || !valid.length) return;
    grid.innerHTML = '';
    valid.forEach(item => {
      const div = document.createElement('div');
      div.className = 'work-item';
      div.innerHTML = `
        <img src="${item.image || ''}" alt="${item.title || ''}" loading="lazy">
        <div class="work-overlay">
          <h3>${item.title || ''}</h3>
          <p>${item.description || ''}</p>
        </div>
      `;
      grid.appendChild(div);
    });
  } catch {}
}

async function loadNews() {
  try {
    const res = await fetch('/_content/news/');
    if (!res.ok) return;
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = [...doc.querySelectorAll('a[href]')]
      .map(a => a.getAttribute('href'))
      .filter(h => h.endsWith('.md'));
    const items = await Promise.all(
      links.map(async (link) => {
        const res2 = await fetch(link);
        if (!res2.ok) return null;
        const md = await res2.text();
        const match = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (!match) return null;
        const frontmatter = {};
        match[1].split('\n').forEach(line => {
          const sep = line.indexOf(': ');
          if (sep > 0) {
            const key = line.slice(0, sep).trim();
            const val = line.slice(sep + 2).trim().replace(/^"(.*)"$/, '$1');
            frontmatter[key] = val;
          }
        });
        return { ...frontmatter, body: match[2].trim() };
      })
    );
    const valid = items.filter(Boolean);
    const container = document.querySelector('.news-content');
    if (!container || !valid.length) return;
    container.innerHTML = '';
    valid.forEach(item => {
      const article = document.createElement('article');
      article.className = 'news-item';
      article.innerHTML = `
        <p class="date">${item.date || ''}</p>
        <h3>${item.title || ''}</h3>
        <p>${item.body ? item.body.replace(/\n/g, '<br>') : ''}</p>
      `;
      container.appendChild(article);
    });
  } catch {}
}

async function loadAbout() {
  const data = await loadJSON('/_content/about.json');
  if (!data) return;
  const intro = document.querySelector('.bio-intro');
  if (intro && data.bio_intro) intro.textContent = data.bio_intro;
  const paragraphs = document.querySelectorAll('.about-content p');
  if (paragraphs[1] && data.bio_main) paragraphs[1].textContent = data.bio_main;
  if (paragraphs[2] && data.bio_extra) paragraphs[2].textContent = data.bio_extra;
}

async function loadContact() {
  const data = await loadJSON('/_content/contact.json');
  if (!data) return;
  const links = document.querySelectorAll('.contact-content a');
  if (links[0] && data.email) { links[0].href = 'mailto:' + data.email; links[0].textContent = data.email; }
  if (links[1] && data.instagram) { links[1].href = data.instagram; }
}

async function loadWorkshopIntro() {
  const data = await loadJSON('/_content/workshops.json');
  if (!data || !data.intro) return;
  const el = document.querySelector('.workshop-intro');
  if (el) el.textContent = data.intro;
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.works-grid')) loadWorks();
  if (document.querySelector('.news-content')) loadNews();
  if (document.querySelector('.about-content')) loadAbout();
  if (document.querySelector('.contact-content')) loadContact();
  if (document.querySelector('.workshop-intro')) loadWorkshopIntro();
});
