#!/bin/bash

mongo <<EOF
use test;
db.createCollection("eval_data");
db.createCollection("users");

EOF

mongoimport -d test -c eval_data  --file $WORKSPACE/eval_data.json
mongoimport -d test -c users  --file $WORKSPACE/users.json

