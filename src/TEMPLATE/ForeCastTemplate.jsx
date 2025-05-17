import SPINNER from "./../assets/SPINNER.svg";

function ForeCastTemplate() {
  return (
    <div className="forecast-card-devide">
        <div className="forecast-card" >
        <div className="forecast-degree">{"..."}</div>
            <img src={SPINNER} className='forecast-image'></img>
            <div className="forecast-data">
                <div className="forecast-desc">{"loading..."}</div>
                <div className="forecast-time">{"loading..."}</div>
            </div>
        </div>
    </div>
  );
}
export default ForeCastTemplate;