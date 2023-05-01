from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange, Optional
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class UpdateProductForm(FlaskForm):
    name = StringField(validators=[Length(max=60)])
    description = StringField(validators=[Length(max=255)])
    price = FloatField(validators=[Optional(), NumberRange(min=0)])
    mainImage = FileField(validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
