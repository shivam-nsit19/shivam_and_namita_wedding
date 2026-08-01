#!/usr/bin/env python3
"""Local dev server for the wedding static site."""

import http.server
import socketserver
import webbrowser
from pathlib import Path

PORT = 8000
ROOT = Path(__file__).resolve().parent


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)


def main():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/"
        print(f"Serving wedding site at {url}")
        print("Press Ctrl+C to stop.")
        webbrowser.open(url)
        httpd.serve_forever()


if __name__ == "__main__":
    main()
