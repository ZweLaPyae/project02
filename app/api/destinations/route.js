import Destinations from "@/models/Destinations";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

export async function GET(request) {
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