#pragma strict
//高度差脚本
private var hitsA : RaycastHit[];
private var hitsValueA : float = 0.01;
private var hitValueA : float;
private var hitsB : RaycastHit[];
private var hitsValueB : float = 0.01;
private var hitValueB : float;
//输出脚本
private var thePlayerOutput : PlayerOutput;
private var hits1 : RaycastHit[];
private var hits2 : RaycastHit[];
//private var hits3 : RaycastHit[];
//private var hits4 : RaycastHit[];
private var rayDirection : int;
private var isNearWater : boolean = false;

function Awake () {

	thePlayerOutput = GetComponent(PlayerOutput);

}

function Update () {

	if (GameInfo.canControl) {
		//将键盘输入,输入到操作角色上
		if (Input.GetAxis("Vertical") == 0) thePlayerOutput.SetHorizontalValue(Input.GetAxis("Horizontal"));
		thePlayerOutput.SetVerticalValue(Input.GetAxisRaw("Vertical"));
		thePlayerOutput.SetJumpValue(Input.GetButton("Jump"));
		
		//if (Input.GetAxis("Horizontal") != 0) 
		GameInfo.OnWalk(Input.GetAxis("Horizontal"));
		//if (Input.GetAxis("Vertical") != 0) 
		GameInfo.OnMove(Input.GetAxis("Vertical"));
		
		if (!thePlayerOutput.isControllingRaft) {
			if (thePlayerOutput.GetWalkDirection()) rayDirection = 1;
			else rayDirection = -1;
			
			hits1 = Physics.RaycastAll(transform.position + rayDirection * transform.TransformDirection(2 * Vector3.right) + transform.TransformDirection(Vector3.forward), Vector3(0,-1,0), transform.position.y + 1.5);
			hits2 = Physics.RaycastAll(transform.position + rayDirection * transform.TransformDirection(2.5 * Vector3.right) + transform.TransformDirection(Vector3.forward), Vector3(0,-1,0), transform.position.y + 1.5);
			//hits3 = Physics.RaycastAll(transform.position + rayDirection * 0.5 * transform.TransformDirection(Vector3.right) + transform.TransformDirection(Vector3.forward) + 0.2*transform.TransformDirection(Vector3.up), Vector3(0,-1,0), transform.position.y + 1.5);
			//hits4 = Physics.RaycastAll(transform.position + rayDirection * 0.5 * transform.TransformDirection(Vector3.right) + transform.TransformDirection(Vector3.forward) - 0.2*transform.TransformDirection(Vector3.up), Vector3(0,-1,0), transform.position.y + 1.5);
		    //Debug.DrawRay(transform.position + rayDirection * transform.TransformDirection(2 * Vector3.right) + transform.TransformDirection(Vector3.forward), Vector3(0,-transform.position.y - 1.5,0), Color.green);
		    //Debug.DrawRay(transform.position + rayDirection * transform.TransformDirection(2.5 * Vector3.right) + transform.TransformDirection(Vector3.forward), Vector3(0,-transform.position.y - 1.5,0), Color.green);
		   //	Debug.DrawRay(transform.position + rayDirection * 0.5 * transform.TransformDirection(Vector3.right) + transform.TransformDirection(Vector3.forward) + 0.2*transform.TransformDirection(Vector3.up), Vector3(0,-transform.position.y - 1.5,0), Color.green);
		   // Debug.DrawRay(transform.position + rayDirection * 0.5 * transform.TransformDirection(Vector3.right) + transform.TransformDirection(Vector3.forward) - 0.2*transform.TransformDirection(Vector3.up), Vector3(0,-transform.position.y - 1.5,0), Color.green);
		   
		    //if ((hits1.Length > 0)&&(hits2.Length > 0)&&(hits1.Length > 0)&&(hits2.Length > 0)) {
		    	//if ((hits3.Length == 1)||(hits4.Length == 1)) isNearWater = true;
		    	//else 
		   	if ((hits1.Length == 1)&&(hits2.Length == 1)) isNearWater = true;
		    else isNearWater = false;
		    //}
		
		    if (isNearWater) {
				if ((rayDirection==1&&Input.GetAxis("Horizontal")>0)||(rayDirection==-1&&Input.GetAxis("Horizontal")<0)) thePlayerOutput.SetHorizontalValue(0);
				thePlayerOutput.SetJumpValue(false);
			}
		}
	}
	else {
		thePlayerOutput.SetHorizontalValue(0);
		thePlayerOutput.SetVerticalValue(0);
		thePlayerOutput.SetJumpValue(false);
	}
	
	//以下能返回坡度差值
	hitsA = Physics.RaycastAll(transform.position + rayDirection * 0.55*transform.TransformDirection(Vector3.right), Vector3(0,-1,0), hitsValueA);
	//Debug.DrawRay(transform.position + rayDirection * 0.55*transform.TransformDirection(Vector3.right), hitsValueA*Vector3(0,-1,0), Color.green);
    hitsB = Physics.RaycastAll(transform.position + rayDirection * 0.6*transform.TransformDirection(Vector3.right), Vector3(0,-1,0), hitsValueB);
	//Debug.DrawRay(transform.position + rayDirection * 0.6*transform.TransformDirection(Vector3.right), hitsValueB*Vector3(0,-1,0), Color.green);
   
    if ((hitsA.Length > 0)&&(hitsB.Length > 0)) {
    	//print(hitsA[0].point.y);
    	hitValueA = hitsA[0].point.y;
    	//print(hitsB[0].point.y);
    	hitValueB = hitsB[0].point.y;
    	hitsValueB = 0.01;
    	hitsValueA = 0.01;
    	var t1 : String;
    	var t2 : String;
    	t1 = hitsA[0].transform.gameObject.name;
    	t2 = hitsB[0].transform.gameObject.name;
    	if((t1[0] == 'i')&&(t2[0] == 'i')) thePlayerOutput.SetYRot(hitValueA-hitValueB);
    	else thePlayerOutput.SetYRot(0);

    }
    else {
        if ((hitsA.Length == 0)) hitsValueA += Time.deltaTime;
  		if ((hitsB.Length == 0)) hitsValueB += Time.deltaTime;
    }

}
