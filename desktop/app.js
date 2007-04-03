/************************\
|     Psych  Desktop     |
|  App function library  |
| (c) 2006 Psych Designs |
\************************/

var app_launchTracker= new Array(255);
var app_code;
var app_lib;
var app_liborcode;
var xml_seperator = "[==separator==]";

function app_launch(id)
{
if(!app_launchTracker[id])
{
exec_app(id, "both");
app_launchTracker[id] = 1;
}
else
{
if(app_launchTracker[id] == 1)
{
exec_app(id, "code");
}
}
}

function exec_app(id, libCodeProxy)
{
ui_loadingIndicator(0);
app_liborcode = libCodeProxy;
app_createRequest();
var url = "../backend/app.php?id="+id;
app_xmlHttp.open("GET", url, true);
app_xmlHttp.onreadystatechange = app_StateChange;
app_xmlHttp.send(null);
}

var app_xmlHttp;
function app_createRequest(){

if(window.ActiveXObject){

app_xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");

}
else if(window.XMLHttpRequest){

app_xmlHttp = new XMLHttpRequest();

}

}

function app_StateChange(){

if(app_xmlHttp.readyState == 4){
app_return = app_xmlHttp.responseText;

rawcode = app_return.split(xml_seperator);
app_lib = rawcode[5];
app_code = rawcode[4];

if(app_liborcode == "lib")
{
eval(app_lib);
}
else if(app_liborcode == "code")
{
eval(app_code);
}
else if(app_liborcode == "both")
{
eval(app_lib);
eval(app_code);
}
}
ui_loadingIndicator(1);
}