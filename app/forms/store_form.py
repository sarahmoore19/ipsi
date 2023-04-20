from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class StoreForm(FlaskForm):
    name = StringField(validators=[DataRequired(), Length(max=255)])
    description = StringField(validators=[DataRequired(), Length(max=255)])
    mainImage = FileField(validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
