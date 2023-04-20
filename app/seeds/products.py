from app.models import db, environment, SCHEMA, Product
from sqlalchemy.sql import text

# Adds a demo user, you can add other products here if you want
def seed_products():
    demo1 = Product(
        name='Product 1',
        description='random description here random description here',
        price=7.99,
        user_id=1,
        store_id=1)
    demo2 = Product(
        name='Product 2',
        description='random description here random description here',
        price=15.99,
        user_id=1,
        store_id=1)
    demo3 = Product(
        name='Product 3',
        description='random description here random description here',
        price=109.99,
        user_id=1,
        store_id=2)
    demo4 = Product(
        name='Product 4',
        description='random description here random description here',
        price=0.99,
        user_id=1,
        store_id=2)
    marnie = Product(
        name='Product 5',
        description='random description here random description here',
        price=1003.99,
        user_id=2,
        store_id=3)
    bobbie = Product(
        name='Product 6',
        description='random description here random description here',
        price=2.99,
        user_id=3,
        store_id=4)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the products table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
