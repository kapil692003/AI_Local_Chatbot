import pandas as pd
from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate

# Load Excel Data
def load_excel_data(file_path):
    df = pd.read_excel(file_path)  # Reading Excel data using pandas
    return df

# Convert the DataFrame to a readable string
def convert_excel_to_string(df):
    return df.to_string(index=False)

template  = """
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

# Function to handle conversation
def handle_conversation():
    context = f"Here is the data from the Excel sheet:\n{excel_data_str}\n"  # Initial context with Excel data
    print("Welcome to the AI ChatBot! Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break

        # Query the model based on the conversation context and user input
        result = chain.invoke({"context": context, "question": user_input})
        print("Bot: ", result)

        # Update the context with user input and model's answer
        context += f"\nUser: {user_input}\nAI: {result}"

if __name__ == "__main__":
    handle_conversation()
