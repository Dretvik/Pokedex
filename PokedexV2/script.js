const pokedex = document.getElementById("pokedex");


console.log(pokedex);

/* Arrow function to fetch the api */
/* Starting of with an empty array of promises */
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i< 1009; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    /* Looping through all the pokemon and make an object for each one in an array of objects */
    /* pushing a new promise to the array */
    promises.push(fetch(url).then(( res) =>  res.json()));
}
/* .then gets our data */
/* A Promise is a JavaScript object that links producing code and consuming code */
Promise.all(promises).then( (results) => {
    const pokemon = results.map( (data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        /* Converting the "type" from an array to a string with the .join */
        type: data.types.map ( type => type.type.name).join(", ")
    }));
    displayPokemon(pokemon);
});
};
/* Here we make our pokemon card with the data we got from the api */
/* We can make our HTML elements here in JavaScript using a HTML string */
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    /* We give these elements some classes, thats is for styling in CSS */
    const pokemonHTMLString = pokemon.map ( pokeman =>
        ` <li class="poke-card" onclick="selectPokemon(${pokeman.id})">
             <img alt="An image of the selected pokemon" 
             class="poke-image" src="${pokeman.image}"/>
             <p class="poke-id">#${pokeman.id}</p>
             <h2 class="poke-name">${pokeman.name}</h2>
             <p class="poke-type">Type: ${pokeman.type}</p>
         </li>
        `)
        .join('');
        /* Here we declare where the HTML string are going to be placed, and it is inside of the
        element that have the id of "pokedex" */
    pokedex.innerHTML = pokemonHTMLString;
};

 /* Here we make our Popup card, 
 and we fetch the api again here for the individual pokemon that we click on */ 
const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemonInfo = await res.json();
    displayPopup(pokemonInfo);
};
const displayPopup = (pokemonInfo) => {
    const type = pokemonInfo.types.map ( type =>
          type.type.name).join(', ');
          const image = pokemonInfo.sprites['front_default'];
          console.log(pokemonInfo);

    const pokeStats = pokemonInfo.stats.map ( stats =>
        stats.base_stat).join(', ');

    const abilities = pokemonInfo.abilities.map ( abilities =>
        abilities.ability.name).join(', ');
        console.log(pokeStats);
/* Once again we make our HTML element in JavaScript */
    const pokemonInfoHTMLString = `
        <div class="popup">
          <button id="closeButton" onclick="closePopup()">
          Close</button>
          <div class="poke-popup-card">
             <p class="poke-popup-id">#${pokemonInfo.id}</p>
             <h2 class="poke-popup-name">${pokemonInfo.name}</h2>
             <img alt="An image of the selected pokemon" 
             class="poke-popup-image" src="${image}"/>
        <div class="poke-popup-positions">
         <div class="poke-popup-stats">
             <p>Hp: ${pokemonInfo.stats[0].base_stat}</p>
             <p>Attack: ${pokemonInfo.stats[1].base_stat}</p>
             <p>Defense: ${pokemonInfo.stats[2].base_stat}</p>
             <p>Sp Attack: ${pokemonInfo.stats[3].base_stat}</p>
             <p>Sp Defence: ${pokemonInfo.stats[4].base_stat}</p>
             <p>Speed: ${pokemonInfo.stats[5].base_stat}</p>
         </div>
          <div class="poke-popup-container">
             <p class="poke-popup-height">Height: ${pokemonInfo.height}0cm</p>
             <p class="poke-popup-weight">Weight: ${pokemonInfo.weight}kg</p>
             <p class="poke-popup-type">Type: ${type}</p>
             <p class="poke-popup-abilities"> Abilities: ${abilities}</p>
          </div>
    </div>
         </div>
        </div>
    `
/* We allso tell our new div to be on top of the other content in our HTML document */
pokedex.innerHTML = pokemonInfoHTMLString + pokedex.innerHTML;
};
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
/* Here we make our search function, looping through the text value in the input box(search box) */
function pokeSearch() {
    let input, filter, li, ol, h2, i, txtValue;
    input = document.getElementById ('poke-search');
    filter = input.value.toUpperCase();
    ol = document.getElementById("pokedex");
    li = ol.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        h2 = li[i].getElementsByTagName("h2")[0];
        txtValue = h2.textContent || h2.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

fetchPokemon();