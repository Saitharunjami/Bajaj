from flask import Flask, request, jsonify

app = Flask(__name__)

# POST endpoint
@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.json.get("data", [])
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_lowercase = max([item for item in alphabets if item.islower()], default="")

        response = {
            "is_success": True,
            "user_id": "your_name_01122003",  # Replace with your name and DOB
            "email": "your_email@college.com",  # Replace with your email
            "roll_number": "your_roll_number",  # Replace with your roll number
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }
    except Exception as e:
        response = {
            "is_success": False,
            "message": str(e)
        }

    return jsonify(response)

# GET endpoint
@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1})

if __name__ == '__main__':
    app.run(debug=True)
