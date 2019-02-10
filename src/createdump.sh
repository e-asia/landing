#!/bin/bash

projectname=$1
currentdate=$2
commitid=$3
branchname=$4

backupdirectory="/var/www/html/backup"
mkdir -p ${backupdirectory}

echo "Creating dump..."
dumpfilename=${currentdate}.${projectname}.${branchname}.${commitid}.sql
mysqldump -u ${projectname}_user -pmysqlpwd -hdatabase ${projectname} > ${dumpfilename}
mv ${dumpfilename} ${backupdirectory}
echo "Dump created. File name is: ${dumpfilename}"

# Create files archive
echo "Creating files archive..."
cd /var/www/html/htdocs/sites/default/files
zipfilename=${currentdate}.${projectname}.${branchname}.${commitid}.zip
zip -r ${zipfilename} .
mv ${zipfilename} ${backupdirectory}
echo "Dump created. File name is: ${dumpfilename}"
echo "Done creating files archive. File name is: ${zipfilename}"
