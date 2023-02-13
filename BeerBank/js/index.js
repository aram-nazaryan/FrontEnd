import{
    get_beer_data,
    create_beer,
    get_beer_info,
    create_discription,
    get_three_beer,
    search_beer
} from './functional.js'

const input = document.getElementById("input")
const empty_input = document.getElementById("empty_input")
const home = document.getElementById("home")
const serach_beer = document.getElementById("serach_beer")
const fav_btn = document.getElementById("fav_btn")
const favorite = document.getElementById("fav_modal")
const beers_in_fav = document.getElementById("beers")
const adv_search = document.getElementById("adv_search")
let is_any_info_opend = false;


adv_search.addEventListener("click", function(){
    if(filter_modal.style.display === "none" || filter_modal.style.display === ""){
        filter_modal.style.display = "flex";
    }
    else {
        filter_modal.style.display = "none"
    }
})

fav_btn.addEventListener("click", () => {
    if(favorite.style.display === "none" || favorite.style.display === ""){
        favorite.style.display = "flex";
    }
    else {
        favorite.style.display = "none"
    }
      
})

serach_beer.addEventListener("click", () => {
    if(input.value === ""){
        empty_input.innerHTML = "Enter some text!"
    }
    else{
        content.innerHTML = "";
        const beer = search_beer(input.value);
        beer.then((data) => {
            if(data.length === 0){
                empty_input.innerHTML = "No such beer exists";
                throw "Not blow please"
            }
            else if(data.length === 1){
                create_beer(data[0])
            }
            else{
                data.forEach(beer => {
                    create_beer(beer)
                  })
                  throw "Not blow please"
            }
        }).catch(error => console.log(error))
    }
})

input.addEventListener("keyup", (event) => {
    if(input.value != ""){
        empty_input.innerHTML = "";
    }
    if(event.key === "Enter"){
        serach_beer.click();
    }
})
 
window.add_favourite = (card) => {
    let parent = card.parentElement;
    if(card.style.fill === "white" || card.style.fill === ""){
        let new_box = document.createElement("div")
        new_box.classList.add("beer_in_fav")
        new_box.innerHTML = parent.innerHTML;
        new_box.children[0].remove();
        new_box.children[2].remove();
        beers_in_fav.appendChild(new_box)
        card.style.fill = "gold";
    }
    else{
        let beer_list = beers_in_fav.children;
        for(let i = 0; i < beer_list.length; ++i){
            if(beer_list[i].children[1].innerHTML === parent.children[2].innerHTML){
                beer_list[i].remove();
                break;
            }
        }
        card.style.fill = "white";
    }
}


home.addEventListener("click", function(){
    content.innerHTML = "";
    const beer = get_beer_data();
    beer.then((data) => {
        data.forEach(beer => {
            create_beer(beer);
        });
    })    
});



let is_modal_opend = false;

window.detect_beer = (id) => {
    is_modal_opend = true;
    const beer_info = get_beer_info(id)
    beer_info.then((data) => {
        get_three_beer().then((array) => {
            create_discription(data[0], array);
        })
    })    
}

window.closing_filter = (child) => {
    child.parentElement.remove();
    is_any_info_opend = false;
}


content.addEventListener("mousedown", function(e){
    if(is_modal_opend){
        const modal = document.getElementsByClassName("modal_box");
        if(modal.length != 0){
            if(!modal[0].contains(e.target)){
                for(let i = 0; i < modal.length; ++i){
                    modal[i].remove()
                }
                is_any_info_opend = false;
            }
        }
    }
}) 

window.addEventListener('scroll',()=>{
    if(document.documentElement.scrollHeight <= window.scrollY + window.innerHeight){
        let beer = get_beer_data();
        beer.then((data) => {
            data.forEach(beer => {
                create_beer(beer);
            });
        })
    }
})