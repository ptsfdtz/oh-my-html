function loadPage(url) {
    const contentDiv = document.getElementById("content");
    let page = "";

    switch (url) {
        case "/":
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

    contentDiv.innerHTML = '<p>加载中...</p>'; // 显示加载指示器

    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error('页面未找到');
            }
            return response.text();
        })
        .then(html => {
            contentDiv.innerHTML = html;
        })
        .catch(error => {
            contentDiv.innerHTML = '<p>加载失败，请重试。</p>';
            console.error(error);
        });
}

function navigateTo(url) {
    window.location.hash = url;
    loadPage(url);
}

window.onload = function () {
    const currentHash = window.location.hash || "#/";
    loadPage(currentHash);
};

window.addEventListener('hashchange', function () {
    loadPage(window.location.hash);
});
