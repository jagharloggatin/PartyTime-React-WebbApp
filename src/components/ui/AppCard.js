import classes from '../styles/AppCard.module.css'
import AppLayout from './AppLayout';
import { FavoritesContextProvider } from '../../store/FavoriteContext';

function AppCard(props){

    return <AppLayout><div className={classes.card}>{props.children}</div></AppLayout>
}
export default AppCard;