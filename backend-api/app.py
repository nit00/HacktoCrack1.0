import google.generativeai as genai
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator



app = Flask(__name__)
cors = CORS(app)


# Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
os.environ["GOOGLE_API_KEY"] = "AIzaSyAv8uJmdq943cpKSxJVjsucv02g4Su8k2o"
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-1.5-flash-latest')

translator = Translator()

@app.route('/translate-api', methods=['POST'])
def translate_text():
    data = request.json

    if 'text' not in data or 'src_language' not in data:
        return jsonify({'error': 'Please provide both text and language'}), 400
    text = data['text']
    dest_language = data['dest_language']
    src_language=data["src_language"]

    if src_language=="en-US" or src_language=="en-IN":
        src_language="english"
    elif src_language=="hi-IN":
        src_language="hindi"
    elif src_language=="bn-IN":
        src_language="Bengali"
    elif src_language=="pa-IN":
        src_language="Punjabi"
    elif src_language=="gu-IN":
        src_language="gujarati"
    elif src_language=="or-IN":
        src_language="Odia"
    elif src_language=="ta-IN":
        src_language="Tamil"
    elif src_language=="te-IN":
        src_language="Telugu"
    elif src_language=="kn-IN":
        src_language="Kannada"
    elif src_language=="ml-IN":
        src_language="Malayalam"
    elif src_language=="mr-IN":
        src_language="Marathi"
    elif src_language=="ur-IN":
        src_language="Urdu"

    if dest_language=="en-US" or dest_language=="en-IN":
        dest_language="english"
    elif dest_language=="hi-IN":
        dest_language="hindi"
    elif dest_language=="bn-IN":
        dest_language="Bengali"
    elif dest_language=="pa-IN":
        dest_language="Punjabi"
    elif dest_language=="gu-IN":
        dest_language="gujarati"
    elif dest_language=="or-IN":
        dest_language="Odia"
    elif dest_language=="ta-IN":
        dest_language="Tamil"
    elif dest_language=="te-IN":
        dest_language="Telugu"
    elif dest_language=="kn-IN":
        dest_language="Kannada"
    elif dest_language=="ml-IN":
        dest_language="Malayalam"
    elif dest_language=="mr-IN":
        dest_language="Marathi"
    elif dest_language=="ur-IN":
        dest_language="Urdu"

    print(src_language)
    try:
        translated_gemini = translator.translate(text, src=src_language, dest='english')
        print(translated_gemini)
        #Send to gemini to get response
        try:
            response = model.generate_content(f"Please answer this query in a chatbot style {translated_gemini.text}. Do not add any emoticons.")
            chat_response=response.text;
        #Convert back to preferred language
            translated_user = translator.translate(chat_response, src='english', dest=dest_language)
            return jsonify({"response":translated_user.text}),200
        except Exception as e:
            return jsonify({'error in part1': str(e)}), 500
        
    except Exception as e:
        return jsonify({'error2': str(e)}), 500
    
@app.route('/gemini-response', methods=['POST'])
def indic2English():
    data = request.json

    if 'text' not in data or 'language' not in data:
        return jsonify({'error': 'Please provide both text and language'}), 400

    text = data['text']
    language = data['language']

    try:
        response = model.generate_content(f"convert {text} to {language} language")
        return str(response.text),200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)