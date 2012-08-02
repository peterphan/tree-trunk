/* Finds node with matching string from form input */
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

/* If node is found, sets current_elem to the node and updates text displays */
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

/* Updates the name of the selected node */
function setNodeName(str, event) {
	if(current_elem && event.keyCode == ENTER_KEY) {
		var label = current_elem.label;
		label.attr("text", str.toUpperCase());
		document.getElementById('setNodeName').value = "";
		document.getElementById('elemSelected').innerHTML = label.attr("text");
	}
}

/* Returns an array of xcoordinates for children nodes */
function getXCoordinates(childrenSize, xCoord, yCoord) {
	var xCoords = new Array();
	var half = Math.floor(childrenSize/2);
	var factor;
	var offset = childrenSize;
	if(half == 0) {
		factor = 0;
	} else {
		factor = yCoord*CHILD_SEPARATOR_VALUE/(half);
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

/* Updates the new element coordinates */
function RearrangeBranches(endY) {
	var length = current_elem.branches.length;
	var circle = current_elem.circle;
	var label = current_elem.label;
	var startX = circle.attr("cx");
	var startY = label.getBBox().y2;
	var xCoords = getXCoordinates(length, startX, startY);
	console.log(length);
	for(i=0; i<length; i++) {
		var branch = current_elem.branches[i];
		if(branch.line) {
			branch.line.remove();
		}
		var line = canvas.makeLine(startX, startY, xCoords[i], endY);
		branch.line = line;
		var node = branch.node;
		node.circle.attr("cx", xCoords[i]);
		transformElement(node.label, xCoords[i], node.label.getBBox().height+node.circle.getBBox().height/2);
	}
}

/* FORM */
function makeBranch(event) {
	if(canvas) {
		try { if(event.keyCode != ENTER_KEY) {return;}}
		catch (err) {console.log(err.message);}
		
		var textField = document.getElementById('newNodeName');
		if(!textField.value) return;

		// Set up vars
		var label = current_elem.label;
		var circle = current_elem.circle;
		var endY = label.getBBox().y2 + OFFSET_BETWEEN_NODES;

		// create and append node to branches
		var node = canvas.makeNode(circle.attr("cx"), endY+CIRCLE_RADIUS, textField.value.toUpperCase());
		var branch = new Branch(canvas.makeLine(circle.attr("cx"), circle.attr("cy"), circle.getBBox().x2, circle.attr("cy")+30), node); //null, node); //null, node);
		current_elem.branches.push(branch);

		RearrangeBranches(endY);
		textField.value = "";
	}
}

function recursiveRemove(node) {
	if(!node) return;
	var length = node.branches.length;
	console.log(length);
	for(i=0; i<length; i++) {
		if(node.branches[i].line) {
			node.branches[i].line.remove();
		}
		//recursiveRemove(node.branches[i].node);
	}
	//node.circle.remove();
	//node.label.remove();
}

function resetCanvas() {
	prev = null;
	recursiveRemove(current_elem);
	current_elem = null;
}

/* TODO: */
function setProbability(val) {
	
}