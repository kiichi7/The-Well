#pragma strict
var theStick : StickController;
var hands : Transform[];
private var sPX0 : float;
private var sPZ0 : float;
private var sPX1 : float;
private var sPZ1 : float;
private var dir : boolean;
var downOrUp : boolean = false;
var duTimer : float;
var v : float;

function Start () {

	sPX0 = hands[0].localPosition.x;
	sPZ0 = hands[0].localPosition.z;
	sPX1 = hands[1].localPosition.x;
	sPZ1 = hands[1].localPosition.z;

}

function Update () {

	if (!theStick.IsStop()) {
		v = Mathf.PingPong(Time.time,1)-0.5;
		if (dir) transform.localScale.x = Mathf.Clamp((theStick.GetRot()-270)/30,-1.2,1.2);
		else transform.localScale.x = -Mathf.Clamp((theStick.GetRot()-270)/30,-1.2,1.2);
		hands[0].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[0].renderer.sharedMaterials[0].color.a,0.9,5*Time.deltaTime);
		hands[1].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[1].renderer.sharedMaterials[0].color.a,0.9,5*Time.deltaTime);
	}
	else {
		if (!downOrUp) {
			v = 0.99*v;
			//hands[0].renderer.sharedMaterials[0].color.a = 0;
			//hands[1].renderer.sharedMaterials[0].color.a = 0;
			hands[0].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[0].renderer.sharedMaterials[0].color.a,0,10*Time.deltaTime);
			hands[1].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[1].renderer.sharedMaterials[0].color.a,0,10*Time.deltaTime);
		}
		else {
			hands[0].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[0].renderer.sharedMaterials[0].color.a,0.9,10*Time.deltaTime);
			hands[1].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[1].renderer.sharedMaterials[0].color.a,0.9,10*Time.deltaTime);
		}
	}
	if (theStick.GetState() == 0) {
		if (!downOrUp) {
			v = 0.99*v;
			//hands[0].renderer.sharedMaterials[0].color.a = 0;
			//hands[1].renderer.sharedMaterials[0].color.a = 0;
			hands[0].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[0].renderer.sharedMaterials[0].color.a,0,10*Time.deltaTime);
			hands[1].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[1].renderer.sharedMaterials[0].color.a,0,10*Time.deltaTime);
		}
		else {
			hands[0].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[0].renderer.sharedMaterials[0].color.a,0.9,10*Time.deltaTime);
			hands[1].renderer.sharedMaterials[0].color.a = Mathf.Lerp(hands[1].renderer.sharedMaterials[0].color.a,0.9,10*Time.deltaTime);
		}
	}

	if (!downOrUp) {
		hands[0].localPosition.x = sPX0 + v/1.8;
		hands[0].localPosition.z = sPZ0 + 0.8*v;
		hands[1].localPosition.x = sPX0 - v/1.8;
		hands[1].localPosition.z = sPZ0 - 0.8*v;
	}
	else {
		if (dir) transform.localScale.x = 0.8;
		else transform.localScale.x = -0.8;
		//if (dir) transform.localScale.x = Mathf.Clamp(transform.localScale.x,1,Time.deltaTime);
		//else transform.localScale.x = Mathf.Clamp(transform.localScale.x,-1,Time.deltaTime);
		if (duTimer < 0.5) {
			hands[0].localPosition.x = sPX0 - 0.3*duTimer;
			hands[1].localPosition.x = sPX1 - 0.8*duTimer;
			hands[0].localPosition.z = sPZ0 - 1.2*duTimer;
			hands[1].localPosition.z = sPZ1 - 1.5*duTimer;
			hands[0].localEulerAngles.y = 270 + 120*duTimer;
			hands[1].localEulerAngles.y = 270 + 120*duTimer;
		}
		else {
			hands[0].localPosition.x = sPX0 - 0.3*(1-duTimer);
			hands[1].localPosition.x = sPX1 - 0.8*(1-duTimer);
			hands[0].localPosition.z = sPZ0 - 1.2*(1-duTimer);
			hands[1].localPosition.z = sPZ1 - 1.5*(1-duTimer);
			hands[0].localEulerAngles.y = 270 + 120*(1-duTimer);
			hands[1].localEulerAngles.y = 270 + 120*(1-duTimer);
		}
	}
	
	if (downOrUp) {
		duTimer += Time.deltaTime;
		if (duTimer > 1) downOrUp = false;
	}
	else duTimer = 0;
}

function SetDir (v : boolean) {
	dir = v;
}


//true代表往右走,反之往左
/*var walkDirection : boolean = true;
var aValue : float;
var isWalking : boolean;
private var leftP : float;
private var rightP : float;
var pValue : float;

function Start () {

	leftP = -0.05;
	rightP = 0.625;

}

function Update () {

	
	if (isWalking) {
		pValue = (0.04*aValue)%0.04;
		if (walkDirection) {
			renderer.sharedMaterials[0].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[0].mainTextureOffset.x,(leftP - (0.04-pValue)),5*Time.deltaTime);
			renderer.sharedMaterials[1].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[1].mainTextureOffset.x,(rightP - pValue),5*Time.deltaTime);
		}
		else {
			renderer.sharedMaterials[0].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[0].mainTextureOffset.x,(leftP + (0.04-pValue)),5*Time.deltaTime);
			renderer.sharedMaterials[1].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[1].mainTextureOffset.x,(rightP + pValue),5*Time.deltaTime);
		}
		transform.parent.localScale.x = Mathf.Lerp(transform.parent.localScale.x, 0.8, Time.deltaTime);
	}
	else {
		//pValue = Mathf.Lerp(pValue, 0, 4*Time.deltaTime);
		renderer.sharedMaterials[0].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[0].mainTextureOffset.x,leftP,Time.deltaTime);
		renderer.sharedMaterials[1].mainTextureOffset.x = Mathf.Lerp(renderer.sharedMaterials[1].mainTextureOffset.x,rightP,Time.deltaTime);
		transform.parent.localScale.x = Mathf.Lerp(transform.parent.localScale.x, 1, Time.deltaTime);
	}
	
	renderer.sharedMaterials[0].color.a = Mathf.Pow((1-aValue),0.4);
	renderer.sharedMaterials[1].color.a = Mathf.Pow(aValue,0.4);


}*/