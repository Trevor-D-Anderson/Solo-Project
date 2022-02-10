from flask_app import app
from flask import render_template, redirect, session, request, flash
from flask_app.models.user import User
# other Models
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)

@app.route("/dashboard")
def dashboard():
    if session.get('logged_in') == "none":
        return redirect("/")
    if not session.get('logged_in') == True:
        return redirect("/")
    id = {"id": session['user_id']}
    return render_template('dashboard.html')