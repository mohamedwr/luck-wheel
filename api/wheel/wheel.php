<?php

$data = get_data(__DIR__ . "/data.json", true);

function generate_record()
{
  $items = count($GLOBALS["data"]["items"]);
  $random = rand($items * 5 + 1, $items * 7 - 1);
  $item_index = $random % $items;
  if (in_array($item_index, $GLOBALS["data"]["forbidden"])) {
    return generate_record();
  }
  $item = $GLOBALS["data"]["items"][$item_index];
  return [
    "random" => $random,
    "index" => $item_index,
    "item" => $item,
    "stamp" => time(),
  ];
}
