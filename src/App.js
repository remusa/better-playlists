import React, { Component } from 'react';
import queryString from 'query-string';
import './App.css';

const defaultStyle = {
	color: '#fff'
};

// Client ID 1089f42587c347eaa03f200bbbb46ed2
// Client Secret af046b34b03c40ee99ab7cbafc72e939

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
				<img src={playlist.imageUrl} style={{ height: '60px' }} />

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
		let parsed = queryString.parse(window.location.search);
		let accessToken = parsed.access_token;

		if (!accessToken) {
			return;
		}

		fetch('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		})
			.then(response => response.json())
			.then(data =>
				this.setState({
					user: { name: data.display_name }
				})
			);

		fetch('https://api.spotify.com/v1/me/playlists', {
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		})
			.then(response => response.json())
			.then(data =>
				this.setState({
					playlists: data.items.map(item => {
						console.log(data);
						return {
							name: item.name,
							imageUrl: item.images[0].url,
							songs: []
						};
					})
				})
			);
	}

	render() {
		let playlistToRender =
			this.state.user && this.state.playlists
				? this.state.playlists.filter(playlist =>
						playlist.name
							.toLowerCase()
							.includes(this.state.filterString.toLowerCase())
				  )
				: [];
		return (
			<div className="App">
				{this.state.user ? (
					<div>
						<h1 style={{ ...defaultStyle, 'font-size': '54px' }}>
							{this.state.user.name}'s Playlists
						</h1>
						<div>
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
						)
					</div>
				) : (
					<button
						onClick={() => {
							window.location = window.location.href.includes(
								'localhost'
							)
								? 'http://localhost:8888/login'
								: 'https://better-playlists-backend.herokuapp.com/login';
						}}
						style={{
							padding: '28px',
							'font-size': '50px',
							marginTop: '20px'
						}}
					>
						Sign in with Spotify
					</button>
				)}
			</div>
		);
	}
}

export default App;
