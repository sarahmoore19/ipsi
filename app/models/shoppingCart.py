from .db import db, environment, SCHEMA, add_prefix_for_prod

class ShoppingCart(db.Model):
  __tablename__ = 'shopping_carts'
  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  quantity = db.Column(db.Integer, default=1)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

  user = db.relationship('User', back_populates='shopping_carts')
  product = db.relationship('Product', back_populates='shopping_carts')


  def to_dict(self):
    return {
      'id': self.id,
      'quantity': self.quantity,
      'productId': self.product_id,
      'userId': self.user_id
    }
