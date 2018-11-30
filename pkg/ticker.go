// Copyright (C) 2018 Cranky Kernel
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

package pkg

import (
	"gitlab.com/crankykernel/cryptotrader/binance"
	"time"
)

type CommonTicker struct {
	// The coin and the pairing: ETHBTC, ETH-BTC...
	Symbol string

	Timestamp time.Time

	// The last, or closing price.
	LastPrice float64

	// Volume in the base pair. Usually 24h.
	QuoteVolume float64

	// The 24 hour price change as a percentage value.
	PriceChangePct24 float64

	Bid  float64
	Ask  float64
	High float64
	Low  float64
}

func CommonTickerFromBinanceTicker(ticker binance.Stream24Ticker) CommonTicker {
	common := CommonTicker{}
	common.Symbol = ticker.Symbol
	common.Timestamp = ticker.Timestamp()
	common.LastPrice = ticker.CurrentDayClose
	common.QuoteVolume = ticker.TotalQuoteVolume
	common.Bid = ticker.Bid
	common.Ask = ticker.Ask
	common.PriceChangePct24 = ticker.PriceChangePercent
	common.High = ticker.HighPrice
	common.Low = ticker.LowPrice
	return common
}
