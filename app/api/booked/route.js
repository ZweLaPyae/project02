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