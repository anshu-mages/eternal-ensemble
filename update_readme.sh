#!/bin/bash

# Extract the link
link=$(grep -o 'https://arweave.net/[a-zA-Z0-9_\-]*' deploy_output.txt)

# Use GitHub API to update the repository's website field
curl \
  -X PATCH \
  -H "Authorization: token $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"homepage\":\"$link\"}" \
  https://api.github.com/repos/symaticvisuals/eternal-ensemble
