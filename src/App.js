import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
	color: '#fff'
};

let fakeServerData = {
	user: {
		name: 'René'
	}
};

class Aggregate extends Component {
	render() {
		return (
			<div
				style={{
					...defaultStyle,
					width: '40%',
					display: 'inline-block'
				}}
			>
				<h2>Number Text</h2>
			</div>
		);
	}
}

class Filter extends Component {
	render() {
		return (
			<div style={defaultStyle}>
				<img />
				<input type="text" />
			</div>
		);
	}
}

class Playlist extends Component {
	render() {
		return (
			<div
				style={{
					...defaultStyle,
					display: 'inline-block',
					width: '25%'
				}}
			>
				<img />
				<h3>Playlist Name</h3>
				<ul>
					<li>Song 1</li>
					<li>Song 2</li>
					<li>Song 3</li>
				</ul>
			</div>
		);
	}
}

class App extends Component {
	constructor() {
		super();

		this.state = { serverData: {} };
	}

	componentDidMount() {
		this.setState({ serverData: fakeServerData });
	}

	render() {
		return (
			<div className="App">
				<h1 style={{ ...defaultStyle, 'font-size': '54px' }}>
					{this.state.serverData.user &&
						this.state.serverData.user.name}'s Playlists
				</h1>
				<Aggregate />
				<Aggregate />
				<Filter />
				<Playlist />
				<Playlist />
				<Playlist />
				<Playlist />
			</div>
		);
	}
}

export default App;
