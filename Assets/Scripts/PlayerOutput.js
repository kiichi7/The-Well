#pragma strict
private var walkValue : float;
private var turnValue : int;
private var jumpValue : boolean;
//用以判断上次的跳跃输入
private var lastJumpValue : boolean;
//private var lastWalkValue : float;
//用以锁定Vertical值，以仅在变化是输入
private var lastTurnValue : int;
private var lastTurnTimer : float;
//行走速度
private var walkSpeed : float = 0.05;
//true代表往右走,反之往左
private var walkDirection : boolean = true;
private var lastWalkDirection : boolean = true;
private var wd : boolean = true;
//面向xz平面的东南西北1\2\3\4
private var faceDirection : int;
//如果给与其碰撞一定宽度,由于有重心,则碰撞时可向外横滑.没宽度则没滑动
private var theGravity : float;
//着地情况
private var isGrounded : boolean = false;
//跳起速度
private var jumpSpeed : float = 0;
//船控制器
private var raftCon : RaftOutput;
//是否在控制船
var isControllingRaft : boolean = false;
private var controlTimer : float;
//是否在船内
var isOnRaft : boolean = false;
//是否在控制船区
var canControlRaft : boolean = false;
//身体的三个部分
var body : Transform[];
var bodyJump : Transform[];
//透明度变化率
private var changeValue : float;
//运动时间表
private var moveTimer : float;
private var skyTimer : float;
//转向时控制脚步
private var feetTurn : boolean;
//坡度值
private var yRot : float;
//上次跳跃
private var lastJump : float;
//跳跃动画状态
private var jumpAnimeState : int = 0;
//划船动作
private var raftTimer : float;

private var i : float;
private var k : float;

var theStick : StickController;

function Awake () {

	faceDirection = transform.eulerAngles.y/4;
	theGravity = Physics.gravity.y;

}

function Update () {

	controlTimer += Time.deltaTime;

	//print(isGrounded);
	if (isGrounded) skyTimer = 0;
	else skyTimer += Time.deltaTime;
	//print(gameObject.name + " " + faceDirection);
	//print("W:" + walkValue + " T:" + turnValue + " J:" + jumpValue);
	if (!isControllingRaft) {
		if (isGrounded) {
			//判断行走方向		
			if (walkValue > 0) walkDirection = true;
			else if (walkValue < 0) walkDirection = false;
			//左右转向
			//if (((walkDirection)&&(transform.localScale.x < 0))||((!walkDirection)&&(transform.localScale.x > 0))) transform.localScale.x = -transform.localScale.x;
			//上下转向
			if ((lastTurnValue != turnValue)&&((Time.time-lastTurnTimer)>0.5)) {
				if (turnValue == 1) {
					if (walkDirection) {
						faceDirection --;
						feetTurn = false;
					}
					else {
						faceDirection ++;
						feetTurn = true;
					}
					lastTurnTimer = Time.time;
				}
				else if (turnValue == -1) {
					if (walkDirection) {
						faceDirection ++;
						feetTurn = true;
					}
					else {
						faceDirection --;
						feetTurn = false;
					}
					lastTurnTimer = Time.time;
				}
				faceDirection = (faceDirection + 4)%4;
			}
			lastTurnValue = turnValue;
			//跳跃
			if ((jumpValue)&&((Time.time - lastJump)>2)) {
				isGrounded = false;
				jumpSpeed = 5;
				lastJump = Time.time;
				jumpAnimeState = 1;
				k = 0;
			}
		}
	}

	if (Mathf.Abs(Mathf.Abs(transform.eulerAngles.y%90-45)-45)<10) {
		if (walkDirection) {
			body[0].localEulerAngles.z = Mathf.LerpAngle(body[0].localEulerAngles.z, 210, 2*Time.deltaTime);
			body[1].localEulerAngles.z = Mathf.LerpAngle(body[1].localEulerAngles.z, 210, 1*Time.deltaTime);
		}
		else {
			body[0].localEulerAngles.z = Mathf.LerpAngle(body[0].localEulerAngles.z, 150, 2*Time.deltaTime);
			body[1].localEulerAngles.z = Mathf.LerpAngle(body[1].localEulerAngles.z, 150, 1*Time.deltaTime);
		}
	}
	else {
		body[0].localEulerAngles.z = Mathf.LerpAngle(body[0].localEulerAngles.z, 180, Time.deltaTime);
		body[1].localEulerAngles.z = Mathf.LerpAngle(body[1].localEulerAngles.z, 180, 0.5*Time.deltaTime);
		if (feetTurn) {
			body[2].localEulerAngles.z = Mathf.LerpAngle(body[2].localEulerAngles.z, 150, 5*Time.deltaTime);
		}
		else {
			body[2].localEulerAngles.z = Mathf.LerpAngle(body[2].localEulerAngles.z, 210, 5*Time.deltaTime);
		}
		body[2].localPosition.x = Mathf.LerpAngle(body[2].localPosition.x, 0, 1*Time.deltaTime);
		if (isControllingRaft) theStick.transform.localEulerAngles.y = Mathf.LerpAngle(theStick.transform.localEulerAngles.y,-90,2*Time.deltaTime);
	}
	//非行走过程动画
	if (walkValue == 0) {
		body[2].GetComponent(LegController).isWalking = false;
		if (walkDirection) {
			body[2].localEulerAngles.z = Mathf.LerpAngle(body[2].localEulerAngles.z, 168, 1*Time.deltaTime);
			body[2].localPosition.x = Mathf.Lerp(body[2].localPosition.x, 0.1, 1*Time.deltaTime);
		}
		else {
			body[2].localEulerAngles.z = Mathf.LerpAngle(body[2].localEulerAngles.z, 192, 1*Time.deltaTime);
			body[2].localPosition.x = Mathf.Lerp(body[2].localPosition.x, -0.1, 1*Time.deltaTime);
		}
		changeValue = 1;
		body[2].GetComponent(LegController).aValue += 2*Time.deltaTime*changeValue*(Random.value-0.5);
		body[2].GetComponent(LegController).aValue = Mathf.Clamp01(body[2].GetComponent(LegController).aValue);
		moveTimer = 0;
	}
	//行走过程动画
	else {
		body[2].GetComponent(LegController).isWalking = isGrounded;
		body[2].GetComponent(LegController).walkDirection = walkDirection;
		changeValue = 3;
		body[2].localPosition.x = Mathf.LerpAngle(body[2].localPosition.x, 0, 1*Time.deltaTime);
		if (walkDirection) {
			body[2].localEulerAngles.z = Mathf.LerpAngle(body[2].localEulerAngles.z, 150, 1*Time.deltaTime);
			body[2].localPosition.x = Mathf.Lerp(body[2].localPosition.x, 0.2, 0.2*Time.deltaTime);
		}
		else {
			body[2].localEulerAngles.z = Mathf.LerpAngle(body[2].localEulerAngles.z, 210, 1*Time.deltaTime);
			body[2].localPosition.x = Mathf.Lerp(body[2].localPosition.x, -0.2, 0.2*Time.deltaTime);
		}
		body[2].GetComponent(LegController).aValue = Mathf.PingPong(1.5*moveTimer, 1);
		moveTimer += Time.deltaTime;
		
	}	
	
	for (i=0; i<2; i++) {
		body[i].GetComponent(BodyColor).aValue += 2*Time.deltaTime*changeValue*(Random.value-0.5);
		body[i].GetComponent(BodyColor).aValue = Mathf.Clamp01(body[i].GetComponent(BodyColor).aValue);
	}
	
	if (lastWalkDirection != walkDirection) yRot = -yRot;

	if (walkDirection) {
		body[0].localEulerAngles.y = Mathf.LerpAngle(body[0].localEulerAngles.y,-500*yRot,0.2*Time.deltaTime);
		body[1].localEulerAngles.y = Mathf.LerpAngle(body[1].localEulerAngles.y,400*yRot,0.2*Time.deltaTime);
		body[2].localEulerAngles.y = Mathf.LerpAngle(body[2].localEulerAngles.y,750*yRot,0.3*Time.deltaTime);
	}
	else {
		body[0].localEulerAngles.y = Mathf.LerpAngle(body[0].localEulerAngles.y,500*yRot,0.2*Time.deltaTime);
		body[1].localEulerAngles.y = Mathf.LerpAngle(body[1].localEulerAngles.y,-400*yRot,0.2*Time.deltaTime);
		body[2].localEulerAngles.y = Mathf.LerpAngle(body[2].localEulerAngles.y,-750*yRot,0.3*Time.deltaTime);
	}
	lastWalkDirection = walkDirection;
	
	JumpAnime(jumpAnimeState);
	
}

function LateUpdate () {

	for (var i=0; i<body.length; i++) {
	//	print("transform不正常使用关开切换消除"); 造成原因来源于父物体的 scaleX = -1;
	//放入LateUpdate防止使其他脚本无法运行
		body[i].gameObject.SetActive(false);
		body[i].gameObject.SetActive(true);
	}

}

function FixedUpdate () {
//print("isgrounded:" + isGrounded + "  jumpspeed:" + jumpSpeed);
	if (!isControllingRaft) {
		rigidbody.isKinematic = false;
		if (!isGrounded) {
			jumpSpeed += theGravity * Time.fixedDeltaTime;
			transform.position.y += jumpSpeed * Time.fixedDeltaTime;
		}
		else {
			//lastWalkValue = walkValue;
		}
		transform.eulerAngles.y = Mathf.LerpAngle(transform.eulerAngles.y, faceDirection*90, Time.fixedDeltaTime);	
		transform.position += 0.75*transform.TransformDirection(Vector3.right) * Time.fixedDeltaTime * walkValue;
	}
	else {
		rigidbody.isKinematic = true;
		//if ((transform.localEulerAngles.z >90)&&(transform.localEulerAngles.z <=270)) transform.localEulerAngles.z = RotLerp(transform.localEulerAngles.z, 180, Time.fixedDeltaTime * 3);	
		//else  transform.localEulerAngles.z = RotLerp(transform.localEulerAngles.z, 0, Time.fixedDeltaTime * 3);
		if ((transform.localEulerAngles.z >90)&&(transform.localEulerAngles.z <=270)) transform.localEulerAngles.z = Mathf.LerpAngle(transform.localEulerAngles.z, 180, Time.fixedDeltaTime * 3);	
		else transform.localEulerAngles.z = Mathf.LerpAngle(transform.localEulerAngles.z, 0, Time.fixedDeltaTime * 3);	
	}
	
}

function JumpAnime (v : int) {
	var b : float;
	var j : float;
	//print(jumpAnimeState);
	/*else {
		for (j=0; j<2; j++) bodyJump[j].localPosition.z = -0.5*k;
		bodyJump[2].localScale.z = 1 - 0.25*k;
		bodyJump[2].localEulerAngles.z = 25*k;
	}*/
	if (jumpAnimeState == 0) {
		for (j=0; j<3; j++) bodyJump[j].localPosition.z = 0;
		bodyJump[3].localScale.z = 1;
		bodyJump[3].localEulerAngles.z = 0;
	}
	else if (jumpAnimeState == 1) {
		k += 0.1;
		if (k > 1) jumpAnimeState = 0;
		if (k > 0.5) b = 1-k;
		else b = k;
		for (j=0; j<3; j++) bodyJump[j].localPosition.z = -b;
		bodyJump[3].localScale.z = 1 - 0.5*b;
		bodyJump[3].localEulerAngles.z = 50*b;
	}
	else if (jumpAnimeState == 2) {
		k += 0.05;
		if (k > 0.5) jumpAnimeState = 0;
		if (k > 0.25) b = 0.5-k;
		else b = k;
		for (j=0; j<3; j++) bodyJump[j].localPosition.z = -b;
		bodyJump[3].localScale.z = 1 - 0.5*b;
		bodyJump[3].localEulerAngles.z = 50*b;
	}
	else if (jumpAnimeState == 3) {
		k += 0.02;
		if (k > 1) jumpAnimeState = 0;
		if (k > 0.5) b = 1-k;
		else b = k;
		bodyJump[0].localPosition.z = -3.5*b;
		for (j=1; j<3; j++) bodyJump[j].localPosition.z = -3*b;
		bodyJump[3].localPosition.z = -0.5*b;
		bodyJump[3].localScale.z = 1 - 1*b;
		//bodyJump[3].localEulerAngles.z = 50*b;
	}

}

function GetWalkDirection () {
	
	return walkDirection;

}

function RotLerp (from : float, to : float, t : float) {

	if ((to == 90)&&(from > 270)) {
		from -= 360;
	}
	else if ((to == 270)&&(from < 90)) {
		from += 360;
	}
	else if ((to == 0)&&(from > 180)) {
		to += 360;
	}
	return Mathf.Lerp(from, to, t);
	
}

function SetHorizontalValue(theValue : float){

	if (isControllingRaft) {	
		raftTimer += Time.deltaTime;
		if (theValue != 0) {
			if (raftTimer < 5) {
				if (controlTimer >1.5) {
					theStick.SetState(2);
					bodyJump[2].GetComponent(ArmController).downOrUp = false;
					if (theStick.IsStop()) theValue *= 0.01;
					if ((theValue > 0) == walkDirection) {
						raftCon.SetHorizontalValue(theValue);
						theStick.SetDir(true);
					}
					else {
						raftCon.SetHorizontalValue(0.5*theValue);
						theStick.SetDir(false);
					}
				}
			}
			/*else if (raftTimer < 8.5) {
				if (raftTimer >5.5) {
					theStick.SetState(3);
					raftCon.SetHorizontalValue(0);
				}
			}
			else if (raftTimer > 10) raftTimer = 0;*/
		}
		else {
			if (controlTimer >1.5) {
				theStick.SetState(3);
				bodyJump[2].GetComponent(ArmController).downOrUp = false;
				raftTimer = 0;
				raftCon.SetHorizontalValue(0);
			}
		}
		
	}
	else {
		walkValue = theValue;
	}

}

function SetVerticalValue(theValue : int){
	if (isControllingRaft) {	
		if ((!theStick.IsStop())&&(theStick.GetState()==2)) raftCon.SetVerticalValue(theValue);
	}
	else {
		turnValue = theValue;
	}
}

function SetJumpValue(theValue : boolean){
//print(theValue);
	if (isControllingRaft) {
		if((theValue)&&(!lastJumpValue)) {
			if (controlTimer > 1.5) {
				LoseRaftControl();
				controlTimer = 0;
				theStick.SetState(0);
				bodyJump[2].GetComponent(ArmController).downOrUp = true;
				raftTimer = 0;
			}
		}
	}
	else if (isOnRaft) {
		if ((canControlRaft)&&(theValue)&&(!lastJumpValue)) {
			if (faceDirection%2 == raftCon.faceDirection%2) {
				if ((controlTimer > 1.5)&&(Mathf.Abs(Mathf.Abs(transform.eulerAngles.y%90-45)-45)<1)) {
					ControlRaft();
					controlTimer = 0;
					theStick.SetState(1,transform.localPosition.x);
					bodyJump[2].GetComponent(ArmController).downOrUp = true;
					theStick.transform.localPosition.y = transform.localPosition.y;
					raftTimer = 0;
				}
			}
		}
		else if(!lastJumpValue) jumpValue = theValue;
	}
	else {
		if(!lastJumpValue) jumpValue = theValue;
	}
	lastJumpValue = theValue;
}

function SetGrounded (theValue : boolean) {
	isGrounded = theValue;
	if (isGrounded) {
		jumpSpeed = 0;
		if (skyTimer > 0.5) {
			jumpAnimeState = 2;
			k = 0;
			lastJump = Time.time;
		}
	}
}
//撞到顶后直接开始下落
function FallDown() {
	jumpSpeed = 0;
}
//撞到物体后,方向速度开始下降
/*function HitSomething() {
	if (lastWalkValue > 0) lastWalkValue = -0.01;
	else lastWalkValue = 0.01;
}*/

function ControlRaft() {

	isControllingRaft = true;
	if (faceDirection == raftCon.faceDirection) {
		//transform.localScale.x = 1;
		bodyJump[2].GetComponent(ArmController).SetDir(true);
		walkDirection = true;
		raftCon.relaDir = true;
	}
	else if (faceDirection == (raftCon.faceDirection+2)%4) {
		//transform.localScale.x = -1;
		bodyJump[2].GetComponent(ArmController).SetDir(false);
		walkDirection = false;
		raftCon.relaDir = false;
	}
	walkValue = 0;
	turnValue = 0;
	jumpValue = false;
	canControlRaft = true;
	isOnRaft = true;
	raftCon.onRaft = true;
	//faceDirection = raftCon.faceDirection;
	//driveDirection
	raftCon.underControl = true;
	if (jumpAnimeState !=3) {
		jumpAnimeState = 3;
		k = 0;
	}
	raftTimer = 0;

}

function LoseRaftControl(){

	isControllingRaft = false;
	if (raftCon.relaDir) faceDirection = raftCon.faceDirection;
    else faceDirection = (raftCon.faceDirection+2)%4;
    //raftCon.driveValue = 0;
	raftCon.turnValue = 0;
	//walkDirection = true;
	raftCon.underControl = false;
	if (jumpAnimeState !=3) {
		jumpAnimeState = 3;
		k = 0;
	}
	raftTimer = 0;

}

function OnRaft(theRaft : GameObject) {

	raftCon = theRaft.GetComponent(RaftOutput);
	isOnRaft = true;
	raftCon.onRaft = true;
	transform.parent = theRaft.transform;

}

function LeaveRaft(theRaft : GameObject) {

	transform.parent = null;
	isOnRaft = false;
	raftCon.onRaft = false;
	canControlRaft = false;
    isControllingRaft = false;

}

function OnTriggerStay (other : Collider) {
        if(other.gameObject.name == "ControlArea") {
        	canControlRaft = true;
        }
}

function OnTriggerExit (other : Collider) {
        if(other.gameObject.name == "ControlArea") {
        	canControlRaft = false;
        	isControllingRaft = false;
        }
}

function SetYRot (v : float) {

	yRot = v;

}