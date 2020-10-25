//const moment = require("./moment");

let body=document.createElement("body");
let submit=document.querySelector("button");
let input=document.querySelector("input");
let repoBox=document.querySelector(".repoBox")
repoBox.style.cursor="pointer"

submit.addEventListener("click",(e)=>{
    e.preventDefault();
    let username=input.value;
    console.log(username);
    fetch(`//api.github.com/users/${username}/repos?`).then(r => {
    return r.json()}).then(all => {
   all.map(repo=>{
       console.log(repo);
    let div=document.createElement("div");
    div.style.border="1px solid lightblue";
let link=document.createElement("a");
link.href=repo.clone_url;
link.style.textDecoration="none"
let heading=document.createElement("h4");
heading.innerHTML=repo.name;
heading.style.display="inline"
let index=document.createElement("p")
index.innerHTML=repo.description;
if (repo.description==null){
    index.innerHTML="null"
}
let time=document.createElement("p")
let firstLine=document.createElement("div")
firstLine.append(heading,time);
firstLine.style.display="flex";
firstLine.style.justifyContent="space-between"


//calc time with moment.js:
let updateTime=repo.updated_at.slice(0,10).split("-").join("");
let timediff=moment(updateTime).startOf('day').fromNow(); //diff in year,month,day

//append time:
time.innerHTML=timediff;
//append all:
link.append(firstLine,index);
div.append(link);
repoBox.append(div);

});
})
})

