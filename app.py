from flask import Flask,request,redirect,url_for,render_template,abort,jsonify
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from config import ApplicationConfig
from flask_bcrypt import Bcrypt


app=Flask(__name__)
db=SQLAlchemy()
bcyrpt=Bcrypt(app)
def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__='users'
    id=db.Column(db.String(32),unique=True,primary_key=True,default=get_uuid)
    name=db.Column(db.String(25),unique=False,nullable=False)
    password=db.Column(db.Text,nullable=False)


app.config.from_object(ApplicationConfig)
db.init_app(app)

with app.app_context():
    db.create_all()

    user_1 = User(name='admin', password=bcyrpt.generate_password_hash('adminpassword@2004').decode('utf-8'))
    user_2 = User(name='niketa sengar', password=bcyrpt.generate_password_hash('niketapassword@2004').decode('utf-8'))
    
    db.session.add_all([user_1, user_2])
    db.session.commit()


def authenticated_user(name,password):
    user=User.query.filter_by(name=name).first()
    if user and bcyrpt.check_password_hash(user.password, password):
        return user
    return None

@app.route('/login', methods=['POST'])
def login():
    name=request.json.get('name')
    password=request.json.get('password')
    authenticate_user=authenticated_user(name,password)
    if authenticate_user:
        return redirect(url_for('sidebar.jsx'))
    else:
        return jsonify({'error': 'Authentication failed'}), 401

@app.route('/portal')
def crm_portal():
    return render_template('sidebar.jsx')

if __name__=="__main__":
    app.run(debug=True)
