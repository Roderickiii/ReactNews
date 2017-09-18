import React from 'react';
import { Row, Col,Form,Input,Button,Card,notification ,message ,Modal} from 'antd';
const FormItem = Form.Item;


class CommonComments extends React.Component {
	constructor() {
		super();
		this.state = {
			comments: ''
		}
	}

	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions)
			.then(res=>res.json())
			.then(JSON=> {
				this.setState({comments: JSON});
			});
	}

	commentWarning() {
		message.warning('您输入的内容为空，请重新输入');
	};

	handleSubmit(e) {
		e.preventDefault();
		var formdata = this.props.form.getFieldsValue();
		if(localStorage.userId == undefined || localStorage.userId == ''){
			Modal.info({
				title: '提示',
				content: (
					<div>
						<p>请登录后再评论！</p>
					</div>
				),
				onOk() {}
			});
		}
		else if (formdata.remark == undefined || formdata.remark == '') {
			this.commentWarning();
		} else {
			var myFetchOptions = {
				method: 'GET'
			};
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions)
				.then(res=>res.json())
				.then(json=> {
					this.componentDidMount();
				});
			this.props.form.resetFields()
		}
	}

	addUserCollection() {
		var myFetchOption = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey, myFetchOption)
			.then(res=>res.json())
			.then(JSON=> {
				//收藏成功后的全局提醒
				notification['success']({message: 'ReactNews提醒', description: '收藏成功'})
			})
	}

	render() {
		let { getFieldDecorator } = this.props.form;
		const {comments} = this.state;
		const commentList = comments.length > 0
			?
			comments.map((comment, index)=>(
				<Card key={index} title={comment.UserName} extra={<a href="#">发表于{comment.datetime}</a>}>
					<p>{comment.Comments}</p>
				</Card>
			)).reverse()
			:
			'没有加载到任何评论';

		return (
			<div className="comment">
				<Row>
					<Col span={24}>
						<Form onSubmit={this.handleSubmit.bind(this)}>
							<FormItem>
								{getFieldDecorator('remark', {initialValue: ''})(<Input type="textarea"
								                                                        placeholder="请输入您的评论..."/>)}
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>&nbsp;&nbsp;
							<Button type="primary" htmlType="button"
							        onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
						</Form>
						<hr/>
						{commentList}
					</Col>
				</Row>
			</div>
		);
	}
}

export default CommonComments = Form.create({})(CommonComments);