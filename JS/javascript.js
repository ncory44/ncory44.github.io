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


        /* ===== Contact popup: shared across pages ===== */
            (function contactPopup(){
            const popup = document.getElementById('contactPopup');
            if (!popup) return; // this page might not have the popup

            const openBtn  = document.getElementById('openPopupBtn');
            const closeBtn = document.getElementById('closePopupBtn');
            const form     = document.getElementById('contactForm');

            function show() {
                popup.style.display = 'block';
                // next frame -> add .show so CSS fade runs
                requestAnimationFrame(() => popup.classList.add('show'));
                document.body.style.overflow = 'hidden';
                document.addEventListener('keydown', onEsc);
            }
            function hide() {
                popup.classList.remove('show');
                document.body.style.overflow = '';
                document.removeEventListener('keydown', onEsc);
                // after CSS transition, actually remove from flow
                setTimeout(() => { popup.style.display = 'none'; }, 180);
            }
            function onEsc(e){ if (e.key === 'Escape') hide(); }

            // Expose for inline calls like onclick="openForm()"
            window.openForm  = show;
            window.closeForm = hide;

            openBtn?.addEventListener('click', show);
            closeBtn?.addEventListener('click', hide);
            popup.addEventListener('click', (e) => { if (e.target === popup) hide(); });

            // lightweight validation
            form?.addEventListener('submit', (e) => {
                const name  = (document.getElementById('Name')    ?.value || '').trim();
                const email = (document.getElementById('Email')   ?.value || '').trim();
                const phone = (document.getElementById('Phone')   ?.value || '').trim();
                const msg   = (document.getElementById('Message') ?.value || '').trim();
                const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

                if (!name || !email || !msg || !emailOk) {
                e.preventDefault();
                alert('Please enter your name, a valid email, and your message.');
                }
            });
            })();


            (function wireContactForm(){
                const form = document.getElementById('contactForm');
                if (!form || !form.action.includes('formspree.io')) return;

                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const btn = form.querySelector('input[type="submit"]');
                    btn.disabled = true; btn.value = 'Sending…';

                    try {
                    const res = await fetch(form.action, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: { 'Accept': 'application/json' }
                    });
                    if (res.ok) {
                        form.reset();
                        toast('Thanks! I’ll get back to you soon.');
                        window.closeForm?.();
                    } else {
                        toast('Something went wrong. Please try again.');
                    }
                    } catch {
                    toast('Network error. You can also email me directly.');
                    } finally {
                    btn.disabled = false; btn.value = 'SUBMIT';
                    }
                });

                function toast(msg){
                    let t = document.getElementById('toast');
                    if (!t) {
                    t = document.createElement('div');
                    t.id = 'toast';
                    Object.assign(t.style, {
                        position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
                        background:'rgba(22,22,26,.96)', color:'#e7e0cf', padding:'10px 14px',
                        border:'1px solid rgba(192,167,105,.35)', borderRadius:'10px',
                        zIndex:10002, fontFamily:'EB Garamond, serif', transition:'opacity .2s'
                    });
                    document.body.appendChild(t);
                    }
                    t.textContent = msg;
                    t.style.opacity = 1;
                    setTimeout(() => t.style.opacity = 0, 2800);
                }
                })();

                /* Mobile nav toggle */
                (function mobileNav(){
                const nav = document.getElementById('MainNav');
                if(!nav) return;
                const btn = nav.querySelector('.NavToggle');
                if(!btn) return;

                btn.addEventListener('click', ()=>{
                    nav.classList.toggle('nav-open');
                    btn.setAttribute('aria-expanded', nav.classList.contains('nav-open'));
                });
                nav.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>nav.classList.remove('nav-open')));
                })();



});

