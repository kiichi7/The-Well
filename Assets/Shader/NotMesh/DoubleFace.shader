Shader "Custom/DoubleFace" {
Properties {
	_Color ("Main Color", Color) = (1,1,1,1) 
	_MainTex ("Base (RGB) Trans (A)", 2D) = "" {}
}

SubShader {
	Tags {
		"Queue"="Transparent"
		"IgnoreProjector"="True"
		"RenderType"="Transparent"
	}
	Pass {
		//ZWrite On
		//Lighting Off
		Cull Off //注释掉则为单面
		Blend SrcAlpha OneMinusSrcAlpha 
		Alphatest Greater 0
		SetTexture [_MainTex] { 
		constantColor [_Color]
		combine texture * constant } 
	}
}

}
