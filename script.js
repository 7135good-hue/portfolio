// ===================================
// 모바일 메뉴 토글
// ===================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// 네비게이션 링크 클릭 시 메뉴 닫기
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===================================
// 프로젝트 카드 동적 생성
// ===================================
async function loadProjects() {
  const projectsContainer = document.getElementById('projects-container');
  
  try {
    const response = await fetch('projects.json');
    const projects = await response.json();
    
    projects.forEach(project => {
      const card = createProjectCard(project);
      projectsContainer.appendChild(card);
    });
    
    // 프로젝트 카드 로드 후 애니메이션 적용
    initializeProjectAnimations();
  } catch (error) {
    console.error('프로젝트를 불러오는 중 오류가 발생했습니다:', error);
    projectsContainer.innerHTML = `
      <p style="text-align: center; color: var(--text-muted); grid-column: 1/-1;">
        프로젝트를 불러올 수 없습니다.
      </p>
    `;
  }
}

function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card';
  
  const tagsHTML = project.tags.map(tag => 
    `<span class="project-tag">${tag}</span>`
  ).join('');
  
  card.innerHTML = `
    <div class="project-image-wrapper">
      <img src="${project.image}" alt="${project.title}" class="project-image">
    </div>
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">${tagsHTML}</div>
      <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
        프로젝트 보기
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
    </div>
  `;
  
  return card;
}

// 페이지 로드 시 프로젝트 불러오기
document.addEventListener('DOMContentLoaded', loadProjects);

// ===================================
// Contact 폼 처리 - 이메일 발송
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // 이메일 본문 구성
  const body = `
안녕하세요, 송혜빈님.

보낸 사람: ${name}
이메일: ${email}

메시지:
${message}
  `.trim();
  
  // mailto 링크 생성 - henne2120@bible.ac.kr로 발송
  const mailtoLink = `mailto:henne2120@bible.ac.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // 이메일 클라이언트 열기
  window.location.href = mailtoLink;
  
  // 폼 초기화 (약간의 지연 후)
  setTimeout(() => {
    contactForm.reset();
  }, 100);
});

// ===================================
// 스크롤 애니메이션
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// 스크롤 시 나타나는 요소들에 애니메이션 적용
function initializeAnimations() {
  document.querySelectorAll('.about-intro, .about-card, .about-extra, .extra-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// 프로젝트 카드 애니메이션 초기화
function initializeProjectAnimations() {
  document.querySelectorAll('.project-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(el);
  });
}

// 페이지 로드 시 애니메이션 초기화
document.addEventListener('DOMContentLoaded', initializeAnimations);

// ===================================
// 네비게이션 스크롤 효과
// ===================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
  }
  
  lastScroll = currentScroll;
});

// ===================================
// 부드러운 스크롤 (네비게이션 링크)
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});
