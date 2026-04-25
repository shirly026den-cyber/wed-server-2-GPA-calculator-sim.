from flask import Flask, render_template, request,jsonify

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def getUserInput():
    # 从前端拿到用户数据
    subject = ['math', 'science', 'english', 'history','elective1','elective2']
    try:
        scores = {sub: float(request.json.get(f'{sub}')) for sub in subject}
        credits = {sub: float(request.json.get(f'{sub}_creditHours')) for sub in subject}
    except(TypeError, ValueError, ZeroDivisionError):
        return jsonify({'error': 'Error. Please enter valid numbers or inputs.'}), 400
    # 计算总分和总学分
    total_qualityPoints = 0
    total_credits = 0
    for sub in subject:
        score = scores[sub]
        credit = credits[sub]
        match  score:
            case score if score >= 93:
                total_qualityPoints += 4.0 * credit
                total_credits += credit
            case score if score < 93 and score >= 90:
                total_qualityPoints += 3.7 * credit
                total_credits += credit
            case score if score < 90 and score >= 87:
                total_qualityPoints += 3.3 * credit
                total_credits += credit
            case score if score < 87 and score >= 83:
                total_qualityPoints += 3.0 * credit
                total_credits += credit
            case score if score < 83 and score >= 80:
                total_qualityPoints += 2.7 * credit
                total_credits += credit
            case score if score < 80 and score >= 77:
                total_qualityPoints += 2.3 * credit
                total_credits += credit
            case score if score < 77 and score >= 73:
                total_qualityPoints += 2.0 * credit
                total_credits += credit
            case score if score<73:
                total_qualityPoints += 0.0 * credit
                total_credits += credit

    # 计算GPA
    return jsonify({'answer' : round(total_qualityPoints/total_credits, 2)})

if __name__ == '__main__':
    app.run(debug=True)
