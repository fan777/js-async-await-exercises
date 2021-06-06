window.addEventListener('load', function () {
  let baseURL = 'https://pokeapi.co/api/v2';

  // 1
  async function getAllPokemon() {
    let allPokemon = await axios.get(`${baseURL}/pokemon/?limit=1500`);
    console.log(allPokemon.data);
  }
  getAllPokemon();

  // 2
  async function getThreePokemon() {
    let allPokemon = await axios.get(`${baseURL}/pokemon/?limit=1500`);
    let pokemonURLs = Array.from({ length: 3 }, () => {
      let idx = Math.floor(Math.random() * allPokemon.data.results.length);
      return url = axios.get(allPokemon.data.results.splice(idx, 1)[0].url);
    });
    let pokemonData = await Promise.all(pokemonURLs);
    pokemonData.forEach(pokemon => console.log(pokemon))
  }
  getThreePokemon();

  // 3
  async function getPokeAndSpecies() {
    let allPokemon = await axios.get(`${baseURL}/pokemon/?limit=1500`);
    let pokemonURLs = Array.from({ length: 3 }, () => {
      let idx = Math.floor(Math.random() * allPokemon.data.results.length);
      return url = allPokemon.data.results.splice(idx, 1)[0].url;
    });
    let pokemonData = await Promise.all(pokemonURLs.map(url => axios.get(url)));
    let speciesData = await Promise.all(pokemonData.map(({ data }) => axios.get(data.species.url)));
    speciesData.forEach((value, index) => {
      entry = value.data.flavor_text_entries.find(element => element.language.name == 'en');
      console.log(`${pokemonData[index].data.name}: ${entry.flavor_text}`);
    })
  }
  getPokeAndSpecies();

  // 4
  let btn = document.querySelector('button');
  let pile = document.querySelector('#poke-pile');
  btn.addEventListener('click', async function () {
    let allPokemon = await axios.get(`${baseURL}/pokemon/?limit=1500`);
    let pokemonURLs = Array.from({ length: 3 }, () => {
      let idx = Math.floor(Math.random() * allPokemon.data.results.length);
      return url = allPokemon.data.results.splice(idx, 1)[0].url;
    });
    let pokemonData = await Promise.all(pokemonURLs.map(url => axios.get(url)));
    let speciesData = await Promise.all(pokemonData.map(({ data }) => axios.get(data.species.url)));
    speciesData.forEach((value, index) => {
      entry = value.data.flavor_text_entries.find(element => element.language.name == 'en');
      pile.innerHTML += `
        <div class="card">
          <b>${pokemonData[index].data.name}</b>
          <img src="${pokemonData[index].data.sprites.front_default}">
          <p>${entry.flavor_text}</p>
        </div>
      `
    })
  })
})

