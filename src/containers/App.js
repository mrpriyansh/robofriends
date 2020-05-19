import React, {Component} from 'react' 

import CardList from '../components/CardList.js'
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundary.js';
import './App.css' ;



class App extends Component{
	constructor(){
		super();
		this.state={
			robots: [],
			searchfield:''
		}
		console.log('1');
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=>response.json())
			.then(users=>this.setState({robots:users}));
			console.log(this.state.robots);
	}



	onsearch=(event)=>{
		this.setState({searchfield:event.target.value})
		console.log(event.target.value);
	}

	render(){

		const {robots,searchfield}=this.state;

		console.log('3');
		if(robots.length===0){
			return <h1>Loading</h1>
		}
		else{
			const filteredRobots=robots.filter(robot =>{
				return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})

			return (
				<div className='tc'>
				<h1> Robofriends</h1>
				<SearchBox searchChange={this.onsearch}/>
				<Scroll>
					<ErrorBoundry>
					<CardList robots={filteredRobots} />
					</ErrorBoundry> 
				</Scroll>
				</div> 

			);
		}
	}
}


export default App;
