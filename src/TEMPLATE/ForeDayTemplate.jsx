import SPINNER from './../assets/SPINNER.svg';

function ForeDayTemplate() {
  return (
    <div className={"foreday-card"}>
        <img src={SPINNER} className="foreday-image"></img>
        <div className="foreday-date">{"loading.."}</div>
        <div className="foreday-temp">{"loading..."}</div>
        <div className="foreday-desc">{"loading..."}</div>
    </div>
  );
}
export default ForeDayTemplate;