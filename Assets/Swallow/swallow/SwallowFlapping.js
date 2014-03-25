#pragma strict
var wings : Transform;
private var fanSpeed : float = 15;
private var isGliding : boolean = false;

function Start () {

}

function LateUpdate () {

	if (!isGliding) wings.localScale.y = PingPong(wings.localScale.y,30*fanSpeed);
	else wings.localScale.y = Mathf.Lerp(wings.localScale.y,1,5*Time.deltaTime);
	wings.localScale.x = 1 + 0.15*(1-Mathf.Abs(wings.localScale.y));

}

function SetFan (v : float) {

	if (v > 1.6) {
		fanSpeed = 0;
		isGliding = true;
	}
	else {
		fanSpeed = v;
		isGliding = false;
	}

}

private var ppv : boolean;

function PingPong (v : float, s: float) {

	if (ppv) v += s*Time.deltaTime;
	else v -= s*Time.deltaTime;
	v = Mathf.Clamp(v,-1.0,1.0);
	if ((v == 1)||(v == -1)) ppv = !ppv;
	return v;

}