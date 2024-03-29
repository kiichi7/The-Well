#pragma strict
private var hitsF : RaycastHit[];
private var startF : Vector3;
private var dirF : Vector3;
private var hitsR : RaycastHit[];
private var startR : Vector3;
private var dirR : Vector3;
private var hitsL : RaycastHit[];
private var startL : Vector3;
private var dirL : Vector3;
private var dis : float;
private var output : SwallowOutput;

private var UAD : float;
private var turn : float;
private var speed : float;
private var ranUAD : float;
private var ranTurn : float;
private var ranSpeed : float;

function Start () {

	output = GetComponent(SwallowOutput);

}

function Update () {

	startF = transform.position;
	dirF = transform.TransformDirection(Vector3.forward);
	startR = transform.position;
	dirR = transform.TransformDirection(Vector3.right+0.3*Vector3.forward);
	startL = transform.position;
	dirL = transform.TransformDirection(-Vector3.right+0.3*Vector3.forward);
	dis = 10;
	hitsF = Physics.RaycastAll(startF, dirF, dis);
	hitsR = Physics.RaycastAll(startR, dirR, dis);
	hitsL = Physics.RaycastAll(startL, dirL, dis);
	//Debug.DrawRay(startF, dirF*dis, Color.green);
	//Debug.DrawRay(startR, dirR*1.2*dis, Color.green);
	//Debug.DrawRay(startL, dirL*1.2*dis, Color.green);
	//print(hitsF.Length + " " + hitsR.Length + " " + hitsL.Length);
	
	//关系记录
	/*
	Abs(turn) 长则 speed 降
	UAD 长则 speed 降
	UAD 降则 speed 长
	*/
	ranSpeed += Random.Range(-0.02,0.02);
	ranSpeed = Mathf.Clamp(ranSpeed,-0.2,0.2);
	speed += ranSpeed*Time.deltaTime;
	ranUAD += Random.Range(-4.0,4.0);
	ranUAD = Mathf.Clamp(ranUAD,-10,10);
	UAD += ranUAD*Time.deltaTime;
	ranTurn += Random.Range(-45.0,45.0);
	ranTurn = Mathf.Clamp(ranTurn,-45,45);
	turn += ranTurn*Time.deltaTime;
	
	if ((transform.position.y < 2)&&(UAD < 0)) UAD = 1;
	else if ((transform.position.y > 20)&&(UAD > 0)) UAD = -1;
	
	UAD = Mathf.Clamp(UAD,-45,45);
	speed = Mathf.Clamp(speed,1,1.5);
	turn = Mathf.Clamp(turn,-60,60);
	
	if (hitsF.Length != 0) {
		if (((hitsF[0].transform.gameObject.name != "PeachTree")&&(hitsF[0].transform.gameObject.name != "Water"))||(hitsF.Length > 1)) {
			if ((hitsR.Length == 0)&&(hitsL.Length != 0)) {
				turn = 60;
			}
			else if ((hitsR.Length != 0)&&(hitsL.Length == 0)) {
				turn = -60;
			}
			else if ((hitsR.Length == 0)&&(hitsL.Length == 0)) {
				if (turn > 0) turn = 60;
				else turn = -60;
			}
			else {
				if (turn > 0) turn = 89;
				else turn = -89;
			}
		}
	}

	output.SetUAD(UAD);
	output.SetTurn(turn);
	output.SetSpeed(speed - 0.01*Mathf.Abs(turn) - 0.1*UAD);
	
	ranTurn *= 0.99;
	turn *= 0.9;
	
}


