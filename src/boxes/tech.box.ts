import * as blessed from 'blessed';

let box = blessed.box({
  name: 'tech',
  top: '75%',
  left: '0',
  width: '50%',
  height: '25%',
  label: 'Tech',
  border: {
    type: 'line'
  },
  style: {
    fg: '#fff',
    border: {
      fg: '#555'
    },
    focus: {border: {fg: '#f00'}},
  }
});

export default box;