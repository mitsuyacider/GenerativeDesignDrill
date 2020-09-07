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
