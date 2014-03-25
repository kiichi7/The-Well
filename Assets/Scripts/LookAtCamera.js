/*enum DirectionStyle {

	SameAsPlayer,
	StareAtCamera
		
}
var directionStyle : DirectionStyle = DirectionStyle.SameAsPlayer;*/

function Update () {

	if (GetComponent(TreeQuality) != null) {
		if (GetComponent(TreeQuality).IfVisible()) {
			transform.eulerAngles.y = GameInfo.SameAsPlayerValue;
		}
	}
	else {
			transform.eulerAngles.y = GameInfo.SameAsPlayerValue;
	}

	/*if (GetComponent(TreeQuality) != null) {
		if (GetComponent(TreeQuality).IfVisible()) {
			if (directionStyle == DirectionStyle.StareAtCamera) {
				transform.eulerAngles.y = Quaternion.LookRotation(Camera.main.transform.position - transform.position).eulerAngles.y;
			}
			else {
				transform.eulerAngles.y = GameInfo.SameAsPlayerValue;
			}
		}
	}
	else {
		if (directionStyle == DirectionStyle.StareAtCamera) {
			transform.eulerAngles.y = Quaternion.LookRotation(Camera.main.transform.position - transform.position).eulerAngles.y;
		}
		else {
			transform.eulerAngles.y = GameInfo.SameAsPlayerValue;
		}
	}*/
	
}
