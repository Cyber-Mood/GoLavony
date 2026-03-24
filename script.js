// ==========================================
// 1. LocalStorage: Persistent Dark Mode
// ==========================================
const themeToggle = document.getElementById('theme-toggle');

// Always apply the theme on page load, even if the toggle button isn't on this specific page
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.setAttribute('data-theme', currentTheme);
}

// Only attach the click listener if the button exists (Home Page)
if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    if (currentTheme === 'dark') {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'dark') {
            document.body.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ==========================================
// 2. Mobile Hamburger Menu
// ==========================================
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

if (menuIcon && navLinks) {
    const menuIconI = menuIcon.querySelector('i');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIconI.classList.replace('fa-bars', 'fa-xmark');
        } else {
            menuIconI.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIconI.classList.replace('fa-xmark', 'fa-bars');
        });
    });
}

// ==========================================
// 3. Smart Date Validation
// ==========================================
const bookDateInput = document.getElementById('bookDate');
if (bookDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookDateInput.setAttribute('min', today);
}

// ==========================================
// 4. Page Transition Logic (Safe Load)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const transitionEl = document.querySelector('.page-transition');
    if (transitionEl) {
        setTimeout(() => {
            transitionEl.classList.add('fade-out');
            setTimeout(() => {
                transitionEl.style.display = 'none';
            }, 500);
        }, 100);
    }

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', e => {
            const target = link.getAttribute('href');
            if (!target || target.startsWith('#') || link.target === '_blank') return; 

            e.preventDefault(); 
            
            if (transitionEl) {
                transitionEl.style.display = 'block'; // Bring it back
                setTimeout(() => {
                    transitionEl.classList.remove('fade-out'); 
                }, 10); // Tiny delay to ensure display:block applies first

                setTimeout(() => {
                    window.location.href = target; 
                }, 500); 
            } else {
                window.location.href = target;
            }
        });
    });
});

// ==========================================
// 5. Interactive Destination Filter
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const destCards = document.querySelectorAll('.dest-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            destCards.forEach(card => {
                card.classList.remove('show');
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hide');
                    void card.offsetWidth;
                    card.classList.add('show');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

// ==========================================
// 6. Magnetic Button Effect
// ==========================================
const magneticBtns = document.querySelectorAll('.magnetic');

magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const h = rect.width / 2;
        const v = rect.height / 2;
        
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - v;
        
        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0px, 0px)';
    });
});

// ==========================================
// 7. Scroll Reveal Animations
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 }); 

    revealElements.forEach(el => scrollObserver.observe(el));
}

// ==========================================
// 8. Fake Booking Modal Logic
// ==========================================
const bookBtns = document.querySelectorAll('.book-btn');
const bookingModal = document.getElementById('bookingModal');
const closeModalBtn = document.getElementById('closeModal');
const fakeBookingForm = document.getElementById('fakeBookingForm');
const confirmBtn = document.getElementById('confirmBtn');
const successMessage = document.getElementById('successMessage');

if (bookingModal && fakeBookingForm && confirmBtn) {
    const btnText = confirmBtn.querySelector('.btn-text');
    const loader = confirmBtn.querySelector('.loader');

    bookBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bookingModal.classList.add('show');
            document.body.style.overflow = 'hidden'; 
            fakeBookingForm.style.display = 'block';
            successMessage.style.display = 'none';
            fakeBookingForm.reset();
        });
    });

    const closeModal = () => {
        bookingModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) closeModal();
    });

    fakeBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        btnText.style.display = 'none';
        loader.style.display = 'inline-block';
        
        setTimeout(() => {
            btnText.style.display = 'inline-block';
            loader.style.display = 'none';
            fakeBookingForm.style.display = 'none';
            successMessage.style.display = 'block';
        }, 2000);
    });
}

// ==========================================
// 9. Image Lightbox Gallery
// ==========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightboxBtn = document.getElementById('closeLightbox');
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

if (lightbox) {
    lightboxTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (e.target.tagName.toLowerCase() === 'button') return; 
            
            const imgSrc = trigger.getAttribute('data-img');
            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    if(closeLightboxBtn) closeLightboxBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto'; 
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
}

// ==========================================
// 10. Navbar Scroll Effect
// ==========================================
const navbar = document.getElementById('navbar');

if (navbar) {
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('DOMContentLoaded', handleScroll);
}

// ==========================================
// 11. Prevent Form Page Reloads (Footer/Header)
// ==========================================
const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Searching for your perfect getaway...');
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! Our concierge will be in touch shortly.');
        contactForm.reset();
    });
}

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Subscribed! Get ready for amazing travel deals.');
        newsletterForm.reset();
    });
}

// ==========================================
// 12. Back to Top Button
// ==========================================
const backToTopBtn = document.getElementById("backToTop");
if(backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}