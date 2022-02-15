const fastify = require("fastify");

const wheel = require("./wheel");
const datastore = require("./datastore");

const app = fastify({
  logger: false
});

function initHeaders(reply) {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header("Access-Control-Allow-Headers", "content-type");
}

function initJson(reply) {
  initHeaders(reply);
  reply.header("Content-Type", "application/json");
}

function invalidRequest(reply, msg) {
  reply.code(400);
  initJson(reply);
  reply.send({
    error: msg
  });
}

app.post("/auth", async (req, reply) => {
  if (!wheel.isStillAvailable) {
    initHeaders();
    reply.code(204);
    return reply.send();
  }
  if (typeof req.body !== "object") {
    return invalidRequest(reply, "invalid request body");
  }
  if (
    !req.body.phone ||
    typeof req.body.phone !== "string" ||
    !req.body.phone.match(wheel.regex)
  ) {
    return invalidRequest(reply, "invalid phone number");
  }
  initJson(reply);
  const phoneFetch = await datastore.fetchPhone(req.body.phone);
  if (!phoneFetch) {
    const record = wheel.generate();
    const stamp = await datastore.addPhone(
      req.body.phone,
      record.random,
      record.index,
      record.item
    );
    reply.send({
      new: true,
      random: record.random,
      stamp
    });
  } else {
    reply.send({
      new: false,
      random: phoneFetch.random,
      stamp: phoneFetch.stamp
    });
  }
});

app.all("*", (req, reply) => {
  initHeaders(reply);
  reply.send();
});

app.listen(
  process.env.PORT || 8000,
  process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost",
  (error) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
    }
  }
);
