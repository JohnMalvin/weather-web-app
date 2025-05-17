import REACT_ICON from './../assets/react.svg';

function OthersTemplate() {
  return (
    <div className="others-card" >
      <div className="others-degree">{"loading..."}</div>
      <div className="others-data">
          <div className="others-location hide-on-desktop">{"loading..."}</div>
          <div className="others-detail-container">
              <div className="others-detail">
                  <img src={REACT_ICON} className='icon no-cursor'></img>
                  <p>{"loading..."}</p>
              </div>
              <div className="others-detail">
                  <img src={REACT_ICON} className='icon no-cursor'></img>
                  <p>{"loading..."}</p>
              </div>
              <div className="others-detail preview-on-desktop">
                  <img src={REACT_ICON} className='icon no-cursor'></img>
                  <p>{"loading..."}</p>
              </div>
          </div>
          <img src={REACT_ICON} className='others-image'></img>
      </div>
      
  </div>
  );
}
export default OthersTemplate;