import { Avatar } from '@heroui/react';
import React from 'react';

const User = () => {
    return (
        <div>
              <Avatar>
        <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
        </div>
    );
};

export default User;