#pragma strict
private var sPX : float;
private var sPZ : float;
private var sRY : float;
private var sSX : float;
private var timer : float;
private var state : int;
private var tp : float;
//划竹筏与竹筏相对方向
private var dir : boolean;

//位置差速度修正
private var correctValue : float;

function Start () {

	sPX = transform.localPosition.x;
	sPZ = transform.localPosition.z;
	sRY = transform.localRotation.y;
	sSX = transform.lossyScale.x;

}

function Update () {

	timer += Time.deltaTime;
	if (state == 0) {
		PutDown();
	}
	else if (state == 1){
		GetUp();
	}
	else if (state == 2){
		PuntDown();
	}
	else if (state == 3){
		PuntUp();
	}

}

function LateUpdate () {
	gameObject.SetActive(false);
	gameObject.SetActive(true);
}

function GetUp () {

	if ((timer > 0.5)&&(timer < 1.5)) {
		transform.localPosition.x = Mathf.Lerp(transform.localPosition.x,tp,0.5*(timer-0.5));
		transform.localEulerAngles.y = Mathf.LerpAngle(transform.localEulerAngles.y,-60,0.5*(1-correctValue)*Mathf.Pow((timer-0.5),(1.1+correctValue)));
		//transform.lossyScale.x = sSX;
	}
}

function PutDown () {
	if ((timer > 0.2)&&(timer < 1.2)) {
		transform.localPosition.x = Mathf.Lerp(transform.localPosition.x,sPX,0.25*(timer-0.2));
		transform.localEulerAngles.y = Mathf.LerpAngle(transform.localEulerAngles.y,0.3*sRY,(timer-0.2));
		transform.localScale.x = Mathf.Lerp(transform.localScale.x,sSX,5*Time.deltaTime);
	}
	if (transform.localScale.x > 0.99) transform.localScale.x = 1;
}

function PuntDown () {
	//print(transform.lossyScale.x + " " + timer);
	if (transform.localScale.x > 0.3) {
		transform.localScale.x -= 0.15 * Time.deltaTime;
	}
	else transform.localScale.x = 0.3;
	if (dir) {
		transform.localEulerAngles.y = Mathf.LerpAngle(transform.localEulerAngles.y,-60,Time.deltaTime);
	}
	else {
		transform.localEulerAngles.y = Mathf.LerpAngle(transform.localEulerAngles.y,-105,Time.deltaTime);
	}
}

function PuntUp () {
	if (transform.localScale.x < 1) transform.localScale.x += 0.25*Time.deltaTime;
	else transform.localScale.x = 1;
}

function SetState (v : int, p : float) {

	correctValue = 0.05*Mathf.Abs(transform.localPosition.x - p);
	correctValue = Mathf.Clamp01(correctValue);
	if (state != v) {
		state = v;
		tp = p;
		timer = 0;
	}
	
}

function SetState (v : int) {
	if (state != v) {
		state = v;
		timer = 0;
	}
}

function GetState () {
	return state;
}

function SetDir (v : boolean) {
	dir = v;
}

function GetDir () {
	return dir;
}

function GetRot () {
	return transform.localEulerAngles.y;
}

function IsStop () {
	return ((transform.localScale.x == 0.3)||(transform.localScale.x == 1));
}
