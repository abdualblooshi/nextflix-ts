#!/bin/bash
# This script is used for Docker DO NOT EDIT OR REMOVE

yarn prisma db push
yarn prisma generate
yarn dev
