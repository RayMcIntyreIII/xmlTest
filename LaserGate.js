/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




var NEWLEVEL = 0;
x = loadXMLDoc("levels.xml"); //loading the xml document
//restart game(currently used to go to next level)
var gridIds = new Array(); // seemed easier to keep the array global





$(function() {

    function play(level) {
        document.write('<link rel="stylesheet" type="text/css" href="laserGate.css"/><div class="laserGate"><h1>Laser Gate</h1><table id="grid" border="0" cellspacing = "0" cellpadding = "0" id="a" align = "center">');
        var numCols = 12;
        var numRows = 12;
        var avatar; 

        for (i = 0; i <= numRows; i++) {
            document.write("<tr id='row'" + i + ">");
            for (j = 0; j <= numCols; j++) {
                if (j === 0) {
                    if (i === 0) {
                        document.write("<td id= '" + i.toString() + j.toString() + "' class='outer down right'></td>");
                    }
                    else if (i === numRows) {
                        document.write("<td id= '" + i.toString() + j.toString() + "' class='outer up right'></td>");
                    }
                    else {
                        document.write("<td id= '" + i.toString() + j.toString() + "' class = 'outer up down'></td>");
                    }
                }
                else if (j === numCols) {
                    if (i === 0) {
                        document.write("<td id= '" + i.toString() + j.toString() + "' class='outer down left'></td>");
                    }
                    else if (i === numRows) {
                        document.write("<td id= '" + i.toString() + j.toString() + "' class='outer up left'></td>");
                    }
                    else {
                        document.write("<td id= '" + i.toString() + j.toString() + "' class = 'outer up down'></td>");
                    }
                }
                else {
                    if (i === 0 | i === numRows) {
                        document.write("<td id= '" + i.toString() + j.toString() + "' class = 'outer right left'></td>");
                    }
                    else {
                        document.write("<td id= '" + i.toString() + j.toString() + "' ></td>");

                    }
                }
            }
            document.write('</tr></div>');
        }
        ;
        

        document.write('</table>');

        document.write("<button id='nextLevel'>Next Level</button>")

        var temp = localStorage.getItem("NEWLEVEL");
        console.log("hello" + temp);
        if (temp = 1) {
            NEWLEVEL = temp;
        } else if (temp >= 2) {
            NEWLEVEL = 0;
        }


//        level1();
//
//
//
//        function level1() { // i had to use this first level function 
//            //$("#00").text("laser").addClass("laser");
//            //$("#60").text("laser").addClass("laser");
//            // $("#3" + numCols + "").text("laser").addClass("laser");
//            //$("#" + numRows + "10").text("laser").addClass("laser")
//
//            avatar = numRows.toString() + Math.floor(numCols / 2).toString();
//            $("#" + avatar + "").addClass("avatar");
//            gridIds = loadLevel(0);
//
//            for (i = 0; i < gridIds.length; i++) {
//                $("#" + gridIds[i]).text("laser").addClass("laser");
//            }
//        }

        var level = level;
        nextLevel(level);
        function nextLevel(id) { // this will load the next levels
            $("#" + avatar + "").removeClass("avatar");
            avatar = numRows.toString() + Math.floor(numCols / 2).toString();
            $("#" + avatar + "").addClass("avatar");
            for (i = 0; i < gridIds.length; i++) { //removes the class attribute before next level
                $("#" + gridIds[i]).empty("laser").removeClass("laser");
            }
            gridIds = loadLevel(id++); // this goes to the loadLevel funciton down below
            // NEWLEVEL is used to find the XML tag in the NEWLEVEL index. for example 0 will find the first
            // instance of grid tags to be used and so forth. 
            for (i = 0; i < gridIds.length; i++) {
                $("#" + gridIds[i]).text("laser").addClass("laser");
            }
        }




        $("table").onclick = function getClickPosition(e) {
            var xPosition = e.clientX;
            var yPosition = e.clientY;
            alert(xPosition, yPosition);
        };
        var grid = document.getElementById("grid");
        for (i = 0; i <= numRows; i++) {
            for (j = 0; j <= numCols; j++) {
                grid.rows[i].cells[j].onclick = function(e) {
                    //            if we want exact x,y locations
                    var xPosition = e.clientX;
                    var yPosition = e.clientY;
                    $("#whereami").text("Current Location: " + xPosition + ", " + yPosition);
                    var currentPosition = $(this).attr("id");
                    //                alert(newAvatar);
                    if ($(this).hasClass("laser")) {
                        $("#whereami").text("LASER --- Current Location: " + xPosition + ", " + yPosition);
                    }
                    else if ($(this).hasClass("outer")) {
                        $("#" + avatar + "").removeClass("avatar");
                        $(this).addClass("avatar");
                        avatar = currentPosition;
                    }
                };
            }
        }

        $("#nextLevel").click(function() {
            $('.laserGate').html('');
            $('div').removeClass('laserGate');
            menu();
        });
    }
    ;



    function menu() { //this will bring the user back to the level screen so he can pick the next level
            document.write('<link rel="stylesheet" type="text/css" href="laserGate.css"/><div class="menu"><h1>Laser Gate</h1><table id="selector" cellspacing = "15" cellpadding = "10" id="a" align = "center">');
            var numRows = 6;
            var numColmns = 5;
            var blockId = 1;
            for(i = 0; i < numRows; i++) { //the menu table
               document.write('<tr id="row"' + i + '>');

               for(j = 0; j < numColmns; j++){
                   document.write("<td id= '" + blockId.toString() + "'>" + blockId.toString() + "</td>");
                   blockId++;
               };
               document.write('</tr>');
            };
            document.write('</table></div>');

         $('#selector td').click(function() { //when you click on a <td> element it will get the id and use that to correlate with the level desired
             var id = $(this).attr('id');
             console.log("go to level " + id + "");
             $('.menu').html(''); //remove everything
             $('div').removeClass("menu"); 
             play(id);
         });

    }



    //initialize the start button
    $("#startButton").click(function() {
            $("#welcomeScreen").fadeTo(1000, 0, function() {
                $(this).remove();
            });
            menu();
            //play();

        });
    });





// XML stuff
function loadLevel(n) {
    levels = x.getElementsByTagName("level"); //returns an array of level tags
    //levelId = level.getAttributeNode("id").nodeValue; // levelId is the attribute level gets the level Id
    //grid = x.getElementsByTagName("grid")[0];
    var level = levels[n]; // selects the nth isntance of the level tag. 
    grid = get_firstChild(level);
    //grid = level.childNodes[0];
    var num = level.childNodes.length;
    var numChilds = numSiblings(grid, num);
    var gridId = new Array();
    gridId = getSiblings(grid, numChilds);
    return gridId;
}
function getSiblings(grid, n) {  //returns an array of the siblings
    var num = 1;
    var i = 0;
    var x = 0;
    var gridId = new Array();
    gridId[x] = grid.childNodes[0].nodeValue;
    y = get_nextSibling(grid);
    while ((i < n) && (y.nextSibling != null))
    {
        if (y.nodeType != 0) {
            num++;
            i++;
            x++;
            gridId[x] = y.childNodes[0].nodeValue;
        }
        y = get_nextSibling(y);
    }
    return gridId;
}


function numSiblings(grid, n) //returns the number of siblings
{
    var num = 1;
    var i = 0;
    y = grid.nextSibling;
    while ((i < n) && (y.nextSibling != null))
    {
        if (y.nodeType != 1) {
            num++;
            i++;
        }
        y = y.nextSibling;
    }
    return num;
}

function get_firstChild(n)
{
    y = n.firstChild;
    while (y.nodeType != 1)
    {
        y = y.nextSibling;
    }
    return y;
}


function get_nextSibling(n)
{
    y = n.nextSibling;
    while (y.nodeType != 1)
    {
        if (y.nextSibling == null) {
            break;
        }
        y = y.nextSibling;
    }
    return y;
}


function loadXMLDoc(filename)
{
    if (window.XMLHttpRequest)
    {
        xhttp = new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

function loadXMLString(txt) //useless
{
    if (window.DOMParser)
    {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(txt, "text/xml");
    }
    else // code for IE
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        xmlDoc.loadXML(txt);
    }
    return xmlDoc;
}