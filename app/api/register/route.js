import Travelers from "@/models/Travelers";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const travelers = await Travelers.find(); // Fetch all travelers
    return NextResponse.json(travelers); // Return travelers list
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch travelers' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json(); // Parse request body

    // Validate required fields
    const { username, email, password } = body;
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new traveler document
    const newTraveler = new Travelers(body);

    // Try saving the new traveler to the database
    await newTraveler.save();

    // Create a response and set a session cookie
    const response = NextResponse.json({ message: 'Registration successful', email: newTraveler.email }, { status: 201 });
    response.cookies.set('traveler_session', JSON.stringify({ email: newTraveler.email }), {
      maxAge: 60 * 60 * 24, // Set expiration (e.g., 1 day)
      path: '/', // Available to all pages
    });

    // Return the response
    return response;
  } catch (error) {
    // Check for duplicate key error (code 11000)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return NextResponse.json({ error: 'Email already exists. Please use a different email.' }, { status: 400 });
    }

    // Log the detailed error message for debugging
    console.error("Error creating traveler:", error.message || error);

    // Return a generic 500 error if any other error occurs
    return NextResponse.json({ error: `Failed to create traveler: ${error.message}` }, { status: 500 });
  }
}