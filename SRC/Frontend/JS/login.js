document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Login e senha para teste
    const validLogin = "adm1234";
    const validPassword = "adm1234";

    // Obter valores do formulário
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Verificar credenciais
    if (email === validLogin && password === validPassword) {
        // Redirecionar para a página Visão Geral
        window.location.href = "visao-geral.html";
    } else {
        // Mostrar mensagem de erro
        document.getElementById("error-message").style.display = "block";
    }
});