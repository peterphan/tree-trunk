/* HELPER */
function findNode(str, elem) {
	var label = elem.label;
	if(str == elem.label.attr("text").toLowerCase()) {
		return elem;
	}
	var length = elem.branches.length;
	for(i=0; i<length; i++) {
		var node = findNode(str, elem.branches[i].node);
		if(node) {
			return node;
		}
	}
	return null;
}

/* FORM */
function selectNode(str, event) {
	if(event.keyCode == ENTER_KEY) {
		var node = findNode(str.toLowerCase(), root);
		if(!node) {
			document.getElementById('error').innerHTML = "UNABLE TO LOCATE " + str;
			document.getElementById('error').style.color = "red";
		} else {
			dblClickNode(null, node);
		}
		document.getElementById('selectNode').value = "";
	}
}

/* FORM */
function setNodeName(str, event) {
	if(current_elem && event.keyCode == ENTER_KEY) {
		var label = current_elem.label;
		var circle = current_elem.circle;
		label.attr("text", str);
		transformElement(circle, -1*circle.attr("r") - label.getBBox().width/2, OFFSET);
		transformElement(label, 3, OFFSET);
		document.getElementById('setNodeName').value = "";
		document.getElementById('elemSelected').innerHTML = current_elem.label.attr("text");
	}
}

/* Coordinate helper includes xcoord */
function getXCoordinates(childrenSize, xCoord) {
	var xCoords = new Array();
	var half = Math.floor(childrenSize/2);
	var factor;
	var offset = childrenSize/16;
	if(half == 0) {
		factor = 0;
	} else {
		factor = xCoord/(half);
	}
	factor *= offset;
	if(childrenSize % 2 == 1) {
		for(i=0; i<childrenSize; i++) {
			xCoords.push(xCoord + (i-half)*(factor));
		}
	} else {
		for(i=0; i<childrenSize+1; i++) {
			if(i != childrenSize/2) {
				xCoords.push(xCoord + (i-half)*(factor));
			}
		}
	}
	return xCoords;
}

function avg(a, b) {
	return (a+b)/2;
}

/* FORM */
function makeBranch(event) {
	if(canvas) {
		try { if(event.keyCode != ENTER_KEY) {return;}}
		catch (err) {}
		
		
		var label = current_elem.label;
		var circle = current_elem.circle;
		var textField = document.getElementById('newNodeName');
		var average = avg(circle.getBBox().x, circle.getBBox().x2);

		var xCoordArray = getXCoordinates(current_elem.branches.length+2, average);
		console.log(xCoordArray[0]);
		var line = canvas.makeLine(average, circle.getBBox().y2, xCoordArray[0], circle.getBBox().y2+30);
		var node = canvas.makeNode(xCoordArray[0], circle.getBBox().y2+30, textField.value);
		var branch = new Branch(line, node);

		textField.value = "";
		current_elem.branches.push(branch);
		dblClickNode(null, node);
	}
}

/* TODO: */
function setProbability(val) {
	
}