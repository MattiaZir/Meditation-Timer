from flask import Flask, flash, render_template, redirect, request, url_for, session
from models import *
from functools import wraps
app = Flask(__name__)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "logged_in" in session:
            return f(*args, **kwargs)
        else:
            flash("Please Log-in first")
            return redirect(url_for('login'))
    return decorated_function

@app.before_request
def before_request():
    initialize_db()

@app.teardown_request
def teardown_request(exception):
    db.close()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    return url_for("index")

@app.route("/stats")
@login_required
def stats():
    return render_template("stats.html")

@app.route("/new_time")
@login_required
def newStat(time_started, time_finished):
    redirect(url_for("index"))

if __name__ == "__main__":
    app.run()