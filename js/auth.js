document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = (inputId, toggleId) => {
        const passwordInput = document.getElementById(inputId);
        const toggleBtn = document.getElementById(toggleId);
        
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    };

    // Initialize toggle for login password
    if (document.getElementById('login-password')) {
        togglePassword('login-password', 'toggle-login-password');
    }

    // Initialize toggle for register password
    if (document.getElementById('register-password')) {
        togglePassword('register-password', 'toggle-register-password');
    }

    // Initialize toggle for confirm password
    if (document.getElementById('register-confirm-password')) {
        togglePassword('register-confirm-password', 'toggle-register-confirm-password');
    }

    // Form validation and submission
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login process
            const btn = this.querySelector('.auth-btn');
            const btnText = btn.querySelector('.btn-text');
            const btnIcon = btn.querySelector('.btn-icon');
            
            btnText.textContent = 'Logging in...';
            btnIcon.style.transform = 'translateX(5px)';
            btn.disabled = true;
            
            setTimeout(() => {
                // Simulate successful login
                btnText.textContent = 'Login Successful!';
                btnIcon.className = 'fas fa-check btn-icon';
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 1500);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const agreeTerms = document.getElementById('agree-terms').checked;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            if (!agreeTerms) {
                alert('You must agree to the terms and conditions');
                return;
            }
            
            // Simulate registration process
            const btn = this.querySelector('.auth-btn');
            const btnText = btn.querySelector('.btn-text');
            const btnIcon = btn.querySelector('.btn-icon');
            
            btnText.textContent = 'Creating Account...';
            btnIcon.style.transform = 'translateX(5px)';
            btn.disabled = true;
            
            setTimeout(() => {
                // Simulate successful registration
                btnText.textContent = 'Registration Successful!';
                btnIcon.className = 'fas fa-check btn-icon';
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            }, 1500);
        });
    }
});