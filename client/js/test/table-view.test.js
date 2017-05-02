const fs = require('fs');
const TableModel = require('../table-model');
const TableView = require('../table-view');

describe('table-view', () => {

  beforeEach(() => {
    // load HTML skeleton from disk and parse into the DOM
    const fixturePath = './client/js/test/fixtures/sheet-container.html';
    const html = fs.readFileSync(fixturePath, 'utf8');
    document.documentElement.innerHTML = html;
  });
  // jest provides the server-side DOM **

  describe('table footer', () => {
    it('has right size', () => {
      // set up initial state
      const numCols = 3;
      const numRows = 8;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();

      // inspect initial state
      let tfs = document.querySelectorAll('TFOOT TD');

      // inspect resulting state
      expect(tfs.length).toBe(numCols);
    });

    it('calculates sum of column', () => {
      // set up initial state
      const numCols = 3;
      const numRows = 8;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      model.setValue({ col: 0, row: 0 }, '6');
      model.setValue({ col: 0, row: 1 }, '4');
      view.init();

      // inspect initial state
      let tfs = document.querySelectorAll('TFOOT TD');

      // inspect resulting state
      expect(tfs[0].textContent).toBe('10');
    });

    it('calculates sum even if non-number value given', () => {
      // set up initial state
      const numCols = 3;
      const numRows = 8;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      model.setValue({ col: 0, row: 0 }, '9');
      model.setValue({ col: 0, row: 1 }, '11');
      model.setValue({ col: 0, row: 2 }, 'helloworld');
      model.setValue({ col: 0, row: 3 }, '8d');
      model.setValue({ col: 0, row: 4 }, 'four');
      view.init();

      // inspect initial state
      let tfs = document.querySelectorAll('TFOOT TD');

      // inspect resulting state
      expect(tfs[0].textContent).toBe('20');
    });
  });

  describe('add button', () => {
    it('adds row', () => {
      // set up the initial state
      const numCols = 3;
      const numRows = 8;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();

      // inspect the initial state
      let addRow = document.getElementById('add-row');

      // simulate user action
      addRow.click();
      const trs = document.querySelectorAll('TBODY TR');

      // inspect the resulting state
      expect(trs.length).toBe(numRows + 1);
    });

    it('adds column', () => {
      // set up the initial state
      const numCols = 3;
      const numRows = 8;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();

      // inspect the initial state
      let addColumn = document.getElementById('add-col');

      // simulate user action
      addColumn.click();
      let tds = document.querySelectorAll('TFOOT TD');

      // inspect the resulting state
      expect(tds.length).toBe(numCols + 1);
    });

  });
  describe('formula bar', () => {
    it('makes changes TO the value of the current cell', () => {
      // set up the initial state
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      view.init();

      // inspect the initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[0].cells[0];
      expect(td.textContent).toBe('');

      // simulate user action
      document.querySelector('#formula-bar').value = '65';
      view.handleFormulaBarChange();

      // inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      expect(trs[0].cells[0].textContent).toBe('65');
    });
    
    it('updates FROM the value of the current cell', () => {
      // set up the initial state
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      model.setValue({col: 2, row: 1}, '123');
      view.init();

      // inspect the initial state
      const formulaBarEl = document.querySelector('#formula-bar');
      expect(formulaBarEl.value).toBe('');

      // simulate user action
      const trs = document.querySelectorAll('TBODY TR');
      trs[1].cells[2].click();

      // inspect the resulting state
      expect(formulaBarEl.value).toBe('123');
    });
  });

  describe('table body', () => {
    it('highlights the current cell when clicked', () => {
      // set up the initial state
      const model = new TableModel(10, 5);
      const view = new TableView(model);
      view.init();

      // inspect the initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[2].cells[3];
      expect(td.className).toBe('');

      // simulate user action
      td.click();

      // inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      td = trs[2].cells[3];
      expect(td.className).not.toBe('');
    });

    it('has the right size', () => {
      // set up the initial state
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();

      // inspect the initial state
      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numCols);
    });

    it('fills in values from the model', () => {
      // set up the initial state
      const model = new TableModel(3, 3);
      const view = new TableView(model);
      model.setValue({col: 2, row: 1}, '123');
      view.init();

      // inspect the initial state
      const trs = document.querySelectorAll('TBODY TR');
      expect(trs[1].cells[2].textContent).toBe('123');
    });
  });

  describe('table header', () => {
    it('has valid column header labels', () => {
      // set up the initial state
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();

      // inspect the initial state
      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numCols);

      let labelTexts = Array.from(ths).map(el => el.textContent);
      expect(labelTexts).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
    });
  });


});