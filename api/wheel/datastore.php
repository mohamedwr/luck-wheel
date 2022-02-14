<?php

$database_dir = __DIR__ . "/database";
if (file_exists($database_dir) == false) {
  mkdir($database_dir);
}

function is_new_phone($phone)
{
  $phone_file = "$GLOBALS[database_dir]/$phone.json";
  if (file_exists($phone_file) == false) {
    return true;
  }
  return get_data($phone_file, true);
}

function add_phone($phone, $record)
{
  file_put_contents("$GLOBALS[database_dir]/$phone.json", json_encode($record));
}
