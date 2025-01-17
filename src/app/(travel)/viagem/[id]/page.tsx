import Details from '@/components/TravelDetail/Details'
import PassengerList from '@/components/TravelDetail/AddingPassengerPopup';
import React from 'react'
import TripPassengerList from '@/components/TravelDetail/TripPassengerList';


const TravelDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <Details id={params.id} />
      {/* <PassengerList tripId={0}/> */}
      <TripPassengerList tripId={0}/>
    </div>
  );
};

export default TravelDetailsPage;
