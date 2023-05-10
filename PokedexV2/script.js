const pokedex = document.getElementById("pokedex");


console.log(pokedex);

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i< 1009; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(( res) =>  res.json()));
}
Promise.all(promises).then( (results) => {
    const pokemon = results.map( (data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map ( type => type.type.name).join(", ")
    }));
    displayPokemon(pokemon);
});

};
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokeman =>
        ` <li class="poke-card" onclick="selectPokemon(${pokeman.id})">
             <img class="poke-image" src="${pokeman.image}"/>
             <p class="poke-id">#${pokeman.id}</p>
             <h2 class="poke-name">${pokeman.name}</h2>
             <p class="poke-type">Type: ${pokeman.type}</p>
         </li>
        `)
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

 /* Prøver å lage on clicked event med mer detaljer på*/ 
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

    const stats = pokemonInfo.stats.map ( stats =>
        stats.base_stat).join(', ');
console.log(stats);
    const pokemonInfoHTMLString = `
        <div class="popup">
          <button id="closeButton" onclick="closePopup()">
          Close</button>
          <div class="poke-popup-card">
             <img class="poke-popup-image" src="${image}"/>
             <p class="poke-popup-id">#${pokemonInfo.id}</p>
             <h2 class="poke-popup-name">${pokemonInfo.name}</h2>
           <div class="poke-popup-container">
             <p class="poke-popup-height">Height: ${pokemonInfo.height}0cm</p>
             <p class="poke-popup-weight">Weight: ${pokemonInfo.weight}kg</p>
             <p class="poke-popup-type">Type: ${type}</p>
             <p> Stats: ${stats}</p>
          </div>
         </div>
        </div>
    `
pokedex.innerHTML = pokemonInfoHTMLString + pokedex.innerHTML;
};
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
}
/**************************************/
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