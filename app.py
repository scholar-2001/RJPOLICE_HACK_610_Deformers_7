from flask import Flask, request, redirect, url_for, render_template, jsonify, session
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from flask_cors import CORS 
  

app = Flask(__name__)
db = SQLAlchemy()
bcyrpt = Bcrypt(app)

def get_uuid():
    return uuid4().hex

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# creating the table  
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(32), unique=True, primary_key=True, default=get_uuid)
    name = db.Column(db.String(25), unique=False, nullable=False)
    password = db.Column(db.Text, nullable=False)

app.config.from_object(ApplicationConfig)
db.init_app(app)

# username and password for authentication 
with app.app_context():
    db.create_all()
    user_1 = User(name='admin', password=bcyrpt.generate_password_hash('adminpassword@2004').decode('utf-8'))
    user_2 = User(name='niketa sengar', password=bcyrpt.generate_password_hash('niketapassword@2004').decode('utf-8'))

# created the session for the user
    db.session.add_all([user_1, user_2])
    db.session.commit()


# authentication logic for loging into the portal
def authenticated_user(name, password):
    user = User.query.filter_by(name=name).first()
    if user and bcyrpt.check_password_hash(user.password, password):
        # Store user name in session after successful authentication
        session['user_name'] = user.name
        return user
    return None


@app.route('/login', methods=['POST','GET'])
def login():
    if request.method == 'GET':
        # Handle GET request
        name = request.args.get('name')
        password = request.args.get('password')

    elif request.method == 'POST':
        # Handle POST request
        data = request.json
        name = data.get('name')
        password = data.get('password')

    authenticate_user = authenticated_user(name, password)

    if authenticate_user:
        return redirect(url_for('crm_portal'))
    else:
        return jsonify({'error': 'Authentication failed'}), 401



@app.route('/portal')
def crm_portal():
    # Retrieve user name from the session
    user_name = session.get('user_name', None)
    if user_name:
        # Pass user name to the template
        return render_template('index.html', user_name=user_name)
    else:
        return redirect(url_for('login'))
    

# redirect to login page after loging out
@app.route("/logout")
def logout():
    session["user_name"] = None
    return redirect("/login")


if __name__ == "__main__":
    app.run(debug=True)
