# Luck Wheel

a simple dynamic luck wheel with an authentication system

**inspired** by [WillyIsCoding](https://codepen.io/WillyIsCoding/pen/KBMRVL)

#

## Screenshot

![Luck Wheel Screenshot](/README/wheel.jpeg)

#

## Documentation

- run `npm run build` to build the static files
- run `npm start` to start a local php server on `localhost:8000`

- `api`: php api files
- `src`: static files

- The wheel can be configured through: `src/style/variables.scss`

The api has **one** endpoint:

- It recieves a json post request with `phone` property
- The phone property must be a string and must match the regex found in `api/wheel/data.json`

- The api returns a json response with the following properties:
  - `new`: wether the phone number is recorded before in the database or not
  - `random`: a random number that is used to calculate the degree of the rotation of the wheel through the following formula:  
    `deg = random * (360 / numberOfItems)`
  - `stamp`: unix timestamp at which the phone was recorded in the database. It can be used to validate the won items if they have a limited valid time, **e.g.** Items won are only valid for 3 hours after being won.
- The api has the control to forbid some items so that the users never won these items: `api/wheel/data.json: forbidden property`

**Notes:**

- Don't forget to edit both `src/wheel.ts` and `api/wheel/data.json` when editting the wheel items
- Don't forget to edit the wheel items arrays when editting `$pairs` in: `src/style/variables.scss`

- HTML wheel items elements are generated dynamically in: `src/wheel.ts`

- Current implementation of the wheel authentication api is so simple that the database is just a directory (`api/wheel/database`) containing multiple json files

#

## Technologies

- HTML
- [SCSS](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PHP](https://www.php.net/)

#

## Features

- Can add multiple items to the wheel without much re-configuration
- Can be dynamically re-sized
- Can be dynamically configured to change its colors, text size or font
- Uses an authentication system to figure out unique users, their won items and validate the won items

#

## LICENSE

This project is under MIT license.  
Consider checking `LICENSE` file

#

### Written with :heart: by Mohamed Waleed
