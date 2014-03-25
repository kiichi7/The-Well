#pragma strict
var theObject : GameObject[];
//0为最开始,然后一步步
static var recentStep : int = 0;
//false为进行中,true为已完成
static var recentState : boolean = false;

function Start () {

	recentState = true;

}

function Update () {

	if (recentStep == theObject.Length) Destroy(this);
	if (Time.timeSinceLevelLoad > 1) {
		if ((recentState)&&(recentStep < theObject.Length)) {
			StartStep(recentStep);
			recentStep ++;
		} 
	}

}

function StartStep (nowStep : int) {

	recentState = false;
	theObject[nowStep].SetActive(true);
	//执行开启语句
	

}

static function SetFinished () {
	
	recentState = true;	
	
}