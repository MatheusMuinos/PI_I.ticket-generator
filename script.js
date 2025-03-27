// eventlistener para o campo de upload de avatar
document.getElementById('avatar').addEventListener('change', function(event) {
    const file = event.target.files[0]; // captura o arquivo selecionado
    const preview = document.getElementById('previewImage'); // obtem a imagem de pre-visualizacao
    const avatarPreview = document.getElementById('avatarPreview'); // obtem a area de pre-visualizacao do avatar

    // verifica se o arquivo foi selecionado
    if (file) {
        const reader = new FileReader(); // cria um leitor de arquivos
        reader.onload = function(e) {
            preview.src = e.target.result; // atribui o conteudo do arquivo a pre-visualizacao
            avatarPreview.classList.remove('hidden'); // torna a area de pre-visualizacao visivel
        };
        reader.readAsDataURL(file); // le o arquivo como uma url de dados
    } else {
        preview.src = ''; // limpa a pre-visualizacao se nao houver arquivo
        avatarPreview.classList.add('hidden'); // esconde a area de pre-visualizacao
    }
});

// eventlistener para o envio do formulario
document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault(); // impede o envio padrao do formulario
    clearErrors(); // limpa qualquer mensagem de erro existente

    let isValid = true; // variavel para verificar se o formulario esta valido
    const name = document.getElementById('name').value.trim(); // obtem o nome preenchido
    const email = document.getElementById('email').value.trim(); // obtem o e-mail preenchido
    const github = document.getElementById('github').value.trim(); // obtem o github preenchido
    const avatar = document.getElementById('avatar').files[0]; // obtem o arquivo do avatar

    // verifica se o nome foi preenchido
    if (!name) {
        showError('nameError', 'preencha o nome.'); // mostra erro se nao tiver nome
        isValid = false;
    }

    // verifica se o e-mail foi preenchido e se é valido
    if (!email) {
        showError('emailError', 'e-mail invalido.'); // mostra erro se nao tiver e-mail
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('emailError', 'e-mail invalido.'); // valida e-mail com expressao regular
        isValid = false;
    }

    // verifica se o nome do github foi preenchido e se começa com "@"
    if (!github) {
        showError('githubError', 'comece com @ e digite o username.'); // mostra erro se nao tiver github
        isValid = false;
    } else if (!github.startsWith('@')) {
        showError('githubError', 'o username deve comecar com @.'); // mostra erro se o username nao começar com "@"
        isValid = false;
    }

    // verifica se o avatar foi enviado e se atende aos requisitos de tamanho e tipo
    if (!avatar) {
        showError('avatarError', 'por favor, faca o upload de um avatar.'); // mostra erro se nao houver avatar
        isValid = false;
    } else if (avatar.size > 500 * 1024) { // 500kb
        showError('avatarError', 'o arquivo deve ser menor que 500kb.'); // mostra erro se o arquivo for maior que 500kb
        isValid = false;
    } else if (!['image/png', 'image/jpeg'].includes(avatar.type)) {
        showError('avatarError', 'o arquivo deve ser png ou jpg.'); // mostra erro se o tipo de arquivo for invalido
        isValid = false;
    }

    // se o formulario for valido, gera o ingresso
    if (isValid) {
        generateTicket(name, email, github, avatar); // chama a funcao para gerar o ingresso
    }
});

// funcao para validar o e-mail com expressao regular
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // expressao regular para validar o formato de e-mail
    return re.test(email); // retorna true ou false baseado no e-mail
}

// funcao para mostrar a mensagem de erro
function showError(id, message) {
    const errorElement = document.getElementById(id); // obtem o elemento de erro pelo id
    errorElement.textContent = message; // define o texto da mensagem de erro
    errorElement.style.display = 'block'; // torna a mensagem de erro visivel
}

// funcao para limpar as mensagens de erro
function clearErrors() {
    const errors = document.querySelectorAll('.error-message'); // seleciona todos os elementos de erro
    errors.forEach(error => {
        error.textContent = ''; // limpa o texto da mensagem de erro
        error.style.display = 'none'; // esconde a mensagem de erro
    });
}

// funcao para gerar o ingresso
function generateTicket(name, email, github, avatar) {
    // salva as informacoes no localStorage
    localStorage.setItem('ticketName', name); // salva o nome no localStorage
    localStorage.setItem('ticketEmail', email); // salva o e-mail no localStorage
    localStorage.setItem('ticketGithub', github); // salva o github no localStorage

    // cria um url base64 para o avatar e armazena no localStorage
    const reader = new FileReader(); // cria um leitor de arquivos
    reader.onload = function(e) {
        localStorage.setItem('ticketAvatar', e.target.result); // salva a imagem no localStorage
        
        // redireciona para a nova pagina do ticket
        window.location.href = 'ticket-page.html'; // direciona para a pagina do ticket
    };
    reader.readAsDataURL(avatar); // le o avatar e converte para base64
}
