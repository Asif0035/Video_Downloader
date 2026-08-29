import os
import yt_dlp

def extract_media_info(url):
    cookie_path = os.path.join(os.path.dirname(__file__), 'cookies.txt')

    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': False,
    }

    if os.path.exists(cookie_path):
        ydl_opts['cookiefile'] = cookie_path

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if not info:
                raise ValueError("Could not retrieve media details.")

            extractor_key = str(info.get('extractor_key', '')).lower()
            if 'youtube' in extractor_key:
                platform = 'YouTube'
            elif 'instagram' in extractor_key:
                platform = 'Instagram'
            elif 'facebook' in extractor_key:
                platform = 'Facebook'
            else:
                platform = info.get('extractor', 'Social Media')

            qualities = []
            formats = info.get('formats', [])
            seen_resolutions = set()

            # Process formats backwards (highest resolution formats usually appear last)
            for f in reversed(formats):
                if not isinstance(f, dict):
                    continue

                vcodec = f.get('vcodec', 'none')
                height = f.get('height')
                format_id = f.get('format_id')
                url_direct = f.get('url')

                # Filter valid video formats
                if vcodec != 'none' and height and height >= 144:
                    res_label = f"{height}p"

                    if res_label not in seen_resolutions:
                        seen_resolutions.add(res_label)
                        
                        filesize = f.get('filesize') or f.get('filesize_approx')
                        size_str = f"{round(filesize / (1024 * 1024), 1)} MB" if filesize else "HD Video"

                        # Route ALL videos with a format_id through the download backend for merging
                        if format_id:
                            download_url = f"http://localhost:5000/api/download?url={url}&format_id={format_id}"
                        else:
                            download_url = url_direct

                        qualities.append({
                            'label': res_label,
                            'size': size_str,
                            'url': download_url
                        })

                if len(qualities) >= 4:
                    break

            # Fallback direct option
            if not qualities:
                direct_url = info.get('url') or (formats[-1].get('url') if formats else '')
                if direct_url:
                    qualities.append({
                        'label': 'Standard HD',
                        'size': 'Direct File',
                        'url': direct_url
                    })

            duration_secs = info.get('duration') or 0
            minutes = int(duration_secs // 60)
            seconds = int(duration_secs % 60)
            duration_str = f"{minutes:02d}:{seconds:02d}"

            return {
                'title': info.get('title', 'Social Media Video'),
                'thumbnail': info.get('thumbnail', ''),
                'duration': duration_str,
                'views': f"{info.get('view_count', 0):,}" if info.get('view_count') else 'N/A',
                'platform': platform,
                'qualities': qualities
            }

    except Exception as e:
        raise RuntimeError(f"Extraction error: {str(e)}")