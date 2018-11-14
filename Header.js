import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NumberFormat from 'react-number-format';
const metalogo = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/2000px-Metacritic.svg.png";
 
class Card extends Component {

	render() {
		var genres = this.props.data.genres;
		var genreList = Object.keys(genres).map(function(keyName, keyIndex) {
			return <div>{genres[keyName].description}</div>
		});
		return (
		<div className="col-xs-12 cardcont nopadding">
			<div className="meta-data-container col-xs-12 col-md-8 push-md-4 col-lg-7 push-lg-5">
				<div className="poster-container poster col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7">
					<a href={this.props.data.website}><img className="poster" alt="game website" src={this.props.data.gameImage}/></a>	
				</div>	
				<h1 className="nopadding col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7">{this.props.data.actualName}</h1>
				<span className="price col-xs-12 col-md-4 pull-md-8 col-lg-5 pull-lg-7">
					{this.props.data.cost !== "Free To Play" &&
						<h2>
							<NumberFormat value={this.props.data.cost/100} displayType={'text'} decimalPrecision={2} decimalSeparator={true} prefix={'$'} />
						</h2>
					}
					{this.props.data.cost === "Free To Play" &&
						<h2>{this.props.data.cost} </h2>
					}
				</span>
				<div className="additional-details col-xs-12 col-md-4 pull-md-8 col-lg-10 pull-lg-7">
					<span dangerouslySetInnerHTML={{__html: this.props.data.description}} />	
				</div>
				<div className="additional-details">
					<div className="row nopadding release-details">
						<div className="col-xs-6">Genres: <span className="meta-data">{genreList}</span></div>
						<div className="col-xs-6">Release Date: <span className="meta-data">{this.props.data.release.date}</span></div>
						<div className="col-xs-6">Metacritic Score: <span className="meta-data">{this.props.data.metacritic.score}     
							<a href={this.props.data.metacritic.url}><img alt="metacritic review" className="metacriticimg" src={metalogo}/></a></span>
						</div>	
					</div>
				</div>
			</div>
		</div>
		)
	}
}

export default Card;