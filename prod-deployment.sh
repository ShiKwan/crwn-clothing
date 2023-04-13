#!/bin/bash 
set -e


if [[ $# -eq 0 ]]
then
    echo "Error : missing argument, enter release version after command: "
    echo "e.g: bash prod-deployment.sh 0.5"
    exit 1
fi


echo "Creating new release branch for home-maintenance-api"

version=$1

release_branch="release/release${version}"
main_branch="master"


# git checkout dev
# git checkout -b $release_branch

# git merge --squash master -m "merge master into release branch"

# git push -u origin $release_branch

# gh pr create --base $main_branch --title "[PROD] release/release${version}" --body "release ${version} to production"
