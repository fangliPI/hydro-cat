#!/bin/bash

mongo <<EOF
use test;
db.createCollection("evals");
db.createCollection("users");

EOF

mongoimport -d test -c evals  --file $WORKSPACE/evals.json --jsonArray
mongoimport -d test -c users  --file $WORKSPACE/users.json --jsonArray

