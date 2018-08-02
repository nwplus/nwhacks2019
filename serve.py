# Simple script to serve static web app.
# Source: https://gist.github.com/chrisbolin/2e90bc492270802d00a6

import SimpleHTTPServer, SocketServer
import urlparse, os

PORT = 8081
INDEXFILE = 'index.html'

class SimpleHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    # Serve if requested file exists, otherwise use index.html
    def do_GET(self):
        parsedParams = urlparse.urlparse(self.path)
        if os.access('.' + os.sep + parsedParams.path, os.R_OK):
            SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self);
        else:
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')  
            self.end_headers()
            with open(INDEXFILE, 'r') as fin:
            self.copyfile(fin, self.wfile)

Handler = SimpleHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)
httpd.serve_forever()
