from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, ShoppingCart
from ..forms import ShoppingCartForm, UpdateShoppingCartForm

shopping_cart_routes = Blueprint('shopping-carts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@shopping_cart_routes.route('/user')
def user_shopping_cart():
  shoppingCarts = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id).all()
  return [shoppingCart.to_dict() for shoppingCart in shoppingCarts]

@shopping_cart_routes.route('/user', methods=['POST'])
@login_required
def post_shopping_cart():
  form = ShoppingCartForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    shoppingCart = ShoppingCart(
      user_id = current_user.id,
      product_id = form.data['productId']
    )

    db.session.add(shoppingCart)
    db.session.commit()
    return shoppingCart.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@shopping_cart_routes.route('/<int:shoppingCartId>', methods=['PUT'])
@login_required
def update_shopping_cart(shoppingCartId):
  shoppingCart = ShoppingCart.query.get(shoppingCartId)
  form = UpdateShoppingCartForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    shoppingCart.quantity = form.data['quantity']

    db.session.commit()
    return shoppingCart.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@shopping_cart_routes.route('/<int:shoppingCartId>', methods=['DELETE'])
@login_required
def delete_shopping_cart(shoppingCartId):
  shoppingCart = ShoppingCart.query.get(shoppingCartId)
  db.session.delete(shoppingCart)
  db.session.commit()
  return {"message": "successfully deleted shopping cart"}
