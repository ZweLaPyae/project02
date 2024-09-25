import Trips from "@/models/Trips";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const trips = await Trips.find(); // Fetch all trips
    return NextResponse.json(trips); // Return trips list
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json(); // Parse request body

    // Validate required fields
    const { name, country, destinations, additionalPrice, description, imageUrl } = body;
    if (!name || !country || !destinations || !additionalPrice || !description || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new trip document
    const newTrip = new Trips(body);

    // Try saving the new trip to the database
    await newTrip.save();

    // Return the created trip
    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    // Log the detailed error message for debugging
    console.error("Error creating trip:", error.message || error);
    
    // Respond with a detailed error message for debugging
    return NextResponse.json({ error: `Failed to create trip: ${error.message}` }, { status: 500 });
  }
}
export async function DELETE(request) {
    try {
        const { name } = await request.json(); // Parse request body to get the trip ID

        if (!name) {
            return NextResponse.json({ error: 'Missing trip' }, { status: 400 });
        }

        // Find the trip by ID and delete it
        const deletedTrip = await Trips.findByIdAndDelete(name);

        if (!deletedTrip) {
            return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
        }

        // Return the deleted trip
        return NextResponse.json(deletedTrip, { status: 200 });
    } catch (error) {
        // Log the detailed error message for debugging
        console.error("Error deleting trip:", error.message || error);

        // Respond with a detailed error message for debugging
        return NextResponse.json({ error: `Failed to delete trip: ${error.message}` }, { status: 500 });
    }
}