const header = document.getElementById('siteHeader');
const sections = [...document.querySelectorAll('.section-reveal')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.12});
sections.forEach(section=>observer.observe(section));

window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled', window.scrollY > 30);

  const ids = ['top','team','fixtures','results','table','news','stats'];
  let current = 'top';
  for(const id of ids){
    const el = document.getElementById(id);
    if(el && window.scrollY + 180 >= el.offsetTop) current = id;
  }
  navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#'+current));
});

/* Expand search from the right-side icon toward the left. */
const searchWrap = document.getElementById('searchWrap');
const searchTrigger = document.getElementById('searchTrigger');
const siteSearch = document.getElementById('siteSearch');

searchTrigger.addEventListener('click',()=>{
  const open = searchWrap.classList.toggle('open');
  searchTrigger.setAttribute('aria-expanded', String(open));
  if(open) setTimeout(()=>siteSearch.focus(), 180);
});

document.addEventListener('keydown',(e)=>{
  if(e.key === 'Escape'){
    searchWrap.classList.remove('open');
    searchTrigger.setAttribute('aria-expanded','false');
  }
});

document.addEventListener('click',(e)=>{
  if(!searchWrap.contains(e.target)){
    searchWrap.classList.remove('open');
    searchTrigger.setAttribute('aria-expanded','false');
  }
});

const carousel = document.getElementById('playerCarousel');
const playerCards = [...carousel.querySelectorAll('.player-card')];
let activePlayer = 0;
const playerCount = document.getElementById('playerCount');

function visibleCards(){ return playerCards.filter(card=>card.style.display !== 'none'); }

function renderPlayer(){
  const visible = visibleCards();
  if(!visible.length) return;
  const card = visible[Math.min(activePlayer, visible.length-1)];
  playerCards.forEach(c=>c.classList.toggle('featured', c === card));
  const distance = card.offsetLeft - carousel.offsetLeft;
  carousel.scrollTo({left: Math.max(0,distance), behavior:'smooth'});
  playerCount.textContent = String(visible.indexOf(card)+1).padStart(2,'0') + ' / ' + String(visible.length).padStart(2,'0');
}

document.getElementById('nextPlayer').addEventListener('click',()=>{
  const visible = visibleCards();
  activePlayer=(activePlayer+1)%visible.length;
  renderPlayer();
});

document.getElementById('prevPlayer').addEventListener('click',()=>{
  const visible = visibleCards();
  activePlayer=(activePlayer-1+visible.length)%visible.length;
  renderPlayer();
});

const tabs = [...document.querySelectorAll('.role-tab')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(t=>t.classList.remove('active')); tab.classList.add('active');
  const role = tab.dataset.role;
  playerCards.forEach(card=>{
    card.style.display = role === 'all' || card.dataset.role === role ? '' : 'none';
  });
  activePlayer = 0;
  renderPlayer();
}));

const backTop = document.getElementById('backTop');
if(backTop) backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

window.addEventListener('pointermove',(e)=>{
  const orb = document.querySelector('.hero-orb');
  if(!orb) return;
  const x = (e.clientX / window.innerWidth - .5) * 10;
  const y = (e.clientY / window.innerHeight - .5) * 7;
  orb.style.transform = `translate(${x}px, ${y}px)`;
});
