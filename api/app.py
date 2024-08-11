from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import cv2
import base64
from io import BytesIO
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def fetch_image(url):
    if url.startswith('data:image'):
        header, base64_data = url.split(',', 1)
        image_data = base64.b64decode(base64_data)
        image = Image.open(BytesIO(image_data))
    else:
        response = requests.get(url)
        image = Image.open(BytesIO(response.content))

    return image.convert('RGB')

def compare_images(img1, img2):
    img1_np = np.array(img1)
    img2_np = np.array(img2)

    if img1_np.shape != img2_np.shape:
        img2_np = cv2.resize(img2_np, (img1_np.shape[1], img1_np.shape[0]))

    diff = cv2.absdiff(img1_np, img2_np)
    non_zero_count = np.count_nonzero(diff)
    total_pixels = diff.size
    accuracy = 1 - (non_zero_count / total_pixels)

    return accuracy * 100

@app.route('/compare', methods=['GET'])
def compare():
    img_url = request.args.get('img_url')
    img2_url = request.args.get('img2_url')

    if not img_url or not img2_url:
        return jsonify({"error": "Both 'img_url' and 'img2_url' must be provided."}), 400

    try:
        img = fetch_image(img_url)
        img2 = fetch_image(img2_url)
    except Exception as e:
        return jsonify({"error": f"Failed to fetch or process images: {str(e)}"}), 500

    accuracy = compare_images(img, img2)
    return jsonify({"accuracy": accuracy})

if __name__ == '__main__':
    app.run(debug=True, port=8080)
