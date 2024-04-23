import React from 'react';
import './Footer.css'

function Footerr() {
    return (
        <div className="parent">
              <div className="footer">
            <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
        </div>
        </div>   
    );
}

export default Footerr;
