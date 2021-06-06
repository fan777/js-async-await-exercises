let baseURL = "http://numbersapi.com";
let favoriteNumber = 7;

// 1
async function getFact() {
  let resp = await axios.get(`${baseURL}/${favoriteNumber}?json`);
  document.querySelector('body').innerHTML += `<p>${resp.data.text}</p>`;
}
getFact();

// 2
let numbers = [1, 2, 5, 4];
async function getFacts() {
  let responses = await axios.get(`${baseURL}/${numbers}?json`);
  numbers.forEach(num => {
    document.querySelector('body').innerHTML += `<p>${responses.data[num]}</p>`;
  });
}
getFacts();

// 3
async function getFourFaveFacts() {
  let responses = await Promise.all(
    Array.from({ length: 4 }, () => axios.get(`${baseURL}/${favoriteNumber}?json`))
  );
  responses.forEach(response => {
    document.querySelector('body').innerHTML += `<p>${response.data.text}</p>`;
  });
}
getFourFaveFacts();