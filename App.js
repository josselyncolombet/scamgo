import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Card from './Header';
import'promise.prototype.finally';
const SteamLogo = 'http://store.akamai.steamstatic.com/public/shared/images/responsive/header_logo.png';


class App extends Component {
	constructor(props) {
		super(props);
		this.gameList = "";
		this.state = {
			idURL: "https://crossorigin.me/http://api.steampowered.com/ISteamApps/GetAppList/v0001/",
			gameName: "",
			cost: "",
			description: "",
			gameList: "",
			gameImage: "",
			appid: "400", //Portal intial game
			actualName: "",
			website: "",
			genres: "",
			metacritic: "", 
			release: "",
			gameData: ""
		}
		
		axios(this.state.idURL)
		.then((response) => {
			this.setState({
				gameList: response.data.applist.apps.app
			});
			
		})
		.catch((error) => {
			console.log(error);
		});

		this.handleInput = this.handleInput.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getNewGame = this.getNewGame.bind(this);
		this.setData = this.setData.bind(this);
		this.handleKey = this.handleKey.bind(this);
		this.getNewGame();
	}
	handleInput(e) {
		this.setState({
			gameName: e.target.value
		});
		
	}
	
	handleClick() {
		for (var key in this.state.gameList) {
			var gameObject = this.state.gameList[key];
			if (gameObject.name.toUpperCase() === this.state.gameName.toUpperCase()) {
				this.setState({
					appid: gameObject.appid
				}, () => {
					console.log(this.state.appid);
					this.getNewGame()
				});
			}
		}
		return;
	} 
	
	setData() {
		this.setState({
			description: 	this.state.gameData.data.about_the_game,
			gameImage: 		this.state.gameData.data.header_image,
			actualName: 	this.state.gameData.data.name,
			website:		this.state.gameData.data.website,
			genres:			this.state.gameData.data.genres,
			metacritic:		this.state.gameData.data.metacritic,
			release:		this.state.gameData.data.release_date
		});
		if (this.state.gameData.data.is_free) {
			this.setState({
				cost: "Free To Play"
			});
		} else {
			this.setState({
				cost: this.state.gameData.data.price_overview.final
			});
		}
		return;
	}
	
	getNewGame() {
		var gameURL = "https://crossorigin.me/http://store.steampowered.com/api/appdetails?appids=" + this.state.appid;
		axios.get(gameURL)
		.then((response) => {
			this.setState({
				gameData: response.data[this.state.appid]
			});
			this.setData();
		})
		.catch((error) => {
			
		});
	return;
	}
	
	handleKey(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.handleClick();
		}
	}
	

  render() {
    return (
      <div className="outer-container">
	  <div className="col-xs-12 search-container nopadding">
        <div className="row">

          <div className="col-xs-12 col-sm-6 col-lg-5">
            <a href="./" title="Steam Game Search"><img src={SteamLogo} className="logo" alt="Steam Database" /></a>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-7">
            <form className="searchbox">
              <label>
                <input ref="search suggestion" onChange={this.handleInput} onKeyPress={this.handleKey} className="searchbox__input form-control" type="text" placeholder="Search Game Title..."  />
              </label>
              </form>
          </div>
        </div>
      </div>

		<button>
		</button>
		<Card data={this.state}/>
      </div>
    );
  }
}

export default App;
