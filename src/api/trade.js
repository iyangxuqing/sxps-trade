import axios from 'axios'
import config from './config'
import { formatDate } from '@/common/js/date'

const apiUrl = config.apiHost + 'seller/_trade.php'

export function getTrades(options) {
	return new Promise(function(resolve, reject) {
		axios.get(apiUrl + '?m=get', {
			params : options
		}).then((res) => {
			if(res.data.errno === 0) {
				let trades = res.data.trades
				for (let i in trades) {
					trades[i].time = formatDate(trades[i].created, 'yyyy-MM-dd hh:mm:ss')
				}
				resolve(trades)
			}
		})
	})
}

