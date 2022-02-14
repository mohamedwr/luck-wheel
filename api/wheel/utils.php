<?php

function get_data($json, $file = false)
{
  return json_decode($file ? file_get_contents($json) : $json, true);
}

function error($error, $code = 400)
{
  header("Content-Type: application/json");
  http_response_code($code);
  die("{\"error\": " . $error . "}");
}

function reply($res)
{
  header("Content-Type: application/json");
  die(json_encode($res));
}
