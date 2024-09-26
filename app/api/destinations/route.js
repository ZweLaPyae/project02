import Destinations from "@/models/Destinations";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request) {
  await dbConnect();
  try {
    const destinations = await Destinations.find(); // Fetch all destinations
    return NextResponse.json(destinations); // Return destinations list
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json(); // Parse request body

    // Validate required fields
    const { countryName, name, price, description, mediaUrl } = body;
    if (!countryName || !name || !price || !description || !mediaUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new destination document
    const newDestination = new Destinations(body);

    // Try saving the new destination to the database
    await newDestination.save();

    // Return the created destination
    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    // Log the detailed error message for debugging
    console.error("Error creating destination:", error.message || error);

    // Respond with a detailed error message for debugging
    return NextResponse.json({ error: `Failed to create destination: ${error.message}` }, { status: 500 });
  }
}
export async function DELETE(request) {
  await dbConnect();
  try {
    const { id } = await request.json(); // Parse request body to get the id

    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Delete the destination document
    await Destinations.findByIdAndDelete(id);

    // Return success message
    return NextResponse.json({ message: 'Destination deleted successfully' }, { status: 200 });
  } catch (error) {
    // Log the detailed error message for debugging
    console.error("Error deleting destination:", error.message || error);

    // Respond with a detailed error message for debugging
    return NextResponse.json({ error: `Failed to delete destination: ${error.message}` }, { status: 500 });
  }
}
export async function PUT(request) {
  await dbConnect();
  try {
    const body = await request.json(); // Parse request body

    // Validate required fields
    const { id, mediaUrl, price, description } = body;
    if (!id || !mediaUrl || !price || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update the destination document
    const updatedDestination = await Destinations.findByIdAndUpdate(
      id,
      { mediaUrl, price, description },
      { new: true } // Return the updated document
    );

    // Return the updated destination
    return NextResponse.json(updatedDestination, { status: 200 });
  } catch (error) {
    // Log the detailed error message for debugging
    console.error("Error updating destination:", error.message || error);

    // Respond with a detailed error message for debugging
    return NextResponse.json({ error: `Failed to update destination: ${error.message}` }, { status: 500 });
  }
}