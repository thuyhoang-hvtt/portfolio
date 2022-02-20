#!/bin/bash

husky install
echo "HERO_EMAIL=$HERO_EMAIL" >> .env.production
echo "GITHUB_REPO=$GITHUB_REPO" >> .env.production
echo "GITHUB_API=$GITHUB_API" >> .env.production
