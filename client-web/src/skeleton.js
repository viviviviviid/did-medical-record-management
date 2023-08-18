import React, { useState, useEffect} from 'react';
import Header from './header.js';
import Footer from './footer.js';

export default function Main() {
    return(
        <div className='root'>
            <Header />
            <div className='body'>
                
            </div>
            <Footer />
        </div>
    )
}