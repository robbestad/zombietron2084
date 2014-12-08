var gulp = require("gulp"),
    shell = require("gulp-shell");

gulp.task("deploy", shell.task([
    'gulp bake',
    'git commit --allow-empty -am"Cleaned up code for blog entry"',
    'npm version patch',
    'git push --set-upstream origin master',
    'git push heroku `git subtree split --prefix public master`:master --force'
]));
