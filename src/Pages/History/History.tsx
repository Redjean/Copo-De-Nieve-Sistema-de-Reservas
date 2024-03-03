import { NavBar } from "../../components/NavBar";
import { HistoryContainer } from "../../components/HistoryContainer/HistoryContainer";
import { useHistory } from "./State/useHistory";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";

export const History = () => {
  const { listBooking, listAvailability } = useHistory();
  const [isListAvailabilityFetched, setIsListAvailabilyFetched] =
    useState(false);
  const [isListBookingFetched, setIsListBookingFetched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (listAvailability && listAvailability.length !== 0) {
      setIsListAvailabilyFetched(true);
    }
    console.log(listAvailability);
  }, [listAvailability]);

  useEffect(() => {
    if (listBooking && listBooking.length !== 0) {
      setIsListBookingFetched(true);
    }
    console.log(listBooking);
  }, [listBooking]);

  // Función para buscar
  const search = (term: string) => {
    return listBooking.filter(booking =>
      booking._id.toLowerCase().includes(term.toLowerCase())
    );
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const results = search(searchTerm);
    console.log("Resultados de la búsqueda:", results);
    // Puedes hacer algo con los resultados aquí, como mostrarlos en otro componente
  };


  return (

    <>
      <NavBar />
      <br />
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="search"
          id="default-search"
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search ..."
          required
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
      <br />
      {isListAvailabilityFetched && isListBookingFetched ? (
        <>
          <div className="">
            <HistoryContainer
              listBooking={listBooking}
              listAvailability={listAvailability}
            />
          </div>
        </>
      ) : (
        <>
          <br />
          <br />
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-white animate-pulse">
              Cargando Historial...
            </h1>
          </div>
        </>
      )}
      <br />
      <br />
      <Footer />
    </>
  );
};

export default History;
