from datetime import date


class FuelRecord:
    id: int
    date: str
    fuel_type: str
    fuel_amount: float
    fuel_cost: float
    username: str
    file_path: str
    file_type: str
    vehicle_id: int
    next_id = 0

    def __init__(self, fuel_type, fuel_amount, fuel_cost, username, vehicle_id, file_path, file_type):
        self.id = FuelRecord.next_id
        self.date = date.today().strftime("%d/%m/%Y")
        self.fuel_type = fuel_type
        self.fuel_amount = fuel_amount
        self.fuel_cost = fuel_cost
        self.username = username
        self.vehicle_id = vehicle_id
        self.file_path = file_path
        self.file_type = file_type
        FuelRecord.next_id += 1

    def __str__(self):
        return f"Id: {self.id} Date: {self.date}, Fuel type: {self.fuel_type}, Fuel amount: {self.fuel_amount}, Fuel cost: {self.fuel_cost}, Username: {self.username}, Vehicle Id: {self.vehicle_id}, File path: {self.file_path}, File type: {self.file_type}"

    def to_json(self):
        return {
            "id": self.id,
            "date": self.date,
            "fuel_type": self.fuel_type,
            "fuel_amount": self.fuel_amount,
            "fuel_cost": self.fuel_cost,
            "username": self.username,
            "vehicle_id": self.vehicle_id,
            "file_path": self.file_path,
            "file_type": self.file_type
        }


fuel_records = []
