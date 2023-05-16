import React from 'react';
import logo from '../../../app/assets/logo.svg'

function FuseSplashScreen()
{
    return (
        <div id="fuse-splash-screen">

            <div className="center">

                <div className="logo">
                    <img width="128" src={logo} alt="logo"/>
                </div>
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="inner">
                            <div className="gap"/>
                            <div className="left">
                                <div className="half-circle"/>
                            </div>
                            <div className="right">
                                <div className="half-circle"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(FuseSplashScreen);
