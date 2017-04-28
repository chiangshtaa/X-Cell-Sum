class TableModel {
  constructor(numCols=10, numRows=20) {
    this.numCols = numCols;
    this.numRows = numRows;
    this.data = {};
  }

  _getCellId(location) {
    return `${location.col}:${location.row}`;
  }

  getValue(location) {
    return this.data[this._getCellId(location)];
  }

  setValue(location, value) {
    this.data[this._getCellId(location)] = value;
  }

  getColumnNumbers(column) {
    const colNumbers = [];
    for (let row = 0; row < this.numRows; row++) {
      const position = { col: column, row: row };
      if (this.getValue(position) !== undefined) {
        colNumbers.push(this.getValue(position));
      }
    }
    return colNumbers;
  }
}

module.exports = TableModel;