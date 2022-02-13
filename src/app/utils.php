<?php

function get_data($json, $file = false)
{
  return json_decode($file ? file_get_contents($json) : $json, true);
}

function error($error, $code = 400)
{
  http_response_code($code);
  die("{\"error\": " . $error . "}");
}

function reply($res)
{
  die(json_encode($res));
}
