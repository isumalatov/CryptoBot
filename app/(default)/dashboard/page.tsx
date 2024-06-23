"use client"

import { getTokenOverview, tokensMap, getTokenOwner, getTokenPurchasesAndSales, getTraderInToken } from '@/app/actions/birdeye'

/*export const metadata = {
  title: 'Dashboard',
  description: 'Page description',
}*/

import WelcomeBanner from './welcome-banner'

export default function Dashboard() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBanner
        title="¡Bienvenido a CryptoBot! 👋"
        subtitle="AQUI PONEMOS ALGO MAS:"
      />
      <button onClick={() => getTokenOverview(tokensMap['MEW'])}>Get Token Overview</button>
      <button onClick={() => getTokenOwner(tokensMap['MEW'])}>Get Token Creation Info</button>
      <button onClick={() => getTokenPurchasesAndSales(tokensMap['MEW'])}>Get Token Trades</button>
      <button onClick={() => getTraderInToken('3ACp4T3ptTdayzWryEhT65NKZSKLjwXviBjWEy54aFdW', tokensMap['MEW'])}>Get Trader In Token</button>
    </div>    
  )
}
