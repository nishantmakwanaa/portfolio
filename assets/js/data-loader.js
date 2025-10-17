'use strict';

let siteData = null;

async function loadPortfolioData() {
  try {
    const response = await fetch('./data.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    siteData = await response.json();
    renderAll();
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

function renderAll() {
  if (!siteData) return;

  renderPersonalInfo();
  renderSocialLinks();
  renderAbout();
  renderTestimonials();
  renderClients();
  renderResume();
  renderProjects();
  renderBlog();
  attachTestimonialsOpeners();

  // Attach bindings for newly rendered dynamic content
  attachTimelineLinks();
  bindProjectModalDelegation();
  bindBlogModalDelegation();
}

function renderPersonalInfo() {
  const { personalInfo } = siteData;
  if (!personalInfo) return;

  const nameEl = document.querySelector('.info-content .name');
  const titleEl = document.querySelector('.info-content .title');
  const avatarImg = document.querySelector('.avatar-box img');
  if (nameEl) nameEl.textContent = personalInfo.name || '';
  if (titleEl) titleEl.textContent = personalInfo.title || '';
  if (avatarImg) {
    avatarImg.src = personalInfo.avatar || avatarImg.src;
    avatarImg.alt = personalInfo.name || avatarImg.alt || 'Avatar';
  }

  // Contacts: email
  const emailItem = document.querySelector('.contacts-list .email-item');
  if (emailItem) {
    const emailLink = emailItem.querySelector('a[href^="mailto:"]');
    if (emailLink) {
      emailLink.href = `mailto:${personalInfo.email}`;
      emailLink.textContent = personalInfo.email;
    }
  }

  // Contacts: phone
  const phoneItem = Array.from(document.querySelectorAll('.contacts-list .contact-item'))
    .find(li => (li.querySelector('.contact-title')?.textContent || '').trim().toLowerCase() === 'phone');
  if (phoneItem) {
    const phoneLink = phoneItem.querySelector('a[href^="tel:"]');
    if (phoneLink) {
      phoneLink.href = `tel:${personalInfo.phone}`;
      phoneLink.textContent = personalInfo.phone;
    }
  }

  // Contacts: birthday
  const birthdayItem = Array.from(document.querySelectorAll('.contacts-list .contact-item'))
    .find(li => (li.querySelector('.contact-title')?.textContent || '').trim().toLowerCase() === 'birthday');
  if (birthdayItem) {
    const timeEl = birthdayItem.querySelector('time[datetime]');
    if (timeEl) timeEl.textContent = personalInfo.birthday || '';
  }

  // Contacts: location
  const locationItem = Array.from(document.querySelectorAll('.contacts-list .contact-item'))
    .find(li => (li.querySelector('.contact-title')?.textContent || '').trim().toLowerCase() === 'location');
  if (locationItem) {
    const addrEl = locationItem.querySelector('address');
    if (addrEl) addrEl.textContent = personalInfo.location || '';
  }

  const resumeBtn = document.getElementById('download-resume-btn');
  if (resumeBtn && personalInfo.resumeUrl) {
    resumeBtn.href = personalInfo.resumeUrl;
  }
}

function renderSocialLinks() {
  const { socialLinks } = siteData;
  if (!Array.isArray(socialLinks)) return;
  const socialList = document.querySelector('.social-list');
  if (!socialList) return;

  socialList.innerHTML = '';
  
  socialLinks.forEach(link => {
    const li = document.createElement('li');
    li.className = 'social-item';
    li.innerHTML = `
      <a href="${link.url}" class="social-link" aria-label="${link.name}" target="_blank" rel="noopener noreferrer">
        <ion-icon name="${link.icon}"></ion-icon>
      </a>
    `;
    socialList.appendChild(li);
  });
}

function renderAbout() {
  const { about } = siteData;
  if (!about) return;
  
  const aboutText = document.querySelector('.about-text');
  if (aboutText && Array.isArray(about.description)) {
    aboutText.innerHTML = about.description.map(para => `<p>${para}</p>`).join('');
  }
  
  const serviceList = document.querySelector('.service-list');
  if (!serviceList) return;
  serviceList.innerHTML = '';
  
  (about.services || []).forEach(service => {
    const li = document.createElement('li');
    li.className = 'service-item';
    li.innerHTML = `
      <div class="service-icon-box">
        <img src="${service.icon}" alt="${service.title} Icon" width="40">
      </div>
      <div class="service-content-box">
        <h4 class="h4 service-item-title">${service.title}</h4>
        <p class="service-item-text">${service.description}</p>
      </div>
    `;
    serviceList.appendChild(li);
  });
}

function renderTestimonials() {
  const { testimonials } = siteData;
  const testimonialsList = document.querySelector('.testimonials-list');
  if (!testimonialsList) return;
  
  testimonialsList.innerHTML = '';
  
  (testimonials || []).forEach(testimonial => {
    const li = document.createElement('li');
    li.className = 'testimonials-item';
    li.innerHTML = `
      <div class="content-card" data-testimonials-item>
        <figure class="testimonials-avatar-box">
          <img src="${testimonial.logo}" alt="${testimonial.company}" width="60" data-testimonials-avatar>
        </figure>
        <h4 class="h4 testimonials-item-title" data-testimonials-title>${testimonial.company}</h4>
        <div class="testimonials-text" data-testimonials-text>
          <p>${testimonial.description}</p>
        </div>
      </div>
    `;
    testimonialsList.appendChild(li);
  });
}

function renderClients() {
  const { clients } = siteData;
  const clientsList = document.querySelector('.clients-list');
  if (!clientsList) return;
  
  clientsList.innerHTML = '';
  
  (clients || []).forEach(client => {
    const li = document.createElement('li');
    li.className = 'clients-item';
    li.innerHTML = `
      <a href="#">
        <img src="${client.logo}" alt="${client.name} Logo">
      </a>
    `;
    clientsList.appendChild(li);
  });
}

function renderResume() {
  const { resume } = siteData;
  if (!resume) return;
  
  renderTimelineSection('.timeline:nth-of-type(1)', resume.education);
  renderTimelineSection('.timeline:nth-of-type(2)', resume.experience);
  renderTimelineSection('.timeline:nth-of-type(3)', resume.certifications);
  // Languages have different keys
  renderTimelineSection(
    '.timeline:nth-of-type(4)',
    (resume.languages || []).map(l => ({ title: l.language, period: l.proficiency }))
  );
  renderTimelineSection('.timeline:nth-of-type(5)', resume.honors);
  
  const skillsList = document.querySelector('.skills-list');
  if (!skillsList) return;
  skillsList.innerHTML = '';
  
  (resume.skills || []).forEach(skill => {
    const li = document.createElement('li');
    li.className = 'skills-item';
    li.innerHTML = `
      <div class="title-wrapper">
        <h5 class="h5">${skill}</h5>
      </div>
    `;
    skillsList.appendChild(li);
  });
}

function renderTimelineSection(selector, items = []) {
  const timeline = document.querySelector(selector);
  if (!timeline) return;
  const timelineList = timeline.querySelector('.timeline-list');
  if (!timelineList) return;
  
  timelineList.innerHTML = '';
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'timeline-item';
    if (item.link) {
      li.setAttribute('data-link', item.link);
    }
    const hasLink = item.link ? ` <ion-icon class="visit-arrow" name="arrow-up-outline" aria-hidden="true"></ion-icon>` : '';
    const title = item.title ?? item.name ?? '';
    const period = item.period ?? '';
    const description = item.description ?? '';
    li.innerHTML = `
      <h4 class="h4 timeline-item-title">${title}${hasLink}</h4>
      ${period ? `<span>${period}</span>` : ''}
      ${description ? `<p class="timeline-text">${description}</p>` : ''}
    `;
    timelineList.appendChild(li);
  });
}

function renderProjects() {
  const { portfolio } = siteData;
  if (!portfolio) return;

  // Update filter and select lists to match data.json, then projects
  const filterList = document.querySelector('.filter-list');
  const selectList = document.querySelector('.select-list');
  if (filterList && selectList && Array.isArray(portfolio.categories)) {
    filterList.innerHTML = '';
    selectList.innerHTML = '';
    portfolio.categories.forEach(category => {
      const filterBtn = document.createElement('li');
      filterBtn.className = 'filter-item';
      const isActive = category === 'All' ? 'active' : '';
      filterBtn.innerHTML = `<button class="${isActive}" data-filter-btn>${category}</button>`;
      filterList.appendChild(filterBtn);

      const selectBtn = document.createElement('li');
      selectBtn.className = 'select-item';
      selectBtn.innerHTML = `<button data-select-item>${category}</button>`;
      selectList.appendChild(selectBtn);
    });
  }
  
  const projectList = document.querySelector('.project-list');
  if (!projectList) return;
  projectList.innerHTML = '';
  
  (portfolio.projects || []).forEach(project => {
    const li = document.createElement('li');
    li.className = 'project-item active';
    li.setAttribute('data-filter-item', '');
    li.setAttribute('data-category', (project.category || '').toLowerCase());
    if (project.liveUrl) li.setAttribute('data-live-url', project.liveUrl);
    if (project.githubUrl) li.setAttribute('data-github-url', project.githubUrl);
    
    li.innerHTML = `
      <a href="#" data-project-open>
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${project.image}" alt="${project.title}" loading="lazy">
        </figure>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-category">${project.category}</p>
      </a>
    `;
    
    projectList.appendChild(li);
  });

  // Bind filtering to newly created buttons/items
  initFiltering();
}

function renderBlog() {
  // Accept both `blog` and `blogs` in data.json
  const blogContainer = siteData.blog || siteData.blogs;
  if (!blogContainer) return;
  const blogList = document.querySelector('.blog-posts-list');
  if (!blogList) return;
  
  // Supports either { posts: [...] } or [...] directly
  const posts = Array.isArray(blogContainer) ? blogContainer : (blogContainer.posts || []);
  
  blogList.innerHTML = '';
  
  posts.forEach(post => {
    const li = document.createElement('li');
    li.className = 'blog-post-item';
    
    const date = new Date(post.date);
    const formattedDate = isNaN(date.getTime())
      ? (post.date || '')
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    li.innerHTML = `
      <a href="#" data-blog-open>
        <figure class="blog-banner-box">
          <img src="${post.image}" alt="${post.title}" loading="lazy">
        </figure>
        <div class="blog-content">
          <div class="blog-meta">
            <p class="blog-category">${post.category}</p>
            <span class="dot"></span>
            <time datetime="${post.date}">${formattedDate}</time>
          </div>
          <h3 class="h3 blog-item-title">${post.title}</h3>
          <p class="blog-text">${post.description}</p>
        </div>
      </a>
    `;
    
    blogList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', loadPortfolioData);

// Additional bindings for dynamic content not covered by initializeNewFeatures
function attachTestimonialsOpeners() {
  const items = document.querySelectorAll('[data-testimonials-item]');
  const modal = document.querySelector('[data-modal-container]');
  const overlay = document.querySelector('[data-overlay]');
  const img = document.querySelector('[data-modal-img]');
  const title = document.querySelector('[data-modal-title]');
  const text = document.querySelector('[data-modal-text]');

  if (!items.length || !modal || !overlay) return;

  items.forEach((card) => {
    card.addEventListener('click', function () {
      const avatar = card.querySelector('[data-testimonials-avatar]');
      const t = card.querySelector('[data-testimonials-title]');
      const tx = card.querySelector('[data-testimonials-text]');
      if (img && avatar) { img.src = avatar.src; img.alt = avatar.alt || ''; }
      if (title && t) { title.textContent = t.textContent || ''; }
      if (text && tx) { text.innerHTML = tx.innerHTML || ''; }
      modal.classList.add('active');
      overlay.classList.add('active');
    });
  });
}

function initFiltering() {
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-selecct-value]');
  const items = document.querySelectorAll('[data-filter-item]');

  const applyFilter = (val) => {
    const selected = (val || 'all').toLowerCase();
    items.forEach((it) => {
      const cat = (it.dataset.category || '').toLowerCase();
      if (selected === 'all' || selected === cat) it.classList.add('active');
      else it.classList.remove('active');
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const value = this.innerText.trim();
      if (selectValue) selectValue.innerText = value;
      // button active state
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyFilter(value);
    });
  });

  selectItems.forEach((si) => {
    si.addEventListener('click', function () {
      const value = this.innerText.trim();
      if (selectValue) selectValue.innerText = value;
      applyFilter(value);
    });
  });
}

function attachTimelineLinks() {
  const items = document.querySelectorAll('.timeline-item[data-link]');
  items.forEach((item) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function () {
      const url = item.getAttribute('data-link');
      if (url) window.open(url, '_blank', 'noopener');
    });
  });
}

function bindProjectModalDelegation() {
  const list = document.querySelector('.project-list');
  const modal = document.querySelector('[data-project-modal]');
  const overlay = document.querySelector('[data-project-overlay]');
  const closeBtn = document.querySelector('[data-project-close-btn]');
  const liveLink = document.querySelector('[data-live-link]');
  const githubLink = document.querySelector('[data-github-link]');
  if (!list || !modal || !overlay) return;

  const toggle = () => { modal.classList.toggle('active'); overlay.classList.toggle('active'); };

  // Delegate open on project list
  list.addEventListener('click', function (e) {
    const anchor = e.target.closest('[data-project-open]');
    if (!anchor) return;
    e.preventDefault();
    e.stopPropagation();
    const item = anchor.closest('.project-item');
    if (!item) return;
    const live = item.getAttribute('data-live-url') || '#';
    const git = item.getAttribute('data-github-url') || '#';
    if (liveLink) liveLink.setAttribute('href', live);
    if (githubLink) githubLink.setAttribute('href', git);
    toggle();
  }, { passive: false });

  // Ensure single bindings for close
  if (!modal.dataset.bound) {
    modal.dataset.bound = '1';
    if (closeBtn) closeBtn.addEventListener('click', (ev) => { ev.preventDefault(); toggle(); });
    overlay.addEventListener('click', (ev) => { ev.preventDefault(); toggle(); });
  }
}

function bindBlogModalDelegation() {
  const list = document.querySelector('.blog-posts-list');
  const modal = document.querySelector('[data-blog-modal]');
  const overlay = document.querySelector('[data-blog-overlay]');
  const closeBtn = document.querySelector('[data-blog-close-btn]');
  const img = document.querySelector('[data-blog-read-img]');
  const title = document.querySelector('[data-blog-read-title]');
  const meta = document.querySelector('[data-blog-read-meta]');
  const text = document.querySelector('[data-blog-read-text]');
  if (!list || !modal || !overlay) return;

  const toggle = () => { modal.classList.toggle('active'); overlay.classList.toggle('active'); };

  list.addEventListener('click', function (e) {
    const anchor = e.target.closest('[data-blog-open]');
    if (!anchor) return;
    e.preventDefault();
    e.stopPropagation();
    const root = anchor.closest('.blog-post-item');
    if (!root) return;
    const banner = root.querySelector('.blog-banner-box img');
    const titleElem = root.querySelector('.blog-item-title');
    const metaContainer = root.querySelector('.blog-meta');
    const desc = root.querySelector('.blog-text');
    if (img && banner) { img.src = banner.src; img.alt = banner.alt || ''; }
    if (title && titleElem) { title.textContent = titleElem.textContent || ''; }
    if (meta && metaContainer) { meta.innerHTML = metaContainer.innerHTML || ''; }
    if (text && desc) { text.textContent = desc.textContent || ''; }
    toggle();
  }, { passive: false });

  if (!modal.dataset.bound) {
    modal.dataset.bound = '1';
    if (closeBtn) closeBtn.addEventListener('click', (ev) => { ev.preventDefault(); toggle(); });
    overlay.addEventListener('click', (ev) => { ev.preventDefault(); toggle(); });
  }
}
