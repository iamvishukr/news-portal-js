const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpan = document.querySelectorAll(".category span");


const baseUrl ="https://newsapi.org/v2";
const apiKey = "&apiKey=XXXXXXXXXXXXXXXXXXXX";
const backupImage = "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

async function dataRequest(url){

    try{
        const response = await fetch(baseUrl + url +apiKey);
        const json = response.json();
        return json;
    }
    catch(error){
        console.log(error);
    }

}

function urlRequest(url){
dataRequest(url).then(data => {
    data.articles.forEach(item =>{
        cards.innerHTML += `<div class="card">
                <div class="image">
                  <img src="${item.urlToImage ? item.urlToImage : backupImage}" alt="News-image">
                </div>
                <div class="information">
                    <div>
                        <p class="title">${item.title} </p>
                        <p class="description">${item.description}</p>
                        <p class="time">
                            <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                            <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                        </p>
                    </div>  
                    <div class="other">
                        <span class="source">${item.source.name}</span>
                        <a class="url" href="${item.url}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                     </div>
                </div>  
             </div>   `;
        });
    });
} 

category.addEventListener('click', event => {
    if (event.target.tagName === "SPAN") {
        cards.innerHTML = ""; 
        urlRequest(event.target.dataset.id);
        categorySpan.forEach(item => item.classList.remove("active"));
        event.target.classList.add("active");

    }
});

urlRequest("/top-headlines?country=in");
