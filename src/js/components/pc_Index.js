import React from 'react';
import PCHeader from './pc_Header';
import PCFooter from './pc_Footer';
import PCNewsContainer from './pc_NewsContainer'
export default class PCIndex extends React.Component{
	render(){
		return(
			<div>
				<PCHeader/>
				<PCNewsContainer/>
				<PCFooter/>
			</div>
		)
	}
}