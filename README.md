<div align="center">
<h1>Currency Converter</h1>

![Known Vulnerabilities](https://snyk.io/test/github/vijay75740/currency-converter-nodejs/badge.svg?targetFile=package.json)  ![supported node versions](https://img.shields.io/badge/node%20v-12.x%20%7C%2013.x%20%7C%2014.x%20%7C%2015.x%20%7C%2016.x%20%7C%2017.x%20%7C%2018.x-blue) 
 ![license: MIT](https://img.shields.io/npm/l/vue.svg) [![npm version](https://badge.fury.io/js/currency-converter-vl.svg)](https://badge.fury.io/js/currency-converter-vl) ![npm](https://img.shields.io/npm/dm/currency-converter-vl)
<p>The Currency Converter App is a powerful and user-friendly tool designed to simplify the process of converting one currency to another. Whether you're a traveler, a business professional, or someone dealing in international transactions, this app provides accurate and real-time currency conversion to meet your needs.</p>
</div>

### Typescript Support

I've updated tsconfig.json to
{ "compilerOptions": { "allowJs": true}}
and imported class 
import * as CurrencyConverter from 'currency-converter-vl';

## Getting started

### Installation

This package can be installed using `npm`

```bash
npm install currency-converter-vl
```

or, `yarn`

```bash
yarn add currency-converter-vl
```

### Usage

Import `currency-converter-vl`.

```javascript
const CCV = require('currency-converter-vl')
```

Instant Setup: Node.js Currency Converter with Empty Constructor

```javascript
let currencyConverter = new CCV()
```

Or, with a json object

```javascript
let currencyConverter = new CCV({from:"USD", to:"INR", amount:100})
```

#### <p style='color:magenta'>!!! Note: if you get incorrect conversion described in this issue then make sure you pass `isDecimalComma: true` to the constructor as following:</p>

```javascript
let currencyConverter = new CCV({from:"USD", to:"INR", amount:100, isDecimalComma:true})
```


Node.js Currency Converter: Promise-Based Convert Method with Rate Caching

```javascript
currencyConverter.convert().then((response) => {
    console.log(response) //or do something else
})
```

`convert` can also take the amount as a parameter.

```javascript
currencyConverter.convert(100).then((response) => {
    console.log(response) //or do something else
})
```

To find the rates use the `rates` method.

```javascript
currencyConverter.rates().then((response) => {
    console.log(response) //or do something else
})
```

The Node js Currency Converter Library not only simplifies currency conversions by eliminating the need for API subscriptions but also supports efficient rate caching for currency pairs. To implement rate caching, instantiate an object of the CurrencyConverter class only once in your project. This should be done in a dedicated CurrencyConverter file, where you can set up the rates caching configuration. Subsequently, you can import this single instance of CurrencyConverter across the rest of your project. By centralizing the instantiation and configuration, you ensure that the cached rates are consistently utilized throughout your application, improving performance and reducing redundant requests.

Note: Moreover, the library supports method chaining, allowing for more readable and concise code when performing currency conversions. When caching is enabled, the process remains efficient as the rates are not deleted after the ratesCacheDuration expires. Instead, the rate remains in the cache until a new request for the same currency pair is made, at which point the old rate is overwritten with the updated value. This approach ensures that the conversion rates are always up-to-date while minimizing unnecessary API calls. The following is an example of how to set up and use the CurrencyConverter in a dedicated file, showcasing the implementation of rate caching and chaining for seamless currency conversions.

```javascript
const CCV = require('currency-converter-vl')

let currencyConverter = new CCV()

let ratesCacheOptions = {
    isRatesCaching: true, // Set this boolean to true to implement rate caching
    ratesCacheDuration: 3600 // Set this to a positive number to set the number of seconds you want the rates to be cached. Defaults to 3600 seconds (1 hour)
}

currencyConverter = currencyConverter.setupRatesCache(ratesCacheOptions)

module.exports = currencyConverter
```

Effortless Currency Conversion with Chaining Support in Node js

```javascript
currencyConverter.from("CAD").to("HRK").amount(125).convert().then((response) => {
    console.log(response) //or do something else
})
```

## Disclaimer

This package uses web scraping to provide the API.

Explore 1500+ Veg Indian recipes at [Hubrecipes](https://hubrecipes.com/), find cooking inspiration, and create kitchen wins with Simply Recipes.



## Issues

If any issues are found, they can be reported [here](https://github.com/vijay75740/currency-converter-nodejs/issues).

## License

This project is licensed under the [MIT](LICENSE) license.
