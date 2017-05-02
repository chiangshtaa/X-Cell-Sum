const TableModel = require('../table-model');

describe('table-model', () => {

  it('can set then get a value', () => {
    // set up the initial state
    const model = new TableModel();
    const location = { row: 3, col: 5 };

    // inspect the initial state
    expect(model.getValue(location)).toBeUndefined();

    // execute code under test
    model.setValue(location, 'foo');

    // inspect the resulting state
    expect(model.getValue(location)).toBe('foo');
  });

  it('can get all numbers in column', () => {
    // set up initial state
    const model = new TableModel(5, 5);
    model.setValue( {col: 0, row: 0 }, '1');
    model.setValue( {col: 0, row: 1 }, '2');
    model.setValue( {col: 0, row: 2 }, '3');
    model.setValue( {col: 0, row: 3 }, '4');

    // inspect resulting state
    expect(model.getColumnNumbers(0)).toEqual(['1', '2', '3', '4']);
  });

});