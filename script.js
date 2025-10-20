(function(){
  const form = document.getElementById('lead-form');
  if(!form) return;

  function buildMessage(data){
    return [
      'שלום! יש לי פנייה לגבי קייטרינג "ניחוח":',
      `שם: ${data.name || ''}`,
      `טלפון: ${data.phone || ''}`,
      `סוג האירוע: ${data.event || ''}`,
      `הודעה: ${data.message || ''}`,
      '',
      'נשלח מאתר הנחיתה.'
    ].join('\n');
  }

  function openWhatsApp(msg){
    const phone = '972587219770';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  function openMailto(msg){
    const subject = 'פנייה חדשה מאתר – קייטרינג ניחוח';
    const url = `mailto:nihoahfood@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
    window.location.href = url;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    const message = buildMessage(data);

    try { openWhatsApp(message); } catch(_){}
    setTimeout(function(){ openMailto(message); }, 500);
  });
})();