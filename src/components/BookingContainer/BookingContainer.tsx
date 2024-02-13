import { BookingCard } from "../BookingCard";
import { useBookingContainer } from "./State/useBookingContainer";
import { Booking } from "../../models/Booking.interface";
import { useEffect, useState } from "react";

export interface IBookingContainerProps {
  listBooking: Booking[];
  checkin: string; // Nuevo: Fecha de check-in
  checkout: string; // Nuevo: Fecha de check-out
}

export const BookingContainer = ({ listBooking, checkin, checkout }: IBookingContainerProps) => {
  const { bookingList } = useBookingContainer(listBooking);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (bookingList.length !== 0) {
      setIsLoading(false);
    }
  }, [bookingList]);

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-white">Loading...</h1>
          </div>
        ) : (
          <>
            {bookingList.map((booking) => (
              <BookingCard
              booking={booking} // Propiedad de reserva
              checkin={checkin} // Propiedad de fecha de check-in
              checkout={checkout} // Propiedad de fecha de check-out
            />
            
            ))}
          </>
        )}
      </div>
    </div>
  );
};
