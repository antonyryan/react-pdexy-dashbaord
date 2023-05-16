import React from 'react';
import {Typography} from '@material-ui/core';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/styles';
import logo from '../../assets/logo.svg';

const useStyles = makeStyles(theme => ({
    root      : {
        '& .logo-icon'                : {
            width     : 24,
            height    : 24,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        },
        '& .react-badge, & .logo-text': {
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
                easing  : theme.transitions.easing.easeInOut
            })
        }
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color          : '#61DAFB'
    }
}));

function Logo()
{
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex items-center")}>
            <Link component={RouterLink} to="/dashboard">
                <img className="logo-icon" src={logo} alt="logo"/>
                Pyxie
            </Link>
        </div>
    );
}

export default Logo;
