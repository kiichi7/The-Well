#pragma strict
private var collisionTimer : float;

function Awake () {
	
	rigidbody.useGravity = false;
	rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous;
	rigidbody.constraints =  RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY | RigidbodyConstraints.FreezeRotationZ;
	//rigidbody.collisionDetectionMode = CollisionDetectionMode.Continuous;
	
}

function Update () {

	collisionTimer += Time.deltaTime;
	if (collisionTimer > 0.5) GetComponent(PlayerOutput).SetGrounded(false);

}

function FixedUpdate () {

	//锁运动\旋转速度
	if (!rigidbody.isKinematic) {
		rigidbody.velocity = Vector3.zero;
		rigidbody.angularVelocity = Vector3.zero;
	}

}


//碰撞物体或者collider
/*function OnTriggerEnter (other : Collider) {
    print(other.gameObject.name);
}*/

function OnCollisionStay(collision : Collision) {
//print(collision.gameObject.name);
	if (collision.contacts[0].normal.y > 0.5) {
		GetComponent(PlayerOutput).SetGrounded(true);
		if (((collision.gameObject.name) == "Raft")&&(!GetComponent(PlayerOutput).isOnRaft)) GetComponent(PlayerOutput).OnRaft(collision.gameObject);
		else if (((collision.gameObject.name) != "Raft")&&(GetComponent(PlayerOutput).isOnRaft)) GetComponent(PlayerOutput).LeaveRaft(collision.gameObject);
	}
	else if (collision.contacts[0].normal.y < -0.5) {
		GetComponent(PlayerOutput).FallDown();
	}
	//if (Mathf.Abs(collision.contacts[0].normal.x) > 0.5) {
	//	GetComponent(PlayerOutput).HitSomething();
	//}
	collisionTimer = 0;

}

/*function OnCollisionExit(collision : Collision) {

	//collisionTimer += 0.1;
	//if (collisionTimer > 2) GetComponent(PlayerOutput).SetGrounded(false);

}*/