import React from 'react';

interface Props {
  name: string;
  imgUrl: string;
}

const Profile: React.FC<Props> = (props) => {

  return (
    <div>
      <h3>{props.name} </h3>
      <img
        src={props.imgUrl}
        alt={props.name}
      />
    </div>
  )
}

export default Profile;