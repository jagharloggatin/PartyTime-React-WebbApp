import classes from '../styles/AppEvents.module.css';
import AppCard from '../ui/AppCard';
import React from 'react';

function AppCommentItem(props) {
  // console.log(props);
  return (
    <ul>
      <li className={classes.listItem}>
        <AppCard>
          <div>
            <p> {props.comment.username}: {props.comment.comment}</p>
          </div>
        </AppCard>
      </li>
    </ul>);
}

export default AppCommentItem;

