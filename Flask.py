from flask import Flask, request, jsonify
from flask_cors import CORS  # Importing CORS to handle cross-origin requests
from Backend import process_message

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    # Get the message from the request
    user_message = request.json.get('message')

    # Process the message using your backend logic (Llama 3 model)
    bot_response = process_message(user_message)

    # Return the processed response
    return jsonify({'reply': bot_response})

if __name__ == '__main__':
    app.run(debug=True)
