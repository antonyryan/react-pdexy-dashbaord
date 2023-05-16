import PageLogin from './pages/PageLogin';
import PageUsers from './pages/PageUsers';
import PageEvents from './pages/PageEvents';
import PageEventDetails from './pages/PageEventDetails';
import PageDashboard from './pages/PageDashboard';
import withAuth from './lib/withAuth';

export const routeConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path    : '/dashboard',
            component: withAuth(PageDashboard)
        },
        {
            path    : '/users',
            component: withAuth(PageUsers)
        },
        {
            path    : '/events',
            component: withAuth(PageEvents)
        },
        {
            path    : '/event/:id',
            component: withAuth(PageEventDetails)
        }
    ]
};

export const loginConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: false
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    
    routes  : [
        {
            path     : '/login',
            component: PageLogin
        },
    ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
