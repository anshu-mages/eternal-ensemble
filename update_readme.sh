#!/bin/bash

# Extract the link
link=$(grep -o 'https://arweave.net/[a-zA-Z0-9_\-]*' deploy_output.txt)

# Replace the placeholder in README.md
sed -i "s|ARWEAVE_DEPLOYMENT_LINK|$link|g" README.md