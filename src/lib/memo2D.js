export default class Memo2D {
  store = new Map();

  checkIfIn = (pos, value) => this.store.get(pos) && this.store.get(pos).get(value)

  setVal = (row, column, value) => {
    if (this.store.get(row)) {
      if (value && this.store.get(row.get(column))) {
        return false;
      }

      this.store.get(row).set(column, value);
      return true;
    }

    this.store.set(row, new Map([[column, value]]));
    return true;
  };
}
