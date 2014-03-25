private var targetObject : GameObject;
var distance : float;
var angle : float;

//private var lastDistance : float;
private var lastAngle : float;
private var lastFarClipPlane : float;

/*private var lastPX : float;
private var lastPZ : float;
private var lastRY : float;*/

private var theHeight : float;
private var depthValue : float;
private var xOffset : float;
private var tXOffset : float;
private var started : boolean = false;

function Awake () {

	targetObject = GameObject.Find("Player");
	theHeight = transform.localPosition.y;
	distance = transform.localPosition.z;
	angle = camera.fieldOfView/2;
	depthValue = Mathf.Tan(angle*Mathf.Deg2Rad)*distance;

	if (camera.aspect < 7/3) {
		camera.rect.y = (camera.pixelRect.height-camera.pixelRect.width/7*3)/(2*camera.pixelRect.height);
		camera.rect.height = 1-2*camera.rect.y;
	}
	/*else if (camera.aspect > 7/3) {
		camera.rect.x = (camera.pixelRect.width-camera.pixelRect.height*7/3)/(2*camera.pixelRect.width);
		camera.rect.width = 1-2*camera.rect.x;
	}*/
		
}

function Update () {

	/*if ((Input.GetKey(KeyCode.Equals))||(Input.GetKey(KeyCode.Minus))) {
		if (Input.GetKey(KeyCode.Equals)) distance += 10*Time.deltaTime;
		else if (Input.GetKey(KeyCode.Minus)) distance -= 10*Time.deltaTime;
		distance = Mathf.Clamp(distance, -1000, -75);
		depthValue = Mathf.Tan(angle*Mathf.Deg2Rad)*distance;
	}
	if ((Input.GetKey(KeyCode.Alpha0))||(Input.GetKey(KeyCode.Alpha9))) {
		if (Input.GetKey(KeyCode.Alpha0)) angle += 2*Time.deltaTime;
		else if (Input.GetKey(KeyCode.Alpha9)) angle -= 2*Time.deltaTime;
		angle = Mathf.Clamp(angle, 15, 25);
		distance = depthValue/Mathf.Tan(angle*Mathf.Deg2Rad);
		camera.fieldOfView = angle * 2;
	}
	if (Input.GetKey(KeyCode.Alpha8)) theHeight += 5*Time.deltaTime;
	else if (Input.GetKey(KeyCode.Alpha7)) theHeight -= 5*Time.deltaTime;
	theHeight = Mathf.Clamp(theHeight, 0, 1000);*/
	
	angle = Mathf.Lerp(angle, 15 + 15 * GameInfo.chaosValue, 0.1*Time.deltaTime);
	distance = depthValue/Mathf.Tan(angle*Mathf.Deg2Rad);
	if (Mathf.Abs(lastAngle - angle)<0.5) angle = lastAngle;
	else lastAngle = angle;
	//if (Mathf.Abs(lastDistance - distance)<1) distance = lastDistance;
	//else lastDistance = distance;
	camera.fieldOfView = angle * 2;
	//distance = Mathf.Lerp(distance, -75 + 25 * GameInfo.chaosValue, 0.1*Time.deltaTime);
	//depthValue = Mathf.Tan(angle*Mathf.Deg2Rad)*distance;

	//tXOffset = camera.aspect*2*0.118*distance*Mathf.Tan(Mathf.Deg2Rad*camera.fieldOfView/2);
	tXOffset = camera.aspect*2*0.25*distance*Mathf.Tan(Mathf.Deg2Rad*camera.fieldOfView/2);
	if (GameInfo.thePlayer.GetComponent(PlayerOutput).GetWalkDirection()) {
		xOffset = Mathf.Lerp(xOffset,-tXOffset,0.1*Time.deltaTime);
		if (!started) {
			xOffset = -tXOffset;
			started = true;
		}
	}
	else {
		xOffset = Mathf.Lerp(xOffset,tXOffset,0.1*Time.deltaTime);
		if (!started) {
			xOffset = tXOffset;
			started = true;
		}
	}

	if (targetObject != null){
		transform.eulerAngles.y = targetObject.transform.eulerAngles.y;
		transform.position = targetObject.transform.position + transform.TransformDirection(Vector3(xOffset, theHeight, distance));
		var hits : RaycastHit[];
		var rayDirection : Vector3 = transform.position - targetObject.transform.position;
		var theDistance : float = Vector3.Distance(transform.position, targetObject.transform.position);
	    hits = Physics.RaycastAll (targetObject.transform.position, rayDirection, theDistance);
	    for (var i = 0;i < hits.Length; i++) {
	        var hit : Transform = hits[i].transform;
	       	if ( hit.gameObject.GetComponent("AlphaFade") != null) {
	      		hit.gameObject.GetComponent("AlphaFade").ColorFade(); 
	        }
	    }
	}
	
	GameInfo.PCDis = distance;
	camera.farClipPlane = transform.parent.GetComponent("AmbientLight").GetFar();
	if (Mathf.Abs(lastFarClipPlane - camera.farClipPlane)<5) camera.farClipPlane = lastFarClipPlane;
	else lastFarClipPlane = camera.farClipPlane;
	
	/*if (Mathf.Abs(lastPX - transform.position.x)<0.2) transform.position.x = lastPX;
	else lastPX = transform.position.x;
	if (Mathf.Abs(lastPZ - transform.position.z)<0.2) transform.position.z = lastPZ;
	else lastPZ = transform.position.z;
	if (Mathf.Abs(lastRY - transform.eulerAngles.y)<0.2) transform.eulerAngles.y = lastRY;
	else lastRY = transform.eulerAngles.y;*/
	
}
