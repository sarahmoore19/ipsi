from app.models import db, environment, SCHEMA, ProductImage
from sqlalchemy.sql import text

# Adds a demo user, you can add other ProductImages here if you want
def seed_product_images():
    demo1 = ProductImage(
        url='https://m.media-amazon.com/images/I/61WXqyE3lRL._AC_SY355_.jpg',
        product_id=1)
    demo2 = ProductImage(
        url='https://www.jadorelesfleurs.com/dashboard/uploads/products/700_4c6bd359.jpg',
        product_id=1)
    demo3 = ProductImage(
        url='https://www.1800flowers.com/blog/wp-content/uploads/2017/03/single-red-rose.jpg',
        product_id=2)


    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the ProductImages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
