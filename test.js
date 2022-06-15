const { get } = require("https");

get("https://google.com", (res) => {
  res.on("data", (chunk) => {
    console.log(` Data form google${chunk}`);
  });
  res.end("end", (chunk) => {
    console.log(`No more data`);
  });
});
