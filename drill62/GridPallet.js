import BaseGrid from "./BaseGrid.js";
import Grid000 from "./Grid000.js";
import Grid001 from "./Grid000.js";
import Grid002 from "./Grid000.js";

const pallet = [new BaseGrid(), new Grid000(), new Grid002()];

export default class GridPallet {
  static getRandom(x, y, w, h) {
    const index = Math.floor(random(0, pallet.length));
    const grid = pallet[index];

    grid.x = x;
    grid.y = y;
    grid.w = w;
    grid.h = h;

    return grid;
  }

  static get(index = 0) {
    if (index >= pallet.length) index = 0;
    const grid = pallet[index];

    grid.x = x;
    grid.y = y;
    grid.w = w;
    grid.h = h;

    return grid;
  }

  static totalGridModules() {
    return pallet.length;
  }
}
