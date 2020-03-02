import React from 'react';

const user = {
    connected: false,
    lang: "fr"
}

export const UserContext = React.createContext(user);
