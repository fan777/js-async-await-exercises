
window.addEventListener('load', function () {
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1
  async function drawCard() {
    let response = await axios.get(`${baseURL}/new/draw`);
    let { suit, value } = response.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }
  drawCard();

  // 2
  async function drawCards() {
    let firstCard = await axios.get(`${baseURL}/new/draw`);
    let secondCard = await axios.get(`${baseURL}/${firstCard.data.deck_id}/draw`);
    [firstCard, secondCard].forEach(card => {
      let { suit, value } = card.data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    })
  }
  drawCards();

  // 3
  let deck = null;
  let btn = document.querySelector('button');
  let pile = document.querySelector('#pile');
  let counter = document.querySelector('#counter');
  btn.addEventListener('click', async function () {
    if (deck == null) {
      let response = await axios.get(`${baseURL}/new/shuffle/?deck_count=1`);
      deck = response.data.deck_id;
    }
    let response = await axios.get(`${baseURL}/${deck}/draw`);
    let degree = Math.floor(Math.random() * (50)) * (Math.round(Math.random()) * 2 - 1);
    pile.innerHTML += `<img src="${response.data.cards[0].image}" style="transform: rotate(${degree}deg);"></img>`;
    counter.innerText = `Cards left: ${response.data.remaining}`;
    if (response.data.remaining == 0)
      btn.remove();
  })
});
