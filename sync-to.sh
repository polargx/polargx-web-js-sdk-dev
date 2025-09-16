#!/bin/bash
DEST_DIR="$1"
if [ -n "$DEST_DIR" ]; then
    echo "DEST_DIR: $DEST_DIR"
else
    echo "Error: DEST_DIR is empty or not provided"
    exit 1
fi

npm run build &&

# Copy PolarGX-SDK files
rm -rf "${DEST_DIR}/dist" &&
cp -R ./dist "${DEST_DIR}/dist"
