import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from '../components/axios';

export default function withAuth ( ComponentToProtect ) 
{
	return class extends Component 
	{
		state = {
			loading: true,
			redirect: false,
		};

		componentDidMount () 
		{
			axios.get ( "/api/user/is_valid" )
			.then ( res => 
			{
				if ( res.status === 200 ) 
				{
					const redirect = res.data.is_valid ? false : true;
					this.setState ( { loading: false, redirect  });
				} else {
					const error = new Error ( res.error );
					throw error;
				}
			})
			.catch ( err => 
			{
				console.error ( "withAuth ERROR: ", err );
				this.setState ( { redirect: true, loading: false } );
			});
		}

		render() 
		{
			const { loading, redirect } = this.state;

			console.log ( "withAUTH: ", loading, redirect );

			if ( loading ) return null;

			if ( redirect ) return <Redirect to="/login" />;

			return (
				<React.Fragment>
					<ComponentToProtect {...this.props} />
				</React.Fragment>
			);
		}
	}
};