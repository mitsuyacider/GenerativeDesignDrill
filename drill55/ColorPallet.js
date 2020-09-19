export default class ColorPallet {
  static getPalletList() {
    return [
      ["#C39043", "#C13A36", "#946F29"],
      ["#FBDBD4", "#919287", "#BDCBD2", "#D0C7A4", "#383940"],
      ["#0060A3", "#958D35", "#EC954D", "#333f69", "#7e9a6c"],
      ["#C79653", "#000000", "##CE4C48", "#C79653"],
      ["#27120a", "#f0eb45", "#727172", "#333f69", "#7e9a6c"],
      ["#917347", "#9e3b36", "#231815"],
      ["#bc848a", "#548c9a", "#595757"],
      ["#BB551f", "#f19069", "#aab559", "#dfb735", "#8f79b6"],
      ["#e8380d", "#f7f3e9", "#75a34c", "#2f2725", "#ffdf4f", "#f0c2a2"],
      ["#cf7369", "#7a3246", "#e9dcd5", "#b65a20", "f6ecc0"],
      ["#5f8f67", "#cf7369", "#154a52", "#b39354", "#6c8f7e"],
      ["#b01e2d", "#efbe00", "#3fa152", "#eee67e", "#eb9746"],
      ["#6b8c9c", "#b01e2d", "#231815", "#9fa0a0", "#dcddd"],
      ["#339599", "#ad1f1e", "#955e29", "#0e1b3e", "#c9bdaf"],
    ];
  }

  static getRandom() {
    const list = this.getPalletList();
    const index = Math.floor(random(0, list.length));
    const pallet = list[index];

    return random(pallet);
  }

  static getPallet() {
    const list = this.getPalletList();
    const index = Math.floor(random(0, list.length));
    const pallet = list[index];

    return pallet;
  }
}
