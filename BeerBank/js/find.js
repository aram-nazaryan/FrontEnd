import {
    adv_search_beer,
    create_beer
} from './functional.js'

const find = document.getElementById("find")
const ibu = document.getElementById("ibu")
const abv = document.getElementById("abv")
const ebc = document.getElementById("ebc")
const data = document.getElementById("data")
const ibu_value = document.getElementById("ibu_value")
const ebc_value = document.getElementById("ebc_value")
const abv_value = document.getElementById("abv_value")
const data_value = document.getElementById("data_value")



find.addEventListener("click", function(){
    content.innerHTML = "";
    let argument = [];

    if(ibu.value && ibu_value.value){
        argument.push([
            ibu.value,
            ibu_value.value
        ])
    }
    if(abv.value && abv_value.value){
        argument.push([
            abv.value,
            abv_value.value
        ])
    }
    if(ebc.value && ebc_value.value){
        argument.push([
            ebc.value,
            ebc_value.value
        ])
    }
    if(data.value && data_value.value){
        argument.push([
            data.value,
            data_value.value
        ])
    }
    const beer = adv_search_beer(argument);
    beer.then((data) => {
        data.forEach(beer => {
            create_beer(beer);  
        });
    })    
    ibu.value = "";
    ibu_value.value = "";
    abv.value = "";
    abv_value.value = "";
    ebc.value = "";
    ebc_value.value = "";
    data.value = "";
    data_value.value = "";
})

