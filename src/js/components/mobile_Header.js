import React from 'react';
import { Row, Col, Icon,Tabs,message,Form,Input,Button,Modal } from 'antd';
import {Link} from 'react-router-dom';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class MobileHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userId: 0
		}
	}

	componentWillMount() {
		if (localStorage.userId != '') {
			this.setState({hasLogined: true});
			this.setState({userNickName: localStorage.userNickName, userId: localStorage.userId});
		} else if (localStorage.userId == undefined) {
			this.setState({hasLogined: false})
		}
	}

	setModalVisible(value) {
		this.setState({modalVisible: value})
	}

	handleClick(e) {
		if (e.key = "register") {
			this.setState({current: 'register'});
			this.setModalVisible(true);
		} else {
			this.setState({current: e.key})
		}
	};

	handleSubmit(e) {
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
			.then(response=>response.json()).then(JSON=> {
			this.setState({userNickName: JSON.NickUserName, userId: JSON.UserId});
			localStorage.userId = JSON.UserId;
			localStorage.userNickName = JSON.NickUserName;
		});
		if (this.state.action == 'login') {
			this.setState({hasLogined: true});
			message.success("登录成功!");
		} else if (this.state.action == 'register') {
			message.success("注册成功!");
		}
		this.setModalVisible(false);
	};

	login() {
		this.setModalVisible(true);
	};

	logout() {
		localStorage.userId = '';
		localStorage.userNickName = '';
		this.setState({hasLogined: false});
		message.success("已退出!");
	}

	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'})
		} else if (key == 2) {
			this.setState({action: 'register'})
		}
	}

	render() {
		let { getFieldDecorator } = this.props.form;
		const userShow = this.state.hasLogined ?
			<span>
				<Icon type="inbox" onClick={this.logout.bind(this)}/>
				<Link to={`/usercenter`}>
					<Icon type="user"/>
				</Link>
			</span>
			:
			<Icon type="setting" onClick={this.login.bind(this)}/>;
		return (
			<div id="mobileHeader">
				<header>
					<a href="/">
						<img src="/src/image/logo.png" alt="png"/>
						<span>ReactNews</span>
					</a>
					{userShow}
				</header>
				<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
				       onOk={()=>this.setModalVisible(false)} onCancel={()=>this.setModalVisible(false)} okText="关闭">
					<Tabs type="card" onChange={this.callback.bind(this)}>
						<TabPane tab="登录" key="1">
							<Form onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									{getFieldDecorator('userName')(<Input placeholder="请输入您的账号"/>)}
								</FormItem>
								<FormItem label="密码">
									{getFieldDecorator('password')(<Input type="password" placeholder="请输入您的密码"/>)}
								</FormItem>
								<Button type="primary" htmlType="submit">登录</Button>
							</Form>
						</TabPane>

						<TabPane tab="注册" key="2">
							<Form onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="账户">
									{getFieldDecorator('r_userName')(<Input placeholder="请输入您的账号"/>)}
								</FormItem>
								<FormItem label="密码">
									{getFieldDecorator('r_password')(<Input type="password" placeholder="请输入您的密码"/>)}
								</FormItem>
								<FormItem label="确认密码">
									{getFieldDecorator('r_confirmPassword')(<Input type="password"
									                                               placeholder="请再次输入您的密码"/>)}
								</FormItem>
								<Button type="primary" htmlType="submit">注册</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>
			</div>
		)
	}
}

export default MobileHeader = Form.create({})(MobileHeader)