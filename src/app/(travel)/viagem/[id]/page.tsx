import Details from '@/components/TravelDetail/Details'
// import PassengerList from '@/components/TravelDetail/AddingPassengerPopup';
import React from 'react'
import TripPassengerList from '@/components/TravelDetail/TripPassengerList';


const TravelDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Details id={params.id} />
      <TripPassengerList tripId={Number(params.id)} />
      {/* <TripPassengerList tripId={params.id} /> */}

    </div>
  );
};

export default TravelDetailsPage;
