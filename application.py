import os
import requests

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

votes = {"yes": 0, "no": 0, "maybe": 0 }

@app.route("/")
def index():
    return render_template('index.html', votes=votes)

#Get the value of votes from the client.
@socketio.on("submit vote")
def vote(data):
    selection = data['selection']

    #update the value of votes.
    votes[selection] += 1

    #Send the value of the votes to the client.
    emit('vote totals', votes, broadcat=True)
