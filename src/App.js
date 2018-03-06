import React, { Component } from 'react';
import './App.css';

const defaultStyle = {
	color: '#fff'
};

const fakeServerData = {
	user: {
		name: 'René',
		playlists: [
			{
				name: 'My favorites',
				songs: [
					{
						name: 'Beat It',
						duration: 1312
					},
					{
						name: 'Cannelons',
						duration: 1321
					},
					{
						name: 'Rosa Helicopter',
						duration: 5435
					}
				]
			},
			{
				name: 'Discover Weekly',
				songs: [
					{
						name: 'Beat It',
						duration: 5346
					},
					{
						name: 'Cannelons',
						duration: 7657
					},
					{
						name: 'Rosa Helicopter',
						duration: 32432
					}
				]
			},
			{
				name: 'The best',
				songs: [
					{
						name: 'Beat It',
						duration: 4367
					},
					{
						name: 'Cannelons',
						duration: 4326
					},
					{
						name: 'Rosa Helicopter',
						duration: 7687
					}
				]
			},
			{
				name: 'Trending',
				songs: [
					{
						name: 'Beat It',
						duration: 3
					},
					{
						name: 'Cannelons',
						duration: 2
					},
					{
						name: 'Rosa Helicopter',
						duration: 9
					}
				]
			}
		]
	}
};

class PlaylistCounter extends Component {
	render() {
		return (
			<div
				style={{
					...defaultStyle,
					width: '40%',
					display: 'inline-block'
				}}
			>
				<h2>{this.props.playlists.length} playlists</h2>
			</div>
		);
	}
}

class HoursCounter extends Component {
	render() {
		let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
			return songs.concat(eachPlaylist.songs);
		}, []);

		let totalDuration = Math.round(
			allSongs.reduce((sum, eachSong) => {
				return sum + eachSong.duration;
			}, 0) / 3600
		);

		return (
			<div
				style={{
					...defaultStyle,
					width: '40%',
					display: 'inline-block'
				}}
			>
				<h2>{totalDuration} hours</h2>
			</div>
		);
	}
}

class Filter extends Component {
	render() {
		return (
			<div style={defaultStyle}>
				<img />
				<input
					type="text"
					onKeyUp={event =>
						this.props.onTextChange(event.target.value)
					}
				/>
			</div>
		);
	}
}

class Playlist extends Component {
	render() {
		const { playlist } = this.props;

		return (
			<div
				style={{
					...defaultStyle,
					display: 'inline-block',
					width: '25%'
				}}
			>
				<img />

				<h3>{playlist.name}</h3>

				<ul>{playlist.songs.map(song => <li>{song.name}</li>)}</ul>
			</div>
		);
	}
}

class App extends Component {
	constructor() {
		super();

		this.state = {
			serverData: {},
			filterString: ''
		};
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ serverData: fakeServerData });
		}, 1000);
		setTimeout(() => {
			this.setState({ filterString: 'weekly' });
		}, 2000);
	}

	render() {
		let playlistToRender = this.state.serverData.user
			? this.state.serverData.user.playlists.filter(playlist =>
					playlist.name
						.toLowerCase()
						.includes(this.state.filterString.toLowerCase())
			  )
			: [];
		return (
			<div className="App">
				{this.state.serverData.user ? (
					<div>
						<h1 style={{ ...defaultStyle, 'font-size': '54px' }}>
							{this.state.serverData.user.name}'s Playlists
						</h1>

						<PlaylistCounter playlists={playlistToRender} />

						<HoursCounter playlists={playlistToRender} />

						<Filter
							onTextChange={text => {
								this.setState({ filterString: text });
							}}
						/>

						{playlistToRender.map(playlist => (
							<Playlist playlist={playlist} />
						))}
					</div>
				) : (
					<h1 style={defaultStyle}>Loading...</h1>
				)}
			</div>
		);
	}
}

export default App;
