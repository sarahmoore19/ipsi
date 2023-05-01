from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class UpdateStoreForm(FlaskForm):
    name = StringField(validators=[Length(max=60)])
    description = StringField(validators=[Length(max=255)])
    mainImage = FileField(validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
