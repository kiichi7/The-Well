#pragma strict
var hits1 : RaycastHit[];
var hits2 : RaycastHit[];
private var i : int;

function Start () {

}

function Update () {


    hits1 = Physics.RaycastAll (transform.position + Vector3(1,0,0), Vector3(0,-1,0), 100.0);
    hits2 = Physics.RaycastAll (transform.position + Vector3(0.75,0,0), Vector3(0,-1,0), 100.0);
    if ((hits1.Length == 1)&&(hits1.Length == 1)&&((hits1[0].transform.gameObject.name)=="Water")&&((hits2[0].transform.gameObject.name)=="Water")) {
    	print("在水边");
    }

}