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

// ===================================
// Q&A 게시판 기능
// ===================================

// localStorage에서 Q&A 데이터 가져오기
function getQnaData() {
  const data = localStorage.getItem('qnaData');
  return data ? JSON.parse(data) : [];
}

// localStorage에 Q&A 데이터 저장하기
function saveQnaData(data) {
  localStorage.setItem('qnaData', JSON.stringify(data));
}

// 날짜 포맷팅
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// Q&A 카드 HTML 생성
function createQnaCardHTML(question) {
  const answersHTML = question.answers.length > 0 
    ? question.answers.map(answer => `
        <div class="qna-answer">
          <div class="qna-answer-header">
            <span class="qna-answer-author">${escapeHTML(answer.author)}</span>
            <span class="qna-answer-date">${formatDate(answer.date)}</span>
          </div>
          <p class="qna-answer-content">${escapeHTML(answer.content).replace(/\n/g, '<br>')}</p>
        </div>
      `).join('')
    : '<div class="qna-no-answer">아직 답변이 없습니다. 첫 번째 답변을 남겨보세요!</div>';

  return `
    <div class="qna-card" data-id="${question.id}">
      <div class="qna-question" onclick="toggleQnaCard(${question.id})">
        <div class="qna-question-header">
          <h4 class="qna-question-title">${escapeHTML(question.title)}</h4>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="qna-answer-count">💬 ${question.answers.length}</span>
            <svg class="qna-toggle-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
        <div class="qna-question-meta">
          <span>✍️ ${escapeHTML(question.author)}</span>
          <span>📅 ${formatDate(question.date)}</span>
        </div>
        <p class="qna-question-content">${escapeHTML(question.content).replace(/\n/g, '<br>')}</p>
      </div>
      <div class="qna-answers">
        <div class="qna-answers-container">
          ${answersHTML}
        </div>
        <form class="qna-answer-form" onsubmit="submitAnswer(event, ${question.id})">
          <h4>💡 답변 작성하기</h4>
          <div class="qna-answer-form-row">
            <input type="text" placeholder="작성자" required>
          </div>
          <textarea placeholder="답변 내용을 입력하세요" rows="3" required></textarea>
          <button type="submit" class="btn btn-primary btn-answer-submit">답변 등록</button>
        </form>
      </div>
    </div>
  `;
}

// HTML 이스케이프 (XSS 방지)
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Q&A 목록 렌더링
function renderQnaList() {
  const qnaList = document.getElementById('qna-list');
  const qnaEmpty = document.getElementById('qna-empty');
  const questions = getQnaData();
  
  if (questions.length === 0) {
    qnaEmpty.style.display = 'block';
    // 빈 상태 메시지 외에 다른 카드 제거
    const cards = qnaList.querySelectorAll('.qna-card');
    cards.forEach(card => card.remove());
    return;
  }
  
  qnaEmpty.style.display = 'none';
  
  // 기존 카드들 제거 (빈 상태 메시지는 유지)
  const existingCards = qnaList.querySelectorAll('.qna-card');
  existingCards.forEach(card => card.remove());
  
  // 최신 질문이 위에 오도록 역순으로 정렬
  const sortedQuestions = [...questions].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // 새 카드들 추가
  sortedQuestions.forEach(question => {
    const cardHTML = createQnaCardHTML(question);
    qnaEmpty.insertAdjacentHTML('beforebegin', cardHTML);
  });
}

// Q&A 카드 토글 (열기/닫기)
function toggleQnaCard(id) {
  const card = document.querySelector(`.qna-card[data-id="${id}"]`);
  if (card) {
    card.classList.toggle('open');
  }
}

// 새 질문 등록
function submitQuestion(e) {
  e.preventDefault();
  
  const author = document.getElementById('qna-author').value.trim();
  const title = document.getElementById('qna-title').value.trim();
  const content = document.getElementById('qna-content').value.trim();
  
  if (!author || !title || !content) {
    alert('모든 필드를 입력해 주세요.');
    return;
  }
  
  const questions = getQnaData();
  const newQuestion = {
    id: Date.now(),
    author,
    title,
    content,
    date: new Date().toISOString(),
    answers: []
  };
  
  questions.push(newQuestion);
  saveQnaData(questions);
  
  // 폼 초기화
  document.getElementById('qna-form').reset();
  
  // 목록 다시 렌더링
  renderQnaList();
  
  // 새로 추가된 질문으로 스크롤
  setTimeout(() => {
    const newCard = document.querySelector(`.qna-card[data-id="${newQuestion.id}"]`);
    if (newCard) {
      newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      newCard.classList.add('open');
    }
  }, 100);
}

// 답변 등록
function submitAnswer(e, questionId) {
  e.preventDefault();
  
  const form = e.target;
  const authorInput = form.querySelector('input');
  const contentTextarea = form.querySelector('textarea');
  
  const author = authorInput.value.trim();
  const content = contentTextarea.value.trim();
  
  if (!author || !content) {
    alert('작성자와 내용을 모두 입력해 주세요.');
    return;
  }
  
  const questions = getQnaData();
  const questionIndex = questions.findIndex(q => q.id === questionId);
  
  if (questionIndex === -1) {
    alert('질문을 찾을 수 없습니다.');
    return;
  }
  
  const newAnswer = {
    id: Date.now(),
    author,
    content,
    date: new Date().toISOString()
  };
  
  questions[questionIndex].answers.push(newAnswer);
  saveQnaData(questions);
  
  // 목록 다시 렌더링
  renderQnaList();
  
  // 해당 질문 카드 열기
  setTimeout(() => {
    const card = document.querySelector(`.qna-card[data-id="${questionId}"]`);
    if (card) {
      card.classList.add('open');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 100);
}

// 페이지 로드 시 Q&A 초기화
document.addEventListener('DOMContentLoaded', () => {
  // Q&A 폼 이벤트 리스너 등록
  const qnaForm = document.getElementById('qna-form');
  if (qnaForm) {
    qnaForm.addEventListener('submit', submitQuestion);
  }
  
  // Q&A 목록 렌더링
  renderQnaList();
});