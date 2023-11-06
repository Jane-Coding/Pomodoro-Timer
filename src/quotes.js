const quotesBtn = document.getElementById("quotes_btn");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

//REQUIRE API KEY for API Ninjas
// const KEY = process.env.X_API_KEY;

// REQUIRE API KEY
// const apiURL = "https://api.api-ninjas.com/v1/quotes?category=learning";

const options = {
  method: "GET",
  // headers: { "X-Api-Key": KEY },
};

//BY DEFAULT PUBLIC API IS USED
const apiURL = "https://api.quotable.io/quotes/random";

quotesBtn.addEventListener("click", getQuote);

async function getQuote() {
  try {
    quote.innerHTML = "Looking for quote!";
    author.innerHTML = "";
    quotesBtn.disabled = true;
    const response = await fetch(apiURL, options);
    const data = await response.json();
    quote.innerHTML = `"${data[0].content}"`;
    author.innerHTML = `- ${data[0].author}`;
    quotesBtn.disabled = false;
  } catch (error) {
    quote.innerHTML = "An error happened, please try again later";
    quotesBtn.disabled = false;
    console.log(error);
  }
}
