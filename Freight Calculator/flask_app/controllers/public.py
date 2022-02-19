from flask_app import app
from flask import render_template, redirect, session, request, flash
from flask_app.models.user import User
# other Models
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/create_user", methods=["POST"])
def create_users():
    if not User.validate_user(request.form):
        return redirect('/register')
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    print(pw_hash)
    data = {
        "firstName": request.form['firstName'],
        "lastName": request.form['lastName'],
        "email": request.form['email'],
        "password": pw_hash
    }
    User.create_user(data)
    user_in_db = User.get_by_email(data)
    session['logged_in'] = True
    session['user_id'] = user_in_db.id
    session['firstName'] = user_in_db.first_name
    return redirect("/private_calculator")

@app.route('/login_user', methods=['POST'])
def login_user():
    # see if the email provided exists in the database
    data = { "email" : request.form["email"] }
    user_in_db = User.get_by_email(data)
    # user is not registered in the db
    if not user_in_db:
        flash("Invalid email/Password")
        return redirect("/")
    if not bcrypt.check_password_hash(user_in_db.password, request.form['password']):
        # if we get False after checking the password
        flash("Invalid email/Password")
        return redirect('/')
    # if the passwords matched, we set the user_id into session
    session['user_id'] = user_in_db.id
    session['firstName'] = user_in_db.first_name
    session['logged_in'] = True
    # never render on a post!!!
    return redirect("/private_calculator")