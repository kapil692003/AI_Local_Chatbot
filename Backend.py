import pandas as pd
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load Excel Data
def load_excel_data(file_path):
    df = pd.read_excel(file_path)  # Reading Excel data using pandas
    return df

# Convert the DataFrame to a readable string
def convert_excel_to_string(df):
    return df.to_string(index=False)

# Define the function to process the message
def process_message(input_message):
    template = """
    Answer the question below.

    Here is the conversation history: {context}

    Question: {question}

    Answer:
    """

    model = OllamaLLM(model="llama3")
    prompt = ChatPromptTemplate.from_template(template) 
    chain = prompt | model

    # Specify the Excel file path here
    file_path = 'BengaluruSummitStartupInfo.xlsx'  # Modify this path to point to your Excel file

    # Load the Excel sheet data (using the file path)
    excel_data = load_excel_data(file_path)
    excel_data_str = convert_excel_to_string(excel_data)

    # Initialize the context with the Excel data
    context = f"Here is the data from the Excel sheet:\n{excel_data_str}\n"

    # Query the model based on the conversation context and user input
    result = chain.invoke({"context": context, "question": input_message})

    return result

@app.route('/chat', methods=['POST'])
def chat():
    # Get the message from the request (sent by React frontend)
    user_message = request.json.get('message')

    if user_message:
        # Process the message using your backend logic (Llama 3 model)
        bot_response = process_message(user_message)
        return jsonify({'reply': bot_response})  # Return the bot's response to React

    return jsonify({'error': 'No message provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)
