var gulp = require("gulp"),
    shell = require("gulp-shell");

gulp.task("deploy:heroku", shell.task([
    'gulp bake',
    'git commit -am"fix"',
    'git push --set-upstream origin master'
]));
