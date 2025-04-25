#!/bin/bash

# Script to deploy the cleanup-expired-stands Edge Function

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI is not installed. Please install it first."
    echo "See: https://supabase.com/docs/guides/cli"
    exit 1
fi

# Check if project reference is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <project-ref>"
    echo "Example: $0 abcdefghijklm"
    exit 1
fi

PROJECT_REF=$1

echo "Deploying cleanup-expired-stands Edge Function to project: $PROJECT_REF"

# Deploy the Edge Function
supabase functions deploy cleanup-expired-stands --project-ref $PROJECT_REF

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo "Edge Function deployed successfully!"
    echo "The function will run hourly to clean up expired stands."
else
    echo "Deployment failed. Please check the error message above."
    exit 1
fi

# Verify the function is deployed
echo "Verifying deployment..."
supabase functions list --project-ref $PROJECT_REF

echo "Done!"