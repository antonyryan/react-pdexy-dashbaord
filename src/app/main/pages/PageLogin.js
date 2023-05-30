import React from 'react';
import Login from '../components/Login/Login';

class PageLogin extends React.Component
{
	render ()
	{
		return (
			<div className='m-auto w-auto sm:w-sm p-10'>
				<Login />
			</div>
		);
	}
}

export default PageLogin;