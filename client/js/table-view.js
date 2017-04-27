const { getLetterRange } = require('./array-util');
const { removeChildren, createTH } = require('./dom-util');

class TableView {
	constructor(model) {
		this.model = model;
	}

  init() {
    this.initDomReferences();
    this.renderTable();
  }

  initDomReferences() {
    this.headerRowEl = document.querySelector('THEAD TR');
  }

  renderTable() {
    this.renderTableHeader();
  }

  renderTableHeader() {
    removeChildren(this.headerRowEl);
    // get letters and build elements
    getLetterRange('A', this.model.numCols)
      .map(collabel => createTH(collabel))
      .forEach(th => this.headerRowEl.appendChild(th));
  }
}

module.exports = TableView;