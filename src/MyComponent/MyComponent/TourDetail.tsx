import React from 'react';
import '../.css/MyComponent.css';

interface TourDetailsProps {
    departureDate: string;
    tourCode: string;
    price: string;
    childPrice: string;
    babyPrice: string;
    details: string[]; // Đây là thuộc tính bắt buộc
  }
  

const TourDetails: React.FC<TourDetailsProps> = ({ departureDate, tourCode, price, childPrice, babyPrice, details }) => {
  return (
    <div className="tourDetailsContainer">
      <div className="tourHeader">
        <div className="tourInfo">
          <p><strong>KHỞI HÀNH:</strong> {departureDate}</p>
          <p><strong>MÃ TOUR:</strong> {tourCode}</p>
        </div>
        <div className="tourPrices">
          <p><strong>GIÁ:</strong> {price}</p>
          <p><strong>GIÁ TRẺ EM:</strong> {childPrice}</p>
          <p><strong>GIÁ EM BÉ:</strong> {babyPrice}</p>
        </div>
        <button className="buyButton">MUA ONLINE</button>
      </div>
      <div className="tourHighlights">
        <h3>Tour này có gì hay</h3>
        <ul>
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>
      <button className="programButton">In chương trình tour</button>
    </div>
  );
};

export default TourDetails;
