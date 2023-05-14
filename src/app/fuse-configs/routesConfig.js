import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {routeConfig} from 'app/main/routeConfig';

const routeConfigs = [
    routeConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/example"/>
    }
];

export default routes;
