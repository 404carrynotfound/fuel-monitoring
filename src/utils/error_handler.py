from app import app
from src.exceptions.not_found_exception import NotFoundException


@app.errorhandler(NotFoundException)
def page_not_found(e):
    return "Page not found", 404
