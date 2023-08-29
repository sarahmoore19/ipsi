from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length

class ShoppingCartForm(FlaskForm):
    productId = IntegerField(validators=[DataRequired()])
