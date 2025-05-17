import REACT_ICON from './../assets/react.svg';

function ForeDayTemplate() {
  return (
    <div className={"foreday-card"}>
        <img src={REACT_ICON} className="foreday-image"></img>
        <div className="foreday-date">{"loading.."}</div>
        <div className="foreday-temp">{"loading..."}</div>
        <div className="foreday-desc">{"loading..."}</div>
    </div>
  );
}
export default ForeDayTemplate;