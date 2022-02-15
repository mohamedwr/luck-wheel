const data =
  process.env.NODE_ENV === "production"
    ? JSON.parse(process.env.DATA)
    : require("./data.json");

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generate() {
  const random = rand(data.items.length * 5 + 1, data.items.length * 7 - 1);
  const index = random % data.items.length;
  if (data.forbidden.includes(index)) {
    return generate();
  }
  return {
    random,
    index,
    item: data.items[index]
  };
}

module.exports = {
  regex: new RegExp(data.regex),
  generate
};
