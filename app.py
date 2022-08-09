from flask import Flask, render_template, redirect

app = Flask(__name__)


@app.route('/')
def main():
    return render_template('markup.html')


@app.errorhandler(404)
def another(error):
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True)
