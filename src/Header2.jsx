import './index.css'
import PropTypes from 'prop-types';

import ICON_CLOSE from './assets/ICONS/ICON-CLOSE.svg'
import ICON_INFO from './assets/ICONS/ICON-INFO.svg'
import REACT_ICON from './assets/react.svg'
import GITHUB from './assets/GITHUB.png'
import { updateCities } from './CLIENT_HELPER.JS';
import { verifyCityName } from './CLIENT_HELPER.JS';

function Header({ locationData, setLocationData, setCelciusData, celciusData, setCities, cities}) {
    const getNewSearch = async () => {
        const searchElement = document.getElementById("search_input");
        const searchContent = searchElement.value;
        if (searchContent === "" || searchContent === locationData) return
        try {
            const result = await verifyCityName(searchContent);
            setLocationData(result.city);
            setCities(updateCities(locationData, cities, result.city));
        } catch (error) {
            alert(String(error));
            console.error("Error fetching data:", error);
        }
    }
    const previewInfo = () => {
        const backdrop = document.getElementById("backdrop_settings");
        backdrop.style.display = "block";
    }
    const consealInfo = () => {
        const backdrop = document.getElementById("backdrop_settings");
        backdrop.style.display = "none";
        const optionElement = document.querySelector(".select_box");
        let tempLabel;
        if (celciusData === true) {
            tempLabel = "celcius";
        } else {
            tempLabel = "farenheit";
        }
        if (optionElement.value !== tempLabel) {    
            setCelciusData(!celciusData);
        }


    }

    return (
        <>
            <div className="backdrop" id="backdrop_settings">
                <div className="setting_container backdrop_container">
                    <img src={ICON_CLOSE} className='icon icon_close_setting' onClick={consealInfo}></img>
                    <div className="temperature">
                        <label>Temperature in </label>
                        <select className='select_box'>
                            <option value='celcius'>Celcius</option>
                            <option value='farenheit'>Farenheit</option>
                        </select>
                    </div>
                    <a href='https://github.com/JohnMalvin' target='_blank' className='button-github'>
                        <img src={GITHUB} className='icon'></img>
                        <p>VISIT GITHUB</p>
                    </a>
                </div>
            </div>
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
                    <img src={ICON_INFO} className='icon icon_info' onClick={previewInfo}></img>
                </div>

            </div>
        </>
            
    )
}
Header.propTypes = {
    locationData: PropTypes.string.isRequired,
    setLocationData: PropTypes.func.isRequired,
    celciusData: PropTypes.bool.isRequired,
    setCelciusData: PropTypes.func.isRequired,
    setCities: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
};
export default Header;