import { makeStyles } from '@material-ui/core/styles';
import NavBar from './NavBar'
import MiniDrawer from './MiniDrawer';

const useStyles = makeStyles((theme) => ({
    main: {
        height: '100%',
        width: '100%',
    },
    content: {
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        paddingTop: '64px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '56px'
        }
    }
}))

const Wrapper = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.main}>
            <MiniDrawer>
                {detailsSectionShow=>
                    <div>
                        {props.children(detailsSectionShow)}
                    </div>
                }
            </MiniDrawer>
        </div>
    )
}

export default Wrapper;