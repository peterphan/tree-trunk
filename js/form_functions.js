/* HELPER */
function findNode(str, elem) {
	var label = elem.label;
	if(str == elem.label.attr("text").toLowerCase()) {
		return elem;
	}
	var length = elem.branches.length;
	if(length != 0) {
		for(i=0; i<length; i++) {
			var node = findNode(str, elem.branches[i].node);
			if(node) {
				return node;
			}
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
function getXMidpoint(label, circle) {
	return circle.getBBox().x + label.getBBox().width() / 2 + circle.attr("r");
}

/* FORM */
function makeBranch(event) {
	if(canvas) {
		try { if(event.keyCode != ENTER_KEY) {return;}
		}catch (err) {}
		
		var label = current_elem.label;
		var circle = current_elem.circle;
		var textField = document.getElementById('newNodeName');
		var node = canvas.makeNode(circle.getBBox().x2, circle.getBBox().y2+30, textField.value);
		var line = canvas.makeLine(50, 50, 100, 100);
		var branch = new Branch(line, node);

		textField.value = "";
		current_elem.branches.push(branch);
		current_elem = node;
		document.getElementById('elemSelected').innerHTML = node.label.attr("text");
		document.getElementById('selectNode').value = node.label.attr("text");
		document.getElementById('setNodeName').value = node.label.attr("text");
		document.getElementById('error').innerHTML = "Selected node " + node.label.attr("text");
		document.getElementById('error').style.color = "blue";
	}
}

/* TODO: */
function setProbability(val) {
	
}