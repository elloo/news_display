function generateURL(query, event) {
  event.preventDefault();
  if (query != '') {
    articleFetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=81e2959a083d42e091898d3be711e743`,
    );
  } else {
    articleFetch(
      'https://newsapi.org/v2/top-headlines?country=au&apiKey=81e2959a083d42e091898d3be711e743',
    );
  }
}

async function articleFetch(url) {
  try {
    const response = await fetch(url);
    const jsonRes = await response.json();
    const titlesUl = document.querySelector('#titles');
    titlesUl.innerHTML = '';
    document.querySelector('#main').innerHTML = '';
    for (var i = 0; i < 5; i++) {
      let newLink = document.createElement('li');
      let articleTitle = `${jsonRes.articles[i].title}`;
      newLink.setAttribute(
        'onclick',
        `displayArticle(${JSON.stringify(jsonRes.articles[i])})`,
      );
      newLink.innerHTML = articleTitle;
      titlesUl.appendChild(newLink);
    }
    return jsonRes.articles;
  } catch (err) {
    console.log('!Fetch failed!', err);
  }
}

function displayArticle(article) {
  const mainDiv = document.querySelector('#main');
  mainDiv.innerHTML = '';

  let img = document.createElement('img');
  if (article.urlToImage.startsWith('/')) {
    img.setAttribute('src', 'images/news.jpg');
  } else {
    img.setAttribute('src', `${article.urlToImage}`);
  }
  mainDiv.appendChild(img);

  let desc = document.createElement('p');
  let more = ` <a href=${article.url}>[More]</a>`;
  if (`${article.description}` != '') {
    desc.innerHTML = `${article.description}` + more;
  } else {
    desc.innerHTML = `${article.content}` + more;
  }
  mainDiv.appendChild(desc);
}

async function weatherFetch() {
  try {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Sydney,au&appid=2b82c23cac4b047755e6cb97561de11e&units=metric',
    );
    const jsonRes = await response.json();

    const weatherDiv = document.querySelector('#weather');

    let weatherIcon = `http://openweathermap.org/img/wn/${jsonRes.weather[0].icon}@2x.png`;

    let date = new Date();
    let year = date.getFullYear();
    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];
    let month = date.getMonth();
    let day = date.getDate();

    weatherDiv.innerHTML = `In Sydney (AU) on ${months[month]} ${day}, ${year}, it's ${jsonRes.main.temp} &deg;C <img src=${weatherIcon} id="weatherIcon">`;
  } catch (err) {
    console.log('!Fetch failed!', err);
  }
}

function changeColor() {
  const themeBtn = document.getElementById('theme');
  if (document.body.style.backgroundColor === 'black') {
    document.body.style.backgroundColor = 'rgb(255, 237, 196)';
    document.body.style.color = 'black';
    themeBtn.innerHTML = 'Dark mode';
  } else {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    document.getElementById('main').style.color = 'black';
    document.getElementById('titles').style.color = 'black';
    themeBtn.innerHTML = 'Light mode';
  }
}
