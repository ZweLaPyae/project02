import Travelers from "@/models/Travelers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json(); // Get email and password from request body

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Find the traveler by email
    const traveler = await Travelers.findOne({ email });
    if (!traveler) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }

    // Compare the provided password with the stored plain-text password
    if (password !== traveler.password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

     // Set a session cookie for the traveler
     const response = NextResponse.json({ message: 'Login successful', email: traveler.email });
     response.cookies.set('traveler_session', JSON.stringify({ email: traveler.email }), {
       maxAge: 60 * 60 * 24, // Set expiration (e.g., 1 day)
       path: '/', // Available to all pages
     });
 
     return response;
  } catch (error) {
    console.error('Error during login:', error.message);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}
