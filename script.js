document.getElementById('avatar').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('previewImage');
    const avatarPreview = document.getElementById('avatarPreview');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            avatarPreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        avatarPreview.classList.add('hidden');
    }
});

document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const github = document.getElementById('github').value.trim();
    const avatar = document.getElementById('avatar').files[0];

    if (!name) {
        showError('nameError', 'Preencha o nome.');
        isValid = false;
    }

    if (!email) {
        showError('emailError', 'E-mail inválido.');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', 'E-mail inválido.');
        isValid = false;
    }

    if (!github) {
        showError('githubError', 'Comece com @ e digite o username.');
        isValid = false;
    } else if (!github.startsWith('@')) {
        showError('githubError', 'O username deve começar com @.');
        isValid = false;
    }

    if (!avatar) {
        showError('avatarError', 'Por favor, faça o upload de um avatar.');
        isValid = false;
    } else if (avatar.size > 500 * 1024) { // 500KB
        showError('avatarError', 'O arquivo deve ser menor que 500KB.');
        isValid = false;
    } else if (!['image/png', 'image/jpeg'].includes(avatar.type)) {
        showError('avatarError', 'O arquivo deve ser PNG ou JPG.');
        isValid = false;
    }

    if (isValid) {
        generateTicket(name, email, github, avatar);
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(id, message) {
    const errorElement = document.getElementById(id);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
}

function generateTicket(name, email, github, avatar) {
    // Salva as informações no localStorage
    localStorage.setItem('ticketName', name);
    localStorage.setItem('ticketEmail', email);
    localStorage.setItem('ticketGithub', github);

    // Cria um URL base64 para o avatar e armazena também
    const reader = new FileReader();
    reader.onload = function(e) {
        localStorage.setItem('ticketAvatar', e.target.result);
        
        // Redireciona para a nova página do ticket
        window.location.href = 'ticket-page.html'; // Direciona para a página do ticket
    };
    reader.readAsDataURL(avatar);
}