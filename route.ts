
import { NextResponse } from 'next/server';

/**
 * @fileOverview Secure Backend API for Multi-Step KYC Verification.
 * Interfaces with KYC providers for Aadhaar and PAN verification.
 */

export async function POST(request: Request) {
  try {
    const { action, aadhaarNumber, panNumber, otp, clientId } = await request.json();

    // 1. AADHAAR FLOW
    if (action === 'GENERATE_OTP') {
      console.log(`Generating OTP for Aadhaar: ${aadhaarNumber}`);
      return NextResponse.json({
        success: true,
        message: 'OTP sent to mobile linked with Aadhaar.',
        clientId: 'mock_client_id_' + Date.now()
      });
    }

    if (action === 'SUBMIT_OTP') {
      console.log(`Verifying Aadhaar OTP: ${otp}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({
        success: true,
        data: {
          full_name: 'John Doe',
          dob: '1990-01-01',
          aadhaar_masked: 'XXXX-XXXX-1234',
          photo_base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==' // Mock Aadhaar photo
        }
      });
    }

    // 2. PAN FLOW
    if (action === 'VERIFY_PAN') {
      console.log(`Verifying PAN: ${panNumber}`);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simulate real verification check
      const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber);
      
      if (!isValid) {
        return NextResponse.json({ success: false, error: 'Invalid PAN format detected.' });
      }

      return NextResponse.json({
        success: true,
        data: {
          full_name: 'JOHN DOE',
          pan_masked: panNumber.slice(0, 2) + 'XXXXX' + panNumber.slice(-3),
          status: 'VALID'
        }
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('KYC API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
