/* Toggle login / register cards */
document.getElementById('show-register')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('login-card').classList.add('hidden');
  document.getElementById('register-card').classList.remove('hidden');
});
document.getElementById('show-login')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('register-card').classList.add('hidden');
  document.getElementById('login-card').classList.remove('hidden');
});

/* Show/hide password */
document.querySelectorAll('.toggle-pass').forEach(btn => {
  btn.addEventListener('click', () => {
    const inp = document.getElementById(btn.dataset.target);
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
    btn.textContent = inp.type === 'password' ? '👁️' : '🙈';
  });
});

/* Login */
document.getElementById('login-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  document.getElementById('login-email-error').textContent    = '';
  document.getElementById('login-password-error').textContent = '';
  document.getElementById('login-success').textContent        = '';

  let valid = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('login-email-error').textContent = 'Enter a valid email.'; valid=false; }
  if (pass.length < 6) { document.getElementById('login-password-error').textContent = 'Password min 6 characters.'; valid=false; }

  if (valid) {
    document.getElementById('login-success').textContent = '✅ Login successful! Redirecting…';
    setTimeout(() => window.location.href = 'index.html', 1400);
  }
});

/* Register */
document.getElementById('register-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-password').value;
  const conf  = document.getElementById('reg-confirm').value;
  ['reg-name','reg-email','reg-password','reg-confirm'].forEach(id => document.getElementById(`${id}-error`).textContent = '');
  document.getElementById('register-success').textContent = '';

  let valid = true;
  if (name.length < 2)  { document.getElementById('reg-name-error').textContent    = 'Enter your full name.'; valid=false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { document.getElementById('reg-email-error').textContent = 'Enter a valid email.'; valid=false; }
  if (pass.length < 6)  { document.getElementById('reg-password-error').textContent = 'Password min 6 characters.'; valid=false; }
  if (pass !== conf)    { document.getElementById('reg-confirm-error').textContent  = 'Passwords do not match.'; valid=false; }

  if (valid) {
    document.getElementById('register-success').textContent = '✅ Account created! Switching to login…';
    e.target.reset();
    setTimeout(() => {
      document.getElementById('register-card').classList.add('hidden');
      document.getElementById('login-card').classList.remove('hidden');
    }, 1600);
  }
});
