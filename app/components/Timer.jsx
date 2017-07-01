const React = require('react');
const Clock = require('Clock');
const Controls = require('Controls');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      countStatus: 'stopped'
    }
  },
componentDidUpdate: function (prevProps, prevState) {
  if (this.state.countStatus !== prevState.countStatus) {
    switch(this.state.countStatus) {
      case 'started':
        this.startTimer();
        break;
      case 'stopped':
        this.setState({count: 0});
      case 'paused':
        clearInterval(this.timer)
        this.timer = undefined;
        break;
    }
  }
},
handleStatusChange: function (newStatus) {
  this.setState({countStatus: newStatus})
},
componentWillUnmount: function () {
  clearInterval(this.timer);
},
startTimer: function () {
  this.timer = setInterval(() => {
    this.setState({count: this.state.count + 1});
  }, 1000);
},
  render: function () {
    var {count, countStatus} = this.state;
    return (
      <div>
        <h1 className="page-title">Timer</h1>
        <Clock totalSeconds={count}/>
        <Controls countdownStatus={countStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    )
  }
});

module.exports = Timer;
