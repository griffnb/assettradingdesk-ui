---
name: "testing"
description: "Testing instructions, how to use playwrite mcp, get sessions, create users, login, etc"
---

To create a new session and login, run the admin server if its not already running, then go to

http://localhost:5174/ai_create

This will then redirect you to the customer site where you can begin testing. By default this creates a user with the billing package with the highest value, but you can specify a different billing package id by passing it as a query parameter `billing_package_id`
