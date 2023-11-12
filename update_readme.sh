#!/bin/bash

# Extract the link
link=$(grep -o 'https://arweave.net/[a-zA-Z0-9_\-]*' deploy_output.txt)

# Replace the link in README.md
sed -i "s|\(Current deployment: \[Arweave Deployment\](\).*|\1$link)|" README.md
