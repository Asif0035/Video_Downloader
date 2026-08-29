# import os
# import tempfile
# import shutil
# from flask import Flask, request, jsonify, send_file, after_this_request
# from flask_cors import CORS
# from extractor import extract_media_info
# import yt_dlp

# app = Flask(__name__)
# CORS(app)  # Enable Cross-Origin Request Sharing for React frontend

# # Direct path to your system's WinGet links where ffmpeg.exe is registered
# FFMPEG_DIR = r"C:\Users\ACER\AppData\Local\Microsoft\WinGet\Links"

# @app.route('/api/extract', methods=['POST'])
# def handle_extract():
#     data = request.get_json()
#     url = data.get('url', '').strip()

#     if not url:
#         return jsonify({'error': 'Please provide a valid URL'}), 400

#     try:
#         result = extract_media_info(url)
#         return jsonify(result), 200
#     except Exception as e:
#         return jsonify({'error': f"Failed to extract media: {str(e)}"}), 500

# @app.route('/api/download', methods=['GET'])
# def handle_download():
#     url = request.args.get('url')
#     format_id = request.args.get('format_id')

#     if not url:
#         return jsonify({'error': 'URL parameter is required'}), 400

#     temp_dir = tempfile.mkdtemp()
#     output_template = os.path.join(temp_dir, '%(title)s.%(ext)s')

#     # Force format combination: specified video format + highest quality audio track
#     format_spec = f"{format_id}+bestaudio/best" if format_id else "bestvideo+bestaudio/best"

#     cookie_path = os.path.join(os.path.dirname(__file__), 'cookies.txt')

#     ydl_opts = {
#         'format': format_spec,
#         'outtmpl': output_template,
#         'merge_output_format': 'mp4',
#         'quiet': True,
#         'ffmpeg_location': FFMPEG_DIR,
#     }

#     if os.path.exists(cookie_path):
#         ydl_opts['cookiefile'] = cookie_path

#     try:
#         with yt_dlp.YoutubeDL(ydl_opts) as ydl:
#             info = ydl.extract_info(url, download=True)
#             filename = ydl.prepare_filename(info)
#             base, _ = os.path.splitext(filename)
#             final_file = f"{base}.mp4" if os.path.exists(f"{base}.mp4") else filename

#         @after_this_request
#         def cleanup(response):
#             try:
#                 shutil.rmtree(temp_dir, ignore_errors=True)
#             except Exception as e:
#                 app.logger.error(f"Error removing temporary directory: {e}")
#             return response

#         return send_file(final_file, as_attachment=True)
#     except Exception as e:
#         return jsonify({'error': f"Merging failed: {str(e)}"}), 500

# @app.route('/api/report-link', methods=['POST'])
# def handle_report():
#     data = request.get_json()
#     broken_url = data.get('url', '')
    
#     print(f"[REPORT RECEIVED] User reported broken URL: {broken_url}")
#     return jsonify({'status': 'Report logged successfully'}), 200

# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))
#     app.run(host='0.0.0.0', port=port, debug=True)













































import os
import shutil
import tempfile
from flask import Flask, request, jsonify, send_file, after_this_request
from flask_cors import CORS
from extractor import extract_media_info
import yt_dlp

app = Flask(__name__)
CORS(app)

# Use environment variable if provided, otherwise fallback to local WinGet path
FFMPEG_DIR = os.environ.get(
    'FFMPEG_DIR', 
    r"C:\Users\ACER\AppData\Local\Microsoft\WinGet\Links"
)

@app.route('/api/extract', methods=['POST'])
def handle_extract():
    data = request.get_json() or {}
    url = data.get('url', '').strip()

    if not url:
        return jsonify({'error': 'Please provide a valid URL'}), 400

    try:
        result = extract_media_info(url)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f"Failed to extract media: {str(e)}"}), 500

@app.route('/api/download', methods=['GET'])
def handle_download():
    url = request.args.get('url')
    format_id = request.args.get('format_id')

    if not url:
        return jsonify({'error': 'URL parameter is required'}), 400

    temp_dir = tempfile.mkdtemp()
    output_template = os.path.join(temp_dir, '%(title)s.%(ext)s')

    format_spec = f"{format_id}+bestaudio/best" if format_id else "bestvideo+bestaudio/best"
    cookie_path = os.path.join(os.path.dirname(__file__), 'cookies.txt')

    ydl_opts = {
        'format': format_spec,
        'outtmpl': output_template,
        'merge_output_format': 'mp4',
        'quiet': True,
        'ffmpeg_location': FFMPEG_DIR,
    }

    if os.path.exists(cookie_path):
        ydl_opts['cookiefile'] = cookie_path

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            filename = ydl.prepare_filename(info)
            base, _ = os.path.splitext(filename)
            final_file = f"{base}.mp4" if os.path.exists(f"{base}.mp4") else filename

        # Automatically purge temporary files and directory after sending download
        @after_this_request
        def cleanup_temp_dir(response):
            try:
                shutil.rmtree(temp_dir, ignore_errors=True)
            except Exception as e:
                app.logger.error(f"Failed to clean up temp folder {temp_dir}: {str(e)}")
            return response

        return send_file(final_file, as_attachment=True)

    except Exception as e:
        # Cleanup in case download/merge fails
        shutil.rmtree(temp_dir, ignore_errors=True)
        return jsonify({'error': f"Merging failed: {str(e)}"}), 500

@app.route('/api/report-link', methods=['POST'])
def handle_report():
    data = request.get_json() or {}
    broken_url = data.get('url', '')
    
    print(f"[REPORT RECEIVED] User reported broken URL: {broken_url}")
    return jsonify({'status': 'Report logged successfully'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)