import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageSimple, DemoContent} from '@fuse';

const styles = theme => ({
    layoutRoot: {}
});

class Example extends Component {

    render()
    {
        const {classes} = this.props;
        return (
            <div>sdf</div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Example);