#!/bin/bash
# Start xvfb for headless mode
Xvfb :99 -screen 0 1024x768x16 &
export DISPLAY=:99

# Start your node app
npm start
