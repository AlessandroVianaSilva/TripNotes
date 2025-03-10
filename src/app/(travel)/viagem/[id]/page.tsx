import Details from '@/components/TravelDetail/Details'
// import PassengerList from '@/components/TravelDetail/AddingPassengerPopup';
import React from 'react'
import TripPassengerList from '@/components/TravelDetail/TripPassengerList';
import '../../../styles/globals.css'

const TravelDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className=''>
      <Details id={params.id} />
      <TripPassengerList tripId={Number(params.id)} />
    </div>
  );
};

export default TravelDetailsPage;
