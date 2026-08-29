import os
import time
import logging
import requests

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# 1. Real public test URLs (replace with stable, non-copyrighted test posts)
TEST_URLS = {
    "youtube": "https://youtu.be/7aDoThKG-5g?si=C5qVkEPUpYQg_8Ki",
    "instagram": "https://www.instagram.com/reel/DcijkoluY7L/?igsi=MXNyMHNtOThtMnV5NA==",  # Replace with a real public Reel URL
    "facebook": "https://www.facebook.com/share/r/1BiE5ZXaiX/" # Replace with a real public FB video
}

EXTRACTION_ENGINE_API = os.getenv("EXTRACTION_API", "http://localhost:5000/api/extract")
WEBHOOK_URL = os.getenv("ALERT_WEBHOOK_URL")

STATE_FILE = "/tmp/platform_status.txt"

def get_failed_count(platform):
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r") as f:
                for line in f:
                    if ":" in line:
                        p, count = line.strip().split(":")
                        if p == platform:
                            return int(count)
        except Exception as e:
            logging.error(f"Error reading state file: {e}")
    return 0

def update_failed_count(platform, count):
    data = {}
    try:
        if os.path.exists(STATE_FILE):
            with open(STATE_FILE, "r") as f:
                for line in f:
                    if ":" in line:
                        p, c = line.strip().split(":")
                        data[p] = int(c)
        data[platform] = count
        with open(STATE_FILE, "w") as f:
            for p, c in data.items():
                f.write(f"{p}:{c}\n")
    except Exception as e:
        logging.error(f"Error updating state file: {e}")

def send_alert(platform, details, latency):
    if not WEBHOOK_URL:
        logging.warning("ALERT_WEBHOOK_URL not configured. Skipping alert dispatch.")
        return

    # 2. Included latency telemetry in payload per SOP Section 1.A & 1.B
    payload = {
        "content": (
            f"🚨 **ALERT: Platform Degradation Detected!** 🚨\n"
            f"**Platform:** {platform.upper()}\n"
            f"**Latency:** {latency:.2f}ms\n"
            f"**Timestamp:** {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
            f"**Details:** {details}"
        )
    }
    try:
        res = requests.post(WEBHOOK_URL, json=payload, timeout=10)
        res.raise_for_status()
        logging.info(f"Webhook alert successfully dispatched for {platform}")
    except Exception as e:
        logging.error(f"Failed to send webhook alert: {e}")

def run_health_check():
    logging.info("Starting automated synthetic health checks...")
    
    for platform, target_url in TEST_URLS.items():
        consecutive_failures = get_failed_count(platform)
        
        try:
            start_time = time.time()
            response = requests.post(EXTRACTION_ENGINE_API, json={"url": target_url}, timeout=15)
            latency = (time.time() - start_time) * 1000
            payload_size = len(response.content)
            
            if response.status_code == 200 and payload_size > 0:
                logging.info(f"[{platform.upper()}] PASS - Latency: {latency:.2f}ms, Size: {payload_size} bytes")
                update_failed_count(platform, 0)
            else:
                raise ValueError(f"HTTP {response.status_code}, Payload Size: {payload_size}b")
                
        except Exception as e:
            consecutive_failures += 1
            error_msg = str(e)
            logging.error(f"[{platform.upper()}] FAIL (Run {consecutive_failures}) - {error_msg}")
            update_failed_count(platform, consecutive_failures)
            
            if consecutive_failures >= 2:
                logging.warning(f"[{platform.upper()}] Status marked as DEGRADED!")
                send_alert(platform, error_msg, latency if 'latency' in locals() else 0)

if __name__ == "__main__":
    run_health_check()