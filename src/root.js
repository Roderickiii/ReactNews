import React from 'react';
import ReactDom from 'react-dom';
import PCIndex from './js/components/pc_Index';
import MobileIndex from './js/components/mobile_Index';
import PCNewsDetails from './js/components/pc_NewsDetails';
import MobileNewsDetails from './js/components/mobile_NewsDetails';
import PCUserCenter from './js/components/pc_UserCenter';
import MobileUserCenter from './js/components/mobile_UserCenter';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
class Root extends React.Component{
	render(){
		return(
			<div>
				<MediaQuery query="(min-device-width:1224px)">
					<Router>
						<Switch>
							<Route exact path="/" component={PCIndex}/>
							<Route path="/details/:uniquekey" component={PCNewsDetails}/>
							<Route path="/usercenter" component={PCUserCenter}/>
						</Switch>
					</Router>
				</MediaQuery>
				<MediaQuery query="(max-device-width:1224px)">
					<Router>
						<Switch>
							<Route exact path="/" component={MobileIndex}/>
							<Route path="/details/:uniquekey" component={MobileNewsDetails}/>
							<Route path="/usercenter" component={MobileUserCenter}/>
						</Switch>
					</Router>
				</MediaQuery>
			</div>
		)
	}
}
ReactDom.render(<Root/>,document.getElementById('mainContainer'));