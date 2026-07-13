document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const fields = ['name','email','subject','message'];
  fields.forEach(id => document.getElementById(`${id}-error`).textContent = '');
  document.getElementById('success-msg').textContent = '';

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  let valid = true;

  if (name.length < 2)   { document.getElementById('name-error').textContent    = 'Enter your full name.'; valid=false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('email-error').textContent = 'Enter a valid email.'; valid=false; }
  if (subject.length < 3){ document.getElementById('subject-error').textContent  = 'Enter a subject.'; valid=false; }
  if (message.length < 10){ document.getElementById('message-error').textContent = 'Message too short (min 10 chars).'; valid=false; }

  if (valid) {
    document.getElementById('success-msg').textContent = '✅ Message sent! We\'ll get back to you soon.';
    e.target.reset();
  }
});
