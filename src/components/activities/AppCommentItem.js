import React from 'react';
import classes from '../styles/AppEvents.module.css';
import AppCard from '../ui/AppCard';

function AppCommentItem(props) {
  console.log(props);
  return (
    <ul>
      <li className={classes.listItem}>
        <AppCard>
          <div>
            <p> comment: {props.comment}</p>
          </div>
        </AppCard>
      </li>
    </ul>
  );
}

export default AppCommentItem;
