var {src,dest,series,parallel,watch}=require('gulp');
var clean =require('gulp-clean');
var fileInclude =require('gulp-file-include');
var webserver =require('gulp-webserver');



function cleanTask(){
    return src('/dist',{allowEmpty:true})
    .pipe(clean());
}

function fileIncludeTask(){
    return src('./src/view/*.html')
    .pipe(fileInclude({
        prefix:'@',
        basepath:'./src/view/templates'
 
    }))
    .pipe(dest('./dist/view'));
}

function webserverTask(){
    return src('./dist/view')
    .pipe(webserver({
        host:'localhost',
        port:4000,
        open:'./index.html',
        livereload:true
    }));
}
function watchTask(){
    watch('./src/view/**',fileIncludeTask);

}
module.exports={
    dev:series(cleanTask,fileIncludeTask,parallel(webserverTask,watchTask)),

    build:series(cleanTask),
};