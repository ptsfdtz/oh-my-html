async function loadPage(url) {
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


    try {
        const res = await fetch(page);

        let html = "something went wrong";
        if (!res.ok) html = '页面未找到'
        html = await res.text();

        contentDiv.innerHTML = html;
        contentDiv.querySelectorAll("script").forEach(script => {
            const newScript = document.createElement("script"); //  在innerHTML中创建script标签
            newScript.innerHTML = script.innerHTML;
            document.body.appendChild(newScript);
        });
    } catch (err) {
        console.error(err);
        contentDiv.innerHTML = "something went wrong";
    }

    // fetch(page)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('页面未找到');
    //         }
    //         return response.text();
    //     })
    //     .then(html => {
    //         contentDiv.innerHTML = html;
    //         contentDiv.querySelectorAll("script").forEach(script => {
    //             const newScript = document.createElement("script"); //  在innerHTML中创建script标签
    //             newScript.innerHTML = script.innerHTML;
    //             document.body.appendChild(newScript);
    //         });
    //         // 感谢温佬，拯救我的项目
    //     })
}

function navigateTo(url) {
    window.location.hash = url;
    loadPage(url);
    window.location.reload();
}

window.onload = function () {
    const currentHash = window.location.hash || "#/";
    loadPage(currentHash);
};

window.addEventListener('hashchange', function () {
    loadPage(window.location.hash);
});