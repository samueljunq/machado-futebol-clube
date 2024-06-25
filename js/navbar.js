function loadNavbar() {
    const navbarContainer = document.getElementById("navbar-container");

    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navbarContainer.innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o rodape', error);
        });
}
document.addEventListener("DOMContentLoaded", loadNavbar);