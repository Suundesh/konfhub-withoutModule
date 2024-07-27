// import React from 'react';
// import './InfoBox.css';

// const InfoBox = ({ data }) => {
//   return (
//     <div className="info-box">
//       <div dangerouslySetInnerHTML={{ __html: data.name }} />
//       <div dangerouslySetInnerHTML={{ __html: data.event_website }} />
//     </div>
//   );
// };

// export default InfoBox;
import React from 'react';
import ReactDOM from 'react-dom';
import './InfoBox.css';

const InfoBox = ({ data }) => {
  return (
    <div className="info-box">
      <div dangerouslySetInnerHTML={{ __html: data.name }} />
      <div dangerouslySetInnerHTML={{ __html: data.event_website }} />
    </div>
  );
};

const data = {
  name: 'KonfHub Frontend Evaluation Task',
  event_website: `
    <div>
      <div><span>📹</span> Online</div>
      <div><span>💰</span> Paid</div>
      <div>Event Live Link: <a href="#">Open streaming website</a></div>
      <div>Date: Jul 31st, 2034 6:00 AM - Aug 31st, 2034 6:00 PM IST</div>
      <div>EVENT STARTS IN 3656D : 18H : 28M : 9S</div>
      <button>Buy Now</button>
      <button>Official Website</button>
    </div>
  `,
};

const App = () => (
  <div>
    <InfoBox data={data} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
