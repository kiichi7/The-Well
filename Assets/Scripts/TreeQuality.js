#pragma strict
var thePeachTree : Transform;
var peach : Material;
var peach_hd : Material;
private var theColor : Color;
private var timer : float;
private var doTimer : int;
private var gap : float = 0.002;
var thePetal : GameObject;
var petalMaterial : Material[];
private var isHighQuality : boolean = true;
private var ifVisible : boolean = false;
private var thisPetal : GameObject;
//var petalNumber : int;

function Start () {

	timer = Random.Range(0.0, gap);

}

function Update () {

	//print(petalNumber);

	if ((ifVisible)&&(GameInfo.CameraDis(transform.position.x, transform.position.z)<GameInfo.qualityDis)) {
	
		if (doTimer < 5) {
			doTimer ++;
		}
		else {
			for (var i = 0;i < GameInfo.GetPetalSpeed();i++) {
				//if (petalNumber < 5 * GameInfo.GetPetalSpeed()) 
				CreatPetal();
			}
			if (GameInfo.CameraDis(transform.position.x, transform.position.z)<0.35*GameInfo.qualityDis) SetHighQuality();
			else SetLowQuality();
		}

	}
	else SetLowQuality();

}

function IfVisible() {

	return ifVisible;

}

function  SetVisible() {

	ifVisible = true;

}

function  SetInvisible() {

	ifVisible = false;

}

function SetHighQuality () {

	if  (!isHighQuality) {
		thePeachTree.renderer.material = peach_hd;
		thePeachTree.GetComponent(ColorChange).SetColor(theColor);
		isHighQuality = true;
	}
	doTimer = 0;

}

function SetLowQuality () {

	if (isHighQuality) {
		thePeachTree.renderer.material = peach;
		thePeachTree.GetComponent(ColorChange).SetColor(theColor);
		isHighQuality = false;
	}
	doTimer = 0;

}

function CreatPetal () {

	//petalNumber ++;
	thisPetal = Instantiate(thePetal, transform.position, transform.rotation);
	thisPetal.renderer.material = petalMaterial[Random.Range(0,3)];
	//thisPetal.renderer.material = petalMaterial[0];
	thisPetal.transform.parent = transform;
	thisPetal.transform.localPosition = Vector3(Random.Range(-7.5, 7.5),0.01,Random.Range(-6.0, -3.0));
	thisPetal.transform.localEulerAngles.y = Random.Range(0,360);
	thisPetal.GetComponent(ColorChange).SetColor(theColor);

}

function SetColor (theValue : Color) {

	theColor = theValue;
	//theColor.a = 0;

}

/*function OnTriggerStay	(other : Collider) {

    if (other.gameObject.name == "Camera") {
    	SetHighQuality();
    }

}*/
