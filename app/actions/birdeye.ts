import axios from 'axios';

interface TokensMap {
  [key: string]: string;
}

export const tokensMap: TokensMap = {
  ANALOS: '7iT1GRYYhEop2nV1dyCwK2MGyLmPHq47WhPGSwiqcUg5', // REVISAR TOKEN VERIFICATION
  ANDY: '667w6y7eH5tQucYQXfJ2KmiuGBE8HfYnqqbjLNSw7yww', // REVISAR TOKEN VERIFICATION
  BABYBONK: 'DJtqRFGjn6tsc355cm7VFWeMFppw3CeYcmmuHVmgSKEb',
  BODEN: '3psH1Mj1f7yUfaD5gh6Zj7epE8hhrMkMETgv5TshQA4o',
  BOME: 'ukHH6c7mMyiWCf1b9pnWe25TSpkDDt3H5pQZgZ74J82',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  CWIF: '7atgF8KQo4wJrD5ATGX7t1V2zVvykPJbFfNeVf1icFv1',
  DADDY: '4Cnk9EPnW5ixfLZatCPJjDB1PUtcRpVVgTQukm9epump',
  DC: 'POR VER',
  MEW: 'MEW1gQWJ3nEXg2qgERiKu7FAFj79PHvQVREQUzScPP5',
  MOTHER: '3S8qX1MsMqRbiwKg2cQyx7nis1oHMgaCuc9c4VfvVdPN',
  MOUTAI: '45EgCwcPXYagBC7KqBin4nCFgEZWN7f3Y6nACwxqMCWX',
  MYRO: 'HhJpBhRRn4g56VsyLuT8DL5Bv31HkXqsrahTTUCZeZg4',
  POPCAT: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
  SAMO: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  SLERF: '7BgBvyjrZX1YKz4oh9mjb8ZScatkkwb8DzFx7LoiVkM3',
  SLOTH: 'FJhdswuZWBJDQUfiRx7WwjT9QTR3ocD7VyQVvnJ2ysY8', // REVISAR TOKEN VERIFICATION
  SMOG: 'FS66v5XYtJAFo14LiPz5HT93EUMAHmYipCfQhLpU4ss8',
  SMURFCAT: 'POR VER',
  SOLAMA: 'AVLhahDcDQ4m4vHM4ug63oh7xc8Jtk49Dm5hoe9Sazqr',
  TREMP: 'FU1q8vJpZNUrmqsciSjp8bAKKidGsLmouB8CBdf8TKQv',
  USA: '69kdRLyP5DTRkpHraaSZAQbWmAwzF9guKjZfzMXzcbAs',
  WEN: 'WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm'
};

export function getTokenOverview(token: string) {
  const options = {
    method: 'GET',
    url: 'https://public-api.birdeye.so/defi/token_overview',
    params: {address: token},
    headers: {'x-chain': 'solana', 'X-API-KEY': '24b8b17277474421acf462bd9ba16ada'}
  };

  axios
    .request(options)
    .then(function (response) {
      const tokenData = response.data.data;
      console.log(tokenData);
      return tokenData;
    })
    .catch(function (error) {
      console.error(error);
    });
}

export function getTokenOwner(token: string) {
  const options = {
    method: 'GET',
    url: 'https://public-api.birdeye.so/defi/token_creation_info',
    params: {address: token},
    headers: {'x-chain': 'solana', 'X-API-KEY': '24b8b17277474421acf462bd9ba16ada'}
  };

  axios
    .request(options)
    .then(function (response) {
      const owner = response.data.data.owner;
      console.log(owner);
      return owner;
    })
    .catch(function (error) {
      console.error(error);
    });
}

export function getTokenPurchasesAndSales(token: string) {
  const options = {
    method: 'GET',
    url: 'https://public-api.birdeye.so/defi/txs/token',
    params: {
      address: token,
      limit: '50',
      tx_type: 'swap'
    },
    headers: {'x-chain': 'solana', 'X-API-KEY': '24b8b17277474421acf462bd9ba16ada'}
  };

  axios
    .request(options)
    .then(function (response) {
      const trades = response.data.data.items;
      console.log(trades);
      return trades;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function hasTraded(trader: string, trades: any[]): boolean {
  return trades.some(trade => trade.owner === trader);
}

export function getTraderInToken(trader: string, token: string) {
  const options = {
    method: 'GET',
    url: 'https://public-api.birdeye.so/defi/txs/token',
    params: {
      address: token,
      limit: '',
      tx_type: 'swap'
    },
    headers: {'x-chain': 'solana', 'X-API-KEY': '24b8b17277474421acf462bd9ba16ada'}
  };

  axios
    .request(options)
    .then(function (response) {
      const trades = response.data.data.items;
      const hasTradedFlag = hasTraded(trader, trades);
      console.log(hasTradedFlag);
      return hasTradedFlag;
    })
    .catch(function (error) {
      console.error(error);
    });
}