import React from 'react';
import { Row, Col, BackTop} from 'antd';
import MobileHeader from './mobile_Header';
import MobileFooter from './mobile_Footer';
import CommonComments from './common_comments'

export default class MobileNewsDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			newsItem: ''
		}
	}

	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOptions)
			.then(res=>res.json())
			.then(JSON=> {
				this.setState({newsItem: JSON});
				document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台"
			});
	}

	createMarkup() {
		return {__html: this.state.newsItem.pagecontent};
	}

	render() {
		const detailStyle = {
			marginTop: '20px'
		};
		const plStyle = {
			margin:'10px 0 10px 10px',
			borderLeft:'2px solid #2db7f5',
			paddingLeft:'10px'
		};
		const BackTopStyle = {
			right:'20px',
			bottom:'20px'
		};
		const articlePadding = {
			padding:'0 10px'
		};
		const CommentsStyle = {
			padding:'0 10px'
		};
		return (
			<div id="mobileDetailsContainer">
				<MobileHeader/>
				<div className="ucMobileList">
					<Row style={detailStyle}>
						<Col span={24} className="container">
							<div style={articlePadding} className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
							<h3 style={plStyle}>评论列表</h3>
							<CommonComments style={CommentsStyle} uniquekey={this.props.match.params.uniquekey}/>
						</Col>
					</Row>
				</div>
				<MobileFooter/>
				<BackTop style={BackTopStyle}/>
			</div>
		);
	}
}