from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Store, Product, ProductImage
from ..forms import ProductImageForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename

product_image_routes = Blueprint('product-images', __name__)

@product_image_routes.route('/')
@login_required
def a():
    pass
