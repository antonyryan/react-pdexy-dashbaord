import React from 'react';

import { Container, Row, Col } from 'reactstrap';
import Login from '../components/Login/Login';

import logo from '../../assets/logo.svg';


class PageLogin extends React.Component
{
	render ()
	{
		return (
			<div className='m-auto p-10'>
				<div className='text-center'>
					<img src={logo} alt="Pyxie Logo" className="img-responsive w-1/3"/>
				</div>
				<div>
					<Login />
				</div>
			</div>
		);
	}
}

export default PageLogin;