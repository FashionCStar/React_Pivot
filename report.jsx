var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'},
  {value: function(row) {
      return row.type
    }, title: 'Type'}
]

var reduce = function(row, memo) {
  if (row.type == "impression") {
    memo.impressions = (memo.impressions || 0) + 1
  }else if (row.type == "load") {
    memo.loads = (memo.loads || 0) + 1
  }else if (row.type == "display") {
    memo.displays = (memo.displays || 0) + 1
  }
  return memo
}

var calculations = [
  {
    title: 'Impressions',
    value: 'impressions'
  },
  {
    title: 'Loads',
    value: 'loads'
  },
  {
    title: 'Displays',
    value: 'displays'
  },
  {
    title: 'Load Rate',
    value: function(row) {
      return row.loads * 100 / row.impressions
    },
    template: function(val, row) {
      return val.toFixed(1) + '%'
    },
  },
  {
    title: 'Display Rate',
    value: function(row) {
      return row.displays * 100 / row.loads
    },
    template: function(val, row) {
      return val.toFixed(1) + '%'
    },
  }
]

let react_pivot = <ReactPivot rows={rows}
                              dimensions={dimensions}
                              reduce={reduce}
                              calculations={calculations}
                              activeDimensions={['Date']}
                              defaultStyles={false}/>

module.exports = createReactClass({
  render () {
    return react_pivot
  }
})