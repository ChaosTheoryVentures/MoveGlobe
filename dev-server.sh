#!/bin/bash

# MoveGlobe Development Server Script
# This script manages nginx and the Express API server for local development

case "$1" in
  start)
    echo "Starting MoveGlobe development environment..."
    
    # Start nginx if not running
    if ! pgrep nginx > /dev/null; then
      echo "Starting nginx..."
      sudo service nginx start
    else
      echo "nginx is already running"
    fi
    
    # Start the Express API server
    echo "Starting Express API server..."
    npm run dev
    ;;
    
  stop)
    echo "Stopping MoveGlobe development environment..."
    
    # Stop nginx
    sudo service nginx stop
    echo "nginx stopped"
    
    # Kill any running node processes
    pkill -f "tsx server/index.ts" 2>/dev/null || true
    pkill -f "node dist/index.js" 2>/dev/null || true
    echo "Express server stopped"
    ;;
    
  restart)
    echo "Restarting MoveGlobe development environment..."
    $0 stop
    sleep 2
    $0 start
    ;;
    
  status)
    echo "MoveGlobe Development Environment Status:"
    echo "========================================"
    
    # Check nginx
    if pgrep nginx > /dev/null; then
      echo "✅ nginx: Running"
      echo "   - Production: http://localhost (port 80)"
      echo "   - Development: http://localhost:3000"
    else
      echo "❌ nginx: Not running"
    fi
    
    # Check Express server
    if pgrep -f "tsx server/index.ts" > /dev/null || pgrep -f "node dist/index.js" > /dev/null; then
      echo "✅ Express API: Running on port 5000"
    else
      echo "❌ Express API: Not running"
    fi
    
    # Test connectivity
    echo ""
    echo "Connectivity Tests:"
    if curl -s -o /dev/null http://localhost; then
      echo "✅ Production site (port 80): Accessible"
    else
      echo "❌ Production site (port 80): Not accessible"
    fi
    
    if curl -s -o /dev/null http://localhost:3000; then
      echo "✅ Development proxy (port 3000): Accessible"
    else
      echo "❌ Development proxy (port 3000): Not accessible"
    fi
    ;;
    
  build)
    echo "Building MoveGlobe for production..."
    npm run build
    echo "Build completed. Restart nginx to serve the new build."
    ;;
    
  *)
    echo "Usage: $0 {start|stop|restart|status|build}"
    echo ""
    echo "Commands:"
    echo "  start    - Start nginx and Express API server"
    echo "  stop     - Stop all services"
    echo "  restart  - Stop and start all services"
    echo "  status   - Show status of all services"
    echo "  build    - Build production version"
    echo ""
    echo "Access URLs:"
    echo "  Production:  http://localhost (port 80)"
    echo "  Development: http://localhost:3000"
    echo "  API:         http://localhost:5000/api"
    exit 1
    ;;
esac