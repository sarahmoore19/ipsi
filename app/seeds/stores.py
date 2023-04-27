from app.models import db, environment, SCHEMA, Store
from sqlalchemy.sql import text

# Adds a demo user, you can add other stores here if you want
def seed_stores():
    demo1 = Store(
        name="Marianne's Boutique",
        main_image="https://hips.hearstapps.com/hmg-prod/images/fashion-boutique-apr-humbert-poyet-aquazzura-soho-ny-c-charlie-chuck-4-1568405130.jpg?crop=1.00xw:0.721xh;0,0.279xh&resize=980:*",
        description='Find the cutest outfits and accessories here, and be the star of the show.',
        user_id=1)
    demo2 = Store(
        name='La Vie En Rose',
        main_image="file:///C:/Users/sarah/Downloads/garden1.jpg",
        description='Romantic and whimiscal shop with beautiful items.',
        user_id=1)
    demo3 = Store(
        name="Tammy's Creations",
        main_image="https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/630/354/75/dam/wdpro-assets/things-to-do/more/shops/downtown-disney/basin/basin-01.jpg?1675457108895",
        description='Handcrafted artisan items, perfect for special gifts or yourself.',
        user_id=1)
    demo4= Store(
        name="Clara's Candles",
        main_image="https://cdn.shopify.com/s/files/1/0061/8351/8275/files/illuminations-story-img02.jpg?v=1574290375",
        description='Candles made from non-toxic soy wax and essential oils, choose from over 50 scents.',
        user_id=1)
    marnie = Store(
        name="Penny's Purses",
        main_image="https://retaildesignblog.net/wp-content/uploads/2017/01/Mon-Purse-by-FormRoom-London-UK-720x480.jpg",
        description='Designer purses of all styles, colors, and sizes. Sustainably sourced leather.',
        user_id=2)
    bobbie = Store(
        name="Bella's Bakery",
        main_image="https://i.pinimg.com/originals/3b/a7/ff/3ba7ff9e5b438a366e9a211270f3fc76.jpg",
        description='Gourmet french inspired baked good in lucding macarons, croissants, pastries, and more.',
        user_id=3)

    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
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
