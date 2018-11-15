import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import '../css/App.css';

var precision = 100;

var bgGreen = 'rgba(151, 231, 185, 1)';
var brdGreen = 'rgba(33, 145, 80, 1)';
var txtGreen = 'rgba(33, 145, 80, 1)';

var bgRed = 'rgba(255, 153, 153, 1)';
var brdRed = 'rgba(179, 0, 0, 1)';
var txtRed = 'rgba(179, 0, 0, 1)';

class Crash extends Component {
  constructor (props) {
    super(props);
    this.state = {
      crash: Math.floor(Math.random() * (3 * precision - 1 * precision) + 1 * precision) / (1*precision),
      counts: [1.00],
      value: 1.00,
      labels: [],
      bgColor: bgGreen,
      brdColor: brdGreen,
      txtColor: txtGreen,
      width: 5,
      balance: 500,
      thune: '',
      depose: false,
      crashed: false,
      started: false
    };
    this.thune = this.thune.bind(this);
    this.depot = this.depot.bind(this);
    this.cashOut = this.cashOut.bind(this);
  }
  componentDidMount() {
    this.start();
    document.title = 'Crash - ScamGo';
  }
  tick () {
    this.setState({
      counts: [...this.state.counts, this.state.counts[this.state.counts.length - 1] + 0.01],
      labels: [...this.state.labels, this.state.counts[this.state.counts.length - 1].toFixed(2)],
      value: this.state.counts[this.state.counts.length - 1].toFixed(2)
    });
    if(this.state.counts[this.state.counts.length - 1].toFixed(2) === this.state.crash.toFixed(2)) {
      this.stopTimer();
      this.restart();
    };
    document.title = this.state.value + 'x - ScamGo';
  }
  start() {
    clearInterval(this.timer);
    console.log('On attend 5 sec avant de commancer');
    setTimeout( () => {
      this.setState({
        crash: Math.floor(Math.random() * (3 * precision - 1 * precision) + 1 * precision) / (1*precision),
        counts: [1.00],
        value: 1.00,
        labels: [],
        bgColor: bgGreen,
        brdColor: brdGreen,
        txtColor: txtGreen,
        width: 5,
        crashed: false,
        started: true
      });
      this.timer = setInterval(this.tick.bind(this), 100);
      console.log(this.state);
      this.checkParie();
    }, 5000);
  }
  stopTimer () {
    clearInterval(this.timer);
    this.setState({
      bgColor: bgRed,
      brdColor: brdRed,
      txtColor: txtRed,
      value: "Crashed @ " + this.state.value,
      width: 15,
      crashed: true,
      started: true
    });
    console.log(this.state.value);
    if(this.state.depose === true) {
      console.log('Vous avez perdu : ' + this.state.thune);
    }
  }
  depot(e) {
    if(this.state.started === false) {
      if(this.state.balance >= this.state.thune) {
        e.preventDefault();
        this.setState({ depose: true, balance: this.state.balance - this.state.thune });
        console.log('Vous avez parié votre somme !');
      } else {
        console.log('Fond insuffisant !');
      }
    } else {
      console.log('Vous ne pouvez pas miser quand le crash est en cours !');
    }
  }
  cashOut(e) {
    if(this.state.started === true && this.state.thune !== '' && this.state.depose === true) {
      e.preventDefault();
      this.setState({ depose: false });
      console.log('Vous avez retirée votre somme avant le crash !');
      var gain = this.state.thune * this.state.counts[this.state.counts.length - 1].toFixed(2);
      this.setState({
        balance: this.state.balance + gain,
        thune: ''
      });
      console.log('Gain : ' + this.state.thune + ' x ' + this.state.counts[this.state.counts.length - 1].toFixed(2) + ' => ' + gain);
    } else {
      console.log('Vous ne pouvez pas retirer sans avoir miser');
    }
  }
  thune(e) {
    e.preventDefault();
    let value = e.target.value;
    this.setState({ thune: value });
  }
  checkParie() {
    console.log('Pari fermé !')
    if(this.state.started === true && this.state.thune !== '' && this.state.depose === true) {
      console.log('Votre somme a été pariée !');
    } else {
      console.log('Vous n\'avez rien parié !')
    }
  }
  restart() {
    setTimeout( () => {
      this.setState({
        counts: [1.00],
        value: 1.00,
        labels: [],
        bgColor: bgGreen,
        brdColor: brdGreen,
        txtColor: txtGreen,
        width: 5,
        depose: false,
        crashed: false,
        started: false,
      });
    }, 2000);    
    setTimeout( () => {
      this.setState({
        crash: Math.floor(Math.random() * (3 * precision - 1 * precision) + 1 * precision) / (1*precision),
        counts: [1.00],
        value: 1.00,
        labels: [],
        bgColor: bgGreen,
        brdColor: brdGreen,
        txtColor: txtGreen,
        width: 5,
        crashed: false,
        started: true
      });
      this.timer = setInterval(this.tick.bind(this), 100);
      console.log(this.state);
      this.checkParie();
    }, 5000);
  }
  render() {
    const options = {
      annotation: {
          annotations: [{
            borderDash: [2, 2],
            borderWidth: 2,
            mode: 'horizontal',
            type: 'line',
          }]
      },
      scales: {
        yAxes: [{ display : false }],
        xAxes: [{ display: false }]
      },
      elements: {
        point: { radius: 0 } 
      },
      layout: {
        padding: { left: 10, right: 10, top: 10, bottom: 10 }
      },
      interactions: {
        animationDuration: { duration: 1000 }
      },
      animations: {
        duration: { duration: 2000 },
        easing: { animation: 'linear' }
      },
      maintainAspectRation: true,
      legend: { display: false },
      tooltips: { enabled: false }
    };
    const data = {
        labels: [...this.state.labels],
        datasets: [{
            label: "Crash",
            data: [...this.state.counts],
            backgroundColor: [this.state.bgColor],
            borderColor: [this.state.brdColor],
            borderWidth: 5,
            drawBorder: false,
            offsetGridLines: true,
            beginAtZero: false,
            min: 1,
        }]
    };
    return (
      <div className="App-crash">
        <div className="Crash-Graph">
          <h2>Crash | {this.state.balance}</h2>
          <div className="Crash-counts" style={{color: this.state.txtColor, width: this.state.width + "%"}}>{this.state.value}x</div>
          <Line data={data} width={150} height={25} options={options} />
        </div>
        <div className="Crash-Depose">
          <input type="text" onChange={(e) => this.thune(e)} value={this.state.thune} placeholder="Your bet"/>
          <button onClick={this.depot} disabled={this.state.started}>Parier</button>
          <button onClick={this.cashOut} disabled={!this.state.started}>Retirer</button>
        </div>
      </div>
    );
  }
}

export default Crash;