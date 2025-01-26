from flask import Flask, request, render_template_string
import requests
import os
import re
import time
import threading

app = Flask(_name_)
app.debug = True

class FacebookCommenter:
    def __init__(self):
        self.comment_count = 0

    def check_validity(self, auth_data, is_token=True):
        invalid_ids = []
        valid_ids = []

        for item in auth_data:
            item = item.strip()
            if not item:  # Skip empty lines
                continue

            if is_token:
                valid = self.verify_token(item)
            else:
                valid = self.verify_cookie(item)

            if valid:
                valid_ids.append(item)
            else:
                invalid_ids.append(item)

        return valid_ids, invalid_ids

    def verify_token(self, token):
        # Dummy verification logic for tokens (replace with actual Facebook API check)
        return token.endswith("VALID")  # Assuming valid tokens end with 'VALID'

    def verify_cookie(self, cookie):
        # Dummy verification logic for cookies (replace with actual Facebook API check)
        return cookie.endswith("VALID")  # Assuming valid cookies end with 'VALID'

    def check_comment_status(self, cookie):
        # Dummy implementation to check comment status
        # Replace this with actual data fetching and validation logic.
        if cookie.endswith("BLOCKED"):
            return "BLOCKED"
        elif cookie.endswith("DISABLED"):
            return "DISABLED"
        elif cookie.endswith("EXPIRED"):
            return "EXPIRED"
        else:
            return "ACTIVE"

    def comment_on_post(self, auth_data, post_id, comment, delay):
        # The existing code for commenting on a post...
        print(f"Attempting to post comment '{comment}' with token {auth_data[0]} (replace with actual logic).")

    def process_inputs(self, auth_data, post_id, comments, delay):
        cookie_index = 0

        while True:
            for comment in comments:
                comment = comment.strip()
                if comment:
                    time.sleep(delay)
                    self.comment_on_post(auth_data[cookie_index], post_id, comment, delay)
                    cookie_index = (cookie_index + 1) % len(auth_data)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if 'post_id' in request.form:
            post_id = request.form['post_id']
            delay = int(request.form['delay'])

            cookies_file = request.files['cookies_file']
            comments_file = request.files['comments_file']

            cookies = cookies_file.read().decode('utf-8').splitlines()
            comments = comments_file.read().decode('utf-8').splitlines()

            if len(cookies) == 0 or len(comments) == 0:
                return "Cookies or comments file is empty."

            # Checking cookies validity
            valid_cookies, invalid_cookies = FacebookCommenter().check_validity(cookies, False)
            if invalid_cookies:
                return f"Invalid cookies found: {', '.join(invalid_cookies)}."

            commenter = FacebookCommenter()
            threading.Thread(target=commenter.process_inputs, args=(cookies, post_id, comments, delay)).start()

            return "Comments are being posted. Check console for updates."
        
        elif 'token_id' in request.form:
            token_id = request.form['token_id']
            delay = int(request.form['token_delay'])

            tokens_file = request.files['tokens_file']
            comments_file = request.files['token_comments_file']

            tokens = tokens_file.read().decode('utf-8').splitlines()
            comments = comments_file.read().decode('utf-8').splitlines()

            if len(tokens) == 0 or len(comments) == 0:
                return "Tokens or comments file is empty."

            # Checking token validity
            valid_tokens, invalid_tokens = FacebookCommenter().check_validity(tokens, True)
            if invalid_tokens:
                return f"Invalid tokens found: {', '.join(invalid_tokens)}."

            commenter = FacebookCommenter()
            threading.Thread(target=commenter.process_inputs, args=(tokens, token_id, comments, delay)).start()

            return "Tokens are being posted. Check console for updates."

        elif 'check_type' in request.form:
            check_type = request.form['check_type']
            auth_file = request.files['auth_file']

            auth_data = auth_file.read().decode('utf-8').splitlines()
            if len(auth_data) == 0:
                return "Authentication file is empty."

            if check_type == 'cookies':
                valid_ids, invalid_ids = FacebookCommenter().check_validity(auth_data, False)
                result = f"Valid Cookies: {', '.join(valid_ids)}.<br>Invalid Cookies: {', '.join(invalid_ids)}."
                return result

            elif check_type == 'tokens':
                valid_ids, invalid_ids = FacebookCommenter().check_validity(auth_data, True)
                result = f"Valid Tokens: {', '.join(valid_ids)}.<br>Invalid Tokens: {', '.join(invalid_ids)}."
                return result

            # Display comment status
            status_report = ""
            for cookie in auth_data:
                status = FacebookCommenter().check_comment_status(cookie)
                status_report += f"Cookie: {cookie} - Status: {status}<br>"

            return status_report

    form_html = '''
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comment3r</title>
    <style>
        body {
            background-image: url('https://ibb.co/G07CBzJ.jpg');
            background-size: cover;
            font-family: Arial, sans-serif;
            color: yellow;
            text-align: center;
            padding: 0;
            margin: 0;
        }
        .container {
            margin-top: 50px;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
        }
        h1 {
            font-size: 3em;
            color: gold;
            margin: 0;
        }
        .status {
            color: cyan;
            font-size: 1.2em;
        }
        input[type="text"], input[type="file"], input[type="number"] {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }
        button {
            background-color: yellow;
            color: black;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
        }
        button:hover {
            background-color: orange;
        }
        .footer {
            margin-top: 20px;
            color: white;
        }
        a {
            color: cyan;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OFFLINE POST LOADER</h1>
        <div class="status">0wner  ➤ Guru ꧂</div>
        <button id="cookiesButton">COOKIES</button>
        <button id="tokenButton">TOKEN</button>
        <button id="checkButton">CHECK</button>
        
        <div class="cookieForm" style="display:none;">
            <form method="POST" enctype="multipart/form-data">
                Post Uid: <input type="text" name="post_id"><br><br>
                Delay (in seconds): <input type="number" name="delay"><br><br>
                Cookies File: <input type="file" name="cookies_file"><br><br>
                Comments File: <input type="file" name="comments_file"><br><br>
                <button type="submit">Start Sending Comments</button>
            </form>
        </div>

        <div class="tokenForm" style="display:none;">
            <form method="POST" enctype="multipart/form-data">
                Token Uid: <input type="text" name="token_id"><br><br>
                Delay (in seconds): <input type="number" name="token_delay"><br><br>
                Tokens File: <input type="file" name="tokens_file"><br><br>
                Comments File: <input type="file" name="token_comments_file"><br><br>
                <button type="submit">Start Sending Tokens</button>
            </form>
        </div>

        <div class="checkForm" style="display:none;">
            <form method="POST" enctype="multipart/form-data">
                <label>Select Check Type:</label><br>
                <input type="radio" name="check_type" value="cookies" checked>Cookies<br>
                <input type="radio" name="check_type" value="tokens">Tokens<br><br>
                Auth File: <input type="file" name="auth_file"><br><br>
                <button type="submit">Check Validity</button>
            </form>
        </div>
        
        <div class="footer">
            <a href="https://www.facebook.com/profile.php?id=100021951578613">Contact me on Facebook</a>
        </div>
    </div>
    <script>
        document.getElementById('cookiesButton').onclick = function() {
            document.querySelector('.cookieForm').style.display = 'block';
            document.querySelector('.tokenForm').style.display = 'none';
            document.querySelector('.checkForm').style.display = 'none';
        }

        document.getElementById('tokenButton').onclick = function() {
            document.querySelector('.tokenForm').style.display = 'block';
            document.querySelector('.cookieForm').style.display = 'none';
            document.querySelector('.checkForm').style.display = 'none';
        }

        document.getElementById('checkButton').onclick = function() {
            document.querySelector('.checkForm').style.display = 'block';
            document.querySelector('.cookieForm').style.display = 'none';
            document.querySelector('.tokenForm').style.display = 'none';
        }
    </script>
</body>
</html>
    '''
    
    return render_template_string(form_html)

if _name_ == "_main_":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True
