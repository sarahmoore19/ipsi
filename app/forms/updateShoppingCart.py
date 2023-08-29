from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange

class UpdateShoppingCartForm(FlaskForm):
    quantity = IntegerField(validators=[DataRequired(), NumberRange(min=1)])
