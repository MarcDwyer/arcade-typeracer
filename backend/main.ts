const api = "https://quotes.rest/quote/random";

const req = await fetch(api, {
  headers: {
    "X-TheySaidSo-Api-Secret": "gamer",
  },
});

console.log(await req.text());
