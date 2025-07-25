#!/bin/bash
# Generate DH parameters for enhanced SSL security
# This should be run once during deployment setup

if [ ! -f /etc/nginx/dhparam.pem ]; then
    echo "Generating DH parameters, this will take a while..."
    openssl dhparam -out /etc/nginx/dhparam.pem 2048
    echo "DH parameters generated successfully"
else
    echo "DH parameters already exist"
fi