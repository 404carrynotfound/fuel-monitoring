import os
import uuid
from pathlib import Path

from werkzeug.utils import secure_filename

BASE_DIR = Path(os.path.dirname(__file__)).parent.parent.absolute()
UPLOADS_DIR = os.path.join(BASE_DIR, 'uploads')


def save_to_file(user, file):
    try:
        user_dir = get_user_dir(user)

        original_filename = secure_filename(file.filename)
        filename, file_extension = os.path.splitext(original_filename)

        new_filename = uuid.uuid4().hex + file_extension

        file_path = os.path.join(user_dir, new_filename)

        file.save(file_path)

        return file_path
    except Exception as e:
        print(f"An error occurred while saving the file: {e}")
    return ''


def delete_file(file_path):
    try:
        os.remove(file_path)
    except Exception as e:
        print(f"An error occurred while deleting the file: {e}")


def get_user_dir(user):
    user_dir = os.path.join(UPLOADS_DIR, user)
    if not os.path.exists(user_dir):
        os.makedirs(user_dir)

    return user_dir
