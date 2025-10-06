document.addEventListener("DOMContentLoaded", function () {
    console.log("Script is running!");

    // ABOUT fade-in (index only)
    const aboutSection = document.getElementById("About");
    if (aboutSection) {
        function fadeInOnScroll() {
            const rect = aboutSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.75) aboutSection.classList.add("fade-in");
        }
        window.addEventListener("scroll", fadeInOnScroll);
        fadeInOnScroll();
    }

    // POPUP (both pages)
    function openForm() { document.getElementById('contactPopup').style.display = "block"; }
    function closeForm() { document.getElementById('contactPopup').style.display = "none"; }
    window.openForm = openForm; window.closeForm = closeForm;

    const openBtn = document.getElementById('openPopupBtn');
    const closeBtn = document.getElementById('closePopupBtn');
    if (openBtn) openBtn.addEventListener("click", openForm);
    if (closeBtn) closeBtn.addEventListener("click", closeForm);
    window.addEventListener("click", function (event) {
        const popup = document.getElementById('contactPopup');
        if (popup && event.target === popup) closeForm();
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const name = document.getElementById('Name').value.trim();
            const email = document.getElementById('Email').value.trim();
            const phone = document.getElementById('Phone').value.trim();
            const message = document.getElementById('Message').value.trim();
            if (name === "" || email === "" || phone === "" || message === "") {
                event.preventDefault(); alert('Please fill out all fields before submitting!');
            }
        });
    }

    // MUSIC page niceties: pause others + mild protection
    const musicAudios = document.querySelectorAll('#Music audio');
    if (musicAudios.length) {
        musicAudios.forEach(a => a.addEventListener('play', () => {
            musicAudios.forEach(b => { if (b !== a) b.pause(); });
        }));
        document.querySelectorAll('#Music .Protect').forEach(el => {
            el.addEventListener('contextmenu', e => e.preventDefault());
        });
    }

        // HIDE/SHOW NAV ON SCROLL
    const nav = document.querySelector('.Navbar');
    if (nav) {
    let lastY = window.pageYOffset || document.documentElement.scrollTop;
    let ticking = false;
    const THRESHOLD = 8;   // pixels of movement before we react

    function onScroll() {
        const y = window.pageYOffset || document.documentElement.scrollTop;

        // add shadow/solid background after a small scroll
        if (y > 10) nav.classList.add('nav-scrolled');
        else nav.classList.remove('nav-scrolled');

        // ignore tiny jitter
        if (Math.abs(y - lastY) > THRESHOLD) {
        if (y > lastY && y > 80) {
            // scrolling down
            nav.classList.add('nav-hidden');
        } else {
            // scrolling up or near top
            nav.classList.remove('nav-hidden');
        }
        lastY = y;
        }
        ticking = false;
    }

        window.addEventListener('scroll', () => {
            if (!ticking) {
            ticking = true;
            requestAnimationFrame(onScroll);
            }
        }, { passive: true });

        // Reveal nav when user tabs for accessibility
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') nav.classList.remove('nav-hidden');
        });
        }

    /* ===== One-at-a-time media playback (audio + video) ===== */
        (function oneAtATime() {
        // Listen in the capture phase so we catch play/pause on any media, even if added later.
        document.addEventListener('play', (ev) => {
            const current = ev.target;
            if (!(current instanceof HTMLMediaElement)) return;

            // Pause every other audio/video on the page
            document.querySelectorAll('audio, video').forEach((m) => {
            if (m !== current && !m.paused) {
                m.pause();
                // If you also want others to rewind when switching, uncomment:
                // m.currentTime = 0;
            }
            });

            // Optional: highlight the playing cue card
            document.querySelectorAll('.Cue').forEach(c => c.classList.remove('playing'));
            current.closest('.Cue')?.classList.add('playing');
        }, true);

        // Remove highlight when paused/ended
        document.addEventListener('pause', (ev) => {
            if (ev.target.closest('.Cue')) {
            ev.target.closest('.Cue')?.classList.remove('playing');
            }
        }, true);
        document.addEventListener('ended', (ev) => {
            if (ev.target.closest('.Cue')) {
            ev.target.closest('.Cue')?.classList.remove('playing');
            }
        }, true);

        // Optional: if the tab/window is hidden, pause everything
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
            document.querySelectorAll('audio, video').forEach(m => m.pause());
            }
        });
        })();


});

