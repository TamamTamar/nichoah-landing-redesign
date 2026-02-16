// 1. פונקציה לאנימציית מספרים רצים
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + "%";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 2. הפעלת אנימציות בזמן גלילה
const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('experience-tag')) {
                const counterElement = entry.target.querySelector('strong');
                animateValue(counterElement, 0, 100, 2000);
                observer.unobserve(entry.target); 
            } else {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .menu-card, .experience-tag, .menu-category').forEach(el => {
    if (!el.classList.contains('experience-tag')) {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
    }
    observer.observe(el);
});

// 3. גלילה חלקה
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const btn = form.querySelector('button');
    const status = document.getElementById('form-status');
    const formData = new FormData(form);

    btn.disabled = true;
    btn.innerText = 'שולח...';

    // שליחה לנטליפיי
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
    .then(() => {
        status.style.display = 'block';
        btn.innerText = 'נשלח!';
        btn.style.background = '#2ecc71';
        form.reset();
        
        setTimeout(() => {
            status.style.display = 'none';
            btn.disabled = false;
            btn.innerText = 'שליחת בקשה';
            btn.style.background = '';
        }, 5000);
    })
    .catch((error) => alert("שגיאה בשליחה: " + error));
});