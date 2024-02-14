import { useState } from "react";
import { Link } from "react-router-dom";
import { Booking } from "../models/Booking.interface";

export interface IBookingCardProps {
  booking: Booking;
  checkin: string; // Nueva: Fecha de check-in
  checkout: string; // Nueva: Fecha de check-out
}


export const BookingCard = ({ booking, checkin, checkout }: IBookingCardProps) => {
  const queryParams = `?id=${encodeURIComponent(booking._id)}&checkin=${encodeURIComponent(checkin
    )}&checkout=${encodeURIComponent(checkout)}`;
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReservarClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    console.log("Reservar");
  };
  return (
    <div
      className={`bg-gray-900 rounded-lg shadow-lg p-4 sm:max-w-xs sm:min-w-xs md:max-w-sm md:min-w-sm lg:max-w-md lg:min-w-md xl:max-w-lg xl:min-w-lg card w-80 sm:w-72 animate-fade-up`}
    >
      <img
        src={booking.images[0]}
        alt={booking.name}
        className="w-full h-32 object-cover mb-4 rounded-lg text-white"
      />
      <h2 className="text-white text-xl font-bold mb-2">{booking.name}</h2>
      <p className="text-blue-400 mb-2">{booking.summary}</p>
      <p className="text-blue-400 mb-2">Price: {booking.price}</p>
      <p className="text-blue-400 mb-2">Capacity: {booking.capacity}</p>
      <Link to={`/reserve${queryParams}`}>
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            isAnimating ? "animate-jump" : ""
          }`}
          onClick={handleReservarClick}
        >
          Reservar
        </button>
      </Link>
    </div>
  );
};
