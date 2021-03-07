import './styles/button.scss';

import React from 'react';


const CustomButton = ({buttonText, onclick}) => {

    return (
       <a onClick={()=>onclick()} className="btn btn-mid">{buttonText}</a>

    )
}

export default CustomButton;