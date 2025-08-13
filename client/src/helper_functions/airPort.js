export const getAirportName = (id, airports = []) => {
  if (!Array.isArray(airports)) return "N/A";
  const airport = airports.find((a) => a.id === id);
  return airport ? airport.name : "N/A";
};



export default getAirportName;