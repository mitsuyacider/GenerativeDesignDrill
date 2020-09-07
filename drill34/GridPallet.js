import Grid from './Grid.js'
import LineGrid from './LineGrid.js'
const pallet = [
	new Grid(),
	new LineGrid(),
]

export default class GridPallet {

	static getRandom(x, y, w, h) {
		const index = Math.floor(random(0, pallet.length))
		const grid = pallet[index]

		grid.x = x
		grid.y = y
		grid.w = w 
		grid.h = h

		return grid
	}

	static get(index = 0) {
		if (index >= pallet.length) index = 0
		const grid = pallet[index]

		grid.x = x
		grid.y = y
		grid.w = w 
		grid.h = h

		return grid
	}

	static totalGridModules() {
		return pallet.length
	}
}
