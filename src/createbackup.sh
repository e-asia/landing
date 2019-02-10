#!/bin/bash

projectname="lnemetrology"

currentdate=$(date +%Y-%m-%d_%H-%M)

# Current git commit id
commitid=$(git rev-parse HEAD | cut -c1-7)

# Current git branch: develop, demo, etc.
branchname=$(git symbolic-ref --short HEAD)

docker exec -it ${projectname}_web_1 sh -c " ./createdump.sh $projectname $currentdate $commitid $branchname"
