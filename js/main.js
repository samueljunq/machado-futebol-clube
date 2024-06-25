let ul = document.querySelector('nav .ul');

function openMenu() {
    ul.classList.add('open');
}
function closeMenu() {
    ul.classList.remove('open');
}

function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function search() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let items = document.getElementsByClassName('itens');
    let found = false;

    if (input == '')
        return;

    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('foundSearchStart', 'foundSearchEnd');

        if (items[i].innerText.toLowerCase().includes(input)) {
            items[i].style.display = "block";
            scrollToElement(items[i]);
            found = true;

            items[i].classList.add('foundSearchStart');
            setTimeout(function () {
                items[i].classList.remove('foundSearchStart');
                items[i].classList.add('foundSearchEnd');
            }, 2000);

            return;
        }
    }

    if (!found) {
        let pageURLs = ["governanca.html", "ouvidoria.html", "transparencia.html", "perguntas.html", "obrigado.html"];
        let promises = pageURLs.map(url => fetchPageContent(url, input));
        Promise.all(promises).then(results => {

            for (let i = 0; i < results.length; i++) {
                if (results[i].found) {
                    window.location.href = `${pageURLs[i]}?search=${encodeURIComponent(input)}`;
                    return;
                }
            }
            alert('Termo de busca não encontrado em nenhuma página do site.');
        });
    }
}

function fetchPageContent(url, searchTerm) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, 'text/html');
            let bodyText = doc.body.innerText.toLowerCase();

            if (bodyText.includes(searchTerm)) {
                let elements = doc.body.querySelectorAll(":is(h1, h2, h3, h4, h5, h6, p)");
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].innerText.toLowerCase().includes(searchTerm)) {
                        return { found: true, element: elements[i] };
                    }
                }
            }
            return { found: false, element: null };
        })
        .catch(error => {
            console.error('Erro ao carregar a página:', error);
            return { found: false, element: null };
        });
}

document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('.search-container input[type="text"]');

    input.addEventListener('focus', function () {
        input.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        input.classList.remove('focused');
    });
});