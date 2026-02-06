document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll Progress Bar ---
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        document.getElementById('progress-bar').style.width = scrolled + "%";
    });


    // --- 2. Intersection Observer (Scroll Animations) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger Number Counter if it's a stat item
                if(entry.target.querySelector('.stat-number')) {
                    startCounter(entry.target.querySelector('.stat-number'));
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 3. Number Counter Logic ---
    function startCounter(el) {
        if(el.dataset.counted) return; // Run once
        el.dataset.counted = "true";
        
        const target = +el.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16)); 
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if(current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = current;
            }
        }, 16);
    }


    // --- 4. Material Palette Switcher ---
    const btns = document.querySelectorAll('.palette-btn');
    const mainImg = document.getElementById('main-display');
    const title = document.getElementById('palette-title');
    const desc = document.getElementById('palette-desc');

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class
            btns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Fade Out
            mainImg.style.opacity = 0;
            const content = document.querySelector('.palette-info');
            content.style.opacity = 0;

            setTimeout(() => {
                // Update Data
                mainImg.src = this.dataset.img;
                title.textContent = this.dataset.title;
                desc.textContent = this.dataset.desc;
                
                // Fade In
                mainImg.onload = () => {
                    mainImg.style.opacity = 1;
                    content.style.opacity = 1;
                };
            }, 300);
        });
    });


    // --- 5. Before/After Slider ---
    const slider = document.getElementById('ba-slider');
    const original = document.getElementById('original-overlay');
    const handle = document.getElementById('ba-handle');

    if(slider) {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            original.style.width = `${val}%`;
            handle.style.left = `${val}%`;
        });
    }


    // --- 6. WhatsApp Form Integration ---
    const form = document.getElementById('quote-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fname = document.getElementById('fname').value;
            const lname = document.getElementById('lname').value;
            const type = document.getElementById('type').value;
            const budget = document.getElementById('budget').value;
            
            const phone = "15550123456"; // Business Number
            
            const message = `*New Project Inquiry*\nName: ${fname} ${lname}\nType: ${type}\nBudget: ${budget}\n\nSent from website form.`;
            
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }

});