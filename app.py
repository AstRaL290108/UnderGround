from flask import Flask
from flask import request, make_response
from flask import jsonify
from flask import render_template, url_for

from flask_cors import CORS

import pymysql

import config
import function



app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = "Content-Type"


#Код клиента
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/articls")
def all_articls():
    #db = pymysql.connect(database=config.database, user=config.user, password=config.password, host=config.host, port=3306)
    db = pymysql.connect(database="undeground_db", user="root", password="root")
    cur = db.cursor()

    articls = function.GetAllArticls(db, cur)
    articls = function.FormtAllArticls(articls)

    cur.close()
    db.close()

    return render_template("all_articls.html", data=articls)


@app.route("/articls/<string:url>")
def articl(url):
    #db = pymysql.connect(database=config.database, user=config.user, password=config.password, host=config.host, port=3306)
    db = pymysql.connect(database="undeground_db", user="root", password="root", host="localhost")
    cur = db.cursor()

    articl = function.GetArticl(db, cur, url)

    cur.close()
    db.close()

    return render_template("articl.html", data=articl[0])


@app.route("/contacts")
def contacts():
    return render_template("contacts.html")


@app.route("/about-us")
def about_us():
    return render_template("about-us.html")



@app.route("/profile")
def profile():
    return render_template("profile.html")



#Регистрация
@app.route("/account/register/<int:step>")
def register_one(step):
    if step == 1:
        return render_template("register_StepOne.html")
    elif step == 2:
        return render_template("register_StepTwo.html")


@app.route("/account/register/<int:step>/<string:login>")
def register_two(step, login):
    if step == 2:
        return render_template("register_StepTwo.html")


#Вход
@app.route("/account/login")
def ShowLoginPage():
    return render_template("login.html")




#Код сервера
@app.route("/server/get-comment", methods=['POST'])
def get_comment():
    #db = pymysql.connect(database=config.database, user=config.user, password=config.password, host=config.host, port=3306)
    db = pymysql.connect(database="undeground_db", user="root", password="root")
    cur = db.cursor()

    data = request.get_json()

    comments = function.GetComments(db, cur, data["articl-title"])
    comments = function.FormtAllArticls(comments)

    otv = make_response(comments)

    cur.close()
    db.close()

    return otv


@app.route("/server/add-comment", methods=['POST'])
def add_comment():
    #db = pymysql.connect(database=config.database, user=config.user, password=config.password, host=config.host, port=3306)
    db = pymysql.connect(database="undeground_db", user="root", password="root")
    cur = db.cursor()

    data = request.get_json()

    function.AddComment(db, cur, data)

    cur.close()
    db.close()

    return "nice"


@app.route("/server/add-main-info", methods=['POST'])
def add_main_info():
    #db = pymysql.connect(database=config.database, user=config.user, password=config.password, host=config.host, port=3306)
    db = pymysql.connect(database="undeground_db", user="root", password="root")
    cur = db.cursor()

    data = request.get_json()
    res1 = function.CheckUSERNAME(db, cur, data['username'])
    if res1 is None:
        res2 = function.CheckLOGIN(db, cur, data['login'])
        if res2 is None:
            function.AddMainInfo(db, cur, data)
            cur.close()
            db.close()

            return f"http://localhost:8080/account/register/2/{data['login']}"
        else:
            return "412"#Логин уже существует
    else:
        return "411"#Юзернейм уже существует


@app.route("/server/chek-litter", methods=['POST'])
def ChekLitter():
    #db = pymysql.connect(database=config.database, user=config.user, password=config.password, host=config.host, port=3306)
    db = pymysql.connect(database="undeground_db", user="root", password="root")
    cur = db.cursor()

    data = request.get_json()

    res = function.check_litter(db, cur, data)

    if res == "yes":
        user_data = function.get_user(db, cur, data['login'])
        body_ = {
            'username': user_data[0][0],
            'login': user_data[0][1],
            'password': user_data[0][2]
        }

        body_ = jsonify(body_)
    elif res == "NOT!!!":
        body_ = {
            'username': '413',
        }

        body_ = jsonify(body_)


    cur.close()
    db.close()

    print(body_)
    return make_response(body_)


@app.route("/server/login", methods=['POST'])
def LOGIN():
    #db = pymysql.connect(database=config.database, user=config.user, password=config.password, host=config.host, port=3306)
    db = pymysql.connect(database="undeground_db", user="root", password="root")
    cur = db.cursor()

    data = request.get_json()

    resp = function.login(db, cur, data)
    print(resp)

    cur.close()
    db.close()

    if resp[0] != "e":
        body_ = {
            'username': resp[1],
            'login': resp[0],
            'password': data['password']
        }

        body_ = jsonify(body_)
        return make_response(body_)
    else:
        body_ = {
            'username': resp
        }

        body_ = jsonify(body_)
        return make_response(body_)



#Код админки
@app.route("/admin")
def send_admin():
    pass


@app.route("admin/articl/add")
def admin_articl_add():
    pass


if __name__ == "__main__":
    app.run(port=8080)