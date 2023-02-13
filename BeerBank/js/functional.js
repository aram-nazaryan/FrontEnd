const create_card = (beer) => {
    return `
    <div class="card" >
        <svg class="star" onclick="add_favourite(this)" stroke="black" fill="white" stroke-width="50" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>
            <img onclick="detect_beer(${beer.id})" class="img" src="${beer.image_url}" alt="">
            <p class="beerhearder">
                ${beer.name}       
            </p>
            <p class="description">  
                ${beer.tagline}
            </p>
    </div>
    `
}

const create_modal = (beer, beer_array) => {
    return `
    <svg class="close" onclick="closing_filter(this)" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path></svg>      
        <div class="upper_part">
            <img src="${beer.image_url}" alt="">
            <div class="left">
                <h1>${beer.name}</h1>
                <h3>${beer.tagline}</h3>
                <div class="alco">
                    <span><b>IBU:</b> ${beer.ibu}</span>
                    <span><b>ABV:</b> ${beer.abv}</span>
                    <span><b>EBC:</b> ${beer.ebc}</span>
                </div>
                <p>${beer.description}</p>
                <p><b>Best served with</b></p>
                <ul>
                    <li>${beer.food_pairing[0]}</li>
                    <li>${beer.food_pairing[1]}</li>
                    <li>${beer.food_pairing[2]}</li>
                </ul>
            </div>
        </div>
        <div class="bottom_part">
            <h1>You might also like:</h1>
            <div class="suggestions">
            <div class="parts">
            <img onclick="detect_beer(${beer_array[0].id})"src="${beer_array[0].image_url}" alt="">
            <div>${beer_array[0].name}</div>
            </div>
            <div class="parts">
            <img onclick="detect_beer(${beer_array[1].id})" src="${beer_array[1].image_url}" alt="">
             <div>${beer_array[1].name}</div>
            </div>
            <div class="parts">
            <img onclick="detect_beer(${beer_array[2].id})" src="${beer_array[2].image_url}" alt="">
            <div>${beer_array[2].name}</div>
            </div>
            </div>
        </div>
    `
}

function get_random_arbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
  }

export async function get_beer_data(){
    let number_of_page = get_random_arbitrary(1,5)
    const result = await fetch(`https://api.punkapi.com/v2/beers?page=${number_of_page}&per_page=30`, {method: "GET"});
    
    const parsObj = await result.json();

    return parsObj;
}

export async function get_beer_info(id){
    const result = await fetch(`https://api.punkapi.com/v2/beers/${id}`, {method: "GET"});
    
    const parsObj = await result.json();

    return parsObj;
}


export async function adv_search_beer(obj){
    let url = "https://api.punkapi.com/v2/beers?";
    for(let i = 0; i < obj.length; ++i){
        url = url + obj[i][0] + '=' + obj[i][1] + '&'
    }
    url = url.slice(0, -1)
    const result = await fetch(`${url}`, {method: "GET"});
    
    const parsObj = await result.json();

    return parsObj;
}

export async function get_three_beer(){
    let number_of_page = get_random_arbitrary(1,5)
    const result = await fetch(`https://api.punkapi.com/v2/beers?page=${number_of_page}&per_page=3`, {method: "GET"});
    
    const parsObj = await result.json();

    return parsObj;
}

export async function search_beer(name){
    const result = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${name}`, {method: "GET"});
    
    const parsObj = await result.json();

    return parsObj;
}

export function create_beer(beer){
    let new_box = document.createElement("div")
        new_box.innerHTML = create_card(beer)
        content.appendChild(new_box);
}

export function create_discription(beer, beer_array){
    let modal_box = document.createElement("div");
    modal_box.classList.add("modal_box");
    modal_box.innerHTML = create_modal(beer, beer_array);
    content.appendChild(modal_box);
} 

