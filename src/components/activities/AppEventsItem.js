import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import FavoritesContext from '../../store/FavoritesContext';
import classes from '../styles/AppEvents.module.css';

function AppEventsItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const navigateTo = useNavigate();

  const reqCtx = useContext(RequestContext);

  const goToEvent = () => {
    // console.log(props);
    // navigateTo(`/events/${props.id}`);
    localStorage.setItem('selectedId', JSON.stringify(props));
    navigateTo(`/events/selected`);
  };

  async function toggleFavoriteStatusHandler() {

    const data = {
      like: true,
      comment: 'string',
      created: '2023-02-10T10:40:00.500Z',
    };

    // const data = {
    //   uId: userId,
    //   eId: props.id,
    //   eventIsNotFavorite: itemIsFavorite,
    // };
    await reqCtx.postRequest(`https://testagain-d4b54-default-rtdb.firebaseio.com/favorites.json`, data);
  }

  //○●
  //☆★

  return (
      <li className={classes.card}>
        <ul>
          <li>
            <div className={classes.contentDirection}>
              <div className={classes.imageContainer}>
                <img src={props.image} />
              </div>
              <div className={classes.textContainer}>
                <h2>Sean Connery FanClub</h2>
                <div>Sean once said: "if she acts up just give her a little
                  schlap", that will calm down a woman
                </div>
                <p>Stockholm</p>
                <p>Sankt Eriksgatan 70, 113 20 Stockholm</p>
                <p>2023-01-02 18:00</p>
              </div>
            </div>
          </li>
          <li className={classes.buttonListItem}>
            <button onClick={toggleFavoriteStatusHandler}>Favorite </button>
            {/*{itemIsFavorite ? 'Favorite' : 'UnFavorite'}*/}
            <button onClick={goToEvent}>Go To Event</button>
          </li>
        </ul>
      </li>

    // <section>
    //
    //   <div className={classes.events}>
    //     <ul>
    //       <li>
    //         <div>
    //           <div className={classes.time}>
    //             <h2>24 <br /><span>June</span></h2>
    //           </div>
    //           <div className={classes.details}>
    //             <h3>{props.title}</h3>
    //             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    //               Aperiam consectetur excepturi incidunt labore, mollitia
    //               natus
    //               numquam obcaecati odio odit optio ratione rem sed vero.
    //               Blanditiis nisi sapiente tempore vero voluptate.</p>
    //

    //             <a href='/events'>Favorite</a>
    //             <a href='/events'>Favorite</a>
    //
    //
    //           </div>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    //   {/*<div className={classes.events}>*/}
    //   {/*  <div className={classes.content}>*/}
    //   {/*    <h1>{props.title}</h1>*/}
    //   {/*    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis*/}
    //   {/*      fugit magnam maxime minus praesentium sequi sunt? Accusantium alias,*/}
    //   {/*      distinctio error odio omnis optio quam vero. Ad ea harum iure*/}
    //   {/*      non.</p>*/}
    //   {/*  </div>*/}
    //   {/*</div>*/}
    // </section>


    // <li className={classes.listItem}>
    //   {/*<AppCard>*/}
    //   <li className={classes.innerItem}>
    //     <div className={classes.image}>
    //       <img src={props.image} alt={props.title} />
    //     </div>
    //     <div className={classes.textContent}>
    //       <div className={classes.content}>
    //         <h3>Title: {props.title}</h3>
    //         <address>Address: {props.address}</address>
    //         <p>City: {props.city}</p>
    //         <p> Description: {props.description}</p>
    //       </div>
    //     </div>
    //   </li>
    //   <div className={classes.actions}>
    //     <button
    //       onClick={toggleFavoriteStatusHandler}>{itemIsFavorite ? '♥' : '♡'}</button>
    //     <button onClick={goToEvent}>Go To Activity</button>
    //   </div>
    //   {/*</AppCard>*/}
    // </li>
  );
}

export default AppEventsItem;

//
// const goToActivity = () => {
//   // console.log(props);
//   selectedActivityCtx.activitySelected({
//     id: props.id,
//     title: props.title,
//     description: props.description,
//     image: props.image,
//     address: props.address,
//     city: props.city,
//     rating: props.rating,
//   });
//   navigateTo('/event');
// };
// if (itemIsFavorite) {
//   favoritesCtx.removeFavorite(props.id);
// } else {
//   favoritesCtx.addFavorite({
//     id: props.id,
//     title: props.title,
//     description: props.description,
//     image: props.image,
//     address: props.address,
//     city: props.city,
//   });
// }