const cheerio = require("cheerio");
const request = require("request");

class CurrencyConverter {
  constructor(params = {}) {
    this.currencies = {
      "AFN": "Afghan Afghani",
      "ALL": "Albanian Lek",
      "DZD": "Algerian Dinar",
      "AOA": "Angolan Kwanza",
      "ARS": "Argentine Peso",
      "AMD": "Armenian Dram",
      "AWG": "Aruban Florin",
      "AUD": "Australian Dollar",
      "AZN": "Azerbaijani M anat",
      "BSD": "Bahamian Dollar",
      "BHD": "Bahraini Dinar",
      "BBD": "Bajan Dollar",
      "BDT": "Bangladeshi Taka",
      "BYN": "Belarusian Ruble",
      "BZD": "Belize Dollar",
      "BMD": "Bermudan Dollar",
      "BTN": "Bhutan currency",
      "BOB": "Bolivian Boliviano",
      "BAM": "Bosnia-Herzegovina Convertible Mark",
      "BWP": "Botswanan Pula",
      "BRL": "Brazilian Real",
      "BND": "Brunei Dollar",
      "BGN": "Bulgarian Lev",
      "BIF": "Burundian Fra nc",
      "XPF": "CFP Franc",
      "KHR": "Cambodian riel",
      "CAD": "Canadian Dollar",
      "CVE": "Cape Verdean Escudo",
      "KYD": "Cayman Islands Dollar",
      "FCFA": "Central African CFA Franc",
      "CLP": "Chilean Peso",
      "CLF": "Chilean Unit of Account (UF)",
      "CNY": "Chinese Yuan",
      "CNY": "Chinese Yuan (offshore)",
      "COP": "Colombian Peso",
      "KMF": "Comorian Franc",
      "CDF": "Congolese Franc",
      "CRC": "Costa Rican Colón",
      "HRK": "Croatian Kuna",
      "CUC": "Cuban Peso",
      "CZK": "Czech Koruna",
      "DKK": "Danish Krone",
      "DJF": "Djiboutian Franc",
      "DOP": "Dominican Pe so",
      "XCD": "East Caribbean Dollar",
      "EGP": "Egyptian Pound",
      "ETB": "Ethiopian Birr",
      "FJD": "Fijian Dollar",
      "GMD": "Gambian dalasi",
      "GEL": "Georgian Lari",
      "GHS": "Ghanaian Cedi",
      "GTQ": "Guatemalan Quetzal",
      "GNF": "Guinean Franc",
      "GYD": "Guyanaese Dollar",
      "HTG": "Haitian Gourde",
      "HNL": "Honduran Lempira",
      "HKD": "Hong Kong Dollar",
      "HUF": "Hungarian Forint",
      "ISK": "Icelandic Króna",
      "INR": "Indian Rupee",
      "IDR": "Indonesian Rupiah",
      "IRR": "Iranian Rial",
      "IQD": "Iraqi Dinar",
      "ILS": "Israeli New Shekel",
      "JMD": "Jamaican Dollar",
      "JPY": "Japanese Yen",
      "JOD": "Jordanian Dinar",
      "KZT": "Kazakhstani Tenge",
      "KES": "Kenyan Shilling",
      "KWD": "Kuwaiti Dinar",
      "KGS": "Kyrgystani Som",
      "LAK": "Laotian Kip",
      "LBP": "Lebanese pound",
      "LSL": "Lesotho Loti",
      "LRD": "Liberian Dollar",
      "LYD": "Libyan Dinar",
      "MOP": "Macanese Pataca",
      "MKD": "Macedonian Denar",
      "MGA": "Malagasy Ariary",
      "MWK": "Malawian Kwacha",
      "MYR": "Malaysian Ringgit",
      "MVR": "Maldivian Rufiyaa",
      "MRO": "Mauritanian Ouguiya",
      "MUR": "Mauritian Rupee",
      "MXN": "Mexican Peso",
      "MDL": "Moldovan Leu",
      "MAD": "Moroccan Dirham",
      "MZN": "Mozambican metical",
      "MMK": "Myanmar Kyat",
      "NAD": "Namibian dol lar",
      "NPR": "Nepalese Rupee",
      "ANG": "Netherlands Antillean Guilder",
      "NZD": "New Zealand Dollar",
      "NIO": "Nicaraguan Córdoba",
      "NGN": "Nigerian Naira",
      "NOK": "Norwegian Krone",
      "OMR": "Omani Rial",
      "PKR": "Pakistani Rupee",
      "PAB": "Panamanian Balboa",
      "PGK": "Papua New Guinean Kina",
      "PYG": "Paraguayan Guarani",
      "PHP": "Philippine peso",
      "PLN": "Poland Złoty",
      "GBP": "Pound sterling",
      "QAR": "Qatari Rial",
      "RON": "Romania n Leu",
      "RUB": "Russian Ruble",
      "RWF": "Rwandan franc",
      "SVC": "Salvadoran Colón",
      "SAR": "Saudi Riyal",
      "RSD": "Serbian Dinar",
      "SCR": "Seychellois Rupee",
      "SLL": "Sierra Leonean Leone",
      "SGD": "Singapore Dollar",
      "SBD": "Solomon Islands Dollar",
      "SOS": "Somali Shilling",
      "ZAR": "South African Rand",
      "KRW": "South Korean won",
      "VES": "Sovereign Bolivar",
      "LKR": "Sri Lankan Rupee",
      "SDG": "Sudanese pound",
      "SRD": "Surinamese Dollar",
      "SZL": "Swazi Lilangeni",
      "SEK": "Swedish Krona",
      "CF": "Swiss Franc",
      "CHF": "Swiss Franc",
      "TJS": "Tajikistani Somoni",
      "TZS": "Tanzanian Shilling",
      "THB": "Thai Baht",
      "TOP": "Tongan Pa\"anga",
      "TTD": "Trinidad and Tobago Dollar",
      "TND": "Tunisian Dinar",
      "TRY": "Turkish lira",
      "TMT": "Turkmenistan manat",
      "UGX": "Ugandan Shilling",
      "UAH": "Ukrainian hryvnia",
      "AED": "United Arab Emirates Dirham",
      "USD": "United States Dollar",
      "UYU": "Uruguayan Peso",
      "UZS": "Uzbekistani Som",
      "VND": "Vietnamese dong",
      "XAF": "Central African CFA franc",
      "XOF": "West African CFA franc",
      "YER": "Yemeni Rial",
      "ZMW": "Zambian Kwacha",
      "XBT": "Bitcoin",
      "ETH": "Ether",
      "EUR": "Euro",
      "LTC": "Litecoin",
      "TWD": "NT$",
      "PEN": "Peruvian Sol"
    }

    this.currencyCodes = Object.keys(this.currencies);

    this.currencyFrom = params.from || "";
    this.currencyTo = params.to || "";
    this.currencyAmount = params.amount || 1;
    this.isDecimalComma = params.isDecimalComma || false;

    this.convertedValue = 0;
    this.isRatesCaching = false;
    this.ratesCacheDuration = 3600; // default to 1 hour
    this.ratesCache = {};
  }

  from(currencyFrom) {
    this._validateCurrencyCode(currencyFrom);
    this.currencyFrom = currencyFrom.toUpperCase();
    return this;
  }

  to(currencyTo) {
    this._validateCurrencyCode(currencyTo);
    this.currencyTo = currencyTo.toUpperCase();
    return this;
  }

  amount(currencyAmount) {
    if (typeof currencyAmount !== "number" || currencyAmount <= 0) {
      throw new TypeError("Amount should be a positive number");
    }
    this.currencyAmount = currencyAmount;
    return this;
  }

  setDecimalComma(isDecimalComma) {
    if (typeof isDecimalComma !== "boolean") {
      throw new TypeError("isDecimalComma should be a boolean");
    }
    this.isDecimalComma = isDecimalComma;
    return this;
  }

  setupRatesCache({ isRatesCaching, ratesCacheDuration }) {
    if (typeof isRatesCaching !== "boolean" || typeof ratesCacheDuration !== "number" || ratesCacheDuration <= 0) {
      throw new TypeError("Invalid rates cache options");
    }
    this.isRatesCaching = isRatesCaching;
    this.ratesCacheDuration = ratesCacheDuration;
    return this;
  }

  _validateCurrencyCode(currencyCode) {
    if (typeof currencyCode !== "string" || !this.currencyCodes.includes(currencyCode.toUpperCase())) {
      throw new TypeError(`${currencyCode} is not a valid currency code`);
    }
  }

  _replaceAll(text, queryString, replaceString) {
    return text.split(queryString).join(replaceString);
  }

  _addRateToCache(currencyPair, rate) {
    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + this.ratesCacheDuration);
    this.ratesCache[currencyPair] = { rate, expiryDate };
  }

  rates() {
    if (this.currencyFrom === this.currencyTo) {
      return Promise.resolve(1);
    }

    const currencyPair = `${this.currencyFrom}${this.currencyTo}`;
    const now = new Date();

    if (currencyPair in this.ratesCache && now < this.ratesCache[currencyPair].expiryDate) {
      return Promise.resolve(this.ratesCache[currencyPair].rate);
    }

    return new Promise((resolve, reject) => {
      request(`https://www.google.com/search?q=${this.currencyAmount}+${this.currencyFrom}+to+${this.currencyTo}+&hl=en`, (error, _, body) => {
        if (error) {
          return reject(error);
        }
        resolve(body);
      });
    })
    .then(body => cheerio.load(body))
    .then($ => $(".iBp4i").text().split(" ")[0])
    .then(rate => {
      if (this.isDecimalComma) {
        rate = this._replaceAll(rate, ".", "").replace(",", ".");
      } else {
        rate = rate.replace(",", "");
      }
      rate = parseFloat(rate) / this.currencyAmount;
      if (this.isRatesCaching) {
        this._addRateToCache(currencyPair, rate);
      }
      return rate;
    });
  }

  convert(currencyAmount) {
    if (currencyAmount !== undefined) {
      this.amount(currencyAmount);
    }

    if (!this.currencyFrom || !this.currencyTo || this.currencyAmount <= 0) {
      throw new Error("Invalid conversion parameters");
    }

    return this.rates().then(rate => {
      this.convertedValue = rate * this.currencyAmount;
      return this.convertedValue;
    });
  }

  currencyName(currencyCode) {
    this._validateCurrencyCode(currencyCode);
    return this.currencies[currencyCode.toUpperCase()];
  }
}

module.exports = CurrencyConverter;