#!/usr/bin/env bash

# To start the docker compose
docker compose -p protecia-server --env-file ../combined-front-$1.env -f docker-compose-front-$1.yaml up
