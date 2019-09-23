async function logFetch(url) {
    try {
        const response = await fetch(url);
        const jsonRes = await response.json();
        const titles = document.querySelector("#titles");
        for (var i = 0; i < 5; i++){
            titles.innerHTML += `<br> ${jsonRes.articles[i].title}`;
        }

    }
    catch (err) {
        console.log('Fetch failed', err);
    }
    }

    logFetch('https://newsapi.org/v2/top-headlines?country=au&apiKey=81e2959a083d42e091898d3be711e743')