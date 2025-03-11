document.addEventListener("DOMContentLoaded", () => {
    console.log("Página carregada com sucesso!");

    const ctaButton = document.getElementById("cta-button");
    const toggleButton = document.getElementById("toggle-info");
    const extraInfo = document.getElementById("extra-info");

    ctaButton.addEventListener("click", () => {
        alert("Seja bem-vindo ao Instituto Criativo!");
    });

    toggleButton.addEventListener("click", () => {
        if (extraInfo.style.display === "none") {
            extraInfo.style.display = "block";
            toggleButton.textContent = "Mostrar Menos";
        } else {
            extraInfo.style.display = "none";
            toggleButton.textContent = "Mostrar Mais";
        }
    });
});
