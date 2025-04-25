#!/bin/bash

# Run tests in CI mode
echo "Running tests in CI mode..."
npm test -- --watchAll=false src/components/auth/SimpleTest.test.jsx

# Exit with the same code as the test command
exit $?