import classes from '../styles/AppLayout.module.css'

function AppLayout(props){
    return <div>
        <main className={classes.main}>{props.children}</main>
    </div>
}
export default AppLayout;