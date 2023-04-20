from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Store, Product, ProductImage
from ..forms import ProductForm, UpdateProductForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename

product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@product_routes.route('/all')
@login_required
def all_products():
  products = Product.query.all()
  return [product.to_dict() for product in products]

@product_routes.route('store/<int:storeId>')
@login_required
def store_products(storeId):
  products = Product.query.filter(Product.store_id == storeId).all()
  return [product.to_dict() for product in products]

@product_routes.route('/<int:productId>')
@login_required
def product(productId):
  product = Product.query.get(productId)
  productDict = product.to_dict()
  productDict['images'] = [p.to_dict() for p in product.images]
  return productDict

@product_routes.route('/', methods=['POST'])
@login_required
def post_store():
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    image = form.data["mainImage"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    if "url" not in upload:
        return {'errors': upload}, 401
    url = upload["url"]

    product = Product(
      name = form.data['name'],
      description = form.data['description'],
      price = form.data['price'],
      main_image = url,
      user_id = current_user.id,
      store_id = form.data['storeId']
    )

    db.session.add(product)
    db.session.commit()
    return product.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route('/<int:productId>', methods=['PUT'])
@login_required
def update_store(productId):
  product = Product.query.get(productId)
  form = UpdateProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    if form.data['mainImage']:
      image = form.data["mainImage"]
      image.filename = get_unique_filename(image.filename)
      upload = upload_file_to_s3(image)
      if "url" not in upload:
          return {'errors': upload}, 401
      url = upload["url"]
      product.main_image = url

    if form.data['name']: product.name = form.data['name']
    if form.data['description']: product.description = form.data['description']
    if form.data['price']: product.price = form.data['price']

    db.session.commit()
    return product.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@product_routes.route('/<int:productId>', methods=['DELETE'])
@login_required
def delete_store(productId):
  product = Product.query.get(productId)
  db.session.delete(product)
  db.session.commit()
  return {"message": "successfully deleted product"}
