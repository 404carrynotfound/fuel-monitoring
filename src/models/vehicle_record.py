class VehicleRecord:
    id: int
    register_number: str
    username: str
    next_id = 0

    def __init__(self, register_number, username):
        self.id = VehicleRecord.next_id
        self.register_number = register_number
        self.username = username
        VehicleRecord.next_id += 1

    def to_json(self):
        return {'id': self.id, 'registerNumber': self.register_number, 'username': self.username}


vehicles = [VehicleRecord('KA-01-HH-1234', 'user'), VehicleRecord('KA-01-HH-9999', 'admin')]
