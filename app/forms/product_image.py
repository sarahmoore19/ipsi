from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class ProductImageForm(FlaskForm):
    image = FileField(validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
