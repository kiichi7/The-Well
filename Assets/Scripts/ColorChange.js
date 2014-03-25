#pragma strict
var isMeshChange : boolean = true;
private var myAlpha : float = 1.0;

function Start () {

}

function SetColor (theColor : Color) {

	if (isMeshChange) {
		var mesh : Mesh;
	    var colors : Color[];
		mesh = GetComponent(MeshFilter).mesh;
		colors = new Color[mesh.vertexCount];
	    for (var i = 0; i < mesh.vertexCount ;i++) {
	    	colors[i] = theColor;
	    	colors[i].a = myAlpha;
	    }
	    mesh.colors = colors;
    }
    else {
    	renderer.material.color = theColor;
    	renderer.material.color.a = myAlpha;
    }
	
}

function SetAlpha (theAlpha : float) {

	myAlpha = theAlpha;
	if (isMeshChange) {
		var mesh : Mesh;
	    var colors : Color[];
		mesh = GetComponent(MeshFilter).mesh;
		colors = new Color[mesh.vertexCount];
		colors =  mesh.colors;
	    for (var i = 0; i < mesh.vertexCount;i++)
	    	colors[i].a = theAlpha;
	    mesh.colors = colors;
	}
	else {
		renderer.material.color.a = theAlpha;
	}
	
}

function GetAlpha () {

	return myAlpha;

}