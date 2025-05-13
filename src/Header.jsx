import { useState, useRef} from 'react';
import './index.css'
import PropTypes from 'prop-types';

import ICON_CLOSE from './assets/ICONS/ICON-CLOSE.svg'
import ICON_INFO from './assets/ICONS/ICON-INFO.svg'
import REACT_ICON from './assets/react.svg'

function Header({ setLocation, setCelcius, setArray, array}) {
    let key = "locations";
    let storedValue = localStorage.getItem(key);

    if (!storedValue) {
        storedValue = "Sydney";
        localStorage.setItem(key, storedValue);
    }

    let obj = {[key]: storedValue};
    let loc = obj.locations;
    setLocation(loc);

    const search_input = useRef(null);
    const notfound = useRef(null);
    const [prevloc, setPrevloc] = useState("sydney");
    const validator = async (search_input) => {

        loc = search_input.current.value 
        // console.log(loc)
        let new_link = `https://api.weatherapi.com/v1/forecast.json?key=838b65caf46d4b918db31334242810&hours=2&q=${loc}&aqi=yes`;
        try {
            const response = await fetch(new_link);
            if(!response.ok) {
                console.log("It is not valid");
                search_input.current.value = ""
                localStorage.setItem("locations", storedValue);
                setLocation(storedValue)
                console.log("THE UPDATED LOCATION IS" + String(storedValue))
                if (loc !== '') {
                    previewError()
                }
                const search_inpot = document.getElementById("search_input");
                const search_list = document.getElementById("search_list");
                if (search_list.style.display === "block") {
                    search_list.style.display = "none";
                    search_inpot.style.borderRadius = "15px"; 
                }
                search_input.current.focus()
                if (notfound.current.style.display === "block") {
                    notfound.current.style.display = "none"
                }
                
                
            } else {
                let new_array = [prevloc, ...array];
                console.log(new_array);
                new_array.pop();
                setArray(new_array);
                setPrevloc(loc);
                console.log('it is valid')
                setLocation(loc)
                localStorage.setItem("locations", loc);
            }
        } catch(error){
            console.log(error)
        }
    }
    
    const unitConvert = (event) => {
        if (event.target.value ===  "celcius") {
            setCelcius(true);
            console.log("changed to celc");
        } else if (event.target.value === "farenheit") {
            setCelcius(false);
            console.log("changed to faren")
        }
    }


    
    let keywords = ["Kaohsiung", "Medan", "Moscow", "Munich", "Berlin", "Nairobi", "Rio de Janeiro", "Beijing", "Banjul", "Belo Horizonte", "Stockholm", "Antananarivo", "Madrid", "Medellin", "Ulaanbaatar", "Brussels", "Durban", "Minsk", "Jakarta", "Zagreb", "Lahore", "Shijiazhuang", "Chengdu", "Lagos", "Calcutta", "Vientiane", "Singapore", "Dubai", "Khartoum", "Melbourne", "Tianjin", "Casablanca", "New York City", "Philadelphia", "Abuja", "Kuwait City", "Buenos Aires", "Helsinki", "Guadalajara", "Maracaibo", "Kigali", "Hyderabad", "Mexico City", "Belgrade", "Ankara", "Kinshasa", "Istanbul", "Addis Ababa", "Mumbai", "San Salvador", "Porto Alegre", "Giza", "Baghdad", "Montreal", "Surabaya", "Barcelona", "Dhaka", "Amman", "Cairo", "Hanoi", "Abidjan", "Alexandria", "Johannesburg", "Dallas", "Belfast", "Toronto", "Vienna", "Chongqing", "Tehran", "Houston", "Bucharest", "Ho Chi Minh City", "Porto", "New Delhi", "Budapest", "Bogota", "Karachi", "Milan", "Austin", "Port Moresby", "Cape Town", "Zurich", "Hong Kong", "Kuala Lumpur", "Warsaw", "Shanghai", "Yogyakarta", "Bandung", "Chennai", "Tunis", "Santiago", "Tbilisi", "Delhi", "San Diego", "Texas", "Kolkata", "Manila", "Baku", "Osaka", "Paris", "Vancouver", "Seoul", "Bangalore", "Yerevan", "Rome", "Bangkok", "London", "Sao Paulo", "Ahmedabad", "Sydney", "Hangzhou", "Kuwait", "Caracas", "Beirut", "Shenzhen", "Los Angeles", "Tokyo", "Luanda", "Montevideo", "Guangzhou", "Lima", "San Jose", "Manama", "Algiers", "Detroit", "Riyadh", "Newcastle", "Wollongong", "Albury", "Maitland", "Wagga Wagga", "Coffs Harbour", "Tamworth", "Port Macquarie", "Orange", "Dubbo", "Geelong", "Ballarat", "Bendigo", "Shepparton", "Melton", "Mildura", "Warrnambool", "Sunbury", "Brisbane", "Gold Coast", "Cairns", "Townsville", "Toowoomba", "Mackay", "Rockhampton", "Bundaberg", "Hervey Bay", "Gladstone", "Perth", "Mandurah", "Bunbury", "Geraldton", "Kalgoorlie", "Albany", "Adelaide", "Mount Gambier", "Murray Bridge", "Port Lincoln", "Port Augusta", "Whyalla", "Hobart", "Launceston", "Devonport", "Burnie", "Darwin", "Alice Springs", "Palmerston", "Katherine", "Canberra", "Queanbeyan"]

    function search_border(){
        const search_list = document.getElementById("search_list");
        const search_input = document.getElementById("search_input");
        
        if (search_list.style.display === "none" || search_list.style.display === "") {
            search_list.style.display = "block";
            search_input.style.borderBottomLeftRadius = "0px";
            search_input.style.borderBottomRightRadius = "0px";
        } else {
            search_list.style.display = "none";
            search_input.style.borderRadius = "15px"; 
        }
    }
    
    function list_clicked(item){
        const search_input = document.getElementById("search_input");
        search_input.value = item;
    }

    const [search, setSearch] = useState("");

    function show_messages() {
        document.getElementById('backdrop_messages').style.display = "block";
    }
    function conseal_messages() {
        document.getElementById('backdrop_messages').style.display = "none";
    }
    function show_settings() {
        document.getElementById('backdrop_settings').style.display = "block";
    }
    function conseal_settings() {
        document.getElementById('backdrop_settings').style.display = "none";
    }
    
    const [message, setMessage] = useState(false);
    const error = useRef(null)
    function previewError() {
        setMessage(true);
        setInterval(() => {
            setMessage(false)
        }, 1200)
    }

    const list = useRef(null)

    function handleKey(event) {
        if (event.key === 'Enter') {
            if (list.current.style.display === "block") {
                list.current.style.display = "none";
                // window.alert("sdh")
                search_input.current.style.borderBottomLeftRadius = "15px"
                search_input.current.style.borderBottomRightRadius = "15px"
            }
            validator(search_input)
            notfound.current.style.display = "none"
            search_input.current.style.borderBottomLeftRadius = "15px"
            search_input.current.style.borderBottomRightRadius = "15px"
            // const search_list = document.getElementById("search_list");
        }
    }


    return(
        <div>
            <div className={message ? 'error': 'error_static'} ref={error}>
                <div className="error-message">location inserted was invalid!</div>
            </div>
            <div className="tint"></div>
            <div className="backdrop" id="backdrop_messages">
                <div className="message_container backdrop_container">
                    <div className="message_top">
                        <img onClick={conseal_messages} src={ICON_CLOSE} className='icon icon_close'></img>
                    </div>
                    <p id='disclaimer'>DISCLAIMER!!!</p>
                    <p>This project is intended solely as a coding project.</p><br></br>
                    <p>Project created by:</p>
                    <p>John Malvin [30/10/2024]</p><br></br>
                    <p>Built with:</p>
                    <p>Vite + React, <a href="#">API</a></p>
                </div>
            </div>
            <div className="backdrop" id="backdrop_settings">
                <div className="setting_container backdrop_container">
                    <img onClick={conseal_settings} src={ICON_CLOSE} className='icon icon_close_setting'></img>
                    <div className="volume_container">
                        <img src={REACT_ICON} className='icon'></img>
                        <input className="volume_indicator" type="range"></input>
                    </div>
                    
                    <div className="temperature">
                        <label>Temperature in </label>
                        <select className='select_box' onChange={unitConvert}>
                            <option value='celcius'>Celcius</option>
                            <option value='farenheit'>Farenheit</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="location">
                    <img src={REACT_ICON} className='icon icon_location'></img>
                    <p id="current_location" className='current'>Sydney</p>
                </div>
                
                <div className="search" onClick={search_border}>
                    <input id="search_input" ref={search_input} className={search ? "without-border" : "with-border"} onChange={(e) => {setSearch(e.target.value)
                    }}
                        type='text' placeholder='Type suburb...' autoComplete='off' onKeyDown={handleKey}></input>
                    <div className="search_circle" >
                        <img onClick={() => validator(search_input)} src={REACT_ICON} className='icon icon_search'></img>
                    </div>
                    <div className="result_box">
                    <ul id="search_list" ref={list}>
                        {keywords.filter((item) => {
                            return search.toLowerCase() === '' ? item : item.toLowerCase().includes(search.toLowerCase());
                        }).length > 0 ? (
                            keywords.filter((item) => {
                                return search.toLowerCase() === '' ? item : item.toLowerCase().includes(search.toLowerCase());
                            }).map(item => (
                                <li id={item} key={item} onClick={() => {list_clicked(item); validator(search_input)}} >{item}</li>
                            ))
                        ) : (
                            <li id="notfound" ref={notfound} onClick={() => validator(search_input)}><p>input not in database, proceed searching?</p></li>
                        )}
                    </ul>

                    </div>
                </div>
                <div className="setting">
                    <img onClick={show_settings} src={REACT_ICON} className='icon icon_setting'></img>
                    <img onClick={show_messages} src={ICON_INFO} className='icon icon_info'></img>
                </div>

            </div>
        </div>
    )
}
Header.propTypes = {
    location: PropTypes.string.isRequired,
    setLocation: PropTypes.func.isRequired,
    setCelcius: PropTypes.func.isRequired,
    setArray: PropTypes.func.isRequired,
    array: PropTypes.array.isRequired,
};
export default Header;