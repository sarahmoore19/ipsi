from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class ProductForm(FlaskForm):
    name = StringField(validators=[DataRequired(), Length(max=50)])
    description = StringField(validators=[DataRequired(), Length(max=255)])
    price = FloatField(validators=[DataRequired(), NumberRange(min=0)])
    mainImage = FileField(validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    storeId = IntegerField(validators=[DataRequired()])
