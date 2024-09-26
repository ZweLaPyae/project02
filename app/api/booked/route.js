import Travelers from "@/models/Travelers";
import Trips from "@/models/Trips";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const traveler = await Travelers.findOne({ email }).populate('bookedTrips');
    if (!traveler) {
      return NextResponse.json({ error: 'Traveler not found' }, { status: 404 });
    }

    return NextResponse.json(traveler.bookedTrips);
  } catch (error) {
    console.error('Error fetching booked trips:', error.message);
    return NextResponse.json({ error: 'Failed to fetch booked trips' }, { status: 500 });
  }
}

export async function DELETE(request) {
    try {
      const { email, tripId } = await request.json();
  
      if (!email || !tripId) {
        return NextResponse.json({ error: 'Missing email or trip ID' }, { status: 400 });
      }
  
      const traveler = await Travelers.findOne({ email });
      if (!traveler) {
        return NextResponse.json({ error: 'Traveler not found' }, { status: 404 });
      }
  
      traveler.bookedTrips = traveler.bookedTrips.filter(id => id.toString() !== tripId);
      await traveler.save();
  
      return NextResponse.json({ message: 'Trip removed successfully' });
    } catch (error) {
      console.error('Error removing booked trip:', error.message);
      return NextResponse.json({ error: 'Failed to remove booked trip' }, { status: 500 });
    }
  }

export async function PUT(request) {
  try {
    const { email, trip } = await request.json();

    if (!email || !trip) {
      return NextResponse.json({ error: 'Missing email or trip' }, { status: 400 });
    }

    const traveler = await Travelers.findOne({ email });
    if (!traveler) {
      return NextResponse.json({ error: 'Traveler not found' }, { status: 404 });
    }

    // Check if the trip already exists in the Trips collection
    let tripRecord = await Trips.findOne({ name: trip.name });
    if (!tripRecord) {
      // If the trip doesn't exist, create a new trip record
      tripRecord = new Trips(trip);
      await tripRecord.save();
    }

    // Add the trip's ObjectId to the traveler's bookedTrips array
    traveler.bookedTrips.push(tripRecord._id);
    await traveler.save();

    return NextResponse.json({ message: 'Trip added successfully' });
  } catch (error) {
    console.error('Error adding booked trip:', error.message);
    return NextResponse.json({ error: 'Failed to add booked trip' }, { status: 500 });
  }
}