<?php

require_once "./app/utils.php";
require_once "./app/datastore.php";
require_once "./app/wheel.php";

header("Access-Control-Allow-Origin: *");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  header("Access-Control-Allow-Headers: content-type");
  die();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  error("invalid request method", 405);
}

$body = get_data("php://input", true);

if ($body === null) {
  error("invalid request body");
}

if (
  array_key_exists("phone", $body) == false ||
  gettype($body["phone"]) !== "string" ||
  preg_match($data["regex"], $body["phone"]) == false
) {
  error("invalid phone number");
}

$result = is_new_phone($body["phone"]);
if ($result === true) {
  $record = generate_record();
  add_phone($body["phone"], $record);
  reply([
    "new" => true,
    "random" => $record["random"],
    "stamp" => $record["stamp"],
  ]);
} else {
  reply([
    "new" => false,
    "item" => $result["item"],
    "stamp" => $result["stamp"],
  ]);
}
