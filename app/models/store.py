from .db import db, environment, SCHEMA, add_prefix_for_prod

class Store(db.Model):
  __tablename__ = 'stores'
  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(255), nullable=False)
  main_image = db.Column(db.String)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

  user = db.relationship('User', back_populates='stores')
  products = db.relationship('Product', back_populates='store', cascade="all, delete-orphan")

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'mainImage': self.main_image,
      'userId': self.user_id
    }
