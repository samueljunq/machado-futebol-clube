function loadFooter() {
    const navbarContainer = document.getElementById("footer-container");

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o rodape', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    const img = document.querySelector(".faca-mais-img img");
    img.addEventListener("click", function() {
        this.classList.add("vibrate");
        // Remover a animação após 0.3 segundos
        setTimeout(() => {
            this.classList.remove("vibrate");
        }, 300);
    });
});
