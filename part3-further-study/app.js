$(document).ready(() => {
  let baseURL = 'https://pokeapi.co/api/v2';

  // 1
  $.getJSON(`${baseURL}/pokemon/?limit=1500`)
    .then(data => {
      console.log(data);
    })

  // 2
  $.getJSON(`${baseURL}/pokemon/?limit=1500`)
    .then(data => {
      let pokemonUrls = Array.from({ length: 3 }).map(x => {
        let idx = Math.floor(Math.random() * data.results.length);
        return data.results.splice(idx, 1)[0].url;
      });
      return Promise.all(pokemonUrls.map(pokemonUrl => $.getJSON(pokemonUrl)));
    })
    .then(pokemon => {
      pokemon.forEach(x => console.log(x));
    })

  //3
  let poke = [];
  $.getJSON(`${baseURL}/pokemon/?limit=1500`)
    .then(data => {
      let pokemonUrls = Array.from({ length: 3 }).map(x => {
        let idx = Math.floor(Math.random() * data.results.length);
        return data.results.splice(idx, 1)[0].url;
      });
      return Promise.all(pokemonUrls.map(pokemonUrl => $.getJSON(pokemonUrl)));
    })
    .then(pokemon => {
      //console.log(pokemon);
      poke = pokemon.map(({ name }) => name);
      return Promise.all(pokemon.map(({ species }) => $.getJSON(species.url)));
    }).then(species => {
      //console.log(species);
      species.forEach((s, index) => {
        entry = s.flavor_text_entries.find(element => element.language.name == 'en');
        console.log(`${poke[index]}: ${entry.flavor_text}`);
      });
    });

  //4
  let $btn = $('button');
  let $pile = $('#poke-pile');
  let pokeList = [];
  let descList = [];
  $btn.on('click', function () {
    $.getJSON(`${baseURL}/pokemon/?limit=1500`)
      .then(data => {
        let pokemonUrls = Array.from({ length: 3 }).map(x => {
          let idx = Math.floor(Math.random() * data.results.length);
          return data.results.splice(idx, 1)[0].url;
        });
        return Promise.all(pokemonUrls.map(pokemonUrl => $.getJSON(pokemonUrl)));
      })
      .then(pokemon => {
        //console.log(pokemon);
        pokeList = pokemon.map(({ name }) => name);
        return Promise.all(pokemon.map(({ species }) => $.getJSON(species.url)));
      }).then(species => {
        //console.log(species);
        species.forEach((s, index) => {
          entry = s.flavor_text_entries.find(element => element.language.name == 'en');
          descList.push(entry.flavor_text);
        });
      });
    pokeList.forEach((value, index) => {
      $pile.append(`
        <div class="card">
          <b>${value}</b>
          <p>${descList[index]}</p>
        </div>
      `)
    })
  })

  // ROUGH WORKING #3
  // $.getJSON(`${baseURL}/pokemon/?limit=1500`)
  //   .then(data => {
  //     let pokemonUrls = Array.from({ length: 3 }).map(x => {
  //       let idx = Math.floor(Math.random() * data.results.length);
  //       return data.results.splice(idx, 1)[0].url;
  //     });
  //     return Promise.all(pokemonUrls.map(pokemonUrl => $.getJSON(pokemonUrl)));
  //   })
  //   .then(pokemon => {
  //     pokemon.forEach(x => {
  //       console.log(x);
  //       $.getJSON(x.species.url).then(species => {
  //         console.log(x.name)
  //         console.log(species.flavor_text_entries[0].flavor_text);
  //       })
  //     });
  //   })

});
