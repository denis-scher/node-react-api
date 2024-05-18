This is an API project i made with Node.js and React.js, this API allows for user registration and sends an OTP code to the user's email address.

To start, run "npm run dev" command (it will start both the server and the client sides).

I've used Mongo Atlas as the data server, WeatherAPI for the code generation (fetch the temprature of 3 random cities and concatenate the to make a 6 digit code).
Additionaly, i've used the SendGrid API to send the emails.

The API runs on port 4000 and the client side on port 3000.
