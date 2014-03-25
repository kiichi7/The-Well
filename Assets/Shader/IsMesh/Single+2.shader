Shader "theWell/Single+2" {
    Properties {
        _MainTex ("Sprite Texture", 2D) = "" {}
    }

    Category {
        Tags { "Queue"="Transparent+2" "IgnoreProjector"="True" "RenderType"="Transparent" }
        Blend SrcAlpha OneMinusSrcAlpha
        Alphatest Greater 0
            //Cull Off 
            Lighting Off 
            //ZWrite Off 
            //Fog { Color (0,0,0,0) }

        BindChannels {
            Bind "Color", color
            Bind "Vertex", vertex
            Bind "TexCoord", texcoord
        }

        SubShader {
            Pass {
                SetTexture [_MainTex] {
                    combine texture * primary
                }
            }
        }
        
    }
}