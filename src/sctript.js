function loadPage(url) {
    const contentDiv = document.getElementById("content");
    let page = "";

    switch (url) {
        case "/":
            page = "pages/home/index.html";
            break;
        case "#/":
            page = "pages/home/index.html";
            break;
        case "#/pageOne":
            page = "pages/pageOne/index.html";
            break;
        case "#/pageTwo":
            page = "pages/pageTwo/index.html";
            break;
        default:
            page = "pages/404.html";
            break;
    }

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(html => {
            contentDiv.innerHTML = html;
        })
}

function navigateTo(url) {
    window.location.hash = url;
    loadPage(window.location.hash);
}

window.onload = function () {
    const currentHash = window.location.hash || "#/";
    loadPage(currentHash);
};

window.addEventListener('hashchange', function () {
    loadPage(window.location.hash);
});
