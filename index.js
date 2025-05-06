let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000);
}

function toggleSearch() {
  const bar = document.getElementById("searchBar");
  bar.style.display = bar.style.display === "block" ? "none" : "block";
}

const topBtn = document.getElementById("topBtn");
window.onscroll = function () {
  topBtn.style.display = (document.documentElement.scrollTop > 100) ? "block" : "none";
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

cards.forEach(card => {
  card.style.transform = 'translateY(50px)';
  card.style.opacity = '0';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
