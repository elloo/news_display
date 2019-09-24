function displayArticle(id){
    console.log(id);
}

async function logFetch(url) {
try {
    const response = await fetch(url);
    const jsonRes = await response.json();
    const titlesUl = document.querySelector("#titles");
    for (var i = 0; i < 5; i++){
        let newLink = document.createElement("li");
        let articleTitle = `${jsonRes.articles[i].title}`;
        newLink.setAttribute("id", i);
        newLink.setAttribute("onclick", "displayArticle(this.id)")
        newLink.innerHTML = articleTitle;
        titlesUl.appendChild(newLink);
    }

}
catch (err) {
    console.log('Fetch failed', err);
}
}

logFetch('https://newsapi.org/v2/top-headlines?country=au&apiKey=81e2959a083d42e091898d3be711e743')