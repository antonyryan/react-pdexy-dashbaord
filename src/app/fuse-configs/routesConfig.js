import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {routeConfig, loginConfig} from 'app/main/routeConfig';

const routeConfigs = [
    loginConfig,
    routeConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/login"/>
    }
];

export default routes;
