import React from 'react';
import { Row, Col, BackTop} from 'antd';
import PCHeader from './pc_Header';
import PCFooter from './pc_Footer';
import PCNewsImageBlock from './pc_NewsImageBlock';
import CommonComments from './common_comments'

export default class PCNewsDetails extends React.Component{
	constructor(){
		super();
		this.state = {
			newsItem : ''
		}
	}
	componentDidMount(){
		var myFetchOptions = {
			method:'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey,myFetchOptions)
		.then(res=>res.json())
		.then(JSON=>{
			this.setState({newsItem:JSON});
			document.title = this.state.newsItem.title + " - React News | React 驱动的新闻平台"
		});
	}
	createMarkup(){
		return{__html:this.state.newsItem.pagecontent};
	}
	render(){
		const detailStyle ={
			marginTop : '20px'
		};
		const plStyle = {
			margin:'20px 0',
			borderLeft:'4px solid #2db7f5',
			paddingLeft:'10px'
		};
		const BackTopStyle = {
			right:'20px'
		};
		const articlePadding = {
			padding:'0 40px'
		};
		return(
			<div>
				<PCHeader/>
				<Row style={detailStyle}>
					<Col span={2}></Col>
					<Col span={14} className="container">
						<div style={articlePadding} className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
						<h2 style={plStyle}>评论列表</h2>
						<CommonComments uniquekey={this.props.match.params.uniquekey}/>
					</Col>
					<Col span={6}>
						<PCNewsImageBlock count={40} width="358px" type="top" cardTitle="相关新闻" imageWidth="150px"/>
					</Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter/>
				<BackTop style={BackTopStyle} />
			</div>
		);
	}
}