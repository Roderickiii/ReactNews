import React from 'react';
import { Row, Col, Menu, Icon,Tabs,message,Form,Input,Button,Checkbox,Modal } from 'antd';
import {Link} from 'react-router-dom';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class PCHeader extends React.Component {
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
			this.setState({userNickName: localStorage.userNickName, userId: localStorage.userId})
		}
	}

	setModalVisible(value) {
		this.setState({modalVisible: value})
	}

	handleClick(e) {
		this.setState({current: e.key})
	};

	login() {
		if (this.state.hasLogined) {
			this.setModalVisible(false);
		} else {
			this.setModalVisible(true);
		}
	}

	handleSubmit(e) {
		//页面开始向 API 进行提交数据
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&username=" + formData.userName + "&password=" + formData.password + "&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
			.then(res=>res.json()).then(JSON=> {
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

	callback(key) {
		if (key == 1) {
			this.setState({action: 'login'})
		} else if (key == 2) {
			this.setState({action: 'register'})
		}
	}

	logout() {
		localStorage.userId = '';
		localStorage.userNickName = '';
		this.setState({hasLogined: false});
		message.success("已退出!");
	}

	render() {
		let { getFieldDecorator } = this.props.form;
		const userShow = this.state.hasLogined
			?
			<div className="register">
				<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
				&nbsp;&nbsp;
				<Link target="_blank" to={`/usercenter`}>
					<Button type="dashed" htmlType="button">个人中心</Button>
				</Link>
				&nbsp;&nbsp;
				<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>
			</div>
			:
			<div className="register">
				<Icon type="user"/>注册/登录
			</div>;

		return (
			<header>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" className="logo">
							<img src="/src/image/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={11}>
						<Menu mode="horizontal" selectedKeys={[this.state.current]}
						      onClick={this.handleClick.bind(this)}>
							<Menu.Item key="top">
								<a href="/"><Icon type="appstore"/>首页</a>
							</Menu.Item>
							<Menu.Item key="yule">
								<a href="/"><Icon type="appstore"/>社会</a>
							</Menu.Item>
							<Menu.Item key="guoji">
								<a href="/"><Icon type="appstore"/>国内</a>
							</Menu.Item>
							<Menu.Item key="shehui">
								<a href="/"><Icon type="appstore"/>国际</a>
							</Menu.Item>
							<Menu.Item key="guonei">
								<a href="/"><Icon type="appstore"/>娱乐</a>
							</Menu.Item>
							<Menu.Item key="tiyu">
								<a href="/"><Icon type="appstore"/>体育</a>
							</Menu.Item>
							<Menu.Item key="shishang">
								<a href="/"><Icon type="appstore"/>科技</a>
							</Menu.Item>
						</Menu>
						<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
						       onOk={()=>this.setModalVisible(false)} onCancel={()=>this.setModalVisible(false)}
						       okText="关闭">
							<Tabs type="card" onChange={this.callback.bind(this)}>
								<TabPane tab="登录" key="1">
									<Form onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{getFieldDecorator('userName')(<Input placeholder="请输入您的账号"/>)}
										</FormItem>
										<FormItem label="密码">
											{getFieldDecorator('password')(<Input type="password"
											                                      placeholder="请输入您的密码"/>)}
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
											{getFieldDecorator('r_password')(<Input type="password"
											                                        placeholder="请输入您的密码"/>)}
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
					</Col>
					<Col span={5}>
						<div id="register" onClick={this.login.bind(this)}>
							{userShow}
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</header>
		)
	}
}

export default PCHeader = Form.create({})(PCHeader);
