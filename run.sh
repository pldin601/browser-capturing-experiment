#!/bin/sh
xvfb-run -a --server-args="-nolisten tcp -screen 0 1920x1080x30+32" node server2.js
