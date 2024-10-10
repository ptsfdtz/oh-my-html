const username = 'PTSFDTZ'

async function getUserData() {
    const followersCount = (await (await fetch(`https://api.github.com/users/${username}`)).json()).followers;
    document.querySelector('.followersValue').textContent = followersCount;
    console.log(`Followers count: ${followersCount}`);
}

getUserData();