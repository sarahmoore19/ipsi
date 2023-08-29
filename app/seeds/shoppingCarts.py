from app.models import db, environment, SCHEMA, ShoppingCart
from sqlalchemy.sql import text

# Adds a demo user, you can add other ProductImages here if you want
def seed_shopping_carts():
    demo1 = ShoppingCart(
        user_id=1,
        product_id=1)
    demo2 = ShoppingCart(
        user_id=1,
        product_id=2)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the ProductImages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shopping_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))

    db.session.commit()
