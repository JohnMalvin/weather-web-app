import { useState, useRef} from 'react';
import './index.css'
import PropTypes from 'prop-types';

import ICON_CLOSE from './assets/ICONS/ICON-CLOSE.svg'
import ICON_INFO from './assets/ICONS/ICON-INFO.svg'
import REACT_ICON from './assets/react.svg'
import { updateCities } from './CLIENT_HELPER.JS';
import { verifyCityName } from './CLIENT_HELPER.JS';

function Header({ locationData, setLocationData, setCelciusData, setCities, cities}) {
    const getNewSearch = async () => {
        const searchElement = document.getElementById("search_input");
        const searchContent = searchElement.value;
        if (searchContent === "" || searchContent === locationData) return
        alert(searchContent);
        try {
            const result = await verifyCityName(searchContent);
            setLocationData(result.city);
            setCities(updateCities(locationData, cities, result.city));
        } catch (error) {
            alert(String(error));
            console.error("Error fetching data:", error);
        }
    }


    return (
        <>
            <div className="tint"></div>
            <div className="header">
                <div className="location">
                    <img src={REACT_ICON} className='icon icon_location'></img>
                    <p id="current_location" className='current'>Sydney</p>
                </div>
                
                <div className="search">
                    <input id="search_input"  className={"with-border"} autoComplete='off'></input>
                    <div className="search_circle" >
                        <img src={REACT_ICON} className='icon icon_search'onClick={getNewSearch}></img>
                    </div>
                    <div className="result_box">
                    </div>
                </div>
                <div className="setting">
                    <img src={REACT_ICON} className='icon icon_setting'></img>
                    <img src={ICON_INFO} className='icon icon_info'></img>
                </div>

            </div>
        </>
            
    )
}
Header.propTypes = {
    locationData: PropTypes.string.isRequired,
    setLocationData: PropTypes.func.isRequired,
    setCelciusData: PropTypes.func.isRequired,
    setCities: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
};
export default Header;