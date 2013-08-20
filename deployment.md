1. Create a Heroku deploy server. You can do that using the Cloud9 integration (choose "Create new" in the "Add deploy target" window): 
https://skitch.com/c9support/85qpk/hello-world-cloud9 
2. Verify that the deploy target was created by logging in to your Heroku account (at heroku.com) and verifying that the deploy target exists under "My Apps" 
3. In the Cloud9 console, add the Heroku deploy target as a remote with git: 
git remote add heroku-target git@heroku.com:c9testhelloworld.git 
where "heroku-target" is the name you want to give to your deploy target (you can name it whatever you want) andgit@heroku.com:c9testhelloworld.git is the git repo in Heroku for your deploy target. You can get the git repo by going to Heroku.com -> My Apps, clicking on "General info" for the app. 
4. Create a package.json file and a Procfile for your app. For more info on the format of these files, see the link below. You only need to add these two files. Ignore the other steps at the link: 
https://devcenter.heroku.com/articles/nodejs 
Please make sure you use the correct name in the Procfile. On the link they use web.js, but you probably have server.js as your main node file. 
5. Commit all your files with git: 
git add . 
git commit -m "Adding all my files" 
6. Push to Heroku: 
git push heroku-target master 
If pushing the file succeeds, you will get a link to the deployed app. Otherwise, you should get some informative error messages from Heroku.