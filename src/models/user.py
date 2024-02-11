class User:
    username: str
    password: str

    def __init__(self, username, password):
        self.username = username
        self.password = password


users = [User('user', 'user'), User('admin', 'admin')]
