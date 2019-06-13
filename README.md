# axios-url-suite

A simple module for generating custom named functions with fixed urls that call axios to make http requests.

## Features

* Make a custom named [axios](https://www.npmjs.com/package/axios) http call
* Makes code more readable
* Allows custom naming 5 http calls in two lines.
* Checks for improper characters in the name and makes auto snakeCase for first letter of name



## Installing

```
$ npm i axios-url-suite
```


## Syntax and Usage

```
const { getUser } = axiosUrlSuite({ url: someUrl , name: 'users'});
```

axiosUrlSuite takes an object that has two keys: url and name.

The url expects a string in the form of `'http://www.domain.com'`. This would set each of the returned functions to send their request to `'http://www.domain.com'`.

The name expects a string which you would like to name your functions by.

Passing `name: 'user'` would return and object of:
`{ getUser, findUsers, postUser, putUser, deleteUser }`.

Passing `name: 'chair'` would return an object of:
`{ getChair, findChairs, postChairs, putChairs, deleteChairs }`  and etc.

## Examples

```
const axiosUrlSuite = require('axios-url-suite');

const url = 'https://pokeapi.co/api/v2/pokemon/ditto/';
const { getPokemon, findPokemons, postPokemon, putPokemon, deletePokemon } = axiosUrlSuite({ url: url , name: 'pokemon'});

postPokemon(someData, configOptions).then(result => console.log('result: ', result))

// Assuming someData is any data
// And configOptions is an object containing axios accepted config options

// This is equivalent to:
// axios.post(url, { data: someData, ...configOptions }).then(console.log(result: ', result'))
```

## License

MIT

________________________________________________________________________
