document.getElementById("eventForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Obter dados do formulário
    const eventName = document.getElementById("eventName").value;
    const eventDate = document.getElementById("eventDate").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const company = document.getElementById("company").value;
    const organizers = document.getElementById("organizers").value;
    const participants = document.getElementById("participants").value;
    const donations = document.getElementById("donations").value;
    const donationAmount = document.getElementById("donationAmount").value;

    // Simular envio ao sistema
    alert(`Evento "${eventName}" adicionado com sucesso!`);

    // Redirecionar para a página de eventos
    window.location.href = "eventos.html";
});