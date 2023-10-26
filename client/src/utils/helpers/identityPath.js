const identityPath = (user_token, id) => {

    if (user_token && id) {
        const ind = user_token?.indexOf('.');
        const authPath = user_token?.slice(0, ind);
        localStorage.setItem('dashboard-sub-path', JSON.stringify(`${authPath}${id}`));
    }
    let subPath = JSON.parse(localStorage.getItem('dashboard-sub-path'));

    return `/v1/${subPath}/on-board`
}

export default identityPath

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ964975681ff16e85413297ab6
*/