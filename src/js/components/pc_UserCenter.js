import React from 'react';
import {Row,Col,Tabs,Upload,Icon,Modal,Card} from 'antd';
import PCHeader from './pc_Header';
import PCFooter from './pc_Footer';
const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component {
	constructor() {
		super();
		this.state = {
			previewImage: '',
			previewVisible: false,
			fileList: [{
				uid: -1,
				name: 'xxx.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
			}],
			usercollection: '',
			usercomments:''
		}
	}

	handleCancel() {
		this.setState({previewVisible: false})
	};

	handlePreview(file) {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true
		});
	};

	handleChange({ fileList }) {
		this.setState({fileList});
	}

	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId, myFetchOptions)
			.then(res=>res.json())
			.then(JSON=> {
				this.setState({usercollection: JSON});
				document.title = "个人中心 - React News | React 驱动的新闻平台"
			});

		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId, myFetchOptions)
			.then(res=>res.json())
			.then(JSON=> {
				this.setState({usercomments: JSON});
			})
	}

	render() {
		const { previewVisible, previewImage, fileList } = this.state;
		const uploadButton = (
			<div>
				<Icon type="plus"/>
				<div className="ant-upload-text">上传照片</div>
			</div>
		);
		const props = {
			header: {
				"Access-Control-Allow-Origin": "*" //跨域访问
			},
			action: "//jsonplaceholder.typicode.com/posts/",
			listType: "picture-card"
		};

		const {usercollection,usercomments} = this.state;
		const usercollectionList = usercollection.length
			?
			usercollection.map((uc, index)=>(
				<Card className="collectionCard" key={index} title={uc.uniquekey}
				      extra={<a href={`/details/${uc.uniquekey}`} target="_blank">查看</a>}>
					<p>{uc.Title}</p>
				</Card>
			)).reverse()
			:
			"您还没有收藏任何新闻，快去收藏吧。";

		const usercommentsList = usercomments.length
			?
			usercomments.map((comment, index)=>(
				<Card className="commentsCard" key={index} title={`${comment.datetime} 评论了文章 ${comment.uniquekey}`}
				      extra={<a href={`/details/${comment.uniquekey}`} target="_blank">查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
			)).reverse()
			:
			"您还没有发表过任何评论。";
		return (
			<div>
				<PCHeader/>
				<Row>
					<Col span={2}></Col>
					<Col span={20}>
						<Tabs>
							<TabPane tab="我的收藏" key="1">
								<div className="comment">
									<Row>
										<Col span={24}>
											{usercollectionList}
										</Col>
									</Row>
								</div>
							</TabPane>
							<TabPane tab="我的评论" key="2">
								<div className="comment">
									<Row>
										<Col span={24}>
											{usercommentsList}
										</Col>
									</Row>
								</div>
							</TabPane>
							<TabPane tab="头像设置" key="3">
								<div className="clr">
									<Upload {...props} fileList={fileList} onPreview={this.handlePreview.bind(this)}
									                   onChange={this.handleChange.bind(this)}>
										{fileList.length >= 1 ? null : uploadButton}
									</Upload>
									<Modal visible={previewVisible} footer={null}
									       onCancel={this.handleCancel.bind(this)}>
										<img alt="预览" style={{ width: '100%' }} src={previewImage}/>
									</Modal>
								</div>
							</TabPane>
						</Tabs></Col>
					<Col span={2}></Col>
				</Row>
				<PCFooter/>
			</div>
		);
	}
}