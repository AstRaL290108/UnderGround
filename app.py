from flask import Flask
from flask import request
from flask import render_template, url_for

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/articls")
def all_articls():
    return render_template("all_articls.html")


app.run(port=8080)