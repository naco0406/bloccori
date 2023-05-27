import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const CookieConnect = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['connected']);
    setCookie('connected', true);
    console.log('cookies.connected');
    console.log(cookies.connected);
}

export default CookieConnect;