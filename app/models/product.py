from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
  __tablename__ = 'products'
  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  price = db.Column(db.Float, nullable=False)
  main_image = db.Column(db.String)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  store_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stores.id')), nullable=False)

  store = db.relationship('Store', back_populates='products')
  images = db.relationship('ProductImage', back_populates='product', cascade="all, delete-orphan")

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'price': self.price,
      'mainImage': self.main_image,
      'userId': self.user_id,
      'storeId': self.store_id
    }
