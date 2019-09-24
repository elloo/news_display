function displayArticle(article){
    const mainDiv = document.querySelector("#main");
    mainDiv.innerHTML = "";

    let img = document.createElement("img");
    if (article.urlToImage.startsWith("/")){
        img.setAttribute("src", "images/news.jpg");
    } else {
        img.setAttribute("src", `${article.urlToImage}`);
    }
    mainDiv.appendChild(img);

    let desc = document.createElement("p");
    let more = ` <a href=${article.url}>[More]</a>`;
    if (`${article.description}` != ""){
        desc.innerHTML = `${article.description}` + more;
    } else {
        desc.innerHTML = `${article.content}` + more;
    }
    mainDiv.appendChild(desc);

    console.log(article.urlToImage);
}

async function logFetch(url) {
try {
    const response = await fetch(url);
    const jsonRes = await response.json();
    const titlesUl = document.querySelector("#titles");
    for (var i = 0; i < 5; i++){
        let newLink = document.createElement("li");
        let articleTitle = `${jsonRes.articles[i].title}`;
        newLink.setAttribute("onclick", `displayArticle(${JSON.stringify(jsonRes.articles[i])})`)
        newLink.innerHTML = articleTitle;
        titlesUl.appendChild(newLink);
    }
    return jsonRes.articles;
}
catch (err) {
    console.log('Fetch failed', err);
}
}

var articles = logFetch('https://newsapi.org/v2/top-headlines?country=au&apiKey=81e2959a083d42e091898d3be711e743');