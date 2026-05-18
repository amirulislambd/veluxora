import { Avatar } from '@heroui/react';
import React from 'react';

const User = ({user}) => {
    console.log(user)
    const {image,name} = user
    return (
        <div>
              <Avatar>
        <Avatar.Image alt="John Doe" src={image} />
        <Avatar.Fallback>{name?.charAt(0)}</Avatar.Fallback>
      </Avatar>
        </div>
    );
};

export default User;