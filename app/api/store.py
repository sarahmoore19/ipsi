from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Store, Product, ProductImage
from ..forms import StoreForm, UpdateStoreForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename

store_routes = Blueprint('stores', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:

        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@store_routes.route('/user')
@login_required
def stores():
  stores = Store.query.filter(Store.user_id == current_user.id).all()
  return [store.to_dict() for store in stores]

@store_routes.route('/<int:storeId>')
@login_required
def store(storeId):
  store = Store.query.get(storeId)
  storeDict = store.to_dict()
  storeDict['products'] = [p.to_dict() for p in store.products]
  return storeDict

@store_routes.route('', methods=['POST'])
@login_required
def post_store():
  form = StoreForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    image = form.data["mainImage"]
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    if "url" not in upload:
        return {'errors': [upload]}, 401
    url = upload["url"]

    store = Store(
      name = form.data['name'],
      description = form.data['description'],
      main_image = url,
      user_id = current_user.id
    )

    db.session.add(store)
    db.session.commit()
    return store.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@store_routes.route('/<int:storeId>', methods=['PUT'])
@login_required
def update_store(storeId):
  store = Store.query.get(storeId)
  form = UpdateStoreForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():

    if form.data['mainImage']:
      image = form.data["mainImage"]
      image.filename = get_unique_filename(image.filename)
      upload = upload_file_to_s3(image)
      if "url" not in upload:
          return {'errors': [upload]}, 401
      url = upload["url"]
      store.main_image = url

    if form.data['name']: store.name = form.data['name']
    if form.data['description']: store.description = form.data['description']

    db.session.commit()
    return store.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@store_routes.route('/<int:storeId>', methods=['DELETE'])
@login_required
def delete_store(storeId):
  store = Store.query.get(storeId)
  db.session.delete(store)
  db.session.commit()
  return {"message": "successfully deleted store"}
