'use strict';

let portfolioData = null;

async function loadPortfolioData() {
  try {
    const response = await fetch('./data.json');
    portfolioData = await response.json();
    populatePortfolio();
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

function populatePortfolio() {
  if (!portfolioData) return;

  populatePersonalInfo();
  populateSocialLinks();
  populateAbout();
  populateTestimonials();
  populateClients();
  populateResume();
  populatePortfolio();
  populateBlog();
}

function populatePersonalInfo() {
  const { personalInfo } = portfolioData;
  
  document.querySelector('.info-content .name').textContent = personalInfo.name;
  document.querySelector('.info-content .title').textContent = personalInfo.title;
  document.querySelector('.avatar-box img').src = personalInfo.avatar;
  document.querySelector('.avatar-box img').alt = personalInfo.name;
  
  document.querySelector('a[href^="mailto:"]').href = `mailto:${personalInfo.email}`;
  document.querySelector('a[href^="mailto:"]').textContent = personalInfo.email;
  
  document.querySelector('a[href^="tel:"]').href = `tel:${personalInfo.phone}`;
  document.querySelector('a[href^="tel:"]').textContent = personalInfo.phone;
  
  document.querySelector('time[datetime]').textContent = personalInfo.birthday;
  document.querySelector('address').textContent = personalInfo.location;
  
  document.getElementById('download-resume-btn').href = personalInfo.resumeUrl;
}

function populateSocialLinks() {
  const { socialLinks } = portfolioData;
  const socialList = document.querySelector('.social-list');
  
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

function populateAbout() {
  const { about } = portfolioData;
  
  const aboutText = document.querySelector('.about-text');
  aboutText.innerHTML = about.description.map(para => `<p>${para}</p>`).join('');
  
  const serviceList = document.querySelector('.service-list');
  serviceList.innerHTML = '';
  
  about.services.forEach(service => {
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

function populateTestimonials() {
  const { testimonials } = portfolioData;
  const testimonialsList = document.querySelector('.testimonials-list');
  
  testimonialsList.innerHTML = '';
  
  testimonials.forEach((testimonial, index) => {
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

function populateClients() {
  const { clients } = portfolioData;
  const clientsList = document.querySelector('.clients-list');
  
  clientsList.innerHTML = '';
  
  clients.forEach(client => {
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

function populateResume() {
  const { resume } = portfolioData;
  
  populateTimelineSection('.timeline:nth-of-type(1)', resume.education, 'book-outline');
  populateTimelineSection('.timeline:nth-of-type(2)', resume.experience, 'book-outline');
  populateTimelineSection('.timeline:nth-of-type(3)', resume.certifications, 'ribbon-outline');
  populateTimelineSection('.timeline:nth-of-type(4)', resume.languages, 'language-outline');
  populateTimelineSection('.timeline:nth-of-type(5)', resume.honors, 'trophy-outline');
  
  const skillsList = document.querySelector('.skills-list');
  skillsList.innerHTML = '';
  
  resume.skills.forEach(skill => {
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

function populateTimelineSection(selector, items, iconName) {
  const timeline = document.querySelector(selector);
  const timelineList = timeline.querySelector('.timeline-list');
  
  timelineList.innerHTML = '';
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'timeline-item';
    if (item.link) {
      li.setAttribute('data-link', item.link);
    }
    
    const hasLink = item.link ? ` <ion-icon class="visit-arrow" name="arrow-forward-outline" aria-hidden="true"></ion-icon>` : '';
    
    li.innerHTML = `
      <h4 class="h4 timeline-item-title">${item.title}${hasLink}</h4>
      <span>${item.period}</span>
      ${item.description ? `<p class="timeline-text">${item.description}</p>` : ''}
    `;
    
    timelineList.appendChild(li);
  });
}

function populatePortfolio() {
  const { portfolio } = portfolioData;
  
  const filterList = document.querySelector('.filter-list');
  const selectList = document.querySelector('.select-list');
  
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
  
  const projectList = document.querySelector('.project-list');
  projectList.innerHTML = '';
  
  portfolio.projects.forEach((project, index) => {
    const li = document.createElement('li');
    li.className = 'project-item active';
    li.setAttribute('data-filter-item', '');
    li.setAttribute('data-category', project.category.toLowerCase());
    li.setAttribute('data-live-url', project.liveUrl);
    li.setAttribute('data-github-url', project.githubUrl);
    
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
}

function populateBlog() {
  const { blog } = portfolioData;
  const blogList = document.querySelector('.blog-posts-list');
  
  blogList.innerHTML = '';
  
  blog.posts.forEach(post => {
    const li = document.createElement('li');
    li.className = 'blog-post-item';
    
    const date = new Date(post.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
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
