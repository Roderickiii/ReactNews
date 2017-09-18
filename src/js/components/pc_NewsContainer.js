import React from 'react';
import { Row, Col, Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_NewsBlock';
import PCNewsImageBlock from './pc_NewsImageBlock';
import PCProduct from './pc_Product';
const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};
		return (

			<div>
				<Row>
					<Col span={2}></Col>
					<Col span={20} className="container">
						<div className="leftContainer">
							<div className="carousel">
								<Carousel {...settings}>
									<div><img src="/src/image/carousel_1.jpg"/></div>
									<div><img src="/src/image/carousel_2.jpg"/></div>
									<div><img src="/src/image/carousel_3.jpg"/></div>
									<div><img src="/src/image/carousel_4.jpg"/></div>
								</Carousel>
							</div>
							<div className="clr"></div>
							<PCNewsImageBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px" marginTop="10px"/>
							<div className="clr"></div>
						</div>
						<Tabs className="tabs_news">
							<TabPane tab="头条" key="1">
								<PCNewsBlock count={22} type="top" width="100%" bordered="false"/>
							</TabPane>
							<TabPane tab="社会" key="2">
								<PCNewsBlock count={22} type="shehui" width="100%" bordered="false"/>
							</TabPane>
							<TabPane tab="国内" key="3">
								<PCNewsBlock count={22} type="guonei" width="100%" bordered="false"/>
							</TabPane>
							<TabPane tab="国际" key="4">
								<PCNewsBlock count={22} type="guoji" width="100%" bordered="false"/>
							</TabPane>
							<TabPane tab="娱乐" key="5">
								<PCNewsBlock count={22} type="yule" width="100%" bordered="false"/>
							</TabPane>
							<TabPane tab="体育" key="6">
								<PCNewsBlock count={22} type="tiyu" width="100%" bordered="false"/>
							</TabPane>
							<TabPane tab="科技" key="7">
								<PCNewsBlock count={22} type="keji" width="100%" bordered="false"/>
							</TabPane>
						</Tabs>
						<Tabs className="tabs_product">
							<TabPane tab="ReactNews 推荐" key="1">
								<PCProduct width="100%" bordered="false"/>
							</TabPane>
						</Tabs>
						<div className="clr"></div>
						<div>
							<PCNewsImageBlock count={9} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px" marginTop="10px"/>
							<PCNewsImageBlock count={18} type="yule" width="100%" cartTitle="娱乐新闻" imageWidth="132px" marginTop="10px"/>
						</div>
					</Col>
					<Col span={2}></Col>
				</Row>
			</div>
		);
	}
}