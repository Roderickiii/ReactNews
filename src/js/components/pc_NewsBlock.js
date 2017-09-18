import React from 'react';
import {Card} from 'antd';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

export default class PCNewsBlock extends React.Component {
	constructor() {
		super();
		this.state = {
			news: ''
		}
	}

	componentWillMount() {
		var myFetchOptions = {
			method: "GET"
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions)
			.then(res=>res.json())
			.then(JSON=>this.setState({news: JSON}))
	}

	render() {
		const {news} = this.state;
		const newsList = news.length
			?
			news.map((newsItem,index)=>(
				<li key={index}>
					<Link to={`details/${newsItem.uniquekey}`} target="_blank">
						{newsItem.title}
					</Link>
				</li>
			))
			:
			'没有加载到任何新闻';
		return (
			<div className="topNewsList" style={{marginTop:this.props.marginTop}}>
				<Card>
					<Router>
						<ul>
							{newsList}
						</ul>
					</Router>
				</Card>
			</div>
		);
	}
}