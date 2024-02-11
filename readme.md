# Application Documentation

## Overview

This application is a backend service built with Python and Flask. It provides APIs for managing authentication, fuel,
and vehicle data.

## Dependencies

The application has the following dependencies:

- Python
- Flask
- Flask-CORS
- PyJWT
- Werkzeug

## API Endpoints

### Authentication

- **POST /login**: Authenticate a user. The request body should contain a JSON object with `username` and `password` fields. If the authentication is successful, a JWT token is returned in the response. This token should be included in the `Authorization` header for subsequent requests to protected endpoints.

- **POST /register**: Register a new user. The request body should contain a JSON object with `username` and `password` fields. If the registration is successful, a JWT token is returned in the response.

### Fuel

- **GET /fuel**: Get all fuel data. This endpoint returns a list of all fuel data stored. Each fuel record includes the fuel type, amount, cost, associated vehicle, and a link to the uploaded receipt.

- **POST /fuel**: Add new fuel data. The request body should contain a required fields (`fuelType`, `fuelAmount`, `fuelCost`, `vehicleId`). The data is validated before it is stored. The request should also include an image file of the receipt.

- **GET /fuel/download/{record_id}**: Download the receipt for a specific fuel record. The `record_id` should be replaced with the ID of the desired fuel record.

- **GET /fuel/my-records**: Get all fuel records for the authenticated user. This endpoint returns a list of all fuel records associated with the authenticated user.

- **GET /fuel/{record_id}**: Get a specific fuel record. The `record_id` should be replaced with the ID of the desired fuel record.

- **DELETE /fuel/{record_id}**: Delete a specific fuel record. The `record_id` should be replaced with the ID of the fuel record to be deleted.

- **GET /fuel/daily**: Get the total cost of fuel for the current day. This endpoint returns the sum of the `fuelCost` field for all fuel records with a date matching the current day.

- **GET /fuel/monthly**: Get the total cost of fuel for the current month. This endpoint returns the sum of the `fuelCost` field for all fuel records with a date matching the current month.

- **GET /fuel/yearly**: Get the total cost of fuel for the current year. This endpoint returns the sum of the `fuelCost` field for all fuel records with a date matching the current year.

### Vehicle

- **GET /vehicle**: Get all vehicle data. This endpoint returns a list of all vehicle data stored.

- **POST /vehicle**: Add new vehicle data. The request body should contain a JSON object with the required fields. The data is validated before it is stored.

- **GET /vehicle/{vehicle_id}**: Get a specific vehicle record. The `vehicle_id` should be replaced with the ID of the desired vehicle record. If the vehicle is not found, a 404 status code and an error message are returned. If the vehicle is found, the vehicle data is returned.

- **GET /vehicle/my-vehicles**: Get all vehicle records for the authenticated user. This endpoint returns a list of all vehicle records associated with the authenticated user.

- **DELETE /vehicle/{id}**: Delete vehicle data for the given ID. This endpoint deletes the vehicle data with the given ID.

Please note that all these endpoints are protected and require a valid JWT token in the `Authorization` header of the HTTP request. If the token is not valid or not present, the application returns a 401 status code and an error message.
## Error Handling

The application returns a JSON response with an `error` field and HTTP status code in case of an error. For example, if
a request is made to an endpoint that does not exist, the application will return a 404 status code and a response like:

```json
{
  "error": "Not Found"
}
```

In case of a server error, the application will return a 500 status code.

## Security

The application uses JWT for user authentication. When a user logs in, the application returns a token that the user can
use to authenticate subsequent requests. The token is stored in the `Authorization` header of the HTTP request. The
application verifies the token before processing the request. If the token is not valid or not present, the application
returns a 401 status code and an error message.
