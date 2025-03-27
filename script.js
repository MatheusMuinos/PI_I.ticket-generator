document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    const avatar = document.getElementById('avatar').files[0];
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const github = document.getElementById('github').value;
  
    let errorMessage = "";
    if (!avatar) {
      errorMessage += "Por favor, adicione um avatar.\n";
    }
    if (!fullname) {
      errorMessage += "Por favor, insira seu nome completo.\n";
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      errorMessage += "Por favor, insira um e-mail válido.\n";
    }
    if (!github) {
      errorMessage += "Por favor, insira seu GitHub.\n";
    }
  
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function() {
      const avatarBase64 = reader.result;
      // Construir a URL com os parâmetros corretamente
      const newPageUrl = `ticket.html?fullname=${encodeURIComponent(fullname)}&email=${encodeURIComponent(email)}&github=${encodeURIComponent(github)}&avatar=${encodeURIComponent(avatarBase64)}`;
      // Verifique no console se a URL está correta
      console.log("Redirecionando para: ", newPageUrl);
      window.location.href = newPageUrl; // Redireciona para a página de ticket
    };
    reader.readAsDataURL(avatar);
});
