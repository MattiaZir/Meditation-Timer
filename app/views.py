from flask import Flask, render_template, redirect, request, url_for, session
from app import app

#TODO Change every "make_response()" to "send_file()", remove the .read()
"""@app.before_request
def before_request():
    initialize_db()

@app.teardown_request
def teardown_request(exception):
    db.close()"""

@app.route("/")
def index():
    return render_template("index.html", title="Meditation Timer")

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "logged_in" in session:
            return f(*args, **kwargs)
        else:
            flash("Please Log-in first")
            return redirect(url_for('login'))
    return decorated_function
