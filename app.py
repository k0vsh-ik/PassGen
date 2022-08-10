from flask import Flask, render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy
from random import randint

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///passgen.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Passwords(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer)

    def __repr__(self):
        return '<Password %r>' % self.id


@app.route('/', methods=['POST', 'GET'])
def main():
    if request.method == 'POST':
        amount = request.form['amount']
        status = checker(amount)

        pswd = genPass(genArray(), amount)

        record = Passwords(password=pswd)

        try:
            db.session.add(record)
            db.session.commit()
            return render_template('markup.html', record=record, status=status)

        except:
            return 'An error while recording'
            # TODO: alert (React)

    else:
        return render_template('markup.html', record='', status={'amount': 8, 'll': 'checked', 'sl': 'checked', 'numbers': 'checked', 'symbols': 'checked'})


def genArray():
    uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    lowercase = 'abcdefghijklmnopqrstuvwxyz'
    digits = '0123456789'
    symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
    totArr = ''

    if request.form.get("LargeLetters"):
        totArr += uppercase

    if request.form.get("SmallLetters"):
        totArr += lowercase

    if request.form.get("Numbers"):
        totArr += digits

    if request.form.get("Symbols"):
        totArr += symbols

    return totArr


def genPass(totArr, amount):
    passwd = ''

    if amount == '':
        return "Amount is empty!"
        # TODO: alert "amount is empty" (React)

    for i in range(int(amount)):
        passwd += totArr[randint(0, len(totArr) - 1)]

    return passwd


def checker(amount):
    status = {'amount': amount, 'll': 'checked', 'sl': 'checked', 'numbers': 'checked', 'symbols': 'checked'}

    if not request.form.get("LargeLetters"):
        status['ll'] = ''

    if not request.form.get("SmallLetters"):
        status['sl'] = ''

    if not request.form.get("Numbers"):
        status['numbers'] = ''

    if not request.form.get("Symbols"):
        status['symbols'] = ''

    return status


@app.errorhandler(404)
def another(error):
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)

# TODO: Empty choose should be changed (React)
# TODO: Button to clear the field (React)
# TODO: Heroku (Soon but not now)
# TODO: Users in DB (In future)
