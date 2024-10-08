var simstatus = 0;
var rotstatus = 1;
//comments section
var commenttext = "Some Text";
var commentloc = 0;
//computing section
var trans = new point(200, 200);
// points on mechanism
var o = new point(0, 0, "O");
var q = new point(0, 0, "Q");
var a = new point(0, 0, "A");
var b = new point(0, 0, "B");
var c = new point(0, 0, "C");
var d = new point(0, 0, "D");
var e = new point(0, 0, "E");
var p = new point(0, 0, "P");

var lR = 38;
var la = 20;
var lb = 60;
var lc = 60;
var ld = 0;
var le = 0;
var lk = 0;
var ll = 0;

var theta = 55; // all angles to be defined either in degrees only or radians only throughout the program and convert as and when required
var AEQ = 0;
var AEO = 0; // All angles in Degrees. (mention the specification in the script like here)

//graphics section
var canvas;
var ctx;
//timing section
var simTimeId = setInterval("", "1000");
var time = 0;

//point tracing section
var ptx = [];
var pty = [];
var trace = false;
//click status of legend and quick reference
var legendCS = false;
var quickrefCS = false;
/*
function trythis()
{ alert();}
*/

//change simulation specific css content. e.g. padding on top of variable to adjust appearance in variables window
function editcss() {
  $(".variable").css("padding-top", "20px");
  $(".usercheck").css("left", "25px");
  $(".usercheck").css("width", "150px");
  $(".usercheck").css("padding-top", "7px");
  //$('#legend').css("width",document.getElementById('legendimg').width+"px");
  $("#quickref").css(
    "height",
    document.getElementById("quickrefimg").height + "px"
  );
}

function startsim() {
  simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
}

// switches state of simulation between 0:Playing & 1:Paused
function simstate() {
  var pauseTime;
  var imgfilename = document.getElementById("playpausebutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluepausedull") {
    document.getElementById("playpausebutton").src = "images/blueplaydull.svg";
    clearInterval(simTimeId);
    simstatus = 1;
    $("#thetaspinner").spinner("value", theta);
    pauseTime = setInterval("varupdate();", "100");
    document.querySelector(".playPause").textContent = "Play";
  }
  if (imgfilename == "blueplaydull") {
    time = 0;
    clearInterval(pauseTime);
    document.getElementById("playpausebutton").src = "images/bluepausedull.svg";
    simTimeId = setInterval("time=time+0.1; varupdate(); ", "100");
    simstatus = 0;
    document.querySelector(".playPause").textContent = "Pause";
  }
}

// switches state of rotation between 1:CounterClockWise & -1:Clockwise
function rotstate() {
  var imgfilename = document.getElementById("rotationbutton").src;
  imgfilename = imgfilename.substring(
    imgfilename.lastIndexOf("/") + 1,
    imgfilename.lastIndexOf(".")
  );
  if (imgfilename == "bluecwdull") {
    document.getElementById("rotationbutton").src = "images/blueccwdull.svg";
    rotstatus = -1;
  }
  if (imgfilename == "blueccwdull") {
    document.getElementById("rotationbutton").src = "images/bluecwdull.svg";
    rotstatus = 1;
  }
}

//Displaying Equations for Quick Reference
/*function shows()
{
  if(document.getElementById("newimage").checked==true){
    document.getElementById("myImageId").src="images/quickrefHart.png";
  }
  else{
    document.getElementById("myImageId").src="";
  }
 
 }
 */
const divContainer = document.querySelector("#elementToworkon");
let isClicked = true;

let showLegend = function () {
  if (isClicked) {
    divContainer.style.display = "block";
    isClicked = false;
  } else {
    divContainer.style.display = "none";
    isClicked = true;
  }
};
//Displaying Legend
/*
function showLegend()
{
	if(legendCS)
	{
		$('#legendicon').css('border', 'double');
		$('#legend').css('height', '0px');
		$('#legend').css('border', '0px');
		legendCS=false;	
	}
	else
	{
		$('#legendicon').css('border', 'inset red');
		$('#legend').css("height", document.getElementById('legendimg').height+"px");
		$('#legend').css('border', 'solid 1px');
		legendCS=true;	
	}
}
*/

function varinit() {
  varchange();

  $("#OQslider").slider("value", 38);
  $("#OQspinner").spinner("value", 38);

  $("#AEslider").slider("value", 20);
  $("#AEspinner").spinner("value", 20);

  $("#AQslider").slider("value", 60);
  $("#AQspinner").spinner("value", 60);

  $("#EBslider").slider("value", 60);
  $("#EBspinner").spinner("value", 60);

  $("#thetaslider").slider("value", 55);
  $("#thetaspinner").spinner("value", 55);

  ptx = [];
  pty = [];
  document.getElementById("trace").checked = false;
}

// Initialise and Monitor variable containing user inputs of system parameters.
//change #id and repeat block for new variable. Make sure new <div> with appropriate #id is included in the markup
function varchange() {
  //Link OQ
  // slider initialisation : jQuery widget
  $("#OQslider").slider({ max: 110, min: 30, step: 2 });

  // number initialisation : jQuery widget
  $("#OQspinner").spinner({ max: 110, min: 30, step: 2 });
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#OQslider").on("slide", function (e, ui) {
    $("#OQspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#OQspinner").on("spin", function (e, ui) {
    $("#OQslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#OQspinner").on("change", function () {
    varchange();
  });

  //Link AE
  // slider initialisation : jQuery widget
  $("#AEslider").slider({ max: 110, min: 10, step: 2 });

  // number initialisation : jQuery widget
  $("#AEspinner").spinner({ max: 110, min: 10, step: 2 });
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#AEslider").on("slide", function (e, ui) {
    $("#AEspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#AEspinner").on("spin", function (e, ui) {
    $("#AEslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#AEspinner").on("change", function () {
    varchange();
  });

  //Link AQ
  // slider initialisation : jQuery widget
  $("#AQslider").slider({ max: 110, min: 30, step: 2 });

  // number initialisation : jQuery widget
  $("#AQspinner").spinner({ max: 110, min: 30, step: 2 });
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#AQslider").on("slide", function (e, ui) {
    $("#AQspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#AQspinner").on("spin", function (e, ui) {
    $("#AQslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#AQspinner").on("change", function () {
    varchange();
  });

  //Link EB
  // slider initialisation : jQuery widget
  $("#EBslider").slider({ max: 110, min: 30, step: 2 });

  // number initialisation : jQuery widget
  $("#EBspinner").spinner({ max: 110, min: 30, step: 2 });
  // monitoring change in value and connecting slider and number
  // setting trace point coordinate arrays to empty on change of link length
  $("#EBslider").on("slide", function (e, ui) {
    $("#EBspinner").spinner("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#EBspinner").on("spin", function (e, ui) {
    $("#EBslider").slider("value", ui.value);
    ptx = [];
    pty = [];
  });
  $("#EBspinner").on("change", function () {
    varchange();
  });

  // Angle theta
  // slider initialisation : jQuery widget
  $("#thetaslider").slider({ max: 90, min: -90, step: 1 });

  // number initialisation : jQuery widget
  $("#thetaspinner").spinner({ max: 90, min: -90, step: 1 });

  // monitoring change in value and connecting slider and number
  $("#thetaslider").on("slide", function (e, ui) {
    $("#thetaspinner").spinner("value", ui.value);
  });
  $("#thetaspinner").on("spin", function (e, ui) {
    $("#thetaslider").slider("value", ui.value);
  });
  $("#thetaspinner").on("change", function () {
    varchange();
  });

  varupdate();
}

function varupdate() {
  $("#OQslider").slider("value", $("#OQspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#AEslider").slider("value", $("#AEspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#AQslider").slider("value", $("#AQspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#EBslider").slider("value", $("#EBspinner").spinner("value")); //updating slider location with change in spinner(debug)
  $("#thetaslider").slider("value", $("#thetaspinner").spinner("value")); //updating slider location with change in spinner(debug)

  lR = $("#OQspinner").spinner("value");
  la = $("#AEspinner").spinner("value");
  lb = $("#AQspinner").spinner("value");
  lc = $("#EBspinner").spinner("value");

  if (!simstatus) {
    $("#thetaslider").slider("disable");
    $("#thetaspinner").spinner("disable");
    theta = theta + rotstatus * 1;
  }

  if (simstatus) {
    $("#thetaslider").slider("enable");
    $("#thetaspinner").spinner("enable");
    ptx = [];
    pty = [];
    
    theta = $("#thetaspinner").spinner("value");
   
  }

  le = 2 * lR * Math.cos(rad(theta / 2));
  if (
    (la * la + le * le - lb * lb) / (2 * la * le) >= -1 &&
    (la * la + le * le - lb * lb) / (2 * la * le) <= 1
  ) {
    AEQ = deg(Math.acos((la * la + le * le - lb * lb) / (2 * la * le)));
  } else {
    rotstate();
  }

  AEO = AEQ + theta / 2;
  ll = (le * (la + lc)) / la;
  lk = ll - 2 * (la + lc) * Math.cos(rad(AEQ));
  ld = (lk * lc) / (lc + la);
  o.xcoord = 0;
  o.ycoord = 0;
  e.xcoord = lR * -1;
  e.ycoord = 0;
  q.xcoord = lR * Math.cos(rad(theta));
  q.ycoord = lR * Math.sin(rad(theta));
  a.xcoord = e.xcoord + la * Math.cos(rad(AEO));
  a.ycoord = e.ycoord + la * Math.sin(rad(AEO));
  b.xcoord = e.xcoord + lc * Math.cos(rad(180 + AEO));
  b.ycoord = e.ycoord + lc * Math.sin(rad(180 + AEO));
  c.xcoord = a.xcoord + lk * Math.cos(rad(theta / 2));
  c.ycoord = a.ycoord + lk * Math.sin(rad(theta / 2));
  d.xcoord = b.xcoord + ll * Math.cos(rad(theta / 2));
  d.ycoord = b.ycoord + ll * Math.sin(rad(theta / 2));
  p.xcoord = e.xcoord + ld * Math.cos(rad(theta / 2));
  p.ycoord = e.ycoord + ld * Math.sin(rad(theta / 2));

  //dummy=2*deg(Math.acos(Math.sqrt(lb*lb-la*la)/(2*lR)));
  //dummy2=2*deg(Math.acos((la+lb)/(2*lR)));
  //dummy3=2*deg(Math.acos((la-lb)/(2*lR)));
  printcomment(
    "Mechanism will stop functioning when linkage combination will not allow movement",
    0
  );
  //printcomment(theta,1);
  //printcomment(dummy+" "+dummy2+" "+dummy3,2);
  draw();
}

function draw() {
  //pointdisp(a); to display point
  //pointjoin(a,b); to join to points with a line
  canvas = document.getElementById("simscreen");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 550, 400); //clears the complete canvas#simscreen everytime

  o = pointtrans(o, trans);
  q = pointtrans(q, trans);
  a = pointtrans(a, trans);
  b = pointtrans(b, trans);
  c = pointtrans(c, trans);
  d = pointtrans(d, trans);
  e = pointtrans(e, trans);
  p = pointtrans(p, trans);

  ptx.push(p.xcoord);
  pty.push(p.ycoord);

  pointjoin(o, q, ctx, "brown");
  pointjoin(o, e, ctx, "brown");
  pointjoin(e, a, ctx, "blue");
  pointjoin(e, b, ctx, "blue");
  pointjoin(b, c, ctx, "green");
  pointjoin(a, d, ctx, "green");
  pointjoin(c, d, ctx, "blue");

  pointdisp(o, ctx);
  pointdisp(q, ctx);
  pointdisp(a, ctx);
  pointdisp(b, ctx);
  pointdisp(c, ctx);
  pointdisp(d, ctx);
  pointdisp(e, ctx);

  if (trace) {
    pointtrace(ptx, pty, ctx, "blue", 2);
    pointdisp(p, ctx, 2, "", "", "", true, 2);
  } else {
    ptx = [];
    pty = [];
  }
}

function tracePlot() {
  trace = !trace;
}

// prints comments passed as 'commenttext' in location specified by 'commentloc' in the comments box;
// 0 : Single comment box, 1 : Left comment box, 2 : Right comment box
function printcomment(commenttext, commentloc) {
  if (commentloc == 0) {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 1) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxleft").innerHTML = commenttext;
  } else if (commentloc == 2) {
    document.getElementById("commentboxright").style.visibility = "visible";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxright").innerHTML = commenttext;
  } else {
    document.getElementById("commentboxright").style.visibility = "hidden";
    document.getElementById("commentboxleft").style.width = "285px";
    document.getElementById("commentboxleft").innerHTML =
      "<center>please report this issue to adityaraman@gmail.com</center>";
    // ignore use of deprecated tag <center> . Code is executed only if printcomment function receives inappropriate commentloc value
  }
}
