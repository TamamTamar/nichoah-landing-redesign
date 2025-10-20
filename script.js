(function(){
  const form = document.getElementById('lead-form');
  if(!form) return;

  function showThanks(){
    const wrap = form.closest('section') || form.parentElement;
    wrap.innerHTML = `
      <div class="thank-you">
        <h2>תודה רבה שהשארתם פרטים!</h2>
        <p>נחזור אליכם בהקדם.</p>
      </div>
    `;
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const fd = new FormData(form);
    if(!fd.get('form-name')) fd.set('form-name', 'lead');

    try{
      await fetch('/', { method:'POST', body: fd });
      showThanks();
    }catch(err){
      console.error('Submit failed', err);
      showThanks();
    }
  });
})();