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

  const ids = ['top','team','fixtures','results','news','stats'];
  let current = 'top';
  for(const id of ids){
    const el = document.getElementById(id);
    if(el && window.scrollY + 140 >= el.offsetTop) current = id;
  }
  navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#'+current));
});

const carousel = document.getElementById('playerCarousel');
const playerCards = [...carousel.querySelectorAll('.player-card')];
let activePlayer = 0;
const playerCount = document.getElementById('playerCount');

function renderPlayer(){
  const visible = playerCards.filter(c => c.style.display !== 'none');
  if(!visible.length) return;
  const card = visible[Math.min(activePlayer, visible.length - 1)];
  visible.forEach(c=>c.classList.remove('featured'));
  card.classList.add('featured');
  card.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  playerCount.textContent = String(visible.indexOf(card)+1).padStart(2,'0') + ' / ' + String(visible.length).padStart(2,'0');
}

document.getElementById('nextPlayer').addEventListener('click',()=>{const visible=playerCards.filter(c=>c.style.display!=='none'); activePlayer=(activePlayer+1)%Math.max(visible.length,1); renderPlayer()});
document.getElementById('prevPlayer').addEventListener('click',()=>{const visible=playerCards.filter(c=>c.style.display!=='none'); activePlayer=(activePlayer-1+Math.max(visible.length,1))%Math.max(visible.length,1); renderPlayer()});

const tabs = [...document.querySelectorAll('.role-tab')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(t=>t.classList.remove('active')); tab.classList.add('active');
  const role = tab.dataset.role;
  playerCards.forEach(card=>{
    const show = role === 'all' || card.dataset.role === role;
    card.style.display = show ? '' : 'none';
  });
  activePlayer = 0;
  renderPlayer();
}));

document.getElementById('backTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// Subtle hero parallax
window.addEventListener('pointermove',(e)=>{
  const x = (e.clientX / window.innerWidth - .5) * 10;
  const y = (e.clientY / window.innerHeight - .5) * 7;
  document.querySelector('.hero-orb').style.transform = `translate(${x}px, ${y}px)`;
});
