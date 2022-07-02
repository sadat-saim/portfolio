#!bash automation_git.sh
git status
git add .
echo "Enter commit message:"
read message
git commit -m "$message"
echo "Do you want to push this commit to the master branch?[y/n]"
read selection
if(($selection == "y"))
then
git push
fi