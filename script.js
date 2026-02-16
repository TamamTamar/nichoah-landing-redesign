document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Submission (Keep your existing Netlify logic)
const form = document.getElementById('lead-form');
if(form) {
    form.addEventListener('submit', async function(e){
        e.preventDefault();
        const fd = new FormData(form);
        
        // Show loading state
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "שולח...";
        btn.disabled = true;

        try {
            // Netlify fetch simulation
            await fetch('/', { method:'POST', body: fd });
            form.innerHTML = `
                <div style="text-align:center; padding: 20px;">
                    <h3 style="color:white">תודה רבה!</h3>
                    <p>נחזור אליך בהקדם עם הצעה טעימה.</p>
                </div>`;
        } catch(err) {
            btn.innerText = originalText;
            btn.disabled = false;
            alert("הייתה תקלה בשליחה, נסו שוב או התקשרו אלינו.");
        }
    });
}