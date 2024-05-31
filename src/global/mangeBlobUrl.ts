class MangeBlobUrl {
  static instance: MangeBlobUrl;
  #url: string[];
  constructor() {
    this.#url = [];
  }

  createObjectURL(obj: Blob | MediaSource) {
    const url = URL.createObjectURL(obj);
    this.#url.push(url);
    return url;
  }

  revokeObjectURL(url: string) {
    URL.revokeObjectURL(url)
  }

  clearObjectUrl() {
    if (!this.#url.length) return;
    this.#url.forEach(url => this.revokeObjectURL(url));
    this.#url = [];
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MangeBlobUrl();
    }
    return this.instance;
  }
}

export default MangeBlobUrl.getInstance()