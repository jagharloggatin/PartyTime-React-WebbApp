import AppCommentItem from './AppCommentItem';

function AppCommentList(props){

  return <ul>
    {props.com.map(comment => (
      <AppCommentItem
        key={comment.id} id={comment.id}
        user={comment.id}
        comment={comment.comment}
      />
    ))}
  </ul>
}

export default AppCommentList