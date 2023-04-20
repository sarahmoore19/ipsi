from app.models import db, environment, SCHEMA, Store
from sqlalchemy.sql import text

# Adds a demo user, you can add other stores here if you want
def seed_stores():
    demo1 = Store(
        name='Store 1',
        description='random description here random description here',
        user_id=1)
    demo2 = Store(
        name='Store 2',
        description='random description here random description here',
        user_id=1)
    marnie = Store(
        name='Store 3',
        description='random description here random description here',
        user_id=2)
    bobbie = Store(
        name='Store 4',
        description='random description here random description here',
        user_id=3)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the stores table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stores():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stores RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stores"))

    db.session.commit()
