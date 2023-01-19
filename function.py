import smtplib
import config
import random


def SendLitter(mail, key):
    pass
    # smtpObj = smtplib.SMTP('smtp.yandex.ru', 587)
    # smtpObj.starttls()
    
    # smtpObj.login(config.login, config.mail_password)
    # smtpObj.sendmail(to_addrs=mail, msg=str(key), from_addr=config.login)
        

def GetAllArticls(db, cur): 
    req = "SELECT title, description, preview, url FROM `articls`"
    cur.execute(req)
    db.commit()
    
    articls = cur.fetchall()
    print(articls)
    return articls


def GetArticl(db, cur, url):
    req = f"SELECT title, text_content FROM `articls` WHERE url = '{url}'"
    cur.execute(req)
    db.commit()
    
    articls = cur.fetchmany()
    
    
    return articls


def FormtAllArticls(articls):
    articls = list(articls)
    for i in range(len(articls)):
        articls[i] = list(articls[i])
        
    articls = str(articls)
    articls = articls.replace("'", '"')
    
    return articls


def GetComments(db, cur, articl_title):
    req = f"SELECT username, comment_text FROM `comments` WHERE articl_title = '{articl_title}'"
    cur.execute(req)
    db.commit()
    
    resp = cur.fetchall()
    
    return resp


def AddMainInfo(db, cur, data_json):
    key = random.randint(0, 1000)
    
    req = f"INSERT INTO `users`(username, login, approved, password) VALUES ('{data_json['username']}', '{data_json['login']}', 0, '{data_json['password']}')"
    cur.execute(req)
    db.commit()
    
    req = f"INSERT INTO `req_to_reg`(login, mail_key) VALUES('{data_json['login']}', {key})"
    cur.execute(req)
    db.commit()
    
    SendLitter(data_json['login'], key)
    print(data_json['login'], key)
    
    
def check_litter(db, cur, data):
    print(data)
    req1 = f"SELECT mail_key FROM req_to_reg WHERE login = '{data['login']}'"
    cur.execute(req1)
    db.commit()
    
    mail_key = cur.fetchone()
    print(mail_key)
    
    
    if str(mail_key[0]) == str(data['input-key']):
        req = f"DELETE FROM req_to_reg WHERE login = '{data['login']}'"
        cur.execute(req)
        db.commit()
        
        req = f"UPDATE users SET approved = 1 WHERE login = '{data['login']}'"
        cur.execute(req)
        db.commit()
        
        return "yes"
        
    else:
        return "NOT!!!"
    
    
    
def get_user(db, cur, login): 
    req = f"SELECT username, login, password FROM `users` WHERE login = '{login}'"
    cur.execute(req)
    db.commit()
    
    data = cur.fetchmany()
    print(data)
    
    return data


def CheckUSERNAME(db, cur, input_usename):
    req = "SELECT username FROM `users`"
    cur.execute(req)
    db.commit()
    
    all_username = cur.fetchall()
    if str(all_username) == "()":
        return None
    else: 
        for i in all_username:
            if i[0] == input_usename:
                return "false"
        
    return None
            
            
            
def CheckLOGIN(db, cur, input_usename):
    req = "SELECT login FROM `users`"
    cur.execute(req)
    db.commit()
    
    all_username = cur.fetchall()
    if str(all_username) == "()":
        return None
    else: 
        for i in all_username:
            if i[0] == input_usename:
                return "false"
        
    return None
            
            
            
def AddComment(db, cur, data):
    req = f"INSERT INTO `comments`(articl_title, username, comment_text) VALUES('{data['articl-title']}', '{data['username']}', '{data['text']}')"
    cur.execute(req)
    db.commit()
    
    
    
def login(db, cur, data):
    req1 = f"SELECT password FROM `users` WHERE login = '{data['login']}'"
    cur.execute(req1)
    db.commit()
    now_password = cur.fetchone()
    
    print(f"{now_password}")
    
    if now_password is None:
        return "e421"
    elif now_password[0] != data['password']:
        return "e422"
    else:
        req = f"SELECT login, username FROM `users` WHERE password = '{data['password']}'"
        cur.execute(req)
        db.commit()
        
        resp = cur.fetchmany()
        return resp[0]
    
    
def AdminGetAllUser(db, cur):
    req = "SELECT id, username, login, password FROM `users`"
    cur.execute(req)
    db.commit()
    
    return FormtAllArticls(cur.fetchall())