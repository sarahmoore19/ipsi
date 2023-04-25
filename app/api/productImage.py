from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Store, Product, ProductImage
from ..forms import ProductImageForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename

product_image_routes = Blueprint('product-images', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@product_image_routes.route('', methods=['POST'])
@login_required
def post_product_image():
  form = ProductImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    image = form.data["image"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    if "url" not in upload:
        return {'errors': [upload['errors']]}, 401
    url = upload["url"]

    productImage = ProductImage(
      url = url,
      product_id = form.data['productId']
    )

    db.session.add(productImage)
    db.session.commit()
    return productImage.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@product_image_routes.route('/<int:productImageId>', methods=['DELETE'])
@login_required
def delete_product_image(productImageId):
  productImage = ProductImage.query.get(productImageId)
  responseObj = productImage.to_dict()
  db.session.delete(productImage)
  db.session.commit()
  return responseObj
