import { P2P } from "./p2p";

class Global extends P2P {
  static instance: Global;
  constructor() {
    super();
    this.#init()
  }

  async #init() {
    super.init();
  }
  

  static getInstance() {
    if (!this.instance) {
      this.instance = new Global();
    }
    return this.instance;
  }
}

export default Global.getInstance();