export default class Memo2D {
  store = new Map()
  
  checkIfIn = (pos, value) => this.store.get(pos)
  && this.store.get(pos).get(value)

  setVal = (row, column, value) => {
    // Check if row is set
    if (this.store.get(row)) {
      // Check if true is already set and trying to set true
      if (value && this.store.get(row).get(column)) {
        return false;
      }

      this.store.get(row).set(column, value);
      return true;
    }

    // When row not set
    this.store.set(row, new Map([[column, value]]));
    return true;
  }
}