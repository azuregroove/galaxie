const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./sklo-CCfz1egx.css","./observator-Dd9E7YGM.css","./mustek-DecOccjr.css","./atlas-C622uPa0.js","./atlas-BMCqTuVA.css","./lexend-JZh9LOLU.css","./led-CHwurfvR.js","./mlhovina-BEYT-JFE.css","./kosmos-BrP-JS7K.css","./streams-CHXTZEqC.js","./three.core-CD62mqzW.js","./units-C-gX_q_h.js","./encounters-Bx4c-LW9.js","./constellations-ObLP_dlj.js","./coords-C0UJQfeq.js","./magellan-Cmj4N7pp.js","./clouds-DleTm75x.js","./i18n-BoPdSnUd.js","./view-ByhhOa91.js","./scaleMenu-B_gmL-af.js","./labelPlace-C1Auk-Ey.js","./trekCatalog-D_qQi6sG.js","./voyage-CNJXnkgZ.js","./RoomEnvironment-CDGaFi_V.js","./ships-CzlNChTw.js","./timeline-GASPnI2n.js","./view-DIzZEXwv.js"])))=>i.map(i=>d[i]);
import{a as e,i as t,n,r}from"./i18n-BoPdSnUd.js";import{$ as i,$n as a,A as o,An as s,Ar as c,At as l,C as u,Cn as d,Cr as f,D as p,Dn as m,Dr as h,Dt as g,E as _,En as v,Er as y,Et as b,F as x,Ft as S,Gn as C,Gt as w,H as T,I as E,In as ee,It as D,Jn as O,Kt as k,L as A,Ln as j,Mt as M,N,Nt as te,On as ne,Or as re,P as ie,R as ae,Rn as oe,Rt as P,S as se,Sn as ce,Sr as le,T as ue,Tr as de,Tt as fe,Vt as pe,W as me,Wn as he,Yn as ge,Zn as _e,_r as ve,_t as ye,at as be,b as xe,br as Se,bt as Ce,c as F,cr as we,ct as Te,d as Ee,dr as De,et as Oe,f as ke,fr as I,gr as Ae,gt as je,h as Me,ht as L,i as Ne,ir as Pe,it as Fe,jt as Ie,k as Le,kn as R,kr as z,l as B,lr as Re,lt as ze,m as V,mr as Be,nr as Ve,nt as H,o as He,or as Ue,ot as We,p as U,pr as W,rr as G,s as Ge,st as Ke,tr as qe,tt as Je,ur as Ye,v as Xe,vr as Ze,vt as Qe,w as $e,wn as et,wr as tt,wt as nt,xr as rt,y as it,yr as at,yt as ot,z as st,zn as ct}from"./three.core-CD62mqzW.js";import{a as lt,i as ut,n as dt,o as ft,r as pt,t as mt}from"./coords-C0UJQfeq.js";import{a as K,c as ht,i as q,n as J,o as gt,r as _t,s as vt,t as Y}from"./units-C-gX_q_h.js";import{a as yt,c as bt,d as xt,f as St,i as Ct,m as wt,n as Tt,o as Et,p as Dt,s as Ot,t as kt}from"./labelPlace-C1Auk-Ey.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var At=`modulepreload`,jt=function(e,t){return new URL(e,t).href},Mt={},Nt=function(e){return e.pathname.endsWith(`.css`)},Pt=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Ft=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=jt(t,n);let r=s(t),i=Nt(r);return Pt(Mt,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:At,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},It={sklo:()=>Ft(()=>Promise.resolve({}),__vite__mapDeps([0]),import.meta.url),observator:()=>Ft(()=>Promise.resolve({}),__vite__mapDeps([1]),import.meta.url),mustek:()=>Ft(()=>Promise.resolve({}),__vite__mapDeps([2]),import.meta.url),atlas:()=>Ft(()=>import(`./atlas-C622uPa0.js`),__vite__mapDeps([3,4,5]),import.meta.url),led:()=>Ft(()=>import(`./led-CHwurfvR.js`),__vite__mapDeps([6,5]),import.meta.url),mlhovina:()=>Ft(()=>Promise.resolve({}),__vite__mapDeps([7]),import.meta.url),kosmos:()=>Ft(()=>Promise.resolve({}),__vite__mapDeps([8]),import.meta.url)};function Lt(e){let t=Object.hasOwn(It,e)?It[e]:void 0;return t?t().catch(()=>void 0):Promise.resolve()}function Rt(){return Promise.all(Object.keys(It).map(Lt))}var zt=[`puvodni`,`sklo`,`observator`,`mustek`,`atlas`,`led`,`mlhovina`,`kosmos`],Bt=`galaxie-tema`;function Vt(e){e===`puvodni`||!zt.includes(e)?delete document.documentElement.dataset.tema:document.documentElement.dataset.tema=e,Lt(e),document.querySelectorAll(`#themePick [data-tema]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.tema===(document.documentElement.dataset.tema??`puvodni`))))}var Ht=`puvodni`;try{Ht=localStorage.getItem(Bt)??Ht}catch{}Vt(new URLSearchParams(location.search).get(`tema`)??Ht),Wt(),Ut();function Ut(){let e=document.getElementById(`prefsBtn`),t=document.getElementById(`prefs`);if(!e||!t)return;let n=n=>{n&&Rt(),t.hidden=!n,e.setAttribute(`aria-expanded`,String(n))};e.addEventListener(`click`,e=>{e.stopPropagation(),n(t.hidden!==!1)}),document.addEventListener(`pointerdown`,r=>{!t.hidden&&!t.contains(r.target)&&r.target!==e&&n(!1)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!t.hidden&&n(!1)})}function Wt(){document.querySelectorAll(`#themePick [data-tema]`).forEach(e=>{e.onclick=()=>{Vt(e.dataset.tema);try{localStorage.setItem(Bt,e.dataset.tema)}catch{}}}),Vt(document.documentElement.dataset.tema??`puvodni`)}function Gt(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Kt(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new V(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new L},alphaMap:{value:null},alphaMapTransform:{value:new L},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new L}},envmap:{envMap:{value:null},envMapRotation:{value:new L},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new L}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new L}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new L},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new L},normalScale:{value:new I(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new L},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new L}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new L}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new L}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new V(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new V(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new L},alphaTest:{value:0},uvTransform:{value:new L}},sprite:{diffuse:{value:new V(16777215)},opacity:{value:1},center:{value:new I(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new L},alphaMap:{value:null},alphaMapTransform:{value:new L},alphaTest:{value:0}}},qt={basic:{uniforms:h([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:h([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new V(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:h([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new V(0)},specular:{value:new V(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:h([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new V(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:h([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new V(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:h([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:h([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:h([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:h([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:h([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:h([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new L},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new L}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:h([Z.common,Z.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:h([Z.lights,Z.fog,{color:{value:new V(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};qt.physical={uniforms:h([qt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new L},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new L},clearcoatNormalScale:{value:new I(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new L},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new L},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new L},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new L},sheen:{value:0},sheenColor:{value:new V(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new L},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new L},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new L},transmissionSamplerSize:{value:new I},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new L},attenuationDistance:{value:0},attenuationColor:{value:new V(0)},specularColor:{value:new V(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new L},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new L},anisotropyVector:{value:new I},anisotropyMap:{value:null},anisotropyMapTransform:{value:new L}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var Jt={r:0,b:0,g:0},Yt=new je,Xt=new L;Xt.set(-1,0,0,0,1,0,0,0,1);function Zt(e,t,n,r,i,a){let o=new V(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&i.isCubeTexture?(l===void 0&&(l=new ye(new Ge(1,1,1),new ct({name:`BackgroundCubeMaterial`,uniforms:at(qt.backgroundCube.uniforms),vertexShader:qt.backgroundCube.vertexShader,fragmentShader:qt.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Yt.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Xt),l.material.toneMapped=Me.getTransfer(i.colorSpace)!==j,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new ye(new te(2,2),new ct({name:`BackgroundMaterial`,uniforms:at(qt.background.uniforms),vertexShader:qt.background.vertexShader,fragmentShader:qt.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Me.getTransfer(i.colorSpace)!==j,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Jt,de(e)),n.buffers.color.setClear(Jt.r,Jt.g,Jt.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Qt(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.isInterleavedBuffer===!0?t.stride:t.itemSize,p=s.offset;if(t.isInstancedInterleavedBuffer||t.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function $t(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function en(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`),f=n.logarithmicDepthBuffer===!0&&d===!1;n.reversedDepthBuffer===!0&&d===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`),n.logarithmicDepthBuffer===!0&&d===!0&&z(`WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function tn(e){let t=this,n=null,r=0,i=!1,a=!1,o=new M,s=new L,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var nn=class extends ve{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new xe(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ge(5,5,5),i=new ct({name:`CubemapFromEquirect`,uniforms:at(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new ye(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=be),new Xe(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}},rn=256,an=3,on=20,sn=256,cn=16,ln=3,un=new W,dn=new V,fn=class e{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Xe(1,10,null),this._boxMesh=new ye(new Ge(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=un}=i,s=this._renderer;this._setSize(a);let c=this._allocateTarget(),l=this._getSourceTarget(!0);t>0&&(l.texture.mipmapsAutoUpdate=!1);let u=s.autoClear,d=s.autoClearColor,f=s.autoClearDepth,p=s.autoClearStencil,m=e.background;s.autoClear=!0,s.autoClearColor=!0,s.autoClearDepth=!0,s.autoClearStencil=!0,m===null&&(e.background=s.getClearColor(dn));let h=new Xe(n,r,l);return h.position.copy(o),h.update(s,e),s.autoClear=u,s.autoClearColor=d,s.autoClearDepth=f,s.autoClearStencil=p,e.background=m,t>0&&(l.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yn(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vn(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(rn,f(e))}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?rn:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=pn(e,!1,!1),n=Math.log2(e)-an;for(let r=0;r<=n;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name=`PMREM`,t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=pn(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let r=this._boxMesh,i=this._cubeCamera;r.material=n,i.renderTarget=e,i.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),i.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===301||e.mapping===302?(this._cubemapMaterial===null&&(this._cubemapMaterial=yn()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=vn()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=hn(),this._integrationMaterial=gn());let n=this._cubeSize,r=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(n/cn);for(let o=0;o<=r;o++){let s=e.lodToRoughness(o,r);if(o>r-ln)a.roughness.value=s,this._renderCube(t,o,this._integrationMaterial);else{let e=s>0?Math.log2(n)+.5*Math.log2(6/(sn*s**4))+.5:0;i.roughness.value=s,i.lodBias.value=e,this._renderCube(t,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=_n());let n=this._blurMaterial,r=n.uniforms,i=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=i.texture,this._renderCube(e,0,n),r.envMap.value=e.texture,this._renderCube(i,0,n)}};function pn(e,t,n){return new nn(e,{minFilter:We,generateMipmaps:t,type:st,colorSpace:Te,depthBuffer:n})}function mn(e,t,n){return new ct({name:e,uniforms:t,vertexShader:X.cube_vert,fragmentShader:n,side:1,blending:0,depthTest:!1,depthWrite:!1})}function hn(){return mn(`PMREMGGXConvolution`,{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${sn}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function gn(){return mn(`PMREMGGXIntegration`,{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:cn}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function _n(){return mn(`PMREMSphericalGaussianBlur`,{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${on}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function vn(){return mn(`PMREMEquirectangularToCubemap`,{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function yn(){return mn(`PMREMCubemapToCubemap`,{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function bn(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new nn(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture&&t.isPMREMTexture!==!0){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new fn(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new fn(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function xn(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&c(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Sn(e,t,n,r){let i={},a=new WeakMap,o=new FinalizationRegistry(e=>delete i[e]);function s(e){c(e.target)}function c(e){e.index!==null&&t.remove(e.index);for(let n in e.attributes)t.remove(e.attributes[n]);e.removeEventListener(`dispose`,s),delete i[e.id],o.unregister(e);let c=a.get(e);c&&(t.remove(c),a.delete(e)),r.releaseStatesOfGeometry(e),e.isInstancedBufferGeometry===!0&&delete e._maxInstanceCount,n.memory.geometries--}function l(e,t){return i[t.id]===void 0&&(t.addEventListener(`dispose`,s),i[t.id]=new WeakRef(t),o.register(t,t.id,t),n.memory.geometries++),t}function u(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function d(e){let n=e.index,r=e.attributes.position,i=0;if(r===void 0)return;let o=n===null?r.array.length/3-1:n.array.length,s=new(r.count>=65535?Ve:qe)(Math.ceil(o/3)*6,1),c=s.array;if(n!==null){let e=n.array;i=n.version;for(let t=0,n=0;t<o;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];c[n++]=r,c[n++]=i,c[n++]=i,c[n++]=a,c[n++]=a,c[n++]=r}}else{i=r.version;for(let e=0,t=0;e<o;e+=3){let n=e+0,r=e+1,i=e+2;c[t++]=n,c[t++]=r,c[t++]=r,c[t++]=i,c[t++]=i,c[t++]=n}}s.version=i;let l=a.get(e);l&&t.remove(l),a.set(e,s)}function f(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&d(e)}else d(e);return a.get(e)}function p(){for(let e in i){let t=i[e].deref();t!==void 0&&c(t)}}return{get:l,update:u,getWireframeAttribute:f,dispose:p}}function Cn(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function wn(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:le(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Tn(e,t,n){let r=new WeakMap,i=new Be;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=l===void 0?0:l.length,f=r.get(o);if(f===void 0||f.count!==d){f!==void 0&&f.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],p=0;e===!0&&(p=1),n===!0&&(p=2),a===!0&&(p=3);let m=o.attributes.position.count*p,h=1;m>t.maxTextureSize&&(h=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let g=new Float32Array(m*h*4*d),_=new u(g,m,h,d);_.type=ie,_.needsUpdate=!0;let v=p*4;for(let t=0;t<d;t++){let r=s[t],o=c[t],u=l[t],d=m*h*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}f={count:d,texture:_,size:new I(m,h)},r.set(o,f);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,f.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,f.size)}return{update:a}}function En(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Dn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function On(e,t,n,r,i,a){let o=new ve(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,u=null,d=new B;d.setAttribute(`position`,new N([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute(`uv`,new N([0,2,0,0,2,0],2));let f=new et({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),m=new ye(d,f),h=new l(-1,1,1,-1,0,1),g=null,v=null,y=!1,b,x=null,S=[],C=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<S.length;n++){let r=S[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){S=e,C=S.length>0&&S[0].isRenderPass===!0;let t=o.width,n=o.height;S.length>0&&s===null&&(s=new ve(t,n,{type:st,depthBuffer:!1,stencilBuffer:!1}),c=new ve(t,n,{type:st,depthBuffer:!1,stencilBuffer:!1}));let r=i===!0&&S.some(e=>e.needsDepthTexture===!0);r!==(o.depthTexture!==null)&&(r===!0&&u===null&&(u=new p(t,n),a===!0&&(u.format=_,u.type=Ue)),o.dispose(),o.depthTexture=r?u:null,o.resolveDepthBuffer=r,o.storeMultisampledDepthBuffer=r);for(let e=0;e<S.length;e++){let i=S[e];i.setSize&&i.setSize(t,n),r&&i.needsDepthTexture===!0&&i.setDepthTexture&&i.setDepthTexture(u)}},this.begin=function(e,t){if(y||e.toneMapping===0&&S.length===0)return!1;if(x=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return C===!1&&e.setRenderTarget(o),b=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return C},this.end=function(e,t){e.toneMapping=b,y=!0;let n=o,r=s;for(let i=0;i<S.length;i++){let a=S[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(g!==e.outputColorSpace||v!==e.toneMapping){g=e.outputColorSpace,v=e.toneMapping,f.defines={},Me.getTransfer(g)===`srgb`&&(f.defines.SRGB_TRANSFER=``);let t=Dn[v];t&&(f.defines[t]=``),f.needsUpdate=!0}f.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(x),e.render(m,h),x=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),d.dispose(),f.dispose()}}var kn=new _e,An=new p(1,1),jn=new it(1),Mn=new u,Nn=new se,Pn=new xe,Fn=[],In=[],Ln=new Float32Array(16),Rn=new Float32Array(9),zn=new Float32Array(4);function Bn(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Fn[i];if(a===void 0&&(a=new Float32Array(i),Fn[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Vn(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Hn(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Un(e,t){let n=In[t];n===void 0&&(n=new Int32Array(t),In[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Wn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Gn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vn(n,t))return;e.uniform2fv(this.addr,t),Hn(n,t)}}function Kn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Vn(n,t))return;e.uniform3fv(this.addr,t),Hn(n,t)}}function qn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vn(n,t))return;e.uniform4fv(this.addr,t),Hn(n,t)}}function Jn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Hn(n,t)}else{if(Vn(n,r))return;zn.set(r),e.uniformMatrix2fv(this.addr,!1,zn),Hn(n,r)}}function Yn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Hn(n,t)}else{if(Vn(n,r))return;Rn.set(r),e.uniformMatrix3fv(this.addr,!1,Rn),Hn(n,r)}}function Xn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Vn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Hn(n,t)}else{if(Vn(n,r))return;Ln.set(r),e.uniformMatrix4fv(this.addr,!1,Ln),Hn(n,r)}}function Zn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Qn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vn(n,t))return;e.uniform2iv(this.addr,t),Hn(n,t)}}function $n(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Vn(n,t))return;e.uniform3iv(this.addr,t),Hn(n,t)}}function er(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vn(n,t))return;e.uniform4iv(this.addr,t),Hn(n,t)}}function tr(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function nr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Vn(n,t))return;e.uniform2uiv(this.addr,t),Hn(n,t)}}function rr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Vn(n,t))return;e.uniform3uiv(this.addr,t),Hn(n,t)}}function ir(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Vn(n,t))return;e.uniform4uiv(this.addr,t),Hn(n,t)}}function ar(e){return e.version===0&&(e.compareFunction=519,e.needsUpdate=!0),e}function or(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_2D_SHADOW?ar(An):kn,n.setTexture2D(t||a,i)}function sr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Nn,i)}function cr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;a=this.type===e.SAMPLER_CUBE_SHADOW?ar(jn):Pn,n.setTextureCube(t||a,i)}function lr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Mn,i)}function ur(e){switch(e){case 5126:return Wn;case 35664:return Gn;case 35665:return Kn;case 35666:return qn;case 35674:return Jn;case 35675:return Yn;case 35676:return Xn;case 5124:case 35670:return Zn;case 35667:case 35671:return Qn;case 35668:case 35672:return $n;case 35669:case 35673:return er;case 5125:return tr;case 36294:return nr;case 36295:return rr;case 36296:return ir;case 35678:case 36198:case 36298:case 36306:case 35682:return or;case 35679:case 36299:case 36307:return sr;case 35680:case 36300:case 36308:case 36293:return cr;case 36289:case 36303:case 36311:case 36292:return lr}}function dr(e,t){e.uniform1fv(this.addr,t)}function fr(e,t){let n=Bn(t,this.size,2);e.uniform2fv(this.addr,n)}function pr(e,t){let n=Bn(t,this.size,3);e.uniform3fv(this.addr,n)}function mr(e,t){let n=Bn(t,this.size,4);e.uniform4fv(this.addr,n)}function hr(e,t){let n=Bn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function gr(e,t){let n=Bn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function _r(e,t){let n=Bn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function vr(e,t){e.uniform1iv(this.addr,t)}function yr(e,t){e.uniform2iv(this.addr,t)}function br(e,t){e.uniform3iv(this.addr,t)}function xr(e,t){e.uniform4iv(this.addr,t)}function Sr(e,t){e.uniform1uiv(this.addr,t)}function Cr(e,t){e.uniform2uiv(this.addr,t)}function wr(e,t){e.uniform3uiv(this.addr,t)}function Tr(e,t){e.uniform4uiv(this.addr,t)}function Er(e,t,n){let r=this.cache,i=t.length,a=Un(n,i);Vn(r,a)||(e.uniform1iv(this.addr,a),Hn(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ar(An):kn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Dr(e,t,n){let r=this.cache,i=t.length,a=Un(n,i);Vn(r,a)||(e.uniform1iv(this.addr,a),Hn(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Nn,a[e])}function Or(e,t,n){let r=this.cache,i=t.length,a=Un(n,i);Vn(r,a)||(e.uniform1iv(this.addr,a),Hn(r,a));let o;o=this.type===e.SAMPLER_CUBE_SHADOW?ar(jn):Pn;for(let e=0;e!==i;++e)n.setTextureCube(t[e]||o,a[e])}function kr(e,t,n){let r=this.cache,i=t.length,a=Un(n,i);Vn(r,a)||(e.uniform1iv(this.addr,a),Hn(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Mn,a[e])}function Ar(e){switch(e){case 5126:return dr;case 35664:return fr;case 35665:return pr;case 35666:return mr;case 35674:return hr;case 35675:return gr;case 35676:return _r;case 5124:case 35670:return vr;case 35667:case 35671:return yr;case 35668:case 35672:return br;case 35669:case 35673:return xr;case 5125:return Sr;case 36294:return Cr;case 36295:return wr;case 36296:return Tr;case 35678:case 36198:case 36298:case 36306:case 35682:return Er;case 35679:case 36299:case 36307:return Dr;case 35680:case 36300:case 36308:case 36293:return Or;case 36289:case 36303:case 36311:case 36292:return kr}}var jr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ur(t.type)}},Mr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ar(t.type)}},Nr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Pr=/(\w+)(\])?(\[|\.)?/g;function Fr(e,t){e.seq.push(t),e.map[t.id]=t}function Ir(e,t,n){let r=e.name,i=r.length;for(Pr.lastIndex=0;;){let a=Pr.exec(r),o=Pr.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Fr(n,l===void 0?new jr(s,e,t):new Mr(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Nr(s),Fr(n,e)),n=e}}}var Lr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ir(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Rr(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var zr=37297,Br=0;function Vr(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Hr=new L;function Ur(e){Me._getMatrix(Hr,Me.workingColorSpace,e);let t=`mat3( ${Hr.elements.map(e=>e.toFixed(4))} )`;switch(Me.getTransfer(e)){case ze:return[t,`LinearTransferOETF`];case j:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Wr(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Vr(e.getShaderSource(t),r)}return i}function Gr(e,t){let n=Ur(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( ${n[0]} * value.rgb, value.a ) );`,`}`].join(`
`)}var Kr={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function qr(e,t){let n=Kr[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Jr=new W;function Yr(){return Me.getLuminanceCoefficients(Jr),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Jr.x.toFixed(4)}, ${Jr.y.toFixed(4)}, ${Jr.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Xr(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter($r).join(`
`)}function Zr(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Qr(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function $r(e){return e!==``}function ei(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function ti(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ni=/^[ \t]*#include +<([\w\d./]+)>/gm;function ri(e){return e.replace(ni,ii)}function ii(e,t){let n=X[t];if(n===void 0)throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`);return ri(n)}var ai=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oi(e){return e.replace(ai,si)}function si(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ci(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var li={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function ui(e){return li[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var di={302:`ENVMAP_MODE_REFRACTION`};function fi(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:di[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var pi={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function mi(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:pi[e.combine]||`ENVMAP_BLENDING_NONE`}function hi(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=ui(n),l=n.envMapPMREM===!0?`ENVMAP_TYPE_PMREM`:`ENVMAP_TYPE_CUBE`,u=fi(n),d=mi(n),f=Xr(n),p=Zr(a),m=i.createProgram(),h,g,_=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(h=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter($r).join(`
`),h.length>0&&(h+=`
`),g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p].filter($r).join(`
`),g.length>0&&(g+=`
`)):(h=[ci(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.diffuseRoughnessMapUv?`#define DIFFUSE_ROUGHNESSMAP_UV `+n.diffuseRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter($r).join(`
`),g=[ci(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,p,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMapPMREM?`#define ENVMAP_MAX_LOD `+n.envMapMaxLod+`.0`:``,n.envMapPMREM?`#define ENVMAP_SIZE `+n.envMapSize+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.diffuseRoughness?`#define USE_DIFFUSE_ROUGHNESS`:``,n.diffuseRoughnessMap?`#define USE_DIFFUSE_ROUGHNESSMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:qr(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,Gr(`linearToOutputTexel`,n.outputColorSpace),Yr(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter($r).join(`
`)),o=ri(o),o=ei(o,n),o=ti(o,n),s=ri(s),s=ei(s,n),s=ti(s,n),o=oi(o),s=oi(s),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,h=[f,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+h,g=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+g);let v=_+h+o,y=_+g+s,b=Rr(i,i.VERTEX_SHADER,v),x=Rr(i,i.FRAGMENT_SHADER,y);i.attachShader(m,b),i.attachShader(m,x),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(m,0,`position`):i.bindAttribLocation(m,0,n.index0AttributeName),i.linkProgram(m);function S(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(m)||``,r=i.getShaderInfoLog(b)||``,a=i.getShaderInfoLog(x)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,m,b,x);else{let e=Wr(i,b,`vertex`),n=Wr(i,x,`fragment`);le(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:h},fragmentShader:{log:c,prefix:g}})}i.deleteShader(b),i.deleteShader(x),C=new Lr(i,m),w=Qr(i,m)}let C;this.getUniforms=function(){return C===void 0&&S(this),C};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return T===!1&&(T=i.getProgramParameter(m,zr)),T},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Br++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=x,this}var gi=0,_i=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new vi(e),t.set(e,n)),n}},vi=class{constructor(e){this.id=gi++,this.code=e,this.usedTimes=0}};function yi(e){return e===1030||e===37490||e===36285}function bi(e,t,n,r,a,o){let s=new i,c=new _i,l=new Set,u=[],d=new Map,f=r.logarithmicDepthBuffer,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return l.add(e),e===0?`uv`:`uv${e}`}function h(i,a,s,u,d,h){let g=u.fog,_=d.geometry,v=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,b=t.get(i.envMap||v,y),x=p[i.type],S=r.precision;i.precision!==null&&(S=r.getMaxPrecision(i.precision),S!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,S,`instead.`));let C=_.morphAttributes.position||_.morphAttributes.normal||_.morphAttributes.color,w=C===void 0?0:C.length,T=0;_.morphAttributes.position!==void 0&&(T=1),_.morphAttributes.normal!==void 0&&(T=2),_.morphAttributes.color!==void 0&&(T=3);let E,ee,D,O;if(x){let e=qt[x];E=e.vertexShader,ee=e.fragmentShader}else{E=i.vertexShader,ee=i.fragmentShader;let e=c.getVertexShaderStage(i),t=c.getFragmentShaderStage(i);c.update(i,e,t),D=e.id,O=t.id}let k=e.getRenderTarget(),A=e.state.buffers.depth.getReversed(),j=d.isInstancedMesh===!0,M=d.isBatchedMesh===!0,N=!!i.map,te=!!i.matcap,ne=!!b,re=ne&&b.isPMREMTexture===!0,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,P=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,ue=!!i.roughnessMap,de=i.anisotropy>0,fe=i.clearcoat>0,pe=i.diffuseRoughness>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=de&&!!i.anisotropyMap,be=fe&&!!i.clearcoatMap,xe=fe&&!!i.clearcoatNormalMap,Se=fe&&!!i.clearcoatRoughnessMap,Ce=pe&&!!i.diffuseRoughnessMap,F=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,I=ve&&!!i.transmissionMap,Ae=ve&&!!i.thicknessMap,je=!!i.gradientMap,L=!!i.alphaMap,Ne=i.alphaTest>0,Pe=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le=re?b.isCompressedCubeTexture?b.image[0].mipmaps:b.mipmaps:null,R={shaderID:x,shaderType:i.type,shaderName:i.name,vertexShader:E,fragmentShader:ee,defines:i.defines,customVertexShaderID:D,customFragmentShaderID:O,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:S,batching:M,batchingColor:M&&d._colorsTexture!==null,instancing:j,instancingColor:j&&d.instanceColor!==null,instancingMorph:j&&d.morphTexture!==null,outputColorSpace:k===null?e.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Me.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:te,envMap:ne,envMapMode:ne&&b.mapping,envMapPMREM:re,envMapMaxLod:re?Le.length-1:null,envMapSize:re?Le[0].width:null,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:P,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:P&&i.normalMapType===1,normalMapTangentSpace:P&&i.normalMapType===0,packedNormalMap:P&&i.normalMapType===0&&yi(i.normalMap.format),metalnessMap:le,roughnessMap:ue,anisotropy:de,anisotropyMap:ye,clearcoat:fe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,diffuseRoughness:pe,diffuseRoughnessMap:Ce,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:F,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:I,thicknessMap:Ae,gradientMap:je,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:L,alphaTest:Ne,alphaHash:Pe,combine:i.combine,mapUv:N&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:P&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:le&&m(i.metalnessMap.channel),roughnessMapUv:ue&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:Ce&&m(i.diffuseRoughnessMap.channel),iridescenceMapUv:F&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:I&&m(i.transmissionMap.channel),thicknessMapUv:Ae&&m(i.thicknessMap.channel),alphaMapUv:L&&m(i.alphaMap.channel),vertexTangents:!!_.attributes.tangent&&(P||de),vertexNormals:!!_.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!_.attributes.color&&_.attributes.color.itemSize===4,pointsUvs:d.isPoints===!0&&!!_.attributes.uv&&(N||L),fog:!!g,useFog:i.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||_.attributes.normal===void 0&&P===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:A,skinning:d.isSkinnedMesh===!0,hasPositionAttribute:_.attributes.position!==void 0,morphTargets:_.morphAttributes.position!==void 0,morphNormals:_.morphAttributes.normal!==void 0,morphColors:_.morphAttributes.color!==void 0,morphTargetsCount:w,morphTextureStride:T,numSunLights:a.sun.length,numDirLights:a.directional.length,numPointLights:a.point.length,numSpotLights:a.spot.length,numSpotLightMaps:a.spotLightMap.length,numRectAreaLights:a.rectArea.length,numHemiLights:a.hemi.length,numSunLightShadows:a.sunShadowMap.length,numDirLightShadows:a.directionalShadowMap.length,numPointLightShadows:a.pointShadowMap.length,numSpotLightShadows:a.spotShadowMap.length,numSpotLightShadowsWithMaps:a.numSpotLightShadowsWithMaps,numLightProbes:a.numLightProbes,numLightProbeGrids:h.filter(e=>e.texture!==null).length,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&s.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&Me.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&Me.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return R.vertexUv1s=l.has(1),R.vertexUv2s=l.has(2),R.vertexUv3s=l.has(3),l.clear(),R}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapPMREM),e.push(t.envMapMaxLod),e.push(t.envMapSize),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.diffuseRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.numLightProbeGrids),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){s.disableAll(),t.instancing&&s.enable(0),t.instancingColor&&s.enable(1),t.instancingMorph&&s.enable(2),t.matcap&&s.enable(3),t.envMap&&s.enable(4),t.normalMapObjectSpace&&s.enable(5),t.normalMapTangentSpace&&s.enable(6),t.clearcoat&&s.enable(7),t.iridescence&&s.enable(8),t.alphaTest&&s.enable(9),t.vertexColors&&s.enable(10),t.vertexAlphas&&s.enable(11),t.vertexUv1s&&s.enable(12),t.vertexUv2s&&s.enable(13),t.vertexUv3s&&s.enable(14),t.vertexTangents&&s.enable(15),t.anisotropy&&s.enable(16),t.alphaHash&&s.enable(17),t.batching&&s.enable(18),t.dispersion&&s.enable(19),t.retroreflection&&s.enable(24),t.diffuseRoughness&&s.enable(25),t.batchingColor&&s.enable(20),t.gradientMap&&s.enable(21),t.packedNormalMap&&s.enable(22),t.vertexNormals&&s.enable(23),e.push(s.mask),s.disableAll(),t.fog&&s.enable(0),t.useFog&&s.enable(1),t.flatShading&&s.enable(2),t.logarithmicDepthBuffer&&s.enable(3),t.reversedDepthBuffer&&s.enable(4),t.skinning&&s.enable(5),t.morphTargets&&s.enable(6),t.morphNormals&&s.enable(7),t.morphColors&&s.enable(8),t.premultipliedAlpha&&s.enable(9),t.shadowMapEnabled&&s.enable(10),t.doubleSided&&s.enable(11),t.flipSided&&s.enable(12),t.useDepthPacking&&s.enable(13),t.dithering&&s.enable(14),t.transmission&&s.enable(15),t.sheen&&s.enable(16),t.opaque&&s.enable(17),t.pointsUvs&&s.enable(18),t.decodeVideoTexture&&s.enable(19),t.decodeVideoTextureEmissive&&s.enable(20),t.alphaToCoverage&&s.enable(21),t.numLightProbeGrids>0&&s.enable(22),t.hasPositionAttribute&&s.enable(23),e.push(s.mask)}function y(e){let t=p[e.type],n;if(t){let e=qt[t];n=G.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=d.get(n);return r===void 0?(r=new hi(e,n,t,a),u.push(r),d.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),d.delete(e.cacheKey),e.destroy()}}function S(e){c.remove(e)}function C(){c.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:u,dispose:C}}function xi(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Si(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ci(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function wi(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Si),r.length>1&&r.sort(t||Ci),i.length>1&&i.sort(t||Ci)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Ti(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new wi,e.set(t,[i])):n>=r.length?(i=new wi,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Ei(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new W,color:new V};break;case`SpotLight`:n={position:new W,direction:new W,color:new V,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new W,color:new V,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new W,skyColor:new V,groundColor:new V};break;case`RectAreaLight`:n={color:new V,position:new W,halfWidth:new W,halfHeight:new W}}return e[t.id]=n,n}}}function Di(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new I};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new I};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new I,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Oi=0;function ki(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ai(e){let t=new Ei,n=Di(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new W);let i=new W,a=new je,o=new je;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ki);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Oi++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function ji(e){let t=new Ai(e),n=[],r=[],i=[];function a(e){u.camera=e,n.length=0,r.length=0,i.length=0}function o(e){e.isLightProbeGrid?i.push(e):n.push(e)}function s(e){r.push(e)}function c(){t.setup(n),i.sort((e,t)=>e.priority-t.priority||e.id-t.id)}function l(e){t.setupView(n,e)}let u={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:u,setupLights:c,setupLightsView:l,pushLight:o,pushShadow:s}}function Mi(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ji(e),t.set(n,[a])):r>=i.length?(a=new ji(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Ni=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pi=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Fi=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Ii=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Li=new je,Ri=new W,zi=new W;function Bi(e,t,n){let r=new x,i=new I,a=new I,o=new Be,s=new ot,c=new Ce,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new ct({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new I},radius:{value:4}},vertexShader:Ni,fragmentShader:Pi}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let h=new B;h.setAttribute(`position`,new F(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new ye(h,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,s){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let m=v!==this.type;m&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let h=d.getFrameExtents();i.multiply(h),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/h.x),i.x=a.x*h.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/h.y),i.y=a.y*h.y,d.mapSize.y=a.y));let g=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=g,d.map===null||m===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new ve(i.x,i.y,{format:ce,type:st,minFilter:be,magFilter:be,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new p(i.x,i.y,ie),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ue,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=fe,d.map.depthTexture.magFilter=fe}else l.isPointLight?(d.map=new nn(i.x),d.map.depthTexture=new it(i.x,we)):(d.map=new ve(i.x,i.y),d.map.depthTexture=new p(i.x,i.y,we)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ue,this.type===1?(d.map.depthTexture.compareFunction=g?518:515,d.map.depthTexture.minFilter=be,d.map.depthTexture.magFilter=be):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=fe,d.map.depthTexture.magFilter=fe);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let _=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);let v=d.camera.layers.mask&4294967294?d.camera.layers:s.layers;for(let t=0;t<_;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Ri.setFromMatrixPosition(l.matrixWorld),e.position.copy(Ri),zi.copy(e.position),zi.add(Fi[t]),e.up.copy(Ii[t]),e.lookAt(zi),e.updateMatrixWorld(),n.makeTranslation(-Ri.x,-Ri.y,-Ri.z),Li.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Li,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,v,this.type)}d.isPointLightShadow!==!0&&this.type===3&&y(d,s),d.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(c,l,d)};function y(n,r){let a=t.update(g);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new ve(i.x,i.y,{format:ce,type:st}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,C)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s,c){if(n.visible===!1)return;if(n.layers.test(s)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),s=n.material;if(Array.isArray(s)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=s[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,c);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(s.visible){let t=b(n,s,o,c);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)S(l[e],i,a,o,s,c)}function C(e){e.target.removeEventListener(`dispose`,C);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Vi(e,t){function n(){let t=!1,n=new Be,r=null,i=new Be(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?de(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=s[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?de(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,c=new i,l={},u=new WeakMap,d={},f={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new V(0,0,0),E=0,ee=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,te=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),N=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),N=te>=1);let re=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),P=new Be().fromArray(ae),se=new Be().fromArray(oe);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),c.setClear(0),de(e.DEPTH_TEST),o.setFunc(3),be(!1),xe(1),de(e.CULL_FACE),ve(0);function de(t){d[t]!==!0&&(e.enable(t),d[t]=!0)}function fe(t){d[t]!==!1&&(e.disable(t),d[t]=!1)}function pe(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n),!0)}function me(t,n){let r=h,i=!1;if(t){r=m.get(n),r===void 0&&(r=[],m.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function he(t){return g!==t&&(e.useProgram(t),g=t,!0)}let ge={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ge[103]=e.MIN,ge[104]=e.MAX;let _e={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ve(t,n,r,i,a,o,s,c,l,u){if(t===0)_===!0&&(fe(e.BLEND),_=!1);else if(_===!1&&(de(e.BLEND),_=!0),t!==5){if(t!==v||u!==ee){if((y!==100||S!==100)&&(e.blendEquation(e.FUNC_ADD),y=100,S=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:le(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:le(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:le(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:le(`WebGLState: Invalid blending: `,t)}b=null,x=null,C=null,w=null,T.set(0,0,0),E=0,v=t,ee=u}}else a||=n,o||=r,s||=i,(n!==y||a!==S)&&(e.blendEquationSeparate(ge[n],ge[a]),y=n,S=a),(r!==b||i!==x||o!==C||s!==w)&&(e.blendFuncSeparate(_e[r],_e[i],_e[o],_e[s]),b=r,x=i,C=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),v=t,ee=!1}function ye(t,n){t.side===2?fe(e.CULL_FACE):de(e.CULL_FACE);let r=t.side===1;n&&(r=!r),be(r),t.blending===1&&t.transparent===!1?ve(0):ve(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;c.setTest(i),i&&(c.setMask(t.stencilWriteMask),c.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),c.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Ce(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?de(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function xe(t){t===0?fe(e.CULL_FACE):(de(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Se(t){t!==k&&(N&&e.lineWidth(t),k=t)}function Ce(t,n,r){t?(de(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n,r=-r),e.polygonOffset(n,r))):fe(e.POLYGON_OFFSET_FILL)}function F(t){t?de(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+M-1),re!==t&&(e.activeTexture(t),re=t)}function Te(t,n,r){r===void 0&&(r=re===null?e.TEXTURE0+M-1:re);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(re!==r&&(e.activeTexture(r),re=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Ee(){let t=ie[re];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){le(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){le(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){le(`WebGLState:`,e)}}function I(){try{e.texSubImage3D(...arguments)}catch(e){le(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage2D(...arguments)}catch(e){le(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage3D(...arguments)}catch(e){le(`WebGLState:`,e)}}function Me(){try{e.texStorage2D(...arguments)}catch(e){le(`WebGLState:`,e)}}function L(){try{e.texStorage3D(...arguments)}catch(e){le(`WebGLState:`,e)}}function Ne(){try{e.texImage2D(...arguments)}catch(e){le(`WebGLState:`,e)}}function Pe(){try{e.texImage3D(...arguments)}catch(e){le(`WebGLState:`,e)}}function Fe(t){return f[t]===void 0?e.getParameter(t):f[t]}function Ie(t,n){f[t]!==n&&(e.pixelStorei(t,n),f[t]=n)}function Le(t){P.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),P.copy(t))}function R(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function z(t,n){let r=u.get(n);r===void 0&&(r=new WeakMap,u.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),e.uniformBlockBinding(n,i,i),r.set(t,i))}function B(t,n,r){let i=u.get(n).get(t);l[i]!==r&&(e.bindBufferBase(e.UNIFORM_BUFFER,i,r),l[i]=r)}function Re(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},f={},re=null,ie={},p={},l={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new V(0,0,0),E=0,ee=!1,D=null,O=null,k=null,A=null,j=null,P.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),c.reset()}return{buffers:{color:a,depth:o,stencil:c},enable:de,disable:fe,bindFramebuffer:pe,drawBuffers:me,useProgram:he,setBlending:ve,setMaterial:ye,setFlipSided:be,setCullFace:xe,setLineWidth:Se,setPolygonOffset:Ce,setScissorTest:F,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:Ne,texImage3D:Pe,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:z,uniformBlockBinding:B,texStorage2D:Me,texStorage3D:L,texSubImage2D:ke,texSubImage3D:I,compressedTexSubImage2D:Ae,compressedTexSubImage3D:je,scissor:Le,viewport:R,reset:Re}}function Hi(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new I,u=new WeakMap,d=new Set,f,p=new WeakMap,m=new Set,h=new FinalizationRegistry(e=>m.delete(e)),v=!1;try{v=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function y(e,t){return v?new OffscreenCanvas(e,t):rt(`canvas`)}function x(e,t,n){let r=1,i=Le(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=y(n,a));let o=t?y(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function S(e){return e.generateMipmaps}function C(t){e.generateMipmap(t)}function w(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function T(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?ze:Me.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function E(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ee(e,t){return S(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function D(e){let t=new WeakRef(e);r.get(e).__ref=t,m.add(t),h.register(e,t,t)}function O(e){let t=r.get(e).__ref;t!==void 0&&(m.delete(t),h.unregister(t))}function k(e){j(e.target)}function A(e){M(e.target)}function j(e){e.removeEventListener(`dispose`,k),O(e),te(e),e.isVideoTexture&&u.delete(e),e.isHTMLTexture&&d.delete(e)}function M(e){e.removeEventListener(`dispose`,A),O(e),re(e)}function N(){for(let e of m){let t=e.deref();t!==void 0&&(t.isRenderTarget===!0?M(t):j(t))}m.clear(),d.clear()}function te(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&ne(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function ne(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function re(t){let n=r.get(t);n.__depthDisposeCallback&&n.__depthDisposeCallback();let i=t.depthTexture;if(i&&i.renderTarget===t&&j(i),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let a=t.textures;for(let t=0,n=a.length;t<n;t++){let n=r.get(a[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(a[t])}r.remove(t)}let ie=0;function ae(){ie=0}function oe(){return ie}function P(e){ie=e}function se(){let e=ie;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),ie+=1,e}function ce(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.mipmapsAutoUpdate),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ue(t,i){let a=r.get(t);if(t.isVideoTexture&&Fe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Ce(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function de(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Ce(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function pe(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?Ce(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function me(t,i){let a=r.get(t);t.version>0&&a.__version!==t.version?F(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let he={[R]:e.REPEAT,[U]:e.CLAMP_TO_EDGE,[nt]:e.MIRRORED_REPEAT},ge={[fe]:e.NEAREST,[g]:e.NEAREST_MIPMAP_NEAREST,[b]:e.NEAREST_MIPMAP_LINEAR,[be]:e.LINEAR,[Ke]:e.LINEAR_MIPMAP_NEAREST,[We]:e.LINEAR_MIPMAP_LINEAR},_e={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ve(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,he[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,he[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,he[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ge[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ge[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,_e[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ye(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,k),D(n));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ce(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&ne(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function xe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function Se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=xe(n.start,r.width,4),c=xe(t.start,r.width,4);n.start<=i+1&&a===c&&xe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function Ce(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ye(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Me.getPrimaries(Me.workingColorSpace),r=o.colorSpace===``?null:Me.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=x(o.image,!1,i.maxTextureSize);t=Ie(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=T(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ve(c,o);let h,g=o.mipmaps,v=o.isVideoTexture!==!0,y=f.__version===void 0||l===!0,b=u.dataReady,w=ee(o,t);if(o.isDepthTexture)m=E(o.format===_,o.type),y&&(v?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(g.length>0){v&&y&&n.texStorage2D(e.TEXTURE_2D,w,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else v?(y&&n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height),b&&Se(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){v&&y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,m,g[0].width,g[0].height,t.depth);for(let i=0,a=g.length;i<a;i++)if(h=g[i],o.format!==1023){if(r!==null){if(v){if(b){if(o.layerUpdates.size>0){let t=tt(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else v?b&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{v&&y&&n.texStorage2D(e.TEXTURE_2D,w,m,g[0].width,g[0].height);for(let t=0,i=g.length;t<i;t++)h=g[t],o.format===1023?v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):v?b&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(v){if(y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,w,m,t.width,t.height,t.depth),b){if(o.layerUpdates.size>0){let i=tt(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)v?(y&&n.texStorage3D(e.TEXTURE_3D,w,m,t.width,t.height,t.depth),b&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(y){if(v)n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<w;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(g.length>0){if(v&&y){let t=Le(g[0]);n.texStorage2D(e.TEXTURE_2D,w,m,t.width,t.height)}for(let t=0,i=g.length;t<i;t++)h=g[t],v?b&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(v){if(y){let r=Le(t);n.texStorage2D(e.TEXTURE_2D,w,m,r.width,r.height)}b&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);S(o)&&o.mipmapsAutoUpdate===!0&&C(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function F(t,o,s){if(o.image.length!==6)return;let c=ye(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Me.getPrimaries(Me.workingColorSpace),r=o.colorSpace===``?null:Me.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=x(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Ie(o,m[e]);let h=m[0],g=a.convert(o.format,o.colorSpace),v=a.convert(o.type),y=T(o.internalFormat,g,v,o.normalized,o.colorSpace),b=o.isVideoTexture!==!0,w=u.__version===void 0||c===!0,D=l.dataReady,O=ee(o,h);ve(e.TEXTURE_CUBE_MAP,o);let k;if(o.isDepthTexture){if(y=E(o.format===_,o.type),w){if(b)n.texStorage2D(e.TEXTURE_CUBE_MAP,1,y,h.width,h.height);else for(let t=0;t<6;t++)n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,h.width,h.height,0,g,v,null)}}else if(f){b&&w&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,y,h.width,h.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,g,v,i.data):g===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):b?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,b&&w){k.length>0&&O++;let t=Le(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,y,t.width,t.height)}for(let t=0;t<6;t++)if(p){b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,v,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,m[t].width,m[t].height,0,g,v,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,g,v,i.data)}}else{b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,v,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,g,v,m[t]);for(let r=0;r<k.length;r++){let i=k[r];b?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,g,v,i.image[t])}}}S(o)&&o.mipmapsAutoUpdate===!0&&C(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function we(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=T(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ne(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Te(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=E(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Pe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=T(o.internalFormat,c,l,o.normalized,o.colorSpace);Pe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ee(t,i,a){let o=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let c=r.get(i.depthTexture);c.__renderTarget=i;let l=o?i.depthTexture.image[0]:i.depthTexture.image;c.__webglTexture&&l.width===i.width&&l.height===i.height||(l.width=i.width,l.height=i.height,i.depthTexture.needsUpdate=!0),o?me(i.depthTexture,0):ue(i.depthTexture,0);let u=c.__webglTexture,d=Ne(i),f=o?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Pe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function De(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Ee(i.__webglFramebuffer[e],t,e);else t.texture.mipmaps.length>0?Ee(i.__webglFramebuffer[0],t,0):Ee(i.__webglFramebuffer,t,0)}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),Te(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else if(t.texture.mipmaps.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),Te(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Oe(t,n,i){let a=r.get(t);n!==void 0&&we(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&De(t)}function ke(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,A),D(t);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Pe(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=T(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),Te(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ve(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)we(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else we(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);S(i)?C(e.TEXTURE_CUBE_MAP):i.mipmaps.length>0&&e.texParameteri(e.TEXTURE_CUBE_MAP,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ve(c,a),we(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),S(a)&&C(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ve(r,i),i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)we(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else we(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);S(i)?C(r):i.mipmaps.length>0&&e.texParameteri(r,e.TEXTURE_MAX_LEVEL,i.mipmaps.length-1),n.unbindTexture()}t.depthBuffer&&De(t)}function Ae(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(S(a)&&a.mipmapsAutoUpdate===!0){let t=w(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),C(t),n.unbindTexture()}}}let je=[];function L(t){if(t.samples>0){if(Pe(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer),t.texture.mipmaps.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(je.length=0,je.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&je.push(l),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,je))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(i.maxSamples,e.samples)}function Pe(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Fe(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Ie(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Me.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):le(`WebGLTextures: Unsupported texture color space:`,n)),t}function Le(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=se,this.resetTextureUnits=ae,this.getTextureUnits=oe,this.setTextureUnits=P,this.setTexture2D=ue,this.setTexture2DArray=de,this.setTexture3D=pe,this.setTextureCube=me,this.rebindTextures=Oe,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=Ae,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Pe,this.dispose=N}function Ui(e,t){function n(n,r=``){let i,a=Me.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Wi=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gi=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ki=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new o(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new ct({vertexShader:Wi,fragmentShader:Gi,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ye(new te(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qi=class extends Le{constructor(e,t){super();let n=this,r=null,i=1,a=null,s=`local-floor`,c=1,l=null,u=null,d=null,f=null,m=null,h=null,g=typeof XRWebGLBinding<`u`,v=new Ki,y={},b=t.getContextAttributes(),x=null,S=null,C=[],T=[],E=new I,ee=null,D=null,O=new Ie;O.viewport=new Be;let k=new Ie;k.viewport=new Be;let A=[O,k],j=new Ne,M=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Ze,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Ze,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Ze,C[e]=t),t.getHandSpace()};function te(e){let t=T.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ne(){r.removeEventListener(`select`,te),r.removeEventListener(`selectstart`,te),r.removeEventListener(`selectend`,te),r.removeEventListener(`squeeze`,te),r.removeEventListener(`squeezestart`,te),r.removeEventListener(`squeezeend`,te),r.removeEventListener(`end`,ne),r.removeEventListener(`inputsourceschange`,re);for(let e=0;e<C.length;e++){let t=T[e];t!==null&&(T[e]=null,C[e].disconnect(t))}M=null,N=null,v.reset();for(let e in y)delete y[e];if(e.setRenderTarget(x),m=null,f=null,d=null,r=null,S=null,se.stop(),n.isPresenting=!1,e.setPixelRatio(ee),e.setSize(E.width,E.height,!1),D!==null){let e=D.camera;e.fov=D.fov,e.zoom=D.zoom,e.updateProjectionMatrix(),D=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){s=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return f===null?m:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(o){if(r=o,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,te),r.addEventListener(`selectstart`,te),r.addEventListener(`selectend`,te),r.addEventListener(`squeeze`,te),r.addEventListener(`squeezestart`,te),r.addEventListener(`squeezeend`,te),r.addEventListener(`end`,ne),r.addEventListener(`inputsourceschange`,re),b.xrCompatible!==!0&&await t.makeXRCompatible(),ee=e.getPixelRatio(),e.getSize(E),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?_:ue,a=b.stencil?Ue:we);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new ve(f.textureWidth,f.textureHeight,{format:w,type:Pe,depthTexture:new p(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};m=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new ve(m.framebufferWidth,m.framebufferHeight,{format:w,type:Pe,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(s),se.setContext(r),se.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function re(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=T.indexOf(n);r>=0&&(T[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=T.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=T.length){T.push(n),r=e;break}else if(T[e]===null){T[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}function ie(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;v.texture!==null&&(v.depthNear>0&&(t=v.depthNear),v.depthFar>0&&(n=v.depthFar)),j.near=k.near=O.near=t,j.far=k.far=O.far=n,(M!==j.near||N!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,N=j.far),j.layers.mask=e.layers.mask|6,O.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ie(j,i);for(let e=0;e<a.length;e++)ie(a[e],i);j.projectionMatrix.copy(O.projectionMatrix),j.projectionMatrixInverse.copy(O.projectionMatrixInverse),D===null&&e.isPerspectiveCamera&&(D={camera:e,fov:e.fov,zoom:e.zoom}),ae(e,j,i)};function ae(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=pe*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||m!==null)return c},this.setFoveation=function(e){c=e,f!==null&&(f.fixedFoveation=e),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=e)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(j)},this.getCameraTexture=function(e){return y[e]};let oe=null;function P(t,i){if(u=i.getViewerPose(l||a),h=i,u!==null){let t=u.views;m!==null&&(e.setRenderTargetFramebuffer(S,m.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(m!==null)a=m.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=A[n];o===void 0&&(o=new Ie,o.layers.enable(n),o.viewport=new Be,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&v.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=y[n];e||(e=new o,y[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=T[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,l||a)}oe&&oe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let se=new Gt;se.setAnimationLoop(P),this.setAnimationLoop=function(e){oe=e},this.dispose=function(){}}},Ji=new je,Yi=new L;Yi.set(-1,0,0,0,1,0,0,0,1);function Xi(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,de(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Ji.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Yi),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.diffuseRoughness>0&&(e.diffuseRoughness.value=t.diffuseRoughness,t.diffuseRoughnessMap&&(e.diffuseRoughnessMap.value=t.diffuseRoughnessMap,n(t.diffuseRoughnessMap,e.diffuseRoughnessMapTransform))),t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessMinimum,e.iridescenceThicknessMaximum.value=t.iridescenceThicknessMaximum,t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Zi(e,t,n,r){let i={},a={};function o(e,t){let n=t.program;r.uniformBlockBinding(e,n,i[e.id])}function s(e,n){let o=i[e.id];o===void 0&&(m(e),o=c(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let u=t.render.frame;a[e.id]!==u&&(l(e),a[e.id]=u)}function c(t){let n=e.createBuffer(),r=t.__size,i=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,n),e.bufferData(e.UNIFORM_BUFFER,r,i),e.bindBuffer(e.UNIFORM_BUFFER,null),n}function l(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)u(t[n],e,n,a);else u(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function u(t,n,r,i){if(f(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=h(i,!0);d(i,t.__data,e),e+=a.storage/Float32Array.BYTES_PER_ELEMENT}}else d(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function d(e,t,n){typeof e==`number`||typeof e==`boolean`?t[n]=e:e.isMatrix3?(t[n]=e.elements[0],t[n+1]=e.elements[1],t[n+2]=e.elements[2],t[n+3]=0,t[n+4]=e.elements[3],t[n+5]=e.elements[4],t[n+6]=e.elements[5],t[n+7]=0,t[n+8]=e.elements[6],t[n+9]=e.elements[7],t[n+10]=e.elements[8],t[n+11]=0):ArrayBuffer.isView(e)?t.set(e.subarray(0,t.length-n),n):e.toArray(t,n)}function f(e,t,n,r){let i=e.value,a=t+`_`+n;if(Array.isArray(i)){r[a]===void 0&&(r[a]=[]);let e=r[a],t=!1;for(let n=0;n<i.length;n++)p(i[n],e,n)===!0&&(t=!0);return t}return p(i,r,a)}function p(e,t,n){if(t[n]===void 0)return t[n]=typeof e==`number`||typeof e==`boolean`?e:ArrayBuffer.isView(e)?e.slice():e.clone(),!0;{let r=t[n];if(typeof e==`number`||typeof e==`boolean`){if(r!==e)return t[n]=e,!0}else if(ArrayBuffer.isView(e))return!0;else if(r.equals(e)===!1)return r.copy(e),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let i=0,a=r.length;i<a;i++){let a=r[i],o=Array.isArray(a.value)?a.value:[a.value],s=Array.isArray(t[e])||Array.isArray(a.value),c=n;for(let e=0,t=o.length;e<t;e++){let t=o[e],r=h(t,s),i=n%16,a=i%r.boundary,l=i+a;n+=a,l!==0&&16-l<r.storage&&(n+=16-l),e===0&&(c=n),n+=r.storage}a.__data=new(a.type===`int`?Int32Array:a.type===`uint`?Uint32Array:Float32Array)((n-c)/Float32Array.BYTES_PER_ELEMENT),a.__offset=c}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e,t){let n={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(n.boundary=4,n.storage=4):e.isVector2?(n.boundary=8,n.storage=8):e.isVector3||e.isColor?(n.boundary=16,n.storage=12):e.isVector4?(n.boundary=16,n.storage=16):e.isMatrix3?(n.boundary=16,n.storage=48):e.isMatrix4?(n.boundary=16,n.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(n.boundary=16,n.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t===!0&&(n.boundary=16,n.storage=Math.ceil(n.storage/16)*16),n}function g(t){let n=t.target;n.removeEventListener(`dispose`,g),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);i={},a={}}return{bind:o,update:s,dispose:_}}var Qi=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$i=null;function ea(){return $i===null&&($i=new $e(Qi,16,16,ce,st),$i.name=`DFG_LUT`,$i.minFilter=be,$i.magFilter=be,$i.wrapS=U,$i.wrapT=U,$i.generateMipmaps=!1,$i.needsUpdate=!0),$i}var ta=class{constructor(e={}){let{canvas:t=Se(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Pe}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);m=n.getContextAttributes().alpha}else m=a;let h=p,g=new Set([k,d,ne]),_=new Set([Pe,we,De,Ue,Re,Ye]),v=new Uint32Array(4),b=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},C=null,w=null,T=[],D=[],O=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,j=!1,M=null,N=null,te=null,ie=null;this._outputColorSpace=ee;let ae=0,oe=0,P=null,se=-1,ce=null,ue=new Be,de=new Be,fe=null,pe=new V(0),me=0,he=t.width,ge=t.height,_e=1,ye=null,be=null,xe=new Be(0,0,he,ge),Ce=new Be(0,0,he,ge),F=!1,Te=new x,Ee=new E,Oe=!1,ke=!1,I=new je,L=new W,Ne=new Be,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ie=!1;function Le(){return P===null?_e:1}let R=n;function B(e,n){return t.getContext(e,n)}let ze,Ve,H,He,U,G,Ge,Ke,qe,Je,Xe,Ze,Qe,$e,et,tt,nt,rt,it,at,ot,ct,lt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r187`),t.addEventListener(`webglcontextlost`,ft,!1),t.addEventListener(`webglcontextrestored`,pt,!1),t.addEventListener(`webglcontextcreationerror`,mt,!1),R===null){let t=`webgl2`;if(R=B(t,e),R===null)throw B(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}ut()}catch(e){throw t.removeEventListener(`webglcontextlost`,ft,!1),t.removeEventListener(`webglcontextrestored`,pt,!1),t.removeEventListener(`webglcontextcreationerror`,mt,!1),le(`WebGLRenderer: `+e.message),e}function ut(){ze=new xn(R),ze.init(),ot=new Ui(R,ze),Ve=new en(R,ze,e,ot),H=new Vi(R,ze),Ve.reversedDepthBuffer&&f&&H.buffers.depth.setReversed(!0),N=R.createFramebuffer(),te=R.createFramebuffer(),ie=R.createFramebuffer(),He=new wn(R),U=new xi,G=new Hi(R,ze,H,U,Ve,ot,He),Ge=new bn(A),Ke=new Kt(R),ct=new Qt(R,Ke),qe=new Sn(R,Ke,He,ct),Je=new En(R,qe,Ke,ct,He),rt=new Tn(R,Ve,G),et=new tn(U),Xe=new bi(A,Ge,ze,Ve,ct,et),Ze=new Xi(A,U),Qe=new Ti,$e=new Mi(ze),nt=new Zt(A,Ge,H,Je,m,s),tt=new Bi(A,Je,Ve),lt=new Zi(R,He,Ve,H),it=new $t(R,ze,He),at=new Cn(R,ze,He),He.programs=Xe.programs,A.capabilities=Ve,A.extensions=ze,A.properties=U,A.renderLists=Qe,A.shadowMap=tt,A.state=H,A.info=He}h!==1009&&(O=new On(h,t.width,t.height,o,r,i));let dt=new qi(A,R);this.xr=dt,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=ze.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=ze.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(e){e!==void 0&&(_e=e,this.setSize(he,ge,!1))},this.getSize=function(e){return e.set(he,ge)},this.setSize=function(e,n,r=!0){dt.isPresenting?z(`WebGLRenderer: Can't change size while VR device is presenting.`):(he=e,ge=n,t.width=Math.floor(e*_e),t.height=Math.floor(n*_e),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),O!==null&&O.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(he*_e,ge*_e).floor()},this.setDrawingBufferSize=function(e,n,r){he=e,ge=n,_e=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(h===1009)le(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}O.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ue)},this.getViewport=function(e){return e.copy(xe)},this.setViewport=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),H.viewport(ue.copy(xe).multiplyScalar(Le()).round())},this.getScissor=function(e){return e.copy(Ce)},this.setScissor=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),H.scissor(de.copy(Ce).multiplyScalar(Le()).round())},this.getScissorTest=function(){return F},this.setScissorTest=function(e){H.setScissorTest(F=e)},this.setOpaqueSort=function(e){ye=e},this.setTransparentSort=function(e){be=e},this.getClearColor=function(e){return e.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(P!==null){let t=P.texture.format;e=g.has(t)}if(e){let e=P.texture.type,t=_.has(e),n=nt.getClearColor(),r=nt.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(v[0]=i,v[1]=a,v[2]=o,v[3]=r,R.clearBufferuiv(R.COLOR,0,v)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,R.clearBufferiv(R.COLOR,0,b))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),M=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ft,!1),t.removeEventListener(`webglcontextrestored`,pt,!1),t.removeEventListener(`webglcontextcreationerror`,mt,!1),nt.dispose(),Qe.dispose(),$e.dispose(),G.dispose(),U.dispose(),Ge.dispose(),Je.dispose(),qe.dispose(),ct.dispose(),lt.dispose(),Xe.dispose(),dt.dispose(),dt.removeEventListener(`sessionstart`,vt),dt.removeEventListener(`sessionend`,Y),yt.stop()};function ft(e){e.preventDefault(),y(`WebGLRenderer: Context Lost.`),j=!0}function pt(){y(`WebGLRenderer: Context Restored.`),j=!1;let e=He.autoReset,t=tt.enabled,n=tt.autoUpdate,r=tt.needsUpdate,i=tt.type;ut(),He.autoReset=e,tt.enabled=t,tt.autoUpdate=n,tt.needsUpdate=r,tt.type=i}function mt(e){le(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function K(e){let t=e.target;t.removeEventListener(`dispose`,K),ht(t)}function ht(e){q(e),U.remove(e)}function q(e){let t=U.get(e).programs;t!==void 0&&(t.forEach(function(e){Xe.releaseProgram(e)}),e.isShaderMaterial&&Xe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Fe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=At(e,t,n,r,i);H.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=qe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;ct.setup(i,r,s,n,c);let h,g=it;if(c!==null&&(h=Ke.get(c),g=at,g.setIndex(h)),i.isMesh)r.wireframe===!0?(H.setLineWidth(r.wireframeLinewidth*Le()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),H.setLineWidth(e*Le()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(ze.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ke.get(c).bytesPerElement:1,o=U.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function J(e,t,n,r){M!==null&&e.isNodeMaterial&&M.setObject(r,e),Oe===!0&&et.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Et(e,t,r),e.side=0,e.needsUpdate=!0,Et(e,t,r),e.side=2):Et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),M!==null&&M.renderStart(e,t,n),w=$e.get(n),w.init(t),D.push(w),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(w.pushLight(e),e.castShadow&&w.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(w.pushLight(e),e.castShadow&&w.pushShadow(e))}),w.setupLights(),M!==null&&M.updateLights(w.state.lightsArray),ke=this.localClippingEnabled,Oe=et.init(this.clippingPlanes,ke),Oe===!0&&et.setGlobalState(this.clippingPlanes,t),M!==null&&tt.render(w.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];J(o,n,t,e),r.add(o)}else J(i,n,t,e),r.add(i)}}),w=D.pop(),M!==null&&M.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=U.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}ze.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let gt=null;function _t(e){gt&&gt(e)}function vt(){yt.stop()}function Y(){yt.start()}let yt=new Gt;yt.setAnimationLoop(_t),typeof self<`u`&&yt.setContext(self),this.setAnimationLoop=function(e){gt=e,dt.setAnimationLoop(e),e===null?yt.stop():yt.start()},dt.addEventListener(`sessionstart`,vt),dt.addEventListener(`sessionend`,Y),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){le(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(j===!0)return;M!==null&&M.renderStart(e,t);let n=dt.enabled===!0&&dt.isPresenting===!0,r=O!==null&&(P===null||n)&&O.begin(A,P);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(t),t=dt.getCamera()),e.isScene===!0&&e.onBeforeRender(A,e,t,P),w=$e.get(e,D.length),w.init(t),w.state.textureUnits=G.getTextureUnits(),D.push(w),I.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),t.isArrayCamera?Ee.setFromArrayCamera(t):Te.setFromProjectionMatrix(I,Ae,t.reversedDepth),ke=this.localClippingEnabled,Oe=et.init(this.clippingPlanes,ke),C=Qe.get(e,T.length),C.init(),T.push(C),this.info.render.frame++,dt.enabled===!0&&dt.isPresenting===!0){let e=A.xr.getDepthSensingMesh();e!==null&&bt(e,t,-1/0,A.sortObjects)}bt(e,t,0,A.sortObjects),C.finish(),M!==null&&M.updateLights(w.state.lightsArray),A.sortObjects===!0&&C.sort(ye,be),Ie=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Ie&&nt.addToRenderList(C,e),this.info.autoReset===!0&&this.info.reset(),Oe===!0&&et.beginShadows();let i=w.state.shadowsArray;if(tt.render(i,e,t),Oe===!0&&et.endShadows(),(r&&O.hasRenderPass())===!1){let n=C.opaque,r=C.transmissive;if(w.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];St(n,r,e,a)}Ie&&nt.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];xt(C,e,n,n.viewport)}}else r.length>0&&St(n,r,e,t),Ie&&nt.render(e),xt(C,e,t)}P!==null&&oe===0&&(G.updateMultisampleRenderTarget(P),G.updateRenderTargetMipmap(P)),r&&O.end(A),e.isScene===!0&&e.onAfterRender(A,e,t),ct.resetDefaultState(),se=-1,ce=null,D.pop(),D.length>0?(w=D[D.length-1],G.setTextureUnits(w.state.textureUnits),Oe===!0&&et.setGlobalState(A.clippingPlanes,w.state.camera)):w=null,T.pop(),C=T.length>0?T[T.length-1]:null,M!==null&&M.renderEnd()};function bt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLight)w.pushLight(e),e.castShadow&&w.pushShadow(e);else if(e.isSprite){let i=t.isArrayCamera?Ee:Te;if(!e.frustumCulled||e.intersectsFrustum(i)){r&&Ne.setFromMatrixPosition(e.matrixWorld).applyMatrix4(I);let i=Je.update(e),a=e.material;a.visible&&C.push(e,i,a,n,Ne.z,null,t)}}else if(e.isMesh||e.isLine||e.isPoints){let i=t.isArrayCamera?Ee:Te;if(!e.frustumCulled||e.intersectsFrustum(i)){let i=Je.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Ne.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Ne.copy(e.boundingSphere.center)),Ne.applyMatrix4(e.matrixWorld).applyMatrix4(I)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&C.push(e,i,c,n,Ne.z,s,t)}}else a.visible&&C.push(e,i,a,n,Ne.z,null,t)}}}let i=e.children;for(let e=0,a=i.length;e<a;e++)bt(i[e],t,n,r)}function xt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;w.setupLightsView(n),Oe===!0&&et.setGlobalState(A.clippingPlanes,n),r&&H.viewport(ue.copy(r)),i.length>0&&Ct(i,t,n),a.length>0&&Ct(a,t,n),o.length>0&&Ct(o,t,n),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function St(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[r.id]===void 0){let e=ze.has(`EXT_color_buffer_half_float`)||ze.has(`EXT_color_buffer_float`);w.state.transmissionRenderTarget[r.id]=new ve(1,1,{generateMipmaps:!0,type:e?st:Pe,minFilter:We,samples:Math.max(4,Ve.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Me.workingColorSpace})}let a=w.state.transmissionRenderTarget[r.id],o=r.viewport||ue;a.setSize(o.z*A.transmissionResolutionScale,o.w*A.transmissionResolutionScale);let s=A.getRenderTarget(),c=A.getActiveCubeFace(),l=A.getActiveMipmapLevel();A.setRenderTarget(a),A.getClearColor(pe),me=A.getClearAlpha(),me<1&&A.setClearColor(16777215,.5),A.clear(),Ie&&nt.render(n);let u=A.toneMapping;A.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),w.setupLightsView(r),Oe===!0&&et.setGlobalState(A.clippingPlanes,r),Ct(e,n,r),G.updateMultisampleRenderTarget(a),G.updateRenderTargetMipmap(a),ze.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,wt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(G.updateMultisampleRenderTarget(a),G.updateRenderTargetMipmap(a))}A.setRenderTarget(s,c,l),A.setClearColor(pe,me),d!==void 0&&(r.viewport=d),A.toneMapping=u}function Ct(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&wt(o,t,n,s,l,c)}}function wt(e,t,n,r,i,a){M!==null&&i.isNodeMaterial&&M.setObject(e,i),e.onBeforeRender(A,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(A,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=2):A.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(A,t,n,r,i,a)}function Tt(e){let t=0;for(let n of e)n.texture!==null&&t++;return t}function Et(e,t,n){t.isScene!==!0&&(t=Fe);let r=U.get(e),i=w.state.lights,a=w.state.shadowsArray,o=i.state.version,s=Xe.getParameters(e,i.state,a,t,n,w.state.lightProbeGridArray),c=Xe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ge.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,K),l=new Map,r.programs=l,r.programVariants=new Map);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return kt(e,s),d}else s.uniforms=Xe.getUniforms(e),M!==null&&e.isNodeMaterial&&M.build(e,n,s),e.onBeforeCompile(s,A),d=Xe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=et.uniform),kt(e,s),r.needsLights=Mt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.numLightProbeGrids=Tt(w.state.lightProbeGridArray),r.currentProgram=d,r.uniformsList=null,d}function Dt(e,t,n,r,i){let a=U.get(e),o=a.currentProgram.id+`,`+r+`,`+i,s=a.programVariants.get(o);return s===void 0?(s=Et(e,t,n),a.programVariants.set(o,s)):(a.currentProgram=s,a.uniformsList=null,a.outputColorSpace=r,a.toneMapping=i),s}function Ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Lr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function kt(e,t){let n=U.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function At(e,t,n,r,i){t.isScene!==!0&&(t=Fe),G.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=P===null?A.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Me.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ge.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(h=A.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=U.get(r),y=w.state.lights;if(Oe===!0&&(ke===!0||e!==ce)){let t=e===ce&&r.id===se;et.setState(r,e,t)}let b=!1,x=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version||i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==et.numPlanes||v.numIntersection!==et.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.morphTargetsCount===_&&v.numLightProbeGrids===Tt(w.state.lightProbeGridArray)?(v.outputColorSpace!==s||v.toneMapping!==h)&&(x=!0):b=!0:b=!0:(b=!0,v.__version=r.version);let C=v.currentProgram;(b===!0||x===!0)&&(C=x===!0?Dt(r,t,i,s,h):Et(r,t,i),M&&r.isNodeMaterial&&M.onUpdateProgram(r,C,v));let T=!1,E=!1,ee=!1,D=C.getUniforms(),O=v.uniforms;if(H.useProgram(C.program)&&(T=!0,E=!0,ee=!0),r.id!==se&&(se=r.id,E=!0),T||ce!==e){H.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),D.setValue(R,`projectionMatrix`,e.projectionMatrix),D.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=D.map.cameraPosition;t!==void 0&&t.setValue(R,L.setFromMatrixPosition(e.matrixWorld)),Ve.logarithmicDepthBuffer&&D.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&D.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),ce!==e&&(ce=e,E=!0,ee=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&D.setValue(R,`sunShadowMap`,y.state.sunShadowMap,G),y.state.directionalShadowMap.length>0&&D.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,G),y.state.spotShadowMap.length>0&&D.setValue(R,`spotShadowMap`,y.state.spotShadowMap,G),y.state.pointShadowMap.length>0&&D.setValue(R,`pointShadowMap`,y.state.pointShadowMap,G)),i.isSkinnedMesh){D.setOptional(R,i,`bindMatrix`),D.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),D.setValue(R,`boneTexture`,e.boneTexture,G))}i.isBatchedMesh&&(D.setOptional(R,i,`batchingTexture`),D.setValue(R,`batchingTexture`,i._matricesTexture,G),D.setOptional(R,i,`batchingIdTexture`),D.setValue(R,`batchingIdTexture`,i._indirectTexture,G),D.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&D.setValue(R,`batchingColorTexture`,i._colorsTexture,G));let k=n.morphAttributes;if((k.position!==void 0||k.normal!==void 0||k.color!==void 0)&&rt.update(i,n,C),(E||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,D.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=ea()),E){if(D.setValue(R,`toneMappingExposure`,A.toneMappingExposure),v.needsLights&&jt(O,ee),a&&r.fog===!0&&Ze.refreshFogUniforms(O,a),Ze.refreshMaterialUniforms(O,r,_e,ge,w.state.transmissionRenderTarget[e.id]),v.needsLights&&v.numLightProbeGrids>0){let e=S,t=0;for(let n of w.state.lightProbeGridArray)n.texture!==null&&(e.textures[t]=n.texture,e.min[t]=n.boundingBox.min,e.max[t]=n.boundingBox.max,e.resolution[t]=n.resolution,t++);for(let n in e)e[n].length=t;O.probesSH.value=e.textures,O.probesMin.value=e.min,O.probesMax.value=e.max,O.probesResolution.value=e.resolution}Lr.upload(R,Ot(v),O,G)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Lr.upload(R,Ot(v),O,G),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&D.setValue(R,`center`,i.center),D.setValue(R,`modelViewMatrix`,i.modelViewMatrix),D.setValue(R,`normalMatrix`,i.normalMatrix),D.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];lt.update(n,C),lt.bind(n,C)}}return C}function jt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Mt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(e,t,n){let r=U.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),U.get(e.texture).__webglTexture=t,U.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=U.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){P=e,ae=t,oe=n;let r=null,i=!1,a=!1;if(e){let o=U.get(e);if(o.__useDefaultFramebuffer!==void 0){H.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest,H.viewport(ue),H.scissor(de),H.setScissorTest(fe),se=-1;return}if(o.__webglFramebuffer===void 0)G.setupRenderTarget(e);else if(o.__hasExternalTextures)G.rebindTextures(e,U.get(e.texture).__webglTexture,U.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&U.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);G.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=U.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&G.useMultisampledRTT(e)===!1?U.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ue.copy(e.viewport),de.copy(e.scissor),fe=e.scissorTest}else ue.copy(xe).multiplyScalar(_e).floor(),de.copy(Ce).multiplyScalar(_e).floor(),fe=F;if(n!==0&&(r=N),H.bindFramebuffer(R.FRAMEBUFFER,r)&&H.drawBuffers(e,r),H.viewport(ue),H.scissor(de),H.setScissorTest(fe),i){let r=U.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=U.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=U.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}se=-1};function Nt(e){let t=U.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ve.textureFormatReadable(e.format),t.__typeReadable=Ve.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){le(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){H.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=Nt(o);if(u.__formatReadable===!1){le(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){le(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,ot.convert(c),ot.convert(l),a)}finally{let e=P===null?null:U.get(P).__webglFramebuffer;H.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o],Array.isArray(c)&&(c=c[0])),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){H.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=Nt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,ot.convert(l),ot.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=P===null?null:U.get(P).__webglFramebuffer;H.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await re(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;G.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),H.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ot.convert(t.format),_=ot.convert(t.type),v;t.isData3DTexture?(G.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(G.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(G.setTexture2D(t,0),v=R.TEXTURE_2D),H.activeTexture(R.TEXTURE0),H.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),H.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),H.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=H.getParameter(R.UNPACK_ROW_LENGTH),b=H.getParameter(R.UNPACK_IMAGE_HEIGHT),x=H.getParameter(R.UNPACK_SKIP_PIXELS),S=H.getParameter(R.UNPACK_SKIP_ROWS),C=H.getParameter(R.UNPACK_SKIP_IMAGES);H.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),H.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),H.pixelStorei(R.UNPACK_SKIP_PIXELS,l),H.pixelStorei(R.UNPACK_SKIP_ROWS,u),H.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=U.get(e),r=U.get(t),h=U.get(n.__renderTarget),g=U.get(r.__renderTarget);H.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),H.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,U.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,U.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.DEPTH_BUFFER_BIT,R.NEAREST);H.bindFramebuffer(R.READ_FRAMEBUFFER,null),H.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||U.has(e)){let n=U.get(e),r=U.get(t);H.bindFramebuffer(R.READ_FRAMEBUFFER,te),H.bindFramebuffer(R.DRAW_FRAMEBUFFER,ie);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,l+o,u+s,f,p,f+o,p+s,R.COLOR_BUFFER_BIT,R.NEAREST);H.bindFramebuffer(R.READ_FRAMEBUFFER,null),H.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);H.pixelStorei(R.UNPACK_ROW_LENGTH,y),H.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),H.pixelStorei(R.UNPACK_SKIP_PIXELS,x),H.pixelStorei(R.UNPACK_SKIP_ROWS,S),H.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps===!0&&t.mipmapsAutoUpdate===!0&&R.generateMipmap(v),H.unbindTexture()},this.initRenderTarget=function(e){U.get(e).__webglFramebuffer===void 0&&G.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?G.setTextureCube(e,0):e.isData3DTexture?G.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?G.setTexture2DArray(e,0):G.setTexture2D(e,0),H.unbindTexture()},this.resetState=function(){ae=0,oe=0,P=null,H.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ae}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Me._getDrawingBufferColorSpace(e),t.unpackColorSpace=Me._getUnpackColorSpace()}},na=/^\s*(?:gaia\s*)?(?:e?dr3\s*)?(\d{6,19})\s*$/i;function ra(e){let t=na.exec(e);if(!t)return null;let n=BigInt(t[1]);return n>0n&&n<1n<<63n?n.toString():null}var ia=`https://vizier.cds.unistra.fr/viz-bin/asu-tsv`;async function aa(e,t,n){let r=await fetch(`${ia}?-source=${e}&Source=${t}&-out=${n}`);if(!r.ok)throw Error(`VizieR: HTTP ${r.status}`);let i=(await r.text()).split(/\r?\n/).filter(e=>e&&!e.startsWith(`#`)),a=i.findIndex(e=>e.startsWith(`---`));return a<0||!i[a+1]?.trim()?null:i[a+1].split(`	`).map(e=>e.trim()===``?null:Number(e))}async function oa(e){let[t,n]=await Promise.all([aa(`I/355/gaiadr3`,e,`RA_ICRS,DE_ICRS,Plx,Gmag`),aa(`I/352/gedr3dis`,e,`rgeo`)]);if(!t)return null;let[r,i,a,o]=t,s=n?.[0]??null;if(r==null||i==null||!Number.isFinite(r)||!Number.isFinite(i))return null;let[c,l]=ft(r,i);return{id:e,l:c,b:l,plx:a,rgeo:s,gmag:o}}function sa(e,t){let n=e.l*Math.PI/180,r=e.b*Math.PI/180;return[t*Math.cos(r)*Math.cos(n),t*Math.cos(r)*Math.sin(n),t*Math.sin(r)]}function ca(e,t,n,r=n?`zap`:`vyp`){e.setAttribute(`aria-pressed`,String(n)),e.textContent=`${t}: ${r}`}var Q=Y*1e3,la=Math.PI/180,ua={half:5,angle:30,angleMin:28,angleMax:33},da={angle:27,scale:[.7,.44,.18],extent:[2.2,1.4,1.1]},fa={r:.23,h:.045},pa={latDeg:50,halfLonDeg:20},ma={north:{r:7,c:7},south:{a:4.9,c:7}},ha=e=>new W(-Math.cos(e*la),0,-Math.sin(e*la)),ga=class{id=`stred`;name=`Střed Galaxie (stavba)`;group=new ae;objects;filters=[];facets=[];on=!1;button;r0Ly;constructor(e,t,n,r){this.button=r,this.r0Ly=e,this.group.visible=!1;let i=e/Q*Math.tan(pa.latDeg*la),a=e/Q*Math.tan(pa.halfLonDeg*la);this.group.add(this.barAxis(),this.bulge(),this.nsd(),_a(new W(0,i/2*Q,0),a*Q,i/2*Q,16748496,.35),_a(new W(0,-i/2*Q,0),a*Q,i/2*Q,16748496,.35),_a(new W(0,ma.north.c*Q,0),ma.north.r*Q,ma.north.r*Q,8377343,.22),_a(new W(0,-ma.south.c*Q,0),ma.south.a*Q,ma.south.c*Q,8377343,.22)),this.group.quaternion.copy(lt.q);let o=()=>this.on,s=[ha(ua.angle).multiplyScalar(ua.half*Q).clone(),new W(0,fa.h*Q*3,0),new W(0,i*.6*Q,a*1.05*Q),new W(0,ma.north.c*1.5*Q,ma.north.r*.9*Q)].map(lt.toScene);n.add(`dlouhá příčka (osa, 5 kpc)`,s[0],`anno`,o,160),n.add(`Fermiho bubliny`,s[2],`anno`,o,160),n.add(`eROSITA bubliny`,s[3],`anno`,o,160),n.add(`jaderný disk`,lt.toScene(new W(0,-fa.h*Q*6,0)),`anno`,()=>this.on&&this.near(),120),this.objects=[{name:`Příčka a boule Galaxie`,aliases:[`příčka`,`Galactic bar`,`long bar`,`boule`,`bulge`,`výduť`],color:`#ffc27a`},{name:`Jaderný hvězdný disk`,aliases:[`Nuclear Stellar Disk`,`NSD`,`jaderná výduť`,`Nuclear bulge`],color:`#ffe9a8`},{name:`Fermiho bubliny`,aliases:[`Fermi bubbles`,`Fermiho bubliny`],color:`#ff8fd0`},{name:`eROSITA bubliny`,aliases:[`eROSITA bubbles`,`rentgenové bubliny`],color:`#7fd3ff`}].map((e,n)=>({layer:this.id,index:n,name:e.name,pos:s[n],anchor:s[n],distLy:s[n].distanceTo(t),color:e.color,major:!0,aliases:e.aliases})),r.onclick=()=>this.set(!this.on)}camDist=1/0;near(){return this.camDist<6e3}set(e){this.on=e,this.group.visible=e,ca(this.button,`Střed`,e)}onSelect(e){e&&e.layer===this.id&&!this.on&&this.set(!0)}setFilter(){}applyFilter(){}labelCandidates(){return[]}kindName(e){return[`stavba centra Galaxie (model z hvězd)`,`stavba centra Galaxie`,`obří bubliny nad centrem (záření gama)`,`obří bubliny nad centrem (rentgen)`][e.index]}flyDistance(e){return[4e4,3e3,7e4,11e4][e.index]}update(e){this.camDist=e.camera.position.length()}cardHtml(e){let t=e=>`${K(e,e<1?2:1)} kpc (${q(e*Q)})`,n=this.r0Ly/Q*Math.tan(pa.latDeg*la),r=2*(this.r0Ly/Q)*Math.tan(pa.halfLonDeg*la),i=()=>`<div class="kind" style="color:${e.color}">${J(this.kindName(e))}</div><h3>${J(e.name)}</h3>`;switch(e.index){case 0:return`${i()}
        <p>Střed Mléčné dráhy netvoří kulová výduť, ale <b>příčka</b> – protáhlý útvar starých hvězd. Její vnitřní část
          je nafouknutá do výšky do tvaru „krabice“ nebo „burského oříšku“ (box/peanut boule), dál od centra pokračuje
          plochá <b>dlouhá příčka</b>. Na mapě: oranžový oblak bodů = boule podle hustotního modelu, čára = osa dlouhé
          příčky, slabší čáry = rozptyl změřeného úhlu.</p>
        <dl>
          <dt>Poloviční délka příčky</dt><dd>${t(ua.half)} ± 0,2 kpc (Wegg et al. 2015)</dd>
          <dt>Úhel ke spojnici Slunce–centrum</dt><dd>28–33° (dlouhá příčka; kreslíme ${ua.angle}°), boule 27 ± 2°;
            bližší konec je na kladných galaktických délkách</dd>
          <dt>Tloušťka dlouhé příčky</dt><dd>škálová výška ~180 pc (tenká složka) a ~45 pc (velmi tenká, u konce příčky)</dd>
          <dt>Boule</dt><dd>exponenciální škálové délky 0,70 : 0,44 : 0,18 kpc (podél příčky : napříč : svisle);
            změřena je vnitřní oblast 2,2 × 1,4 × 1,1 kpc (Wegg &amp; Gerhard 2013)</dd>
        </dl>
        <p class="dim">Šířku dlouhé příčky v rovině disku článek neuvádí jako jedno číslo, proto je nakreslená jen osa.
          Délka příčky závisí na definici (v článku 4,7–5,2 kpc podle metody).</p>
        <div class="src">Wegg C., Gerhard O., Portail M. 2015, MNRAS 450, 4050 (arXiv:1504.01401); Wegg C., Gerhard O. 2013,
          MNRAS 435, 1874 (arXiv:1308.0593) – čísla z abstraktů a textu.</div>`;case 1:return`${i()}
        <p>Kolem černé díry Sgr A* leží hustý zploštělý disk hvězd a stejně velký disk molekulového plynu (Centrální
          molekulová zóna). Na mapě je vidět až při přiblížení k centru.</p>
        <dl>
          <dt>Poloměr</dt><dd>230 ± 20 pc (${q(230*Y)})</dd>
          <dt>Škálová výška</dt><dd>45 ± 5 pc</dd>
        </dl>
        <div class="src">Launhardt R., Zylka R., Mezger P.G. 2002, A&amp;A 384, 112 (astro-ph/0201294) – čísla z abstraktu.</div>`;case 2:return`${i()}
        <p>Dvě obří bubliny horkého plynu nad a pod centrem Galaxie, které objevil v roce 2010 družicový teleskop Fermi
          v záření gama. Vznikly nejspíš při dávné aktivitě černé díry Sgr A* nebo při překotné tvorbě hvězd v centru.</p>
        <dl>
          <dt>Na obloze</dt><dd>50° nad a pod centrem, šířka asi 40° v galaktické délce</dd>
          <dt>Odvozená velikost</dt><dd>výška ~${t(n)} nad rovinou, šířka ~${t(r)} – <b>náš přepočet</b>
            z úhlů za předpokladu, že bubliny stojí nad centrem ve vzdálenosti 8,15 kpc</dd>
        </dl>
        <p class="dim">Tvar na mapě je zjednodušený na dva elipsoidy.</p>
        <div class="src">Su M., Slatyer T.R., Finkbeiner D.P. 2010, ApJ 724, 1044 (arXiv:1005.5480).</div>`;default:return`${i()}
        <p>Ještě větší bubliny horkého plynu, které v roce 2020 zachytil rentgenový teleskop eROSITA. Obklopují
          Fermiho bubliny a jsou srovnatelné s velikostí disku Galaxie; nejspíš je vyfoukla stejná událost v centru.</p>
        <dl>
          <dt>Severní bublina</dt><dd>koule s vnějším poloměrem ~${t(ma.north.r)} (vnitřní 5 kpc)</dd>
          <dt>Jižní bublina</dt><dd>elipsoid ${K(ma.south.c,0)} × ${K(ma.south.a,1)} kpc (sever–jih × napříč)</dd>
          <dt>Výška</dt><dd>~14 kpc nad a pod rovinou Galaxie (při předpokladu kulového tvaru)</dd>
        </dl>
        <p class="dim">Rozměry jsou z geometrického modelu tlustých slupek, který autoři porovnali s daty; podle nich jsou
          čísla nejistá. Severní bublina je ve skutečnosti mírně posunutá od svislice nad centrem.</p>
        <div class="src">Predehl P. et al. 2020, Nature 588, 227 (arXiv:2012.05840), text a Extended Data Fig. 2.</div>`}}barAxis(){let e=[],t=(t,n)=>{let r=ha(t).multiplyScalar(ua.half*Q*n);e.push(-r.x,0,-r.z,r.x,0,r.z)};t(ua.angle,1),t(ua.angleMin,.97),t(ua.angleMax,.97);let n=new B;n.setAttribute(`position`,new N(e,3));let r=new Float32Array(e.length),i=new V(16761466),a=new V(16761466).multiplyScalar(.4);for(let t=0;t<e.length/3;t++)(t<2?i:a).toArray(r,t*3);return n.setAttribute(`color`,new N(r,3)),new Fe(n,new Je({vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1}))}bulge(){let e=777,t=()=>(e=e*1103515245+12345&2147483647)/2147483647,n=(e,n)=>{for(;;){let r=-e*Math.log(1-t()*.9999);if(r<=n)return(t()<.5?-1:1)*r}},r=ha(da.angle),i=new W(r.z,0,-r.x),a=[];for(let e=0;e<6e3;e++){let e=n(da.scale[0],da.extent[0]),t=n(da.scale[1],da.extent[1]),o=n(da.scale[2],da.extent[2]),s=r.clone().multiplyScalar(e*Q).addScaledVector(i,t*Q).setY(o*Q);a.push(s.x,s.y,s.z)}let o=new B;return o.setAttribute(`position`,new N(a,3)),new S(o,new D({color:16761466,size:1.5,sizeAttenuation:!1,transparent:!0,opacity:.35,blending:2,depthWrite:!1}))}nsd(){let e=4242,t=()=>(e=e*1103515245+12345&2147483647)/2147483647,n=[];for(let e=0;e<2500;e++){let e=fa.r*Math.sqrt(t()),r=t()*Math.PI*2,i=-fa.h*Math.log(1-t()*.95)*(t()<.5?-1:1);n.push(e*Math.cos(r)*Q,i*Q,e*Math.sin(r)*Q)}let r=new B;return r.setAttribute(`position`,new N(n,3)),new S(r,new D({color:16771496,size:1.5,sizeAttenuation:!1,transparent:!0,opacity:.5,blending:2,depthWrite:!1}))}};function _a(e,t,n,r,i){let a=[],o=(r,i)=>[e.x+t*Math.cos(r)*Math.cos(i),e.y+n*Math.sin(r),e.z+t*Math.cos(r)*Math.sin(i)];for(let e=0;e<360;e+=30)for(let t=0;t<36;t++){let n=-90+t*360/72,r=-90+(t+1)*360/72;a.push(...o(n*la,e*la),...o(r*la,e*la))}for(let e=-60;e<=60;e+=20)for(let t=0;t<72;t++)a.push(...o(e*la,t*360/72*la),...o(e*la,(t+1)*360/72*la));let s=new B;return s.setAttribute(`position`,new N(a,3)),new Fe(s,new Je({color:r,transparent:!0,opacity:i,blending:2,depthWrite:!1}))}var va=1.0227121650537077*Y,ya=236*va,ba=[10.6,10.7,7.6].map(e=>e*va),xa=Math.sqrt(4*Math.PI*.00449850215*.097),Sa=2,Ca=20,wa=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ta=class{n;rg;x0;a;phi0;om;kap;y0;b;sunIdx;constructor(e,t,n){let r=e.length/3;this.n=r;let i=r+1;this.rg=new Float64Array(i),this.x0=new Float64Array(i),this.a=new Float64Array(i),this.phi0=new Float64Array(i),this.om=new Float64Array(i),this.kap=new Float64Array(i),this.y0=new Float64Array(i),this.b=new Float64Array(i),this.sunIdx=r;let a=lt.fromScene(n),o=a.clone().multiplyScalar(-1).setY(0).normalize(),s=new W(0,0,-1).applyQuaternion(lt.qInv).setY(0).normalize(),c=o.clone().multiplyScalar(ba[0]).addScaledVector(s,ya+ba[1]).add(new W(0,ba[2],0)),l=new W,u=new W;for(let n=0;n<i;n++){n<r?(l.set(e[3*n],e[3*n+1],e[3*n+2]).applyQuaternion(lt.qInv).add(a),u.set(t[3*n],t[3*n+1],t[3*n+2]).applyQuaternion(lt.qInv).add(c)):(l.copy(a),u.copy(c));let i=Math.max(1,Math.hypot(l.x,l.z)),o=l.x/i,s=l.z/i,d=u.x*o+u.z*s,f=-u.x*s+u.z*o,p=Math.max(100,Math.abs(i*f)/ya),m=Math.sign(f||1)*ya/p,h=Math.SQRT2*Math.abs(m);this.rg[n]=p,this.x0[n]=i-p,this.a[n]=d/h,this.phi0[n]=Math.atan2(l.z,l.x),this.om[n]=m,this.kap[n]=h,this.y0[n]=l.y,this.b[n]=u.y/xa}}orbit(e,t){let n=this.kap[e],r=Math.sin(n*t),i=Math.cos(n*t),a=this.rg[e],o=this.x0[e],s=this.a[e],c=this.om[e];return[a+o*i+s*r,this.phi0[e]+c*t-2*c/a*(o/n*r+s/n*(1-i)),this.y0[e]*Math.cos(xa*t)+this.b[e]*Math.sin(xa*t)]}eval(e,t){let[n,r,i]=this.orbit(this.sunIdx,e),a=(r-this.phi0[this.sunIdx])*wa(Sa,Ca,Math.abs(e)),o=n*Math.cos(r-a),s=n*Math.sin(r-a),c=lt.q,l=new W;for(let n=0;n<this.n;n++){let[r,u,d]=this.orbit(n,e);l.set(r*Math.cos(u-a)-o,d-i,r*Math.sin(u-a)-s).applyQuaternion(c),t[3*n]=l.x,t[3*n+1]=l.y,t[3*n+2]=l.z}}},Ea=9460730472580.8,Da=31557600,Oa=16.92,ka=[[`světlo`,0],[`sonda Voyager 1 (16,9 km/s podle JPL Horizons)`,Oa]];function Aa(e,t){return t===0?e:e*Ea/t/Da}function ja(e){if(e<1/12)return`${K(e*365.25,0)} dní`;if(e<1)return`${K(e*12,0)} měsíců`;let t=(e,t)=>`${K(e,+(e<10))} ${t} let`;if(e>=1e9)return t(e/1e9,`mld.`);if(e>=1e6)return t(e/1e6,`mil.`);if(e>=1e4)return t(e/1e3,`tis.`);let n=e<10?Math.round(e*10)/10:Math.round(e),r=n===1?`rok`:n>=2&&n<=4&&Number.isInteger(n)?`roky`:Number.isInteger(n)?`let`:`roku`;return`${K(n,1)} ${r}`}function Ma(e){return`<dt>Cesta od nás</dt><dd class="trip">${ka.map(([t,n])=>`${t}: ${ja(Aa(e,n))}`).join(`<br>`)}</dd>`}function Na(e,t,n,r=null){let i=e=>e.toLocaleString(`cs-CZ`,{minimumFractionDigits:2,maximumFractionDigits:2}),a=`<dt>Gal. souřadnice</dt><dd>l ${i(t)}° · b ${n>=0?`+`:`−`}${i(Math.abs(n))}°</dd>`;if(e){let t=lt.fromScene(e),n=t.y,r=t.length();a+=`<dt>Výška nad rovinou</dt><dd>${vt(n,q(Math.abs(n)))} · ${vt(n,gt(Math.abs(n)))}</dd>
      <dt>Od centra Galaxie</dt><dd>${q(r)} · ${gt(r)}</dd>`}return r!=null&&r>0&&(a+=Ma(r)),a}var Pa=900,Fa=4e4,Ia=9e3,La=[[-.4,.42,.58,1],[.3,.78,.86,1],[.8,1,.92,.68],[1.3,1,.72,.4],[2.2,1,.5,.26],[3.5,1,.32,.2]];function Ra(e,t){if(e==null){t.push(.75,.75,.78);return}if(e<=La[0][0]){t.push(La[0][1],La[0][2],La[0][3]);return}for(let n=1;n<La.length;n++)if(e<=La[n][0]){let r=La[n-1],i=La[n],a=(e-r[0])/(i[0]-r[0]);t.push(r[1]+(i[1]-r[1])*a,r[2]+(i[2]-r[2])*a,r[3]+(i[3]-r[3])*a);return}let n=La[La.length-1];t.push(n[1],n[2],n[3])}function za(e){return new ct({uniforms:{map:{value:e},pr:{value:Math.min(devicePixelRatio,2)},fade:{value:1},lod:{value:0},clod:{value:0},maxErr:{value:99}},vertexShader:`
      uniform float pr; uniform float fade; uniform float lod; attribute float absMag;
      #ifdef DENS
      attribute float dens;
      #endif
      #ifdef WEIGHT
      attribute float wt; attribute float err; uniform float clod; uniform float maxErr;
      #endif
      attribute vec3 color; varying vec3 vCol; varying float vA;
      void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
        float rPc = max(-mv.z, 0.02) / ${Y.toFixed(6)};
        float m = absMag + 5. * log(rPc / 10.) / log(10.);
        gl_PointSize = clamp(7.2 - 0.5 * m, 1.6, 12.) * pr;
        vA = clamp(1.25 - 0.075 * m, 0.12, 1.) * fade;
        if (lod > 0.) vA *= 1. - smoothstep(lod * .5, lod, length(mv.xyz));
        #ifdef DENS
        vA *= dens;
        #endif
        #ifdef WEIGHT
        // bod zastupuje wt hvězd svého políčka, dokud nejsou vidět hvězdy potomků (ty slábnou ke clod)
        float kids = clod > 0. ? 1. - smoothstep(clod * .5, clod, length(mv.xyz)) : 0.;
        float w = mix(wt, 1., kids);
        // logaritmicky: sqrt(w) (medián w ~90 → 9,5×) dělal zvenku z Galaxie přepálenou bílou elipsu (schema 2, 12. 10.)
        // 13. 10. (Ráďa: „strašně přepálený, minimálně o půlku stáhnout“): celkově 0,3×, strop bodu 0,35 → každý bod
        // nejvýš třetinu dřívějšího jasu; u Slunce se sčítají miliony bodů (aditivně) a bez toho je střed bílý
        float lw = log2(max(w, 1.));
        vA = min(.35, vA * .3 * (1. + .25 * lw)) * step(err, maxErr);
        gl_PointSize *= min(1.6, 1. + .04 * lw);
        #endif
        gl_Position = projectionMatrix * mv; }`,fragmentShader:`
      uniform sampler2D map; varying vec3 vCol; varying float vA;
      void main(){
        float r = length(gl_PointCoord - .5);
        float core = 1. - smoothstep(.1, .22, r);
        float a = max(texture2D(map, gl_PointCoord).a * .6, core) * vA;
        gl_FragColor = vec4(mix(vCol, vec3(1.), core * .3), a); }`,transparent:!0,depthWrite:!1,blending:2})}var Ba=class{id=`gaia100`;name=`Hvězdy do 100 pc (Gaia)`;group=new ae;objects=[];filters=[];facets=[];on=!1;loaded=null;points=null;n=0;local=new Float32Array;base0=new Float32Array;vel=null;epi=null;velLoad=null;time=0;gmag=new Uint8Array;bprp=new Uint8Array;wd=new Uint8Array;chunks=new Map;meta=null;selected=null;url;base;sun;glow;button;constructor(e,t,n,r){this.url=e,this.base=e.slice(0,e.lastIndexOf(`/`)+1),this.sun=t,this.glow=n,this.button=r,this.group.position.copy(t),this.group.visible=!1,r.onclick=()=>void this.toggle()}get active(){return this.on&&!!this.points}async toggle(){this.on=!this.on,this.button.setAttribute(`aria-pressed`,String(this.on)),this.button.textContent=this.on?`Gaia 100 pc: načítám…`:`Gaia 100 pc: vyp`;try{this.loaded??=this.load(),await this.loaded,this.on&&(this.button.textContent=`Gaia 100 pc: zap`),this.group.visible=this.on}catch(e){console.error(e),this.loaded=null,this.on=!1,this.button.setAttribute(`aria-pressed`,`false`),this.button.textContent=`Gaia 100 pc: chyba načtení`}}async load(){let e=await fetch(this.url);if(!e.ok)throw Error(`gaia100.json: HTTP ${e.status}`);let t=this.meta=await e.json(),n=await wt(this.base+t.soubory.body),r=this.n=t.pocet;if(n.byteLength!==r*9)throw Error(`gaia100: čekáno ${r*9} B, je ${n.byteLength} B`);let i=new Int16Array(n.buffer,n.byteOffset,3*r);this.gmag=n.subarray(6*r,7*r),this.bprp=n.subarray(7*r,8*r),this.wd=n.subarray(8*r,9*r);let a=Y/t.kodovani.pozice_pc_krat,o=this.local=new Float32Array(3*r),s=new Float32Array(r),c=[];for(let e=0;e<r;e++){let t=i[e]*a,n=i[r+e]*a,l=i[2*r+e]*a;o[3*e]=t,o[3*e+1]=l,o[3*e+2]=-n;let u=Math.hypot(t,n,l)/Y,d=this.gmag[e]===255?null:this.gmag[e]/10;s[e]=d==null?15:d+5-5*Math.log10(Math.max(u,.1)),Ra(this.bprp[e]===255?null:this.bprp[e]/40-1,c)}let l=new B;l.setAttribute(`position`,new F(o,3)),l.setAttribute(`absMag`,new F(s,1)),l.setAttribute(`color`,new F(new Float32Array(c),3));let u=za(this.glow);this.points=new S(l,u),this.points.frustumCulled=!1,this.group.add(this.points),this.base0=o.slice(),this.time&&this.setTime(this.time)}setTime(e){if(this.time=e,!this.points)return;if(!this.vel){if(e===0||!this.meta?.soubory.pohyb)return;this.velLoad??=this.loadVel().catch(e=>{console.error(e),this.velLoad=null}),this.velLoad.then(()=>{this.vel&&this.setTime(this.time)});return}let t=this.local;e===0?t.set(this.base0):(this.epi??=new Ta(this.base0,this.vel,this.sun)).eval(e,t),this.points.geometry.getAttribute(`position`).needsUpdate=!0;let n=this.selected;n&&n.pos.set(t[3*n.index],t[3*n.index+1],t[3*n.index+2]).add(this.sun)}async loadVel(){let e=this.meta,t=await wt(this.base+e.soubory.pohyb),n=this.n;if(t.byteLength!==n*6)throw Error(`gaia100 pohyb: čekáno ${n*6} B, je ${t.byteLength} B`);let r=new Int16Array(t.buffer,t.byteOffset,3*n),i=Y/(e.kodovani.rychlost_pc_za_mil_let_krat??100),a=new Float32Array(3*n);for(let e=0;e<n;e++)a[3*e]=r[e]*i,a[3*e+1]=r[2*n+e]*i,a[3*e+2]=-r[n+e]*i;this.vel=a}update(e){if(!this.points||!this.on)return;let t=e.camera.position.distanceTo(this.sun);this.points.visible=t<Ia,this.points.material.uniforms.fade.value=Math.min(1,Math.max(0,(Ia-t)/(Ia*.6))),this.points.geometry.setDrawRange(0,t<Pa?this.n:Math.min(this.n,Fa))}pickAt(e,t,n,r,i){if(!this.points?.visible||!this.group.visible)return null;let a=Math.min(this.n,this.points.geometry.drawRange.count),o=new je().multiplyMatrices(i.camera.projectionMatrix,i.camera.matrixWorldInverse).multiply(this.group.matrixWorld).elements,s=this.local,c=-1,l=n*n;for(let n=0;n<a;n++){let i=s[3*n],a=s[3*n+1],u=s[3*n+2],d=o[3]*i+o[7]*a+o[11]*u+o[15];if(d<=0)continue;let f=((o[0]*i+o[4]*a+o[8]*u+o[12])/d+1)/2*r.width-e,p=(1-(o[1]*i+o[5]*a+o[9]*u+o[13])/d)/2*r.height-t,m=f*f+p*p;m<l&&(l=m,c=n)}return c>=0?c:null}chunk(e){let t=this.chunks.get(e);return t||(t=wt(this.base+this.meta.soubory.info.replace(`{NN}`,String(e).padStart(2,`0`))).then(e=>new DataView(e.buffer,e.byteOffset,e.byteLength)),this.chunks.set(e,t),t.catch(()=>this.chunks.delete(e))),t}twinOf=null;async findById(e,t,n){this.loaded??=this.load(),await this.loaded;let r=t*Math.PI/180,i=n*Math.PI/180,a=Math.cos(i)*Math.cos(r),o=Math.sin(i),s=-Math.cos(i)*Math.sin(r),c=this.base0,l=[];for(let e=0;e<this.n;e++){let t=c[3*e],n=c[3*e+1],r=c[3*e+2],i=(t*a+n*o+r*s)/Math.max(Math.hypot(t,n,r),1e-9);l.length===8&&i<=l[7][0]||(l.push([i,e]),l.sort((e,t)=>t[0]-e[0]),l.length>8&&l.pop())}let u=this.meta.soubory.info_po;for(let[t,n]of l){if(t<Math.cos(1/60*(Math.PI/180)))break;let r=Math.floor(n/u),i=await this.chunk(r),a=Math.min(u,this.n-r*u),o=n-r*u;if((BigInt(i.getUint32(4*a+4*o,!0))<<32n|BigInt(i.getUint32(4*o,!0))).toString()===e)return this.star(n)}return null}async star(e){let t=this.meta,n=t.soubory.info_po,r=Math.floor(e/n),i=await this.chunk(r),a=Math.min(n,this.n-r*n),o=e-r*n,s=e=>i.getUint32(e*4*a+4*o,!0),c=e=>{let t=i.getUint16(8*a+e*2*a+2*o,!0);return t===65535?null:t},l=i.getUint8(8*a+12*a+o),u=i.getInt16(8*a+13*a+2*o,!0),d=t.kodovani.vzdalenost_pc_krat,f=(e,t)=>e==null?null:e/t,p={id:(BigInt(s(1))<<32n|BigInt(s(0))).toString(),plx:f(c(0),50),ePlx:f(c(1),1e4),d16:f(c(2),d),d50:f(c(3),d),d84:f(c(4),d),ruwe:f(c(5),100),gcns:l===255?null:l/250,rv:u===-32768?null:u/10},m=this.local,h=this.base0,g=new W(m[3*e],m[3*e+1],m[3*e+2]).add(this.sun),_=new W(h[3*e],h[3*e+1],h[3*e+2]),v=_.length(),y=(Math.atan2(-_.z,_.x)*180/Math.PI+360)%360,b=Math.asin(_.y/Math.max(v,1e-9))*180/Math.PI,x={layer:this.id,index:e,name:`Gaia DR3 ${p.id}`,pos:g,anchor:g,distLy:v,color:`var(--fg)`,l:y,b,info:p,g:this.gmag[e]===255?null:this.gmag[e]/10,bprp:this.bprp[e]===255?null:this.bprp[e]/40-1,wd:this.wd[e]===255?null:this.wd[e]/200},S=this.twinOf?.(p.id);return S&&(x.twin=S),x}setFilter(){}applyFilter(){}labelCandidates(){return[]}kindName(){return`hvězda do 100 pc (Gaia)`}flyDistance(){return 3}onSelect(e){this.selected=e?.layer===this.id?e:null}get selection(){return this.selected}skyPos(e){let t=e;return{l:t.l,b:t.b,fovDeg:.05}}cardHtml(e){let t=e,n=t.info,r=e=>q(e*Y),i=n.d16!=null&&n.d84!=null&&r(n.d16)!==r(n.d84)?`<br><span class="dim">16.–84. percentil ${r(n.d16)} – ${r(n.d84)}</span>`:``,a=t.g!=null&&n.d50!=null?t.g+5-5*Math.log10(n.d50):null,o=(e,t)=>t==null?``:`<dt>${e}</dt><dd>${t}</dd>`,s=e=>e<.01?`pod 1 %`:`${K(e*100,0)} %`,c=t.wd==null?null:t.wd>.5?`${s(t.wd)} – <b>pravděpodobně bílý trpaslík</b>`:s(t.wd),l=n.ruwe==null?null:`${K(n.ruwe,2)}${n.ruwe>1.4?` <span class="dim">(nad obvyklou hranicí 1,4 – astrometrie může být zkreslená, často dvojhvězda)</span>`:``}`,u=`https://simbad.cds.unistra.fr/simbad/sim-id?Ident=${encodeURIComponent(`Gaia DR3 ${n.id}`)}`,d=n.d50!=null&&n.d50>100?`<p class="dim">Medián vzdálenosti je přes 100 pc: katalog bral hvězdy podle paralaxy, takže okraj výběru je neostrý.</p>`:``;return`<div class="kind">Hvězda do 100 pc (Gaia)</div>
      <h3>${J(t.name)}</h3>
      ${d}
      <dl>
        <dt>Od Slunce</dt><dd>${n.d50==null?`–`:`${r(n.d50)} · ${gt(n.d50*Y)}${i}`}</dd>
        ${o(`Paralaxa`,n.plx==null?null:`${K(n.plx,2)}${n.ePlx==null?``:` ± ${K(n.ePlx,3)}`} mas`)}
        ${Na(t.pos,t.l,t.b,t.distLy)}
        ${o(`Jasnost G`,t.g==null?null:`${K(t.g,1)} mag`)}
        ${o(`Absolutní G`,a==null?null:`${K(a,1)} mag <span class="dim">(Slunce ≈ 4,7)</span>`)}
        ${o(`Barva BP−RP`,t.bprp==null?null:`${K(t.bprp,2)} mag <span class="dim">(Slunce ≈ 0,8; víc = červenější)</span>`)}
        ${o(`Bílý trpaslík`,c)}
        ${o(`Radiální rychlost`,n.rv==null?null:`${K(n.rv,1)} km/s`)}
        ${o(`RUWE`,l)}
        ${o(`Spolehlivost (GCNS)`,n.gcns==null?null:`${K(n.gcns*100,0)} %`)}
      </dl>
      <p><a href="${u}" target="_blank" rel="noopener">Hledat v SIMBADu ↗</a></p>
      <div class="src">Poloha a vzdálenost: Gaia Catalogue of Nearby Stars (Gaia Collaboration, Smart et al. 2021, A&amp;A 649, A6),
        astrometrie Gaia EDR3; vzdálenost = medián posteriorního rozdělení z katalogu. Barva bodu na mapě podle BP−RP je jen orientační.
        Katalog stažen ${J(this.meta?.stazeno.slice(0,10)??``)}.</div>`}},Va={id:`gaia500`,name:`Hvězdy do 500 pc (Gaia)`,label:`Gaia 500 pc`,kind:`Hvězda do 500 pc (Gaia)`,hideLy:4e4,withErr:!1,source:`výběr paralaxa nad 2 mas a s chybou pod 10 %; vzdálenost = 1 / paralaxa`},Ha={id:`gaiaAll`,name:`Všechny hvězdy Gaia DR3`,label:`Gaia vše`,kind:`Hvězda Gaia DR3`,hideLy:1/0,withErr:!0,budget:8e6,minPx:35,maxLoads:8,source:`všechny hvězdy s paralaxou; vzdálenost = medián geometrické vzdálenosti (Bailer-Jones et al. 2021, AJ 161, 147)`},Ua=150,Wa=4,Ga=16,Ka=16384/Ga**3,qa=matchMedia(`(pointer: coarse)`).matches?6e5:2e6,Ja=class{id;name;group=new ae;objects=[];filters=[];facets=[];on=!1;loaded=null;index=null;root=null;nodes=[];shown=[];loads=0;frame=0;material;selected=null;base;sun;button;onEnable;opt;budget;constructor(e,t,n,r,i,a=Va){this.opt=a,this.id=a.id,this.name=a.name,this.budget=a.budget??qa,this.base=e,this.sun=t,this.button=r,this.onEnable=i,this.material=za(n),this.group.position.copy(t),this.group.visible=!1,r.onclick=()=>void this.toggle()}label(e){return`${this.opt.label}${this.index?.test?` (TEST)`:this.index?.cast?` (část)`:``}: ${e}`}get active(){return this.on}async toggle(){this.on=!this.on,this.button.setAttribute(`aria-pressed`,String(this.on)),this.button.textContent=this.label(this.on?`načítám…`:`vyp`),this.on&&this.onEnable();try{this.loaded??=this.load(),await this.loaded,this.on&&(this.button.textContent=this.label(`zap`)),this.group.visible=this.on}catch(e){console.error(e),this.loaded=null,this.on=!1,this.button.setAttribute(`aria-pressed`,`false`),this.button.textContent=this.label(`nedostupné`)}}async load(){let e=await fetch(this.base+`index.json`);if(!e.ok)throw Error(`${this.id} index.json: HTTP ${e.status}`);let t=this.index=await e.json(),n=new Map;for(let[e,r]of t.uzly){let i=t.polovina_pc,a=0,o=0,s=0;for(let t of e.slice(1)){let e=Number(t);i/=2,a+=e&1?i:-i,o+=e&2?i:-i,s+=e&4?i:-i}let c={key:e,n:r,children:[],center:new W(a,s,-o).multiplyScalar(Y),half:i*Y,points:null,local:null,gmag:null,bprp:null,err:null,loading:!1,failed:!1,lastUsed:0,info:null};n.set(e,c),n.get(e.slice(0,-1))?.children.push(c)}if(this.nodes=[...n.values()],this.root=n.get(`r`)??null,!this.root)throw Error(`gaia500: index bez kořene`)}async loadNode(e){let t=this.index;e.loading=!0,this.loads++;try{let n=await wt(this.base+t.soubory.body.replace(`{KEY}`,e.key)),r=e.n,i=t.schema===2,a=i?10:8;if(n.byteLength!==a*r)throw Error(`gaia500 ${e.key}: čekáno ${a*r} B, je ${n.byteLength} B`);let o=new Int16Array(n.buffer.slice(n.byteOffset,n.byteOffset+6*r)),s=n.subarray(6*r,7*r),c=n.subarray(7*r,8*r),l=e.half/32767,u=e.center,d=new Float32Array(3*r),f=new Float32Array(r),p=[];for(let e=0;e<r;e++){let t=o[e]*l,n=o[r+e]*l,i=o[2*r+e]*l;d[3*e]=u.x+t,d[3*e+1]=u.y+i,d[3*e+2]=u.z-n;let a=Math.hypot(d[3*e],d[3*e+1],d[3*e+2])/Y;f[e]=s[e]===255?15:s[e]/10+5-5*Math.log10(Math.max(a,.1)),Ra(c[e]===255?null:c[e]/40-1,p)}let m=new B;m.setAttribute(`position`,new F(d,3)),m.setAttribute(`absMag`,new F(f,1)),m.setAttribute(`color`,new F(new Float32Array(p),3));let h=this.material.clone();if(i){let t=n.subarray(8*r,9*r),i=n.subarray(9*r,10*r),a=new Float32Array(r),o=new Float32Array(r);for(let e=0;e<r;e++)a[e]=t[e]===255?99:t[e]/100,o[e]=2**(i[e]/16);m.setAttribute(`err`,new F(a,1)),m.setAttribute(`wt`,new F(o,1)),h.defines={WEIGHT:1},e.err=t}else{let e=new Uint16Array(r),t=new Uint16Array(Ga**3),n=16-Math.log2(Ga);for(let i=0;i<r;i++){let a=o[i]+32768>>n,s=o[r+i]+32768>>n,c=o[2*r+i]+32768>>n;e[i]=(a*Ga+s)*Ga+c,t[e[i]]++}let i=new Float32Array(r);for(let n=0;n<r;n++)i[n]=Math.min(1,Ka/t[e[n]]);m.setAttribute(`dens`,new F(i,1)),h.defines={DENS:1}}let g=new S(m,h);g.frustumCulled=!1,g.visible=!1,e.points=g,e.local=d,e.gmag=s,e.bprp=c,this.group.add(g)}catch(t){console.error(t),e.failed=!0}finally{e.loading=!1,this.loads--}}unload(e){e.points&&(this.group.remove(e.points),e.points.geometry.dispose(),e.points.material.dispose(),e.points=null,e.local=e.gmag=e.bprp=e.err=null)}update(e){if(!this.on||!this.root)return;let t=e.camera,n=t.position.distanceTo(this.sun),r=this.opt.hideLy;if(this.fade=r===1/0?1:Math.min(1,Math.max(0,(r-n)/(r*.6))),n>r){for(let e of this.shown)e.points.visible=!1;this.shown=[];return}if(this.frame++%6){for(let e of this.shown)this.applyLod(e);return}let i=t.position.clone().sub(this.sun),a=new x().setFromProjectionMatrix(new je().multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse).multiply(this.group.matrixWorld)),o=e.height/(2*Math.tan(t.fov*Math.PI/360)),s=new he,c=e=>{let t=e.half*Math.sqrt(3),n=Math.max(i.distanceTo(e.center)-t,e.half*.05);return e.half/n*o},l=[],u=[[1/0,this.root]],d=this.opt.minPx??Ua,f=0,p=d;for(;u.length;){u.sort((e,t)=>t[0]-e[0]);let[e,t]=u.shift();if(t!==this.root&&e<d)break;if(a.intersectsSphere(s.set(t.center,t.half*Math.sqrt(3)))){if(f+t.n>this.budget){p=Math.max(e,d);break}f+=t.n,l.push(t);for(let e of t.children)u.push([c(e),e])}}let m=performance.now();for(let e of this.shown)e.points.visible=!1;this.shown=[],this.shownSet=new Set(l.filter(e=>e.points)),this.lodK=o/p;for(let e of l)e.lastUsed=m,e.points?(e.points.visible=!0,this.shown.push(e),this.applyLod(e)):!e.loading&&!e.failed&&this.loads<(this.opt.maxLoads??Wa)&&this.loadNode(e);let h=this.nodes.reduce((e,t)=>e+(t.points?t.n:0),0);if(h>2*this.budget){let e=this.nodes.filter(e=>e.points&&e.lastUsed<m).sort((e,t)=>e.lastUsed-t.lastUsed);for(let t of e){if(h<=1.5*this.budget)break;h-=t.n,this.unload(t)}}}fade=1;lodK=0;shownSet=new Set;maxErr=.5;get hasErr(){return this.index?.schema===2}applyLod(e){let t=e.points.material.uniforms;t.fade.value=this.fade,t.lod.value=e===this.root?0:e.half*this.lodK,t.clod.value=e.children.some(e=>this.shownSet.has(e))?e.half/2*this.lodK:0,t.maxErr.value=this.maxErr}pickAt(e,t,n,r,i){if(!this.on||!this.group.visible||!this.shown.length)return null;let a=new je().multiplyMatrices(i.camera.projectionMatrix,i.camera.matrixWorldInverse).multiply(this.group.matrixWorld).elements,o=null,s=n*n;for(let n of this.shown){let i=n.local,c=n.err;for(let l=0;l<n.n;l++){if(c&&(c[l]===255?99:c[l]/100)>this.maxErr)continue;let u=i[3*l],d=i[3*l+1],f=i[3*l+2],p=a[3]*u+a[7]*d+a[11]*f+a[15];if(p<=0)continue;let m=((a[0]*u+a[4]*d+a[8]*f+a[12])/p+1)/2*r.width-e,h=(1-(a[1]*u+a[5]*d+a[9]*f+a[13])/p)/2*r.height-t,g=m*m+h*h;g<s&&(s=g,o={node:n,i:l})}}return o}cards(e){return e.info||(e.info=wt(this.base+this.index.soubory.karta.replace(`{KEY}`,e.key)).then(e=>new DataView(e.buffer,e.byteOffset,e.byteLength)),e.info.catch(()=>{e.info=null})),e.info}async star(e){let{node:t,i:n}=e,r=t.local,i=t.gmag,a=t.bprp,o=new W(r[3*n],r[3*n+1],r[3*n+2]),s=i[n]===255?null:i[n]/10,c=a[n]===255?null:a[n]/40-1,l=await this.cards(t),u=this.opt.withErr?l.getUint8(8*t.n+n):255,d=(BigInt(l.getUint32(4*t.n+4*n,!0))<<32n|BigInt(l.getUint32(4*n,!0))).toString(),f=o.length(),p=o.clone().add(this.sun),m={layer:this.id,index:n,name:`Gaia DR3 ${d}`,pos:p,anchor:p,distLy:f,color:`var(--fg)`,l:(Math.atan2(-o.z,o.x)*180/Math.PI+360)%360,b:Math.asin(o.y/Math.max(f,1e-9))*180/Math.PI,g:s,bprp:c,id:d,err:u===255?null:u/100},h=this.twinOf?.(d);return h&&(m.twin=h),m}twinOf=null;async findById(e,t){this.loaded??=this.load(),await this.loaded;let[n,r,i]=t;if(Math.max(Math.abs(n),Math.abs(r),Math.abs(i))>this.index.polovina_pc)return null;let a=BigInt(e),o=Number(a&4294967295n),s=Number(a>>32n),c=.05+1e-5*Math.hypot(n,r,i),l=[this.root];for(;l.length;){let e=l.shift(),t=e.center.x/Y,a=-e.center.z/Y,u=e.center.y/Y,d=e.half/Y+c;if(Math.abs(n-t)>d||Math.abs(r-a)>d||Math.abs(i-u)>d)continue;let f=await this.cards(e),p=e.n;for(let t=0;t<p;t++)if(f.getUint32(4*t,!0)===o&&f.getUint32(4*p+4*t,!0)===s){for(;e.loading;)await new Promise(e=>setTimeout(e,50));if(e.local||await this.loadNode(e),!e.local)throw Error(`${this.id}: uzel ${e.key} se nenačetl`);return this.star({node:e,i:t})}l.push(...e.children)}return null}setFilter(){}applyFilter(){}labelCandidates(){return[]}kindName(){return this.opt.kind.toLowerCase()}flyDistance(){return 5}onSelect(e){this.selected=e?.layer===this.id?e:null}get selection(){return this.selected}skyPos(e){let t=e;return{l:t.l,b:t.b,fovDeg:.05}}cardHtml(e){let t=e,n=(t.distLy??0)/Y,r=t.g==null?null:t.g+5-5*Math.log10(n),i=(e,t)=>t==null?``:`<dt>${e}</dt><dd>${t}</dd>`,a=encodeURIComponent(`Gaia DR3 ${t.id}`),o=this.index?.test?`<p class="warn"><b>Syntetická testovací data – hvězda neexistuje.</b></p>`:``,s=this.opt.withErr?`medián vzdálenosti Bailer-Jones et al. 2021${t.err==null?``:`, nejistota ± ${t.err>=2.54?`nad 250`:K(t.err*100,0)} %${t.err>.2?` – <b>poloha jen orientační</b> (paralaxa nepřesná, vzdálenost hlavně z modelu Galaxie)`:``}`}`:`1 / paralaxa; chyba paralaxy pod 10 %, takže zhruba ± ${q((t.distLy??0)*.1)}`;return`<div class="kind">${J(this.opt.kind)}</div>
      <h3>${J(t.name)}</h3>
      ${o}
      <dl>
        <dt>Od Slunce</dt><dd>${q(t.distLy??0)} · ${gt(t.distLy??0)}
          <br><span class="dim">${s}</span></dd>
        ${Na(t.pos,t.l,t.b,t.distLy)}
        ${i(`Jasnost G`,t.g==null?null:`${K(t.g,1)} mag`)}
        ${i(`Absolutní G`,r==null?null:`${K(r,1)} mag <span class="dim">(Slunce ≈ 4,7; bez opravy na extinkci)</span>`)}
        ${i(`Barva BP−RP`,t.bprp==null?null:`${K(t.bprp,2)} mag <span class="dim">(Slunce ≈ 0,8; víc = červenější, prach barvu zčervená)</span>`)}
      </dl>
      <p><a href="https://simbad.cds.unistra.fr/simbad/sim-id?Ident=${a}" target="_blank" rel="noopener">SIMBAD ↗</a> ·
        <a href="https://vizier.cds.unistra.fr/viz-bin/VizieR-4?-source=I/355/gaiadr3&amp;Source=${t.id}" target="_blank" rel="noopener">Gaia DR3 ve VizieR (paralaxa, RUWE, RV…) ↗</a></p>
      <div class="src">Poloha: Gaia DR3 (Gaia Collaboration, Vallenari et al. 2023, A&amp;A 674, A1), ${this.opt.source}. Barva bodu podle BP−RP je jen orientační.
        Data stažena ${J(this.index?.stazeno.slice(0,10)??``)}.</div>`}},Ya=[{key:null,label:`Ramena Gaia: vyp`},{key:`poggio2021`,label:`Ramena Gaia: Poggio 2021`},{key:`drimmel2023`,label:`Ramena Gaia: DR3 (OB)`}],Xa=class{mesh=null;data=null;mode=0;textures=new Map;url;scene;sun;constructor(e,t,n,r){this.url=e,this.scene=t,this.sun=n,r.textContent=Ya[0].label,r.onclick=async()=>{this.mode=(this.mode+1)%Ya.length,r.textContent=Ya[this.mode].label,r.setAttribute(`aria-pressed`,String(this.mode>0));try{await this.show(Ya[this.mode].key)}catch{r.textContent=`Gaia: chyba načtení`}}}async show(e){if(!e){this.mesh&&(this.mesh.visible=!1);return}this.data??=fetch(this.url).then(e=>{if(!e.ok)throw Error(String(e.status));return e.json()});let t=(await this.data).mapy[e],n=this.textures.get(e);if(n||(n=Za(t.n,t.data),this.textures.set(e,n)),!this.mesh){let e=(t.max-t.min)*1e3*Y;this.mesh=new ye(new te(e,e),new Qe({transparent:!0,depthWrite:!1,blending:2,side:2})),this.mesh.rotation.x=-Math.PI/2;let n=(t.min+t.max)/2*1e3*Y;this.mesh.position.set(this.sun.x+n,this.sun.y,this.sun.z-n),this.mesh.renderOrder=-1,this.scene.add(this.mesh)}this.mesh.material.map=n,this.mesh.material.needsUpdate=!0,this.mesh.visible=!0}};function Za(e,t){let n=new Uint8Array(e*e*4);for(let r=0;r<e;r++)for(let i=0;i<e;i++){let a=Math.max(0,Math.min(1,t[r*e+i]/1.5))*.6,o=(i*e+r)*4;n[o]=255*a,n[o+1]=170*a,n[o+2]=60*a,n[o+3]=255}let r=new $e(n,e,e,w);return r.magFilter=be,r.minFilter=be,r.needsUpdate=!0,r}var Qa={c:[-82,39,-25],a:358,b:316,h:70,incl:21.4,node:319.4},$a=(e,t,n,r)=>new W(e.x+t*Y,e.y+r*Y,e.z-n*Y),eo=class{id=`okoli`;name=`Okolí Slunce (struktury)`;group=new ae;objects;filters=[];facets=[];on=!1;wavePts;bubbleD;button;constructor(e,t,n,r){this.button=r,this.group.visible=!1,this.wavePts=e.vlna.data;let i=this.gould(t);this.group.add(this.wave(t,e.vlna.data),this.bubble(t,e.bublina.krok_deg,e.bublina.d),i.line);let[a,o,s]=e.vlna.data[Math.floor(e.vlna.data.length/2)],c=$a(t,a,o,s);n.add(`Radcliffeova vlna`,c,`anno`,()=>this.on,150);let l=e.bublina.krok_deg,u=Math.floor(120/l),d=Math.floor(90/l),f=e.bublina.d[u][d]??175,p=mt.dir((d+.5)*l,-90+(u+.5)*l).multiplyScalar(f*Y).add(t);n.add(`Místní bublina`,p,`anno`,()=>this.on,150),n.add(`Gouldův pás (sporný)`,i.top,`anno`,()=>this.on,140),this.bubbleD=e.bublina.d.flat().filter(e=>e!=null).sort((e,t)=>e-t),this.objects=[{layer:this.id,index:0,name:`Radcliffeova vlna`,pos:c,anchor:c,distLy:c.distanceTo(t),color:`#ff6a8a`,major:!0,aliases:[`Radcliffe Wave`,`radcliffova vlna`,`vlna`]},{layer:this.id,index:1,name:`Místní bublina`,pos:p,anchor:p,distLy:p.distanceTo(t),color:`#4fd1c5`,major:!0,aliases:[`Local Bubble`,`Local Chimney`,`místní komín`,`bublina`]},{layer:this.id,index:2,name:`Gouldův pás`,pos:i.center,anchor:i.center,distLy:i.center.distanceTo(t),color:`#e6c86e`,major:!0,aliases:[`Gould Belt`,`Gould's Belt`,`Gouldův pás`,`pás`]}],r.onclick=()=>this.set(!this.on)}set(e){this.on=e,this.group.visible=e,ca(this.button,`Okolí`,e)}onSelect(e){e&&e.layer===this.id&&!this.on&&this.set(!0)}setFilter(){}applyFilter(){}labelCandidates(){return[]}kindName(e){return[`vlna plynu a prachu (model)`,`dutina po supernovách (model)`,`prstenec oblastí vzniku hvězd (sporný)`][e.index]}flyDistance(e){return[9e3,1500,4500][e.index]}update(e){}cardHtml(e){return[this.waveCard,this.bubbleCard,this.gouldCard][e.index].call(this,e)}gouldCard(e){let t=Qa;return`<div class="kind" style="color:#e6c86e">Struktura v okolí Slunce · proložený model, sporná</div>
      <h3>${J(e.name)}</h3>
      <p>Pás jasných mladých hvězd a oblastí, kde vznikají hvězdy (Orion, Perseus, Taurus, Ofiuchus, Sco-Cen), skloněný
        asi o 20° k rovině Mléčné dráhy. Na obloze ho v 19. století popsal Benjamin Gould. Ve 3D ho autoři prokládají
        zploštělým elipsoidem kolem místa kousek od Slunce.</p>
      <dl>
        <dt>Střed elipsoidu</dt><dd>(${t.c.join(`, `)}) pc od Slunce (x k centru, y ve směru rotace, z k severu),
          ${q(e.distLy??0)}</dd>
        <dt>Poloosy</dt><dd>(358 ± 7) × (316 ± 13) × (70 ± 4) pc</dd>
        <dt>Sklon k rovině</dt><dd>21,4 ± 0,9°, výstupní uzel ℓ = 319,4 ± 2,3°</dd>
      </dl>
      <p class="dim">Na mapě je kružnice o průměrné poloose 337 pc v rovině pásu – článek neudává, kam v té rovině míří
        delší osa. <b>Existence pásu je sporná:</b> mapy prachu z Gaia ukázaly, že velkou část jeho mračen tvoří
        Radcliffeova vlna a Split, a práce z roku 2026 (Pantaleoni González et al., zatím v recenzi) ho považuje
        za náhodné seskupení v prostoru, ne skutečnou strukturu.</p>
      <div class="src">Dzib S. A. et al. 2018, ApJ 867, 151, „Distances and kinematics of Gould Belt star-forming regions
        with Gaia DR2 results“ (arXiv:1810.01917, odd. 4 – hodnoty ověřené v textu 10. 10. 2026);
        Pantaleoni González M. et al. 2026, „Requiem for a belt“, arXiv:2604.13225 (odesláno do A&A).</div>`}gould(e){let t=Math.PI/180,n=Qa,r=(n.a+n.b)/2,i=new W(Math.cos(n.node*t),Math.sin(n.node*t),0),a=new W(Math.cos((n.node+90)*t)*Math.cos(n.incl*t),Math.sin((n.node+90)*t)*Math.cos(n.incl*t),Math.sin(n.incl*t)),o=[];for(let t=0;t<=128;t++){let s=t/128*2*Math.PI,c=$a(e,n.c[0]+r*(Math.cos(s)*i.x+Math.sin(s)*a.x),n.c[1]+r*(Math.cos(s)*i.y+Math.sin(s)*a.y),n.c[2]+r*Math.sin(s)*a.z);o.push(c.x,c.y,c.z)}let s=new B;s.setAttribute(`position`,new N(o,3));let c=new Oe(s,new Je({color:15124590,transparent:!0,opacity:.55,depthWrite:!1})),l=$a(e,n.c[0]+r*a.x,n.c[1]+r*a.y,n.c[2]+r*a.z);return{line:c,center:$a(e,n.c[0],n.c[1],n.c[2]),top:l}}waveCard(e){let t=this.wavePts,n=t.map(e=>e[2]),r=t.map(e=>e[3]),i=Math.min(...t.map(e=>Math.hypot(e[0],e[1],e[2]))),a=0;for(let e=1;e<t.length;e++)a+=Math.hypot(t[e][0]-t[e-1][0],t[e][1]-t[e-1][1],t[e][2]-t[e-1][2]);let o=e=>`${K(e,0)} pc (${q(e*Y)})`;return`<div class="kind" style="color:#ff6a8a">Struktura v okolí Slunce · model z 3D map prachu</div>
      <h3>${J(e.name)}</h3>
      <p>Úzký, zvlněný řetěz hustých mračen plynu a prachu, na kterém leží většina blízkých oblastí, kde vznikají
        hvězdy – mimo jiné Orion, Cefeus, mlhovina Severní Amerika a Cygnus X. Objevili ji v roce 2020 díky 3D mapám prachu
        z dat Gaia; dřív se tatáž mračna připisovala Gouldovu pásu. Podle novějšího výzkumu vlna kmitá napříč
        rovinou Galaxie, jak ji táhne gravitace disku, a zároveň se pomalu vzdaluje od centra.</p>
      <dl>
        <dt>Délka</dt><dd>asi 2,7 kpc (${q(2700*Y)}) podle objevitelů; čára modelu ${o(a)}</dd>
        <dt>Plyn</dt><dd>asi 3 miliony hmotností Slunce</dd>
        <dt>Tvar</dt><dd>tlumená sinusovka, průměrná perioda asi 2 kpc, největší výchylka asi 160 pc (objevitelé)</dd>
        <dt>Výška nad rovinou</dt><dd>v modelu od ${K(Math.min(...n),0)} do +${K(Math.max(...n),0)} pc</dd>
        <dt>Svislá rychlost</dt><dd>v modelu ${K(Math.min(...r),1)} až +${K(Math.max(...r),1)} km/s
          (barva čáry: modrá dolů, červená nahoru)</dd>
        <dt>Nejblíž Slunci</dt><dd>${o(i)} (body modelu; Slunce leží do 300 pc od vlny)</dd>
      </dl>
      <p class="dim">Poloha je model proložený mračny, ne ostrá hranice. Kmitání zjistili z pohybů plynu (CO) a mladých
        hvězdokup; podle autorů se ve vlně mohla zrodit i hvězdokupa, jejíž supernovy vyfoukly Místní bublinu.</p>
      <div class="src">Model: Konietzka R. et al. 2024, Nature, „The Radcliffe Wave is oscillating“, doi:10.1038/s41586-024-07127-3
        (arXiv:2402.12596), data Harvard Dataverse doi:10.7910/DVN/F98QHY (CC0). Objev: Alves J. et al. 2020, Nature,
        doi:10.1038/s41586-019-1874-z (arXiv:2001.08748) – délka, hmotnost, perioda a výchylka z abstraktu.
        Výšky, rychlosti a vzdálenost spočítané z bodů modelu.</div>`}bubbleCard(e){let t=this.bubbleD,n=e=>t[Math.min(t.length-1,Math.floor(e*t.length))];return`<div class="kind" style="color:#4fd1c5">Struktura v okolí Slunce · model z 3D map prachu</div>
      <h3>${J(e.name)}</h3>
      <p>Slunce leží uvnitř řídké dutiny v mezihvězdném prostředí, kterou vyfoukly výbuchy supernov. Její stěnu tvoří zhuštěný prach a plyn, na kterém leží řada známých mračen.
        Dutina je hodně nepravidelná a směrem na galaktický sever se otevírá jako „komín“, kterým látka unikla
        nad disk Galaxie. Síť na mapě ukazuje místo, kde je stěna nejhustší.</p>
      <dl>
        <dt>Vzdálenost stěny</dt><dd>v průměru asi 170 pc (${q(170*Y)}), podle směru od 70 do přes 600 pc (autoři);
          v mřížce mapy ${K(n(0),0)}–${K(n(1),0)} pc, medián ${K(n(.5),0)} pc</dd>
        <dt>Tloušťka stěny</dt><dd>typicky 35 pc</dd>
        <dt>Prach a plyn ve stěně</dt><dd>(6,0 ± 0,7) × 10⁵ hmotností Slunce</dd>
        <dt>Od nás</dt><dd>uvnitř – Slunce je v dutině, kotva karty je na stěně nad námi (${q(e.distLy??0)} · ${gt(e.distLy??0)})</dd>
      </dl>
      <p class="dim">Stěna je vrchol hustoty prachu v daném směru; síť je zjednodušená do buněk 4° × 4° (medián).
        Kde data stěnu nenacházejí (hlavně kolem galaktického severního pólu, ve směru „komína“), síť chybí.</p>
      <div class="src">O'Neill T. J. et al. 2024, ApJ 973, 136, „The Local Bubble is a Local Chimney“ (arXiv:2403.04961) –
        čísla z abstraktu; data Harvard Dataverse doi:10.7910/DVN/INB1RB (CC0), z 3D mapy prachu Edenhofer et al. 2024.</div>`}wave(e,t){let n=[],r=[],i=new V(5939455),a=new V(16738954),o=new V;for(let[s,c,l,u]of t){let t=$a(e,s,c,l);n.push(t.x,t.y,t.z),o.lerpColors(i,a,Math.min(1,Math.max(0,(u+15)/30))),r.push(o.r,o.g,o.b)}let s=new B;s.setAttribute(`position`,new N(n,3)),s.setAttribute(`color`,new N(r,3));let c=new ae;return c.add(new Oe(s,new Je({vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1})),new S(s,new D({vertexColors:!0,size:4,sizeAttenuation:!1,transparent:!0,opacity:.8,blending:2,depthWrite:!1}))),c}bubble(e,t,n){let r=n.length,i=n[0].length,a=(r,a)=>{let o=n[r][(a+i)%i];return o==null?null:mt.dir(((a+i)%i+.5)*t,-90+(r+.5)*t).multiplyScalar(o*Y).add(e)},o=[],s=(e,t)=>{e&&t&&o.push(e.x,e.y,e.z,t.x,t.y,t.z)};for(let e=1;e<r-1;e+=3)for(let t=0;t<i;t++)s(a(e,t),a(e,t+1));for(let e=0;e<i;e+=6)for(let t=0;t<r-1;t++)s(a(t,e),a(t+1,e));let c=new B;return c.setAttribute(`position`,new N(o,3)),new Fe(c,new Je({color:5231045,transparent:!0,opacity:.35,blending:2,depthWrite:!1}))}},to={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},no=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},ro=new l(-1,1,1,-1,0,1),io=new class extends B{constructor(){super(),this.setAttribute(`position`,new N([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new N([0,2,0,0,2,0],2))}},ao=class{constructor(e){this._mesh=new ye(io,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,ro)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},oo=class extends no{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ct?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=G.clone(e.uniforms),this.material=new ct({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ao(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},so=class extends no{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},co=class extends no{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},lo=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new I);this._width=n.width,this._height=n.height,t=new ve(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:st}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new oo(to),this.copyPass.material.blending=0,this.timer=new a}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}so!==void 0&&(r instanceof so?n=!0:r instanceof co&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new I);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},uo=class extends no{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new V}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},fo={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new V(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},po=class e extends no{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new I(256,256):new I(e.x,e.y),this.clearColor=new V(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new ve(i,a,{type:st,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new ve(i,a,{type:st,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new ve(i,a,{type:st,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=fo;this.highPassUniforms=G.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ct({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new I(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1),new W(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=G.clone(to.uniforms),this.blendMaterial=new ct({uniforms:this.copyUniforms,vertexShader:to.vertexShader,fragmentShader:to.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new V,this._oldClearAlpha=1,this._basic=new Qe,this._fsQuad=new ao(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new I(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new ct({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new I(.5,.5)},direction:{value:new I(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new ct({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};po.BlurDirectionX=new I(1,0),po.BlurDirectionY=new I(0,1);var mo={name:`GalaxieTone`,uniforms:{tDiffuse:{value:null},exposure:{value:1}},vertexShader:`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform sampler2D tDiffuse; uniform float exposure; varying vec2 vUv;
    void main() {
      vec3 c = max(texture2D(tDiffuse, vUv).rgb * exposure, 0.);
      // rameno podle nejjasnějšího kanálu (odstín zůstane), nad KNEE exponenciálně k 1
      float m = max(c.r, max(c.g, c.b));
      const float k = ${.6.toFixed(2)};
      if (m > k) {
        float t = k + (1. - k) * (1. - exp(-(m - k) / (1. - k)));
        c *= t / m;
        // velmi jasné jádro mírně do bílé (jako přeexponovaná fotografie), ne do syté skvrny
        c = mix(c, vec3(t), clamp((m - 1.) * .15, 0., .5));
      }
      gl_FragColor = vec4(c, 1.);
    }`},ho=class{composer;bloom;tone;renderPass;constructor(e,t,n,r=!1){let i=e.getDrawingBufferSize(new I),a=new ve(i.x,i.y,{type:st});if(this.composer=new lo(e,a),r)for(let e of[this.composer.renderTarget1,this.composer.renderTarget2])e.isXRRenderTarget=!0,e.texture.colorSpace=ee;this.renderPass=new uo(t,n),this.composer.addPass(this.renderPass),this.bloom=new po(new I(i.x,i.y),.35,.6,.9),this.composer.addPass(this.bloom),this.tone=new oo(mo),this.composer.addPass(this.tone)}setSize(e,t,n){this.composer.setPixelRatio(n),this.composer.setSize(e,t)}render(){this.composer.render()}},go=new W(0,1,0),_o=class e{renderer;scene=new oe;static FOV=50;camera=new Ie(e.FOV,1,.1,1e6);controls;glow;hdr;width=1;height=1;paused=!1;driver=null;hooks=[];postRender=[];flightNow=null;get flight(){return this.flightNow}set flight(e){this.flightNow=xt(this.flightNow,e)}keys={};last=performance.now();suspended=!1;shift=0;shiftGoal=0;constructor(e,t){this.renderer=new ta({antialias:devicePixelRatio<2,powerPreference:`high-performance`}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,2)),e.appendChild(this.renderer.domElement),Ct(this.renderer.domElement),this.hdr=new ho(this.renderer,this.scene,this.camera,!0),this.hdr.bloom.enabled=!1,this.scene.background=new V(t),this.controls=new St(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.08,this.controls.minDistance=.5,this.controls.maxDistance=3e5,this.controls.screenSpacePanning=!0,this.controls.zoomToCursor=!0,this.glow=vo(),addEventListener(`resize`,()=>this.resize()),addEventListener(`keydown`,e=>{let t=e.target;t.tagName!==`INPUT`&&t.tagName!==`TEXTAREA`&&(this.keys[e.key.toLowerCase()]=!0)}),addEventListener(`keyup`,e=>this.keys[e.key.toLowerCase()]=!1),addEventListener(`blur`,()=>this.keys={}),this.resize()}onFrame(e){this.hooks.push(e)}onPostRender(e){this.postRender.push(e)}setCenterShift(e){this.shiftGoal=e}get viewDistance(){return this.camera.position.distanceTo(this.controls.target)}resize(){this.width=innerWidth,this.height=innerHeight;let[e,t]=this.suspended?[1,1]:[this.width,this.height];this.renderer.setSize(e,t,!1),this.hdr.setSize(e,t,this.renderer.getPixelRatio()),this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}get flying(){return this.flight!=null}flyTo(e,t,n,r){let i=n?n.clone().normalize():this.camera.position.clone().sub(this.controls.target).normalize(),a=new Ot(r==null?Et:bt(r));return this.flight={clock:a,fromP:this.camera.position.clone(),fromT:this.controls.target.clone(),toT:e.clone(),toP:e.clone().addScaledVector(i,t)},a.promise}zoomAt(e,t,n=.4){let r=new I(e/this.width*2-1,-(t/this.height)*2+1),i=new v;i.setFromCamera(r,this.camera);let a=this.camera.getWorldDirection(new W),o=i.ray.intersectPlane(new M().setFromNormalAndCoplanarPoint(a,this.controls.target),new W);this.flyTo(o??this.controls.target,Math.max(this.controls.minDistance,this.viewDistance*n))}jumpTo(e,t){this.controls.target.copy(e),this.camera.position.copy(e).add(t),this.controls.update()}start(){let e=e=>{let t=Math.min(.05,(e-this.last)/1e3);if(this.last=e,this.driver)this.flight=null,this.driver(t);else if(this.flight){let t=this.flight,{k:n,done:r}=t.clock.step(e);this.controls.target.lerpVectors(t.fromT,t.toT,n),this.camera.position.lerpVectors(t.fromP,t.toP,n),r&&(this.flight=null)}this.driver||this.keyMove(t),this.controls.update();let n=this.viewDistance;this.camera.near=Math.max(.01,n*.002),this.camera.far=Math.max(4e5,n*50),this.applyShift(t),this.camera.updateProjectionMatrix();for(let e of this.hooks)e(t);this.hdr.render();for(let e of this.postRender)e()},t=e=>{this.suspended=e,this.resize()};yt.add({tick:e,onSuspend:()=>t(!0),onResume:()=>t(!1)})}applyShift(t){this.shift+=(this.shiftGoal-this.shift)*Math.min(1,t*10),Math.abs(this.shift-this.shiftGoal)<.5&&(this.shift=this.shiftGoal);let n=Math.round(this.shift),{camera:r,width:i,height:a}=this;if(!n){r.view?.enabled&&r.clearViewOffset(),r.fov=e.FOV,r.aspect=i/a;return}let o=a+2*Math.abs(n);r.fov=2*Math.atan(Math.tan(e.FOV*Math.PI/360)*(o/a))*180/Math.PI,r.aspect=i/o,r.setViewOffset(i,o,0,n>0?2*n:0,i,a)}keyMove(e){let t=this.keys,n=new W;this.camera.getWorldDirection(n),n.y=0,n.lengthSq()<1e-6&&n.set(0,0,-1),n.normalize();let r=new W().crossVectors(n,go).normalize(),i=new W;(t.w||t.arrowup)&&i.add(n),(t.s||t.arrowdown)&&i.sub(n),(t.d||t.arrowright)&&i.add(r),(t.a||t.arrowleft)&&i.sub(r),t.e&&(i.y+=1),t.q&&--i.y,i.lengthSq()!==0&&(i.normalize().multiplyScalar(this.viewDistance*.9*e),this.camera.position.add(i),this.controls.target.add(i),this.flight=null)}};function vo(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.25,`rgba(255,255,255,.55)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),new Ee(e)}var yo=Math.PI/180/60,bo={0:[1,.32,.48,.55],5:[.35,.9,.78,.35]},xo=[.45,.27,.16,.1],So=class{points=null;loading=null;on=!1;stage;frame;btn;nebUrl;cloudUrl;constructor(e,t,n,r,i,a){this.stage=e,this.frame=t,this.btn=n,this.nebUrl=r,this.cloudUrl=i,n.addEventListener(`click`,()=>this.set(!this.on)),e.onFrame(()=>{if(!this.points)return;let t=this.points.material.uniforms;t.pr.value=e.renderer.getPixelRatio(),t.scale.value=e.height*e.renderer.getPixelRatio()/(2*Math.tan(_o.FOV/2*Math.PI/180))}),this.set(a)}set(e){this.on=e,ca(this.btn,`Barvy mlhovin`,e),e&&(this.loading??=this.load().catch(e=>console.warn(`kulisa mlhovin:`,e))),this.points&&(this.points.visible=e)}async load(){let[e,t]=await Promise.all([this.nebUrl?fetch(this.nebUrl).then(e=>e.json()):null,this.cloudUrl?fetch(this.cloudUrl).then(e=>e.json()):null]),n=[],r=[],i=[],a=[],o=this.frame.sun.clone(),s=(e,t,s,c,l,u)=>{this.frame.toScene(e,t,s,o),n.push(o.x,o.y,o.z);let d=l[3]*Math.min(1.6,Math.max(.5,(c/10)**.25));r.push(l[0]*d,l[1]*d,l[2]*d),i.push(Math.max(1,c)*Y),a.push(u)};if(e){let t=e.objekty,n=t.x.prumer;for(let e=0;e<t.l.length;e++){let r=bo[t.typ[e]],i=t.d[e],a=n[e];r&&i!=null&&a&&s(t.l[e],t.b[e],i,2*i*Math.tan(a*yo/2),r,5)}}if(t){let e=t.objekty,n=e.x.velikost;for(let t=0;t<e.l.length;t++){let r=e.d[t],i=n[t];if(r==null||!i)continue;let a=Math.min(1,Math.max(.12,i/60));s(e.l[t],e.b[t],r,i,[xo[0],xo[1],xo[2],xo[3]*a],12)}}let c=new B;c.setAttribute(`position`,new F(new Float32Array(n),3)),c.setAttribute(`color`,new F(new Float32Array(r),3)),c.setAttribute(`size`,new F(new Float32Array(i),1)),c.setAttribute(`minPx`,new F(new Float32Array(a),1));let l=new ct({uniforms:{scale:{value:500},pr:{value:1}},vertexShader:`
        uniform float scale; uniform float pr; attribute float size; attribute float minPx; attribute vec3 color; varying vec3 vCol;
        void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
          float px = size * scale / max(-mv.z, 1.);
          // zvenku jsou H II (desítky pc) i mračna (~100 pc) pod pixel → nejmenší skvrna 5 px (mračna 12 px), aby se slily do barevné
          // mlhoviny jako na fotografiích galaxií; nad 600 px stojí moc vyplňování – zblízka se záře tlumí
          vCol *= 1. - smoothstep(300., 900., px);
          gl_PointSize = clamp(px, minPx * pr, 600.);
          gl_Position = projectionMatrix * mv; }`,fragmentShader:`
        varying vec3 vCol;
        void main(){ vec2 p = gl_PointCoord - .5; float r2 = dot(p, p) * 4.;
          if (r2 > 1.) discard;
          gl_FragColor = vec4(vCol * exp(-5. * r2) * (1. - r2), 1.); }`,transparent:!0,depthWrite:!1,blending:2});this.points=new S(c,l),this.points.frustumCulled=!1,this.points.renderOrder=-2,this.points.visible=this.on,this.stage.scene.add(this.points)}},Co=(e,t,n,r=new W)=>r.set(e*Y,n*Y,-t*Y),wo=600,To=1500,Eo=4e3,Do=class{id=`sloupy`;name=`Sloupy stvoření`;group=new ae;objects;filters=[];facets=[];obj;meta;url;glowTex;loaded=null;points=null;glow;stage;sun;constructor(e,t,n,r,i){this.stage=i,this.sun=n,this.meta=e,this.url=t+e.soubor,this.glowTex=r;let[a,o,s]=e.stred_pc;this.group.position.copy(Co(a,o,s).add(n));let c=Co(...e.teziste_pc).add(this.group.position);this.obj={layer:this.id,index:0,name:`Sloupy stvoření`,pos:c,anchor:c,distLy:c.distanceTo(n),color:`#d9a066`,major:!0,aliases:[`Pillars of Creation`,`Sloupy stvoreni`,`M16 sloupy`,`Orlí mlhovina – sloupy`,`Eagle Nebula pillars`]},this.objects=[this.obj],this.glow=new O(new ge({map:r,color:new V(10470655),transparent:!0,depthWrite:!1,blending:2,opacity:.35})),this.glow.scale.set(5,5,1),this.glow.visible=!1,this.group.add(this.glow)}async load(){let e=await wt(this.url),t=this.meta.pocet;if(e.byteLength!==t*9)throw Error(`sloupy: čekáno ${t*9} B, je ${e.byteLength} B`);let n=new Int16Array(e.buffer,e.byteOffset,3*t),r=e.subarray(6*t,9*t),i=1/this.meta.kodovani.pc_krat,a=new Float32Array(3*t),o=new Float32Array(3*t),s=new W;for(let e=0;e<t;e++)Co(n[e]*i,n[t+e]*i,n[2*t+e]*i,s),a[3*e]=s.x,a[3*e+1]=s.y,a[3*e+2]=s.z,o[3*e]=r[e]/255,o[3*e+1]=r[t+e]/255,o[3*e+2]=r[2*t+e]/255;let c=new B;c.setAttribute(`position`,new F(a,3)),c.setAttribute(`color`,new F(o,3));let l=new ct({uniforms:{map:{value:this.glowTex},k:{value:1},fade:{value:1}},vertexShader:`
        uniform float k; uniform float fade; attribute vec3 color; varying vec3 vCol; varying float vA;
        void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
          gl_PointSize = clamp(k / -mv.z, 1.2, 9.);
          vA = 0.5 * fade;
          gl_Position = projectionMatrix * mv; }`,fragmentShader:`
        uniform sampler2D map; varying vec3 vCol; varying float vA;
        void main(){ float a = texture2D(map, gl_PointCoord).a * vA; if (a < 0.02) discard; gl_FragColor = vec4(vCol, a); }`,transparent:!0,depthWrite:!1,blending:1});this.points=new S(c,l),this.points.frustumCulled=!1,this.group.add(this.points)}update(e){let t=e.camera.position.distanceTo(this.obj.anchor);t<wo&&!this.loaded&&(this.loaded=this.load().catch(e=>{console.error(e),this.loaded=null}));let n=t<To;if(this.glow.visible=n,!this.points)return;this.points.visible=n;let r=this.points.material.uniforms;r.k.value=.06*e.height*Math.min(devicePixelRatio,2)/(2*Math.tan(Math.PI/180*25)),r.fade.value=Math.min(1,Math.max(0,(To-t)/(To*.5)))}onSelect(e){e===this.obj&&(this.loaded??=this.load().catch(e=>{console.error(e),this.loaded=null}))}setFilter(){}applyFilter(){}labelCandidates(e){return e.camera.position.distanceTo(this.obj.anchor)<Eo?[this.obj]:[]}kindName(){return`struktura v Orlí mlhovině (3D rekonstrukce)`}flyDistance(){return 16}detailLabel(){return`Pohled ze Země (jako na fotkách) ▸`}openDetail(){this.stage.flyTo(this.obj.anchor,16,this.sun.clone().sub(this.obj.anchor).normalize())}skyPos(){return{l:this.meta.hvezda.l,b:this.meta.hvezda.b,fovDeg:.09}}cardHtml(e){let t=this.meta,n=Object.entries(t.hroty).map(([e,[t,n,r]])=>`${J(e)}: ${K(Math.hypot(t,n,r),1)} pc`).join(` · `);return`<div class="kind" style="color:#d9a066">Struktura v Orlí mlhovině M16 · 3D rekonstrukce</div>
      <h3>${J(e.name)}</h3>
      <p>Prachové sloupy chladného plynu, které z boku „ohlodává“ záření horkých hvězd hvězdokupy NGC 6611.
        Na hrotech se rodí nové hvězdy. Slavné jsou ze snímků Hubbleova (1995, 2014) a Webbova dalekohledu (2022).</p>
      <dl>
        <dt>Od Slunce</dt><dd>${q(e.distLy)} · ${gt(e.distLy)} <span class="dim">(vzdálenost NGC 6611 v mapě, Hunt &amp; Reffert 2023)</span></dd>
        ${Na(e.pos,t.hvezda.l,t.hvezda.b,e.distLy)}
        <dt>Hroty sloupů</dt><dd>${n}<br><span class="dim">vůči ${J(t.hvezda.jmeno)} (O5 V, hlavní zdroj záření)</span></dd>
      </dl>
      <p class="dim"><b>Co je z dat a co odhad:</b> obrys na obloze je vyříznutý ze snímku Pan-STARRS DR1. Pořadí sloupů podél
        zorného paprsku (P1 horní část za hvězdami, ostatní před nimi) je z McLeod et al. 2015 a Karim et al. 2023,
        vzdálenosti hrotů od roviny hvězdokupy ze Sofue 2020. Sklon sloupů (${K(t.naklon_os_deg,0)}°) a jejich tloušťka
        (válec) jsou předpoklady, protože skutečné hodnoty měření neurčují. Barvy jsou ilustrativní.</p>
      <div class="src">McLeod A.F. et al. 2015, MNRAS (doi:10.1093/mnras/stv680); Sofue Y. 2020, MNRAS 492, 5966;
        Karim R.L. et al. 2023, AJ (doi:10.3847/1538-3881/acff6c); snímek Pan-STARRS DR1 přes CDS hips2fits.
        Model sestaven ${J(t.stazeno.slice(0,10))}.</div>`}},Oo=14,ko=new Set([`Sol`,`Vulcan`,`Qo'noS`,`Romulus`,`Cardassian`,`Ferenginar`,`Bajoran`,`Breen`,`Tholia`,`Andorian`,`Tellar`,`Gorn`,`Talar`,`Risa`,`Betazed`,`Trill`,`Wolf 359`,`Khitomer`,`Deep Space 9`]),Ao=`
uniform vec3 camLocal;
out vec3 vOrigin;
out vec3 vDirection;
void main() {
  vOrigin = camLocal;
  vDirection = position - camLocal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,jo=`
precision highp float;
precision highp sampler3D;
uniform sampler3D lab;
uniform sampler3D edge;
uniform sampler2D pal;
uniform vec3 sizeLy;
uniform vec3 voxels;
uniform float reachLy;
uniform float edgeGain;
uniform int maxSteps;
in vec3 vOrigin;
in vec3 vDirection;
out vec4 color;

vec2 hitBox(vec3 o, vec3 d) {
  vec3 inv = 1.0 / d;
  vec3 t0 = (vec3(-0.5) - o) * inv;
  vec3 t1 = (vec3(0.5) - o) * inv;
  vec3 tmin = min(t0, t1), tmax = max(t0, t1);
  return vec2(max(max(tmin.x, tmin.y), tmin.z), min(min(tmax.x, tmax.y), tmax.z));
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec3 dir = normalize(vDirection);
  vec2 b = hitBox(vOrigin, dir);
  if (b.x >= b.y) discard;
  b.x = max(b.x, 0.0);
  float len = b.y - b.x;
  int n = int(clamp(length(dir * len * voxels) * 1.5, 4.0, float(maxSteps)));
  float dt = len / float(n);
  float dsLy = length(dir * dt * sizeLy);
  vec3 p = vOrigin + dir * (b.x + dt * hash(gl_FragCoord.xy));
  vec3 acc = vec3(0.0);
  float a = 0.0;
  for (int i = 0; i < 768; i++) {
    if (i >= n) break;
    int l = int(texture(lab, p + 0.5).r * 255.0 + 0.5);
    if (l > 0) {
      vec4 c = texelFetch(pal, ivec2(l, 0), 0);
      if (c.a > 0.5) {
        // hladký okraj z interpolované vzdálenosti (štítek je po voxelech), slupka těsně pod hranicí
        float e = texture(edge, p + 0.5).r * reachLy;
        float x = (e - 3.5) / 2.0;
        // bez hranic se zhustí výplň, ať území zůstane vidět
        float fog = 0.0012 * (1.0 + 3.0 * (1.0 - min(edgeGain, 1.0)));
        float s = smoothstep(0.8, 2.2, e) * (fog + edgeGain * 0.035 * exp(-x * x));
        float k = 1.0 - exp(-s * dsLy);
        acc += (1.0 - a) * k * c.rgb;
        a += (1.0 - a) * k;
        if (a > 0.9) break;
      }
    }
    p += dir * dt;
  }
  if (a < 0.002) discard;
  color = vec4(acc, a);
}`,Mo=e=>{let[t,...n]=e.split(`:`);return`https://${t}.fandom.com/wiki/${encodeURIComponent(n.join(`:`).replace(/ /g,`_`))}`},No=class{id=`startrek`;name=`Star Trek (fikce)`;group=new ae;objects=[];filters;facets=[];data;powers=new Map;bubbles;radii=[];centers=[];vis;points;inGrid=[];palette=new $e(new Uint8Array(1024),256,1,w);volume=null;volLoading=!1;edgeGain={value:1};dataBase;sun;constructor(e,t,n,r=``){this.data=e,this.dataBase=r,this.sun=t;let i=document.documentElement.style;if(e.mocnosti.forEach((e,t)=>{this.powers.set(e.id,e),i.setProperty(`--trek-${t}`,e.barva)}),e.soustavy.some(e=>!e.mocnost)){let t={id:`_bez`,nazev:`Bez příslušnosti`,en:`unaffiliated`,barva:`#8a8f99`,kvadrant:`AB`};e.mocnosti.push(t),this.powers.set(t.id,t),i.setProperty(`--trek-${e.mocnosti.length-1}`,t.barva);for(let n of e.soustavy)n.mocnost??=t.id}let a=new Set([...e.soustavy.map(e=>e.mocnost),...e.vzdalene.map(e=>e.mocnost)]);this.filters=e.mocnosti.filter(e=>a.has(e.id)).map(t=>({key:t.id,name:t.nazev,color:`--trek-${e.mocnosti.indexOf(t)}`,on:!1}));let o=([e,n,r])=>new W(t.x+e*Y,t.y+r*Y,t.z-n*Y),s=[];for(let n of e.soustavy){let r=o(n.xyz),i=n.mocnost?this.powers.get(n.mocnost)??null:null,a={layer:this.id,index:this.objects.length,name:n.jmeno,pos:r,anchor:r,distLy:r.distanceTo(t),color:i?`var(--trek-${e.mocnosti.indexOf(i)})`:`var(--dim)`,hidden:!0,major:ko.has(n.jmeno),aliases:[i?.en??``,`Star Trek`],power:i,sys:n,inst:s.length};this.objects.push(a),s.push({pos:r,r:Oo,color:new V(i?.barva??`#888`),obj:a});let c=e.uzemi;this.inGrid.push(!!c&&!!i&&i.id!==`_bez`&&n.xyz.every((e,t)=>Math.abs(e*3.261563777)+c.dosah_ly<=c.polo_ly[t]))}for(let n of e.vzdalene){let r=o(n.xyz),i=this.powers.get(n.mocnost)??null,a={layer:this.id,index:this.objects.length,name:`Oblast: ${i?.nazev??n.mocnost}`,pos:r,anchor:r,distLy:r.distanceTo(t),color:i?`var(--trek-${e.mocnosti.indexOf(i)})`:`var(--dim)`,hidden:!0,major:!0,aliases:[i?.en??``,`Star Trek`],power:i,far:n,inst:s.length};this.objects.push(a),s.push({pos:r,r:n.polomer_ly,color:new V(i?.barva??`#888`),obj:a}),this.inGrid.push(!1)}let c=this.palette.image.data;e.mocnosti.forEach((e,t)=>{let n=new V(e.barva);c.set([n.r*255,n.g*255,n.b*255,0],(t+1)*4)}),this.palette.minFilter=this.palette.magFilter=fe;let l=new C(1,24,16),u=new ct({vertexShader:`
        attribute vec3 tint; varying vec3 vCol; varying float vRim;
        void main(){ vCol = tint;
          vec4 mv = modelViewMatrix * instanceMatrix * vec4(position, 1.);
          vec3 n = normalize(normalMatrix * mat3(instanceMatrix) * normal);
          vRim = 1. - abs(dot(n, normalize(-mv.xyz)));
          gl_Position = projectionMatrix * mv; }`,fragmentShader:`
        varying vec3 vCol; varying float vRim;
        void main(){ gl_FragColor = vec4(vCol, 0.05 + pow(vRim, 2.5) * 0.25); }`,transparent:!0,depthWrite:!1,blending:2});this.bubbles=new me(l,u,s.length);let d=new Float32Array(s.length*3);s.forEach((e,t)=>{this.radii.push(e.r),this.centers.push(e.pos),d.set([e.color.r,e.color.g,e.color.b],t*3)}),l.setAttribute(`tint`,new T(d,3)),this.bubbles.frustumCulled=!1,this.bubbles.renderOrder=-1,this.group.add(this.bubbles);let f=new B;f.setAttribute(`position`,new F(new Float32Array(s.flatMap(e=>e.pos.toArray())),3)),f.setAttribute(`color`,new F(d.slice(),3)),this.vis=new F(new Float32Array(s.length),1),f.setAttribute(`vis`,this.vis),this.points=new S(f,new ct({uniforms:{map:{value:n},pr:{value:Math.min(devicePixelRatio,2)}},vertexShader:`
        uniform float pr; attribute float vis; attribute vec3 color; varying vec3 vCol;
        void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
          gl_PointSize = vis > .5 ? clamp(900. / -mv.z, 2.5, 8.) * pr : 0.;
          gl_Position = vis > .5 ? projectionMatrix * mv : vec4(2., 2., 2., 1.); }`,fragmentShader:`
        uniform sampler2D map; varying vec3 vCol;
        void main(){ float a = texture2D(map, gl_PointCoord).a; gl_FragColor = vec4(mix(vCol, vec3(1.), .35), a); }`,transparent:!0,depthWrite:!1,blending:2})),this.points.frustumCulled=!1,this.group.add(this.points),this.refresh()}setFilter(e,t){let n=this.filters.find(t=>t.key===e);n&&(n.on=t),this.refresh()}setAll(e){for(let t of this.filters)t.on=e;this.refresh()}get anyOn(){return this.filters.some(e=>e.on)}legendExtra(){if(!this.data.uzemi)return null;let e=document.createElement(`label`);e.className=`armGain trekEdge`,e.title=`Jak výrazně kreslit hranice území (vlevo jen mlha, vpravo ostré okraje)`,e.innerHTML=`Hranice <input type="range" min="0" max="2" step="0.05" aria-label="Síla hranic území Star Treku"><span></span>`;let t=e.querySelector(`input`),n=e.querySelector(`span`),r=e=>{this.edgeGain.value=e,t.value=String(e),n.textContent=e===0?`vyp`:`${Math.round(e*100)} %`},i=1;try{let e=parseFloat(localStorage.getItem(`galaxie.trekEdge`)??``);e>=0&&e<=2&&(i=e)}catch{}return r(i),t.addEventListener(`input`,()=>{r(parseFloat(t.value));try{localStorage.setItem(`galaxie.trekEdge`,t.value)}catch{}}),e}powerColor(e){return this.powers.get(e)?.barva??null}reveal(e){let t=this.objects[e];return t?(t.power&&this.setFilter(t.power.id,!0),t):null}applyFilter(){}refresh(){let e=new Set(this.filters.filter(e=>e.on).map(e=>e.key)),t=new je,n=this.vis.array,r=!!this.volume;for(let i of this.objects){let a=!!i.power&&e.has(i.power.id);i.hidden=!a;let o=a&&i.power.id!==`_bez`&&!(r&&this.inGrid[i.inst])?this.radii[i.inst]:0;t.makeScale(o,o,o).setPosition(this.centers[i.inst]),this.bubbles.setMatrixAt(i.inst,t),n[i.inst]=+!!a}this.bubbles.instanceMatrix.needsUpdate=!0,this.vis.needsUpdate=!0,this.group.visible=e.size>0;let i=this.palette.image.data;this.data.mocnosti.forEach((t,n)=>{i[(n+1)*4+3]=e.has(t.id)?255:0}),this.palette.needsUpdate=!0,e.size&&!this.volume&&!this.volLoading&&this.data.uzemi&&this.loadVolume(this.data.uzemi)}async loadVolume(e){this.volLoading=!0;try{let t=await wt(this.dataBase+e.soubor),n=e.nx*e.ny*e.nz;if(t.length!==2*n)throw Error(`startrek-uzemi: ${t.length} B místo ${2*n}`);let r=(t,n)=>{let r=new se(t,e.nx,e.ny,e.nz);return r.format=m,r.minFilter=r.magFilter=n,r.unpackAlignment=1,r.needsUpdate=!0,r},i=new W(e.nx,e.ny,e.nz).multiplyScalar(e.krok_ly),a=new ct({glslVersion:A,vertexShader:Ao,fragmentShader:jo,uniforms:{lab:{value:r(t.subarray(0,n),fe)},edge:{value:r(t.subarray(n),be)},pal:{value:this.palette},camLocal:{value:new W},sizeLy:{value:i},voxels:{value:new W(e.nx,e.ny,e.nz)},reachLy:{value:e.dosah_ly},edgeGain:this.edgeGain,maxSteps:{value:matchMedia(`(pointer: coarse)`).matches?160:320}},side:1,transparent:!0,premultipliedAlpha:!0,depthWrite:!1,depthTest:!1}),o=new ye(new Ge(1,1,1),a);o.rotation.x=-Math.PI/2,o.scale.copy(i),o.position.copy(this.sun),o.frustumCulled=!1,o.renderOrder=-1;let s=new je;o.onBeforeRender=(e,t,n)=>{o.updateMatrixWorld(),s.copy(o.matrixWorld).invert(),a.uniforms.camLocal.value.copy(n.position).applyMatrix4(s)},this.volume=o,this.group.add(o),this.refresh()}catch(e){console.error(e)}finally{this.volLoading=!1}}labelCandidates(e){if(!this.group.visible)return[];let t=e.viewDistance<250;return this.objects.filter(e=>!e.hidden&&(e.far||e.major||t))}kindName(e){return`Star Trek (fikce) – ${e.power?.nazev??`bez příslušnosti`}`}radiusLy(e){return e.far?.polomer_ly??null}flyDistance(e){let t=e;return t.far?t.far.polomer_ly*3:90}cardHtml(e){let t=e,n=t.power,r=(t.sys?.zdroje??[]).map(e=>`<a href="${Mo(e)}" target="_blank" rel="noopener">${J(e.replace(`memory-alpha:`,`Memory Alpha: `).replace(`memory-beta:`,`Memory Beta: `))} ↗</a>`).join(`<br>`),i=``;t.far?i=`Schematická oblast (poloměr ${q(t.far.polomer_ly)}). ${J(t.far.zdroj)}.`:t.sys?.jak===`hvezda`?i=`Skutečná hvězda – poloha z reálného katalogu (${J(t.sys.simbad??``)}); ${J(t.sys.proc)}.`:t.sys&&(i=`Fiktivní soustava – poloha <b>vypočtená</b> z údajů na wiki (${J(t.sys.proc)}). Směr je odhad.`);let a=t.distLy==null?`–`:`${q(t.distLy)} · ${gt(t.distLy)}`;return`<div class="kind" style="color:${J(n?.barva??`#aaa`)}">Star Trek · fikce · ${J(n?.nazev??`bez příslušnosti`)}</div>
      <h3>${J(t.name)}</h3>
      <p class="warn">Fanouškovská vrstva – neoficiální extrapolace, ne kánon ani oficiální mapa.</p>
      <dl>
        <dt>Mocnost</dt><dd>${J(n?.nazev??`–`)}${n?.en&&n.en!==n.nazev?` <span class="dim">(${J(n.en)})</span>`:``}</dd>
        <dt>Od Slunce</dt><dd>${a}</dd>
        ${t.sys?.kvadrant?`<dt>Kvadrant</dt><dd>${J(t.sys.kvadrant)}</dd>`:``}
        ${t.sys?.era?`<dt>Příslušnost k roku</dt><dd>${J(t.sys.era)}</dd>`:``}
        <dt>Poloha</dt><dd>${i}</dd>
        ${n?.bez_polohy?`<dt>Bez polohy</dt><dd>dalších ${n.bez_polohy} soustav této mocnosti na wiki nemá žádný údaj o vzdálenosti</dd>`:``}
      </dl>
      ${r?`<p>${r}</p>`:``}
      ${t.sys?`<p><button class="btn small" data-trekcat="${J(t.name)}">Hvězdy a planety v katalogu</button></p>`:``}
      <div class="src">${J(this.data.upozorneni)} Zdroje: Memory Alpha (CC BY-NC) a Memory Beta (CC BY-SA), staženo
        ${J(this.data.stazeno.slice(0,10))}; ${this.data.statistika.stranek} stránek, ${this.data.statistika.skutecne_hvezdy}
        skutečných hvězd, ${this.data.statistika.vypocet} vypočtených poloh. Star Trek je ochranná známka Paramount; tahle vrstva s ním není spojená.</div>`}},Po=[{id:`3kpc`,name:`Rameno 3 kpc`,betaKink:15,psiLow:-4.2,psiHigh:-4.2,rKink:3.52,betaMin:15,betaMax:18,extMin:5,extMax:119,width:.18},{id:`nor`,name:`Rameno Pravítka (Norma)`,betaKink:18,psiLow:-1,psiHigh:19.5,rKink:4.46,betaMin:5,betaMax:54,extMin:2,extMax:54,width:.14},{id:`sct`,name:`Rameno Štítu–Kentaura`,betaKink:23,psiLow:14.1,psiHigh:12.1,rKink:4.91,betaMin:0,betaMax:104,extMin:-29,extMax:168,width:.23},{id:`sgr`,name:`Rameno Střelce–Kýlu`,betaKink:24,psiLow:17.1,psiHigh:1,rKink:6.04,betaMin:2,betaMax:97,extMin:-2,extMax:97,width:.27},{id:`loc`,name:`Místní rameno (Orionu)`,betaKink:9,psiLow:11.4,psiHigh:11.4,rKink:8.26,betaMin:-8,betaMax:34,extMin:-8,extMax:34,width:.31},{id:`per`,name:`Rameno Persea`,betaKink:40,psiLow:10.3,psiHigh:8.7,rKink:8.87,betaMin:-23,betaMax:115,extMin:-23,extMax:115,width:.35},{id:`out`,name:`Vnější rameno`,betaKink:18,psiLow:3,psiHigh:9.4,rKink:12.24,betaMin:-16,betaMax:71,extMin:-16,extMax:71,width:.65}],Fo=Math.PI/180;function Io(e,t){let n=t<e.betaKink?e.psiLow:e.psiHigh;return e.rKink*Math.exp(-(t-e.betaKink)*Fo*Math.tan(n*Fo))}function Lo(e,t,n){return[-e*Math.cos(t*Fo)*n,-e*Math.sin(t*Fo)*n]}var Ro=43700,zo=1.5;function Bo(e){let t=7,n=()=>(t=t*16807%2147483647,(t-1)/2147483646),r=()=>{let e=0;for(;!e;)e=n();let t=n();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*t)},i=matchMedia(`(max-width:760px)`).matches?6e4:11e4,a=new Float32Array(i*3),o=new Float32Array(i*3),s=new Float32Array(i),c=new Float32Array(i),l=new V(`#ffd9a0`),u=new V(`#a9c4ff`),d=new V(`#e8ecff`),f=new V(`#ff9fc8`),p=27*Math.PI/180,m=new V,h=Y*1e3,g=[],_=0;for(let e of Po)for(let t=e.extMin;t<e.extMax;t++)_+=Io(e,t+.5)*(Math.PI/180),g.push({arm:e,beta:t,cum:_});let v=e=>{let t=0,n=g.length-1;for(;t<n;){let r=t+n>>1;g[r].cum<e?t=r+1:n=r}return g[t]};for(let e=0;e<i;e++){let t,i,g,y,b=n();if(b<.18){let e=r()*9e3,a=r()*3500,o=r()*2200;t=e*Math.cos(p)-a*Math.sin(p),g=e*Math.sin(p)+a*Math.cos(p),i=o,m.copy(l).lerp(d,n()*.3),y=1.2}else if(b<.74){let a=v(n()*_),o=a.beta+n(),s=Io(a.arm,o),l=a.arm.width/2*(s/a.arm.rKink);[t,g]=Lo(s+r()*l,o,h);let p=r()*l*h*.5;t+=p*Math.sin(o*Math.PI/180),g-=p*Math.cos(o*Math.PI/180),i=r()*(150+s*h*.003),m.copy(u).lerp(d,n()*.6),n()<.05&&m.copy(f),(o<a.arm.betaMin||o>a.arm.betaMax)&&m.multiplyScalar(.45),y=.9,c[e]=1}else{let e=Math.sqrt(n())*49700,a=n()*Math.PI*2;t=Math.cos(a)*e,g=Math.sin(a)*e,i=r()*350,m.copy(d).lerp(l,n()*.4).multiplyScalar(.55),y=.7}a[e*3]=t,a[e*3+1]=i,a[e*3+2]=g,o[e*3]=m.r,o[e*3+1]=m.g,o[e*3+2]=m.b,s[e]=y}let y=new B;y.setAttribute(`position`,new F(a,3)),y.setAttribute(`color`,new F(o,3)),y.setAttribute(`sz`,new F(s,1)),y.setAttribute(`arm`,new F(c,1));let b=new ct({uniforms:{map:{value:e},armGain:{value:1},lyPerUnit:{value:1}},vertexShader:`
      attribute float sz; attribute float arm; uniform float armGain; uniform float lyPerUnit; varying vec3 vC;
      void main(){ float g = mix(1., armGain, arm); vC = color * g;
        vec4 mv = modelViewMatrix * vec4(position, 1.);
        float ps = clamp(sz * 260. / (-mv.z * lyPerUnit), 1., 5.) * mix(1., clamp(.75 + .25 * armGain, .75, 2.4), arm);
        gl_PointSize = g <= 0. ? 0. : ps; gl_Position = projectionMatrix * mv; }`,fragmentShader:`
      uniform sampler2D map; varying vec3 vC;
      void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC * .55, t.a * .8); }`,vertexColors:!0,transparent:!0,depthWrite:!1,blending:2}),x=new S(y,b);return x.frustumCulled=!1,x}var Vo=new W(0,1,0);function Ho(e,t,n,r,i,a=160,o=!1){let s=[],c=n.clone().normalize(),l=Math.abs(c.y)<.99?new W(0,1,0):new W(1,0,0),u=new W().crossVectors(c,l).normalize(),d=new W().crossVectors(c,u);for(let n=0;n<=a;n++){let r=n/a*Math.PI*2;s.push(e.clone().addScaledVector(u,Math.cos(r)*t).addScaledVector(d,Math.sin(r)*t))}let f=new B().setFromPoints(s),p=o?new H({color:r,transparent:!0,opacity:i,dashSize:t*.03,gapSize:t*.02,depthWrite:!1}):new Je({color:r,transparent:!0,opacity:i,depthWrite:!1}),m=new Oe(f,p);return o&&m.computeLineDistances(),m}function Uo(e,t,n,r,i=!1){let a=new B().setFromPoints([e,t]),o=e.distanceTo(t),s=i?new H({color:n,transparent:!0,opacity:r,dashSize:o*.01,gapSize:o*.0075,depthWrite:!1}):new Je({color:n,transparent:!0,opacity:r,depthWrite:!1}),c=new Oe(a,s);return i&&c.computeLineDistances(),c}function Wo(e,t,n){let r=new O(new ge({map:e.glow,color:t,transparent:!0,depthWrite:!1,blending:2}));return r.scale.set(n,n,1),r}var Go=class{groups={rings:new ae,ecl:new ae,dims:new ae,grid:new ae};show={rings:!0,ecl:!0,dims:!0,grid:!0};sunLabel;constructor(e,t,n,r){let{scene:i}=e,a=t.sun;Object.values(this.groups).forEach(e=>i.add(e)),this.groups.grid.quaternion.copy(lt.q),this.groups.dims.quaternion.copy(lt.q);for(let e=1e4;e<=5e4;e+=1e4)this.groups.grid.add(Ho(new W,e,Vo,3885680,.35,200));for(let e=0;e<12;e++){let t=e/12*Math.PI*2;this.groups.grid.add(Uo(new W(Math.cos(t)*2e3,0,Math.sin(t)*2e3),new W(Math.cos(t)*5e4,0,Math.sin(t)*5e4),3885680,.18))}[10,50,100,500,1e3,5e3,1e4,2e4,4e4].forEach(t=>{this.groups.rings.add(Ho(a,t,Vo,9417983,.35,180,!0)),n.add(`${q(t)} · ${gt(t)}`,a.clone().add(new W(0,0,t)),`ring`,()=>{let n=e.viewDistance;return this.show.rings&&t>n*.08&&t<n*1.6},100)}),[0,90,180,270].forEach(t=>{let r=mt.dir(t,0);this.groups.rings.add(Uo(a.clone().addScaledVector(r,300),a.clone().addScaledVector(r,5200),9417983,.3)),n.add(`l = ${t}°`,a.clone().addScaledVector(r,5800),`anno`,()=>this.show.rings&&e.viewDistance>6e3)});let o=mt.dir(96.385,29.806),s=this.groups.ecl;s.position.copy(a);let c=new ye(new ke(1,96),new Qe({color:r(`--ecl`),transparent:!0,opacity:.07,side:2,depthWrite:!1}));c.quaternion.setFromUnitVectors(new W(0,0,1),o),s.add(c,Ho(new W,1,o,r(`--ecl`),.8),Uo(new W,o.clone().multiplyScalar(.9),r(`--ecl`),.7));let l=()=>this.show.ecl&&e.camera.position.distanceTo(a)<3e4,u=n.add(`Rovina ekliptiky · sklon 60,2° ke galaktické rovině`,new W,`ecl`,l),d=n.add(`sev. pól ekliptiky`,new W,`ecl`,l);e.onFrame(()=>{let t=Math.min(2e3,Math.max(.05,e.camera.position.distanceTo(a)*.12));s.scale.setScalar(t),u.pos.copy(a).addScaledVector(o,-.3*t).add(new W(0,-.55*t,0)),d.pos.copy(a).addScaledVector(o,1*t)});let f=this.groups.dims,p=10135752,m=-Ro-3e3;f.add(Uo(new W(-Ro,0,m),new W(Ro,0,m),p,.7)),f.add(Uo(new W(-Ro,0,m-1200),new W(-Ro,0,m+1200),p,.7)),f.add(Uo(new W(Ro,0,m-1200),new W(Ro,0,m+1200),p,.7));let h=()=>this.show.dims&&e.viewDistance>2e4;n.add(`průměr disku D25 ≈ 87 400 ly · 26,8 kpc`,lt.toScene(new W(0,0,m-2500)),`anno`,h);let g=Ro+4e3,_=300*Y,v=900*Y;f.add(Uo(new W(g,-_,0),new W(g,_,0),13621503,.9)),[-_,_].forEach(e=>f.add(Uo(new W(g-600,e,0),new W(g+600,e,0),13621503,.9))),f.add(Uo(new W(g+2500,-v,0),new W(g+2500,v,0),p,.5,!0)),[-v,v].forEach(e=>f.add(Uo(new W(g+1900,e,0),new W(g+3100,e,0),p,.5)));let y=()=>h()&&Math.abs(e.camera.position.clone().sub(e.controls.target).normalize().y)<.5;n.add(`tenký disk: škálová výška ± 300 pc (≈ 980 ly)`,lt.toScene(new W(g,_+900,0)),`anno`,y),n.add(`tlustý disk: škálová výška ± 900 pc (≈ 2 900 ly)`,lt.toScene(new W(g+2500,v+900,0)),`anno`,y),n.add(`ramena: model Reid et al. 2019`,lt.toScene(new W(Ro*.55,0,Ro*.62)),`anno`,h);let b=Wo(e,r(`--sun`),1);b.position.copy(a),i.add(b),this.sunLabel=n.add(`Slunce`,a,`sun`,()=>!0,900),e.onFrame(()=>b.scale.setScalar(e.camera.position.distanceTo(a)*.02))}toggle(e){return this.show[e]=!this.show[e],this.groups[e].visible=this.show[e],this.show[e]}},Ko={dist:null,checks:{},ranges:{}};function qo(e,t){return!t.dist||e.distLy!=null&&e.distLy>=t.dist[0]&&e.distLy<=t.dist[1]}var Jo={rtg:{name:`Rentgenová dvojhvězda`,c:`--rtg`},spici:{name:`Spící (průvodce)`,c:`--spici`},cocka:{name:`Mikročočka, osamělá`,c:`--cocka`},imbh:{name:`Střední hmotnosti`,c:`--imbh`},smbh:{name:`Supermasivní (centrum)`,c:`--smbh`},kandidat:{name:`Kandidát (rentgenový tranzient)`,c:`--bhkand`},gaiakand:{name:`Kandidát z Gaia (spící, nepotvrzený)`,c:`--bhgaia`}},Yo={wiki:`Poloha: souřadnice RA/Dec z Wikipedie, ověřeno proti SIMBADu.`,simbad:`Poloha: SIMBAD (CDS), optický nebo rentgenový protějšek.`,kupa:`Poloha: střed kulové hvězdokupy NGC 3201 (hvězda sama v SIMBADu vedená není).`,blackcat:`Poloha a vzdálenost: katalog BlackCAT (Corral-Santana et al. 2016, A&A 587, A61; stav 2016, přes CDS/VizieR).`,blackcatweb:`Poloha a vzdálenost: aktuální web katalogu BlackCAT (astro.puc.cl/BlackCAT; Corral-Santana et al. 2016), staženo 10. 10. 2026.`,gaiabh:`Poloha a vzdálenost (1 / paralaxa, rozsah z ±1σ): Gaia DR3. Hmotnost průvodce a perioda: Müller-Horn et al. 2026, A&A 709, A62 (Zenodo, CC BY 4.0) – model ze souhrnných statistik Gaia, výběr hmotnost nad 3 M☉ a příznak kvality.`},Xo=12e3,Zo=4e4,Qo=new Set([`Gaia BH1`,`Gaia BH3`,`Cygnus X-1`,`GRS 1915+105`,`Sagittarius A*`,`Omega Centauri (IMBH)`,`A0620-00 (V616 Mon)`,`V404 Cygni`]),$o=new W(0,1,0),es=class{id=`cerne-diry`;name=`Černé díry`;group=new ae;objects=[];filters=Object.entries(Jo).map(([e,t])=>({key:e,name:t.name,color:t.c,on:!0}));facets=[];filter=Ko;ray=null;frame;css;constructor(e,t,n,r){this.frame=t,this.css=r;let i=e.objekty;for(let e=0;e<i.jmeno.length;e++){let a=i.t[e],o=new V(r(Jo[a].c)),s=i.d[e],c=mt.dir(i.l[e],i.b[e]),l=s==null?null:t.toScene(i.l[e],i.b[e],s),u=l??t.sun.clone().addScaledVector(c,Xo),d=[],f=[],p=.5*(a===`smbh`?900:a===`imbh`?520:160+Math.log10(i.m[e]+1)*170),m;if(l){m=Wo(n,o,p),m.position.copy(l);let e=new ye(new C(p*.09,12,12),new Qe({color:0}));e.position.copy(l);let t=new W(l.x,0,l.z);d.push(m,e),f.push(Uo(l,t,o,.45),Ho(t,90,$o,o,.6,24)),f.forEach(e=>e.visible=!1)}[...d,...f].forEach(e=>this.group.add(e)),this.objects.push({layer:this.id,index:e,name:i.jmeno[e],pos:l,anchor:u,distLy:s==null?null:s*Y,color:`var(${Jo[a].c})`,major:Qo.has(i.jmeno[e]),listOnly:!l,t:a,l:i.l[e],b:i.b[e],dl:i.dl[e],ml:i.ml[e],m:i.m[e],s:i.s[e],no:i.no[e],src:i.src[e],parts:d,spr:m,base:p,drop:f})}}setFilter(e,t){let n=this.filters.find(t=>t.key===e);n&&(n.on=t),this.refresh()}applyFilter(e){this.filter=e,this.refresh()}refresh(){for(let e of this.objects){let t=this.filters.find(t=>t.key===e.t).on&&qo(e,this.filter);e.hidden=!t,e.parts.forEach(e=>e.visible=t)}this.showDrop()}sel=null;showDrop(){for(let e of this.objects){let t=e===this.sel&&!e.hidden;e.drop.forEach(e=>e.visible=t)}}gaiaLabels=!1;labelCandidates(e){let t=e.viewDistance,n=e.camera.position,r=e=>t<3e4&&n.distanceTo(e.anchor)<t*1.1;return this.objects.filter(e=>!e.hidden&&e.pos&&(e.t!==`gaiakand`||this.gaiaLabels)&&(e.major||r(e))).sort((e,t)=>Number(!!t.major)-Number(!!e.major)||n.distanceTo(e.anchor)-n.distanceTo(t.anchor))}flyDistance(e){return e.pos?e.t===`smbh`?9e3:3500:9e3}onSelect(e){if(this.ray&&=(this.group.remove(this.ray),this.ray.geometry.dispose(),null),this.sel=e?.layer===this.id?e:null,this.showDrop(),!e||e.layer!==this.id||e.pos)return;let t=e,n=mt.dir(t.l,t.b);this.ray=Uo(this.frame.sun,this.frame.sun.clone().addScaledVector(n,Zo),this.css(Jo[t.t].c),.6,!0),this.group.add(this.ray)}update(e){for(let t of this.objects){if(!t.spr||!t.pos)continue;let n=e.camera.position.distanceTo(t.pos),r=Math.max(t.base,n*.006*(t.t===`smbh`?2:1));t.spr.scale.set(r,r,1)}}skyPos(e){let t=e;return{l:t.l,b:t.b,fovDeg:.15}}kindName(e){let t=Jo[e.t].name;return`Černá díra, ${t[0].toLowerCase()}${t.slice(1)}`}cardHtml(e){let t=e,n=Jo[t.t];return`<div class="kind" style="color:var(${n.c})">Černá díra · ${n.name}</div>
      <h3>${J(t.name)}</h3>
      <dl>
        <dt>Od Slunce</dt><dd>${t.distLy?`${ts(t.dl)}<br>${gt(t.distLy)}`:`neznámá (na mapě jen směr)`}</dd>
        <dt>Hmotnost</dt><dd>${t.m>0?`${t.ml} M☉`:J(t.ml)}</dd>
        <dt>Status</dt><dd>${t.s}</dd>
        ${Na(t.pos,t.l,t.b,t.distLy)}
      </dl>
      <p>${J(t.no)}</p>
      <div class="src">${Yo[t.src]??``}</div>`}};function ts(e){if(!/\d/.test(e.split(` (`)[0]))return e;let t=e.indexOf(` (`);return t<0?`${e} ly`:`${e.slice(0,t)} ly${e.slice(t)}`}var ns=class{root;pos;leaf;constructor(e,t,n=16){this.pos=t,this.leaf=n;let r=new He;for(let n of e)r.expandByPoint(t(n));let i=r.getCenter(new W),a=Math.max(...r.getSize(new W).toArray(),1)/2+1;this.root=this.build(e,new He(i.clone().subScalar(a),i.clone().addScalar(a)),0)}build(e,t,n){if(e.length<=this.leaf||n>=16)return{box:t,items:e,kids:null};let r=t.getCenter(new W),i=[[],[],[],[],[],[],[],[]];for(let t of e){let e=this.pos(t);i[+(e.x>=r.x)|(e.y>=r.y?2:0)|(e.z>=r.z?4:0)].push(t)}let a=[];return i.forEach((e,i)=>{if(!e.length)return;let o=new W(i&1?r.x:t.min.x,i&2?r.y:t.min.y,i&4?r.z:t.min.z),s=new W(i&1?t.max.x:r.x,i&2?t.max.y:r.y,i&4?t.max.z:r.z);a.push(this.build(e,new He(o,s),n+1))}),{box:t,items:null,kids:a}}queryRadius(e,t,n=[]){let r=t*t,i=[this.root];for(;i.length;){let a=i.pop();if(!(a.box.distanceToPoint(e)>t)){if(a.items)for(let t of a.items)this.pos(t).distanceToSquared(e)<=r&&n.push(t);else i.push(...a.kids)}}return n}},rs=2e3,is=new class{value=0;ls=[];get t(){return this.value}set(e){let t=Math.max(-2e3,Math.min(rs,e));if(t!==this.value){this.value=t;for(let e of this.ls)e(t)}}on(e){this.ls.push(e)}};function as(e){if(Math.abs(e)<5e-4)return`dnes`;let t=Math.abs(e),n=t<1?`${Math.round(t*1e3).toLocaleString(`cs-CZ`)} tis. let`:t<1e3?`${t.toLocaleString(`cs-CZ`,{maximumFractionDigits:t<10?2:+(t<100)})} mil. let`:`${(t/1e3).toLocaleString(`cs-CZ`,{maximumFractionDigits:2})} mld. let`;return e>0?`za ${n}`:`před ${n}`}var os=24,ss=3e3,cs=4e4,ls=class{id;name;group=new ae;objects=[];filters;facets;filter=Ko;vis;tree;majors;nearby=[];frameNo=0;tmp=new W;ray=null;posAttr=null;base=new Map;vel=new Map;epi=null;epiOut=null;time=0;data;meta;frame;css;constructor(e,t,n,r,i){this.data=e,this.meta=t,this.frame=n,this.css=i,this.id=e.katalog,this.name=t.nazev.split(` (`)[0],this.filters=e.typy.map(e=>({key:e.id,name:e.nazev,color:e.barva,on:!0}));let a=e.objekty;this.facets=e.fasety.map(e=>{let t=Array(e.moznosti.length).fill(0);return a.x[e.k].forEach(e=>typeof e==`number`&&t[e]++),{kind:`checks`,id:e.id,name:e.nazev,options:e.moznosti.map((e,n)=>({value:n,label:e,count:t[n]})).filter(e=>e.count>0)}});let o=[],s=[],c=[],l=e.typy.map(e=>new V(i(e.barva)));for(let t=0;t<a.jmeno.length;t++){let r=a.d[t],i=r==null?null:n.toScene(a.l[t],a.b[t],r),u=i?o.length/3:-1;if(i){o.push(i.x,i.y,i.z);let e=l[a.typ[t]];s.push(e.r,e.g,e.b),c.push(a.vyzn[t]?1.4:1)}let d=e.typy[a.typ[t]];this.objects.push({layer:this.id,index:t,name:a.jmeno[t],pos:i,anchor:i??n.sun.clone().addScaledVector(mt.dir(a.l[t],a.b[t]),ss),distLy:r==null?null:r*Y,color:`var(${d.barva})`,aliases:a.alias[t]?.split(`; `),major:!!a.vyzn[t],listOnly:!i,typ:a.typ[t],point:u})}this.tree=new ns(this.objects.filter(e=>e.pos),e=>e.pos),this.majors=this.objects.filter(e=>e.major&&e.pos);let u=new B;this.posAttr=new F(new Float32Array(o),3),u.setAttribute(`position`,this.posAttr);let d=a.x.vx,f=a.x.vy,p=a.x.vz;if(d&&f&&p)for(let e of this.objects){let t=d[e.index],n=f[e.index],r=p[e.index];e.pos&&typeof t==`number`&&typeof n==`number`&&typeof r==`number`&&(this.base.set(e,e.pos.clone()),this.vel.set(e,new W(t,r,-n).multiplyScalar(Y)))}u.setAttribute(`color`,new F(new Float32Array(s),3)),u.setAttribute(`size`,new F(new Float32Array(c),1)),this.vis=new F(new Float32Array(o.length/3).fill(1),1),u.setAttribute(`vis`,this.vis);let m=new ct({uniforms:{map:{value:r},pr:{value:Math.min(devicePixelRatio,2)}},vertexShader:`
        uniform float pr; attribute float vis; attribute float size; attribute vec3 color; varying vec3 vCol;
        void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
          gl_PointSize = vis > .5 ? clamp(2000. / -mv.z, 3.5, 11.) * size * pr : 0.;
          gl_Position = vis > .5 ? projectionMatrix * mv : vec4(2., 2., 2., 1.); }`,fragmentShader:`
        uniform sampler2D map; varying vec3 vCol;
        void main(){
          float r = length(gl_PointCoord - .5);
          float core = 1. - smoothstep(.12, .24, r);
          float a = max(texture2D(map, gl_PointCoord).a * .7, core);
          gl_FragColor = vec4(mix(vCol, vec3(1.), core * .4), a); }`,transparent:!0,depthWrite:!1,blending:2}),h=new S(u,m);h.frustumCulled=!1,this.group.add(h)}setTime(e){if(!this.vel.size||!this.posAttr)return;this.time=e;let t=this.posAttr.array,n=[...this.vel.keys()];if(!this.epi){let e=this.frame.sun,t=[],r=[];for(let i of n){let n=this.base.get(i),a=this.vel.get(i);t.push(n.x-e.x,n.y-e.y,n.z-e.z),r.push(a.x,a.y,a.z)}this.epi=new Ta(t,r,e),this.epiOut=new Float32Array(t.length)}let r=this.epiOut;e===0?n.forEach((e,t)=>this.base.get(e).clone().sub(this.frame.sun).toArray(r,3*t)):this.epi.eval(e,r),n.forEach((e,n)=>{e.pos.fromArray(r,3*n).add(this.frame.sun),t[3*e.point]=e.pos.x,t[3*e.point+1]=e.pos.y,t[3*e.point+2]=e.pos.z}),this.posAttr.needsUpdate=!0,this.tree=new ns(this.objects.filter(e=>e.pos),e=>e.pos)}setFilter(e,t){let n=this.filters.find(t=>t.key===e);n&&(n.on=t),this.refresh()}applyFilter(e){this.filter=e,this.refresh()}refresh(){let e=this.data.objekty.x,t=this.data.fasety.map(e=>[e.k,this.filter.checks[e.id]]).filter(([,e])=>e),n=this.vis.array;for(let r of this.objects){let i=this.filters[r.typ].on&&qo(r,this.filter);for(let[n,a]of t){let t=e[n][r.index];typeof t==`number`&&a.includes(t)||(i=!1)}r.hidden=!i,r.point>=0&&(n[r.point]=+!!i)}this.vis.needsUpdate=!0}update(e){if(this.frameNo++%8)return;this.nearby=[];let t=e.viewDistance;if(t>8e3)return;let n=e.camera.position,r=[];for(let i of this.tree.queryRadius(n,t*1.3))i.hidden||(this.tmp.copy(i.pos).project(e.camera),this.tmp.z>1||Math.abs(this.tmp.x)>1||Math.abs(this.tmp.y)>1||r.push([n.distanceTo(i.pos),i]));r.sort((e,t)=>e[0]-t[0]),this.nearby=r.slice(0,os).map(([,e])=>e)}labelCandidates(e){let t=e.viewDistance,n=e.camera.position;return[...t>25e3?[]:this.majors.filter(e=>!e.hidden&&n.distanceTo(e.pos)<t*1.2),...this.nearby]}onSelect(e){if(this.ray&&=(this.group.remove(this.ray),this.ray.geometry.dispose(),null),!e||e.layer!==this.id||e.pos)return;let t=this.data.objekty,n=mt.dir(t.l[e.index],t.b[e.index]),r=this.css(this.data.typy[e.typ].barva);this.ray=Uo(this.frame.sun,this.frame.sun.clone().addScaledVector(n,cs),r,.6,!0),this.group.add(this.ray)}radiusLy(e){let t=this.data.objekty.x,n=t.r?.[e.index],r=t.velikost?.[e.index];return typeof n==`number`&&n>0?n*Y:typeof r==`number`&&r>0?r/2*Y:null}flyDistance(e){return e.pos?Math.max(30,Math.min(4e3,(e.distLy??100)*.35)):9e3}skyPos(e){let t=this.data.objekty,n=e.index,r=t.x,i=e=>Math.max(.08,Math.min(3,e)),a=r.prumer?.[n];if(typeof a==`number`&&a>0)return{l:t.l[n],b:t.b[n],fovDeg:i(a/60*1.6)};let o=r.r?.[n],s=t.d[n];return typeof o==`number`&&s?{l:t.l[n],b:t.b[n],fovDeg:i(2*Math.atan(o/s)*180/Math.PI*4)}:{l:t.l[n],b:t.b[n],fovDeg:this.id===`neutronove-hvezdy`?.2:.5}}kindName(e){return this.data.typy[e.typ].nazev}motionRows(e){let t=this.vel.get(e);if(!t)return``;let n=t.length()/Y/1.0227121650537077,r=this.data.objekty.x.rvz?.[e.index]===1,i=this.time?`<dt>${J(as(this.time).replace(/^./,e=>e.toUpperCase()))}</dt><dd>${q(e.pos.distanceTo(this.frame.sun))} od Slunce (oběh kolem centra v epicyklickém přiblížení)</dd>`:``;return`<dt>Rychlost vůči Slunci</dt><dd>${K(n,1)} km/s${r?``:` (jen tečná složka, radiální rychlost chybí)`}</dd>${i}`}cardHtml(e){let t=e,n=this.data,r=n.objekty,i=t.index,a=n.typy[t.typ],o=`neznámá (na mapě jen směr)`;if(t.distLy!=null){let e=r.dm[i],n=r.dp[i],[a,s]=e!=null&&n!=null?[q(e*Y),q(n*Y)]:[null,null],c=a&&a!==s?`<br><span class="dim">rozsah ${a} – ${s}</span>`:``;o=`${q(t.distLy)} · ${gt(t.distLy)}${c}`}let s=r.dmet[i]==null?null:n.metody[r.dmet[i]],c=n.pole.map(e=>{let t=r.x[e.k]?.[i];if(t==null||t===``)return``;let n=typeof t==`number`?Math.abs(t)>=1e6||Math.abs(t)<.001&&t!==0?t.toExponential(2).replace(`.`,`,`):K(t,e.des??2):J(t);return`<dt>${J(e.nazev)}</dt><dd>${n}${e.jednotka?` ${J(e.jednotka)}`:``}</dd>`}).join(``),l=t.aliases?.length?`<p class="dim">Též: ${J(t.aliases.slice(0,8).join(`, `))}${t.aliases.length>8?` …`:``}</p>`:``;return`<div class="kind" style="color:var(${a.barva})">${J(a.nazev)}</div>
      <h3>${J(t.name)}</h3>
      ${l}
      <dl>
        <dt>Od Slunce</dt><dd>${o}</dd>
        ${s?`<dt>Vzdálenost z</dt><dd>${J(s)}</dd>`:``}
        ${Na(this.base.get(t)??t.pos,r.l[i],r.b[i],t.distLy)}
        ${this.motionRows(t)}
        ${c}
      </dl>
      <div class="src">${r.zdroj[i]==null?``:J(n.zdroje[r.zdroj[i]])}<br>Katalog: ${J(this.meta.zdroj)} (stav ${n.stazeno.slice(0,10)}).</div>`}},us=[{key:`OB`,name:`O a B`,color:`--st-ob`,desc:`horká modrá až modrobílá hvězda, o hodně hmotnější než Slunce`},{key:`A`,name:`A`,color:`--st-a`,desc:`bílá hvězda, teplejší a hmotnější než Slunce`},{key:`F`,name:`F`,color:`--st-f`,desc:`žlutobílá hvězda, o něco teplejší než Slunce`},{key:`G`,name:`G`,color:`--st-g`,desc:`žlutá hvězda podobná Slunci (Slunce je G2 V)`},{key:`K`,name:`K`,color:`--st-k`,desc:`oranžová hvězda, chladnější a menší než Slunce`},{key:`M`,name:`M`,color:`--st-m`,desc:`červený trpaslík, nejběžnější typ hvězdy v Galaxii`},{key:`LTY`,name:`L, T, Y`,color:`--st-lty`,desc:`hnědý trpaslík, těleso mezi hvězdou a planetou`},{key:`D`,name:`Bílý trpaslík`,color:`--st-d`,desc:`bílý trpaslík, vyhaslé jádro hvězdy`},{key:`X`,name:`Neznámá`,color:`--st-x`,desc:`typ ani teplota hvězdy nejsou v archivu uvedené`}],ds=Object.fromEntries(us.map(e=>[e.key,e])),fs=[[10050,`OB`],[7320,`A`],[5980,`F`],[5310,`G`],[3865,`K`],[2450,`M`]];function ps(e){if(!e)return null;let t=e.trim();if(/^(WD|D[ABCOQZX])/.test(t))return`D`;let n=/^(?:sd|esd|usd)?\s*([OBAFGKMLTYobafgkm])/.exec(t);if(!n)return null;let r=n[1].toUpperCase();return r===`O`||r===`B`?`OB`:r===`L`||r===`T`||r===`Y`?`LTY`:r}function ms(e){for(let[t,n]of fs)if(e>=t)return{key:n,belowTable:!1};return{key:`M`,belowTable:!0}}function hs(e,t){let n=ps(e);if(n)return{info:ds[n],estimated:!1};if(t!=null&&t>0){let{key:e,belowTable:n}=ms(t);return{info:ds[e],estimated:!0,belowTable:n}}return{info:ds.X,estimated:!1}}var gs=Math.PI*2;function _s(e,t){e=(e%gs+gs)%gs;let n=t<.8?e:Math.PI;for(let r=0;r<30;r++){let r=(n-t*Math.sin(n)-e)/(1-t*Math.cos(n));if(n-=r,Math.abs(r)<1e-10)break}return n}var vs=(e,t)=>Math.cbrt(t*(e/365.25)**2),ys=(e,t)=>Math.sqrt(e**3/t)*365.25;function bs(e,t,n){if(t<1){let r=_s(n,t);return[e*(Math.cos(r)-t),e*Math.sqrt(1-t*t)*Math.sin(r)]}let r=xs(n,t);return[e*(Math.cosh(r)-t),-e*Math.sqrt(t*t-1)*Math.sinh(r)]}function xs(e,t){let n=Math.asinh(e/t);for(let r=0;r<60;r++){let r=(t*Math.sinh(n)-n-e)/(t*Math.cosh(n)-1);if(n-=r,Math.abs(r)<1e-12)break}return n}var Ss={recentVenus:[1.776,2136e-7,2.533e-8,-1332e-14,-3097e-18],runaway:[1.107,1332e-7,1.58e-8,-8308e-15,-1931e-18],maxGreenhouse:[.356,6171e-8,1.698e-9,-3198e-15,-5575e-19],earlyMars:[.32,5547e-8,1.526e-9,-2874e-15,-5011e-19]},Cs=5772,ws=2600,Ts=7200;function Es(e,t){if(e==null||t==null||t<=0||e<2400||e>7400)return null;let n=t*t*(e/Cs)**4,r=e-5780,i=e=>Math.sqrt(n/(e[0]+e[1]*r+e[2]*r**2+e[3]*r**3+e[4]*r**4));return{cons:[i(Ss.runaway),i(Ss.maxGreenhouse)],opt:[i(Ss.recentVenus),i(Ss.earlyMars)],lum:n,extrapolated:e<ws||e>Ts}}var Ds=[{value:0,name:`velikost Země`,range:`< 1,25 R⊕`,color:`#c9a27e`},{value:1,name:`super-Země`,range:`1,25–2 R⊕`,color:`#7fd0d8`},{value:2,name:`velikost Neptunu`,range:`2–6 R⊕`,color:`#6f98ea`},{value:3,name:`velikost Jupiteru`,range:`6–15 R⊕`,color:`#e3bb82`},{value:4,name:`větší než Jupiter`,range:`≥ 15 R⊕`,color:`#e58a6a`},{value:5,name:`poloměr neznámý`,range:``,color:`#8a93a6`}],Os=[1.25,2,6,15];function ks(e){if(e==null||!(e>0))return Ds[5];let t=Os.findIndex(t=>e<t);return Ds[t<0?4:t]}var As=695700/6378.1,js=71492/6378.1,Ms=[[`Merkur`,.387],[`Země`,1],[`Jupiter`,5.2],[`Neptun`,30.1]],Ns=328;function Ps(e,t,n){let r=e.bodies;return!r.length&&!e.skipped.length?``:`<figure class="schema">
    <div class="schemaHead">Schéma soustavy <span class="dim">· generované z dat</span></div>
    ${Is(e,t,n)}
    ${r.length?Ls(e,t):``}
    <figcaption>Barva planety = velikostní třída (Borucki et al. 2011), viz tečky v tabulce. Nahoře velikosti ve skutečném poměru (velká hvězda jen jako výsek okraje); poloměr může být
    v archivu dopočtený z hmotnosti, hlavně u planet objevených měřením radiálních rychlostí. Dole vzdálenosti od hvězdy,
    <b>logaritmická</b> osa; čárka = rozsah od periastra k apoastru podle výstřednosti.
    ${r.some(e=>e.aEst)?`* vzdálenost dopočtená z oběžné doby (3. Keplerův zákon).`:``}
    ${Rs(e)}</figcaption>
  </figure>`}function Fs(e,t){return t.startsWith(e.name+` `)?t.slice(e.name.length+1):t}function Is(e,t,n){let r=e.bodies.filter(e=>e.r!=null&&e.r>0),i=[...e.bodies.filter(e=>e.r==null||e.r<=0).map(e=>e.name),...e.skipped],a=[...r.map(t=>({label:Fs(e,t.name),r:t.r,disputed:t.disputed})),{label:`Země`,r:1,ref:!0},{label:`Jupiter`,r:js,ref:!0}],o=30/Math.max(...a.map(e=>e.r)),s=44,c=[];for(let e of a){let t=Math.max(e.r*o,1.2),n=Math.max(t,e.label.length*2.9+2);s+=n,c.push(`<circle cx="${s.toFixed(1)}" cy="44" r="${t.toFixed(2)}" class="${e.ref?`ref`:`pl`}${e.disputed?` disputed`:``}"${e.ref||e.disputed?``:` style="fill:${ks(e.r).color}"`}/>`),c.push(`<text x="${s.toFixed(1)}" y="86" class="${e.ref?`refT`:`plT`}">${J(e.label)}</text>`),s+=n+6}let l=Math.max(Ns,s),u=n==null?null:n*As*o,d=u!=null&&u>34?`<circle cx="${(34-u).toFixed(1)}" cy="44" r="${u.toFixed(1)}" fill="${t}" class="star"/>`:u==null?`<rect x="0" y="0" width="28" height="72" fill="${t}" class="star unknown"/>`:`<circle cx="${17 .toFixed(1)}" cy="44" r="${Math.max(u,1.5).toFixed(1)}" fill="${t}" class="star"/>`,f=n==null?`<text x="2" y="86" class="refT start">poloměr hvězdy neznámý</text>`:``;return`<svg class="schemaSvg" viewBox="0 0 ${l.toFixed(0)} 92" role="img"
      aria-label="Velikosti planet ve srovnání se Zemí a Jupiterem">${d}${c.join(``)}${f}</svg>
    ${i.length?`<div class="schemaNote">Bez poloměru v datech: ${i.map(t=>J(Fs(e,t))).join(`, `)}</div>`:``}`}function Ls(e,t){let n=e.bodies,r=e.hz,i=Math.min(...n.map(e=>e.a*(1-e.e)),r?r.opt[0]:1/0),a=Math.max(...n.map(e=>e.a*(1+e.e)),r?r.opt[1]:0),o=Math.floor(Math.log10(i)*2)/2,s=Math.ceil(Math.log10(a)*2)/2;if(s-o<1){let e=(o+s)/2;o=e-.5,s=e+.5}let c=e=>26+(Math.log10(e)-o)/(s-o)*290,l=[];if(l.push(`<circle cx="8" cy="60" r="6" fill="${t}" class="star"/>`),r){let e=(e,t)=>`<rect x="${c(e[0]).toFixed(1)}" y="4" width="${(c(e[1])-c(e[0])).toFixed(1)}" height="56" class="${t}"/>`;l.push(e(r.opt,`hzOpt`),e(r.cons,`hzCons`)),l.push(`<text x="${((c(r.cons[0])+c(r.cons[1]))/2).toFixed(1)}" y="13" class="hzT">obyvatelná zóna${r.extrapolated?`*`:``}</text>`)}l.push(`<line x1="26" y1="60" x2="316" y2="60" class="axis"/>`);for(let e=Math.ceil(o);e<=Math.floor(s);e++){let t=10**e,n=c(t);l.push(`<line x1="${n.toFixed(1)}" y1="57" x2="${n.toFixed(1)}" y2="63" class="axis"/>`);let r=`${K(t,t<1?-e:0)} au`;l.push(`<text x="${Math.max(Math.min(n,316-r.length*2.9),26+r.length*2.9).toFixed(1)}" y="74" class="refT">${r}</text>`)}for(let[e,t]of Ms){if(Math.log10(t)<o||Math.log10(t)>s)continue;let n=c(t);l.push(`<line x1="${n.toFixed(1)}" y1="4" x2="${n.toFixed(1)}" y2="60" class="refL"/>`),l.push(`<text x="${Math.min(n,316-e.length*2.9).toFixed(1)}" y="86" class="refT">${e}</text>`)}let u=[-1e9,-1e9];return n.forEach(t=>{let n=c(t.a);t.e>0&&l.push(`<line x1="${c(t.a*(1-t.e)).toFixed(1)}" y1="50" x2="${c(t.a*(1+t.e)).toFixed(1)}" y2="50" class="ecc"/>`),l.push(`<circle cx="${n.toFixed(1)}" cy="50" r="3" class="pl${t.disputed?` disputed`:``}"${t.disputed?``:` style="fill:${ks(t.r).color}"`}/>`);let r=Fs(e,t.name)+(t.aEst?`*`:``),i=r.length*6+4,a=n-u[0]>=i?0:+(n-u[1]>=i);u[a]=n;let o=a?24:40;a&&l.push(`<line x1="${n.toFixed(1)}" y1="${o+3}" x2="${n.toFixed(1)}" y2="46" class="tick"/>`),l.push(`<text x="${n.toFixed(1)}" y="${o}" class="plT">${J(r)}</text>`)}),`<svg class="schemaSvg" viewBox="0 0 ${Ns} 90" role="img" aria-label="Vzdálenosti planet od hvězdy">${l.join(``)}</svg>`}function Rs(e){let t=e.hz;return t?`Zelená = obyvatelná zóna podle Kopparapu et al. 2014 (tmavší konzervativní ${K(t.cons[0],3)}–${K(t.cons[1],3)} au,
    světlejší optimistická), z teploty a poloměru hvězdy${t.extrapolated?`; <b>* teplota hvězdy je mimo rozsah modelu, zóna je extrapolovaná</b>`:``}.`:e.star.teff==null||e.star.rs==null?`Obyvatelná zóna chybí: hvězda nemá v datech teplotu nebo poloměr.`:`Obyvatelná zóna chybí: model platí jen pro hvězdy 2 600–7 200 K.`}var zs=new Set([`TRAPPIST-1`,`51 Peg`,`Proxima Cen`,`TOI-700`,`Kepler-186`,`Kepler-452`,`HD 209458`,`eps Eri`,`tau Cet`,`Kepler-90`,`55 Cnc`,`GJ 1214`,`WASP-12`,`KELT-9`]),Bs=40,Vs={OB:`O/B`,A:`A`,F:`F`,G:`G (jako Slunce)`,K:`K`,M:`M (červený trpaslík)`,LTY:`hnědý trpaslík`,D:`bílý trpaslík`,X:`neznámá`},Hs=e=>e===1?`planeta`:e>=2&&e<=4?`planety`:`planet`,Us=class{id=`exoplanety`;name=`Exoplanety`;group=new ae;objects=[];filters;facets;filter=Ko;vis;nearby=[];majors=[];tree;frameNo=0;tmp=new W;data;systemView=null;constructor(e,t,n,r){this.data=e;let i=e.systemy,a=i.jmeno.map(()=>[]);e.planety.sys.forEach((e,t)=>a[e].push(t));let o=[],s=[],c=Object.fromEntries(us.map(e=>[e.key,new V(r(e.color))]));for(let n=0;n<i.jmeno.length;n++){let r=i.d[n],l=r==null?null:t.toScene(i.l[n],i.b[n],r),u=l?o.length/3:-1,d=hs(i.sp[n],i.teff[n]);if(l){o.push(l.x,l.y,l.z);let e=c[d.info.key];s.push(e.r,e.g,e.b)}this.objects.push({layer:this.id,index:n,name:i.jmeno[n],pos:l,anchor:l??t.sun.clone(),distLy:r==null?null:r*Y,color:`var(${d.info.color})`,cls:d,aliases:a[n].map(t=>e.planety.jmeno[t]),major:zs.has(i.jmeno[n]),planets:a[n],point:u})}let l=new Set(this.objects.map(e=>e.cls.info.key));this.filters=us.filter(e=>l.has(e.key)).map(e=>({key:e.key,name:Vs[e.key],color:e.color,on:!0})),this.tree=new ns(this.objects.filter(e=>e.pos),e=>e.pos),this.majors=this.objects.filter(e=>e.major);let u=new B;u.setAttribute(`position`,new F(new Float32Array(o),3)),this.vis=new F(new Float32Array(o.length/3).fill(1),1),u.setAttribute(`vis`,this.vis),u.setAttribute(`color`,new F(new Float32Array(s),3));let d=1e3,f=o.length/3,p=e=>`${Math.floor(o[3*e]/d)},${Math.floor(o[3*e+1]/d)},${Math.floor(o[3*e+2]/d)}`,m=new Map;for(let e=0;e<f;e++){let t=p(e);m.set(t,(m.get(t)??0)+1)}let h=new Float32Array(f);for(let e=0;e<f;e++)h[e]=Math.max(.3,Math.min(1,12/m.get(p(e))));u.setAttribute(`dens`,new F(h,1));let g=e.planety,_=((e,t)=>{let n=Array(t).fill(0);return e.forEach(e=>e!=null&&n[e]++),n})(g.metoda,e.ciselniky.metoda_cz.length),v=g.rok.filter(e=>e!=null);this.facets=[{kind:`checks`,id:`metoda`,name:`Metoda objevu`,options:e.ciselniky.metoda_cz.map((e,t)=>({value:t,label:e,count:_[t]})).filter(e=>e.count>0).sort((e,t)=>t.count-e.count)},{kind:`range`,id:`rok`,name:`Rok objevu`,min:Math.min(...v),max:Math.max(...v)},{kind:`checks`,id:`velikost`,name:`Velikost planety (Borucki 2011)`,options:Ds.map(e=>({value:e.value,label:`${e.name}${e.range?` (${e.range})`:``}`,count:g.r.filter(t=>ks(t).value===e.value).length})).filter(e=>e.count>0)}];let y=new ct({uniforms:{map:{value:n},pr:{value:Math.min(devicePixelRatio,2)}},vertexShader:`
        uniform float pr; attribute float vis; attribute float dens; attribute vec3 color; varying vec3 vCol; varying float vA;
        void main(){ vCol = color; vec4 mv = modelViewMatrix * vec4(position, 1.);
          float nat = 2000. / -mv.z;
          gl_PointSize = vis > .5 ? clamp(nat, 4., 12.) * pr : 0.;
          // zblízka (bod přirozeně aspoň 4 px, do ~500 ly) plný jas, od ~7 000 ly tlumení podle hustoty
          vA = mix(dens, 1., smoothstep(.3, 4., nat));
          gl_Position = vis > .5 ? projectionMatrix * mv : vec4(2., 2., 2., 1.); }`,fragmentShader:`
        uniform sampler2D map; varying vec3 vCol; varying float vA;
        void main(){ vec3 color = vCol;
          float r = length(gl_PointCoord - .5);
          float core = 1. - smoothstep(.14, .26, r);
          float a = max(texture2D(map, gl_PointCoord).a * .85, core) * vA;
          gl_FragColor = vec4(mix(color, vec3(1.), core * .5), a); }`,transparent:!0,depthWrite:!1,blending:2}),b=new S(u,y);b.frustumCulled=!1,this.group.add(b)}setFilter(e,t){let n=this.filters.find(t=>t.key===e);n&&(n.on=t),this.refresh()}applyFilter(e){this.filter=e,this.refresh()}planetPasses(e){let t=this.filter,n=t.checks.metoda,r=t.ranges.rok,i=this.data.planety;if(n&&(i.metoda[e]==null||!n.includes(i.metoda[e]))||r&&(i.rok[e]==null||i.rok[e]<r[0]||i.rok[e]>r[1]))return!1;let a=t.checks.velikost;return!(a&&!a.includes(ks(i.r[e]).value))}get planetFilterOn(){return!!(this.filter.checks.metoda||this.filter.ranges.rok||this.filter.checks.velikost)}refresh(){let e=new Set(this.filters.filter(e=>e.on).map(e=>e.key)),t=this.planetFilterOn,n=this.vis.array;for(let r of this.objects){let i=e.has(r.cls.info.key)&&qo(r,this.filter)&&(!t||r.planets.some(e=>this.planetPasses(e)));r.hidden=!i,r.point>=0&&(n[r.point]=+!!i)}this.vis.needsUpdate=!0,this.group.visible=e.size>0}update(e){if(this.frameNo++%8)return;this.nearby=[];let t=e.viewDistance;if(t>4e3||!this.group.visible)return;let n=e.camera.position,r=[];for(let i of this.tree.queryRadius(n,t*1.3))i.hidden||(this.tmp.copy(i.pos).project(e.camera),this.tmp.z>1||Math.abs(this.tmp.x)>1||Math.abs(this.tmp.y)>1||r.push([n.distanceTo(i.pos),i]));r.sort((e,t)=>e[0]-t[0]),this.nearby=r.slice(0,Bs).map(([,e])=>e)}countNum(e){return e.reduce((e,t)=>e+t.planets.length,0)}countText(e,t){let n=e.reduce((e,t)=>e+t.planets.length,0),r=e.length,i=r===1?`v 1 soustavě`:`ve ${_t(r)}${t?` z ${_t(this.objects.length)}`:``} soustavách`;return`${_t(n)} ${Hs(n)} ${i}`}labelCandidates(e){return this.group.visible?[...e.viewDistance<3e3?this.majors.filter(e=>!e.hidden):[],...this.nearby]:[]}flyDistance(e){return Math.max(40,Math.min(500,(e.distLy??100)*.6))}detailLabel(e){return this.systemView&&this.systemSpec(e).bodies.length?`Soustava – oběh planet ▸`:null}openDetail(e){this.systemView?.open(this.systemSpec(e))}systemSpec(e){let t=this.data.systemy,n=this.data.planety,r=e.index,i=t.ms[r]==null,a=t.ms[r]??1,o=!n.e,s=[],c=[];for(let t of e.planets){let r=n.a[t],i=n.p[t],o=!1,l=!1;if(r==null&&i!=null&&(r=vs(i,a),o=!0),i==null&&r!=null&&(i=ys(r,a),l=!0),r==null||i==null||r<=0||i<=0){c.push(n.jmeno[t]);continue}let u=n.e?.[t];s.push({name:n.jmeno[t],label:n.jmeno[t].startsWith(e.name+` `)?n.jmeno[t].slice(e.name.length+1):n.jmeno[t],a:r,p:i,r:n.r[t],e:u!=null&&u>=0&&u<.99?u:0,eUnknown:u==null,w:n.w?.[t]??0,aEst:o,pEst:l,disputed:!!n.sporna[t]})}return s.sort((e,t)=>e.a-t.a),{name:e.name,star:{cls:e.cls,rs:t.rs[r],teff:t.teff[r]},hz:Es(t.teff[r],t.rs[r]),bodies:s,skipped:c,solarRef:!0,massAssumed:i&&s.some(e=>e.aEst||e.pEst),noOrbitData:o,source:`Data: NASA Exoplanet Archive, PSCompPars (stav ${this.data.stazeno.slice(0,10)}).`}}skyPos(e){let t=this.data.systemy;return{l:t.l[e.index],b:t.b[e.index],fovDeg:.15}}kindName(e){let t=e.planets.length;return`Planetární systém, ${t} ${Ws(t)}`}cardHtml(e){let t=e,n=this.data.systemy,r=this.data.planety,i=this.data.ciselniky,a=t.index,o=(e,t=2,n=``)=>e==null?`–`:`${K(e,t)}${n}`,s=`neznámá`;if(t.distLy!=null){let e=n.dp[a],r=n.dm[a],i=e!=null&&r!=null?Math.abs(e-r)<.01*Math.max(e,r,1e-9)?` ± ${q(e*Y)}`:` (+${q(e*Y)} / −${q(r*Y)})`:``;s=`${q(t.distLy)}${i}<br>${gt(t.distLy)}`}let c=t.planets.map(e=>{let n=r.metoda[e]==null?`–`:i.metoda_cz[r.metoda[e]],a=r.zarizeni[e]==null?``:i.zarizeni[r.zarizeni[e]],s=[r.sporna[e]?`disputed`:``,this.planetFilterOn&&!this.planetPasses(e)?`filtered`:``].filter(Boolean).join(` `);return`<tr${s?` class="${s}"`:``}${r.sporna[e]?` title="Existence planety je sporná (pl_controv_flag)"`:``}>
        <th scope="row" title="${J(ks(r.r[e]).name)}"><i class="dot" style="background:${ks(r.r[e]).color}"></i>${J(r.jmeno[e])}${r.sporna[e]?` ⚠`:``}${t.planetNames?.[r.jmeno[e]]?`<br><span class="dim" title="jméno schválené IAU">${J(t.planetNames[r.jmeno[e]])}</span>`:``}</th>
        <td>${o(r.r[e],2)}</td><td>${o(r.m[e],1)}</td><td>${o(r.p[e],2)}</td><td>${o(r.a[e],3)}</td>
        <td>${o(r.teq[e],0)}</td><td title="${J(a)}">${r.rok[e]??`–`}<br><span class="dim">${n}</span></td></tr>`}).join(``),l=t.cls,u=l.info.key===`X`?`neznámá`:`${J(l.info.name)}${l.estimated?` <span class="dim">(odhad z teploty${l.belowTable?`, chladnější než M9`:``})</span>`:``}`,d=[n.sp[a]?`typ ${J(n.sp[a])}`:null,n.teff[a]==null?null:`${K(n.teff[a],0)} K`,n.rs[a]==null?null:`${K(n.rs[a],2)} R☉`,n.ms[a]==null?null:`${K(n.ms[a],2)} M☉`].filter(Boolean).join(` · `)||`–`;return`<div class="kind" style="color:var(--exo)">Planetární systém · ${t.planets.length} ${Ws(t.planets.length)}</div>
      <h3>${J(t.name)}</h3>
      <dl>
        <dt>Od Slunce</dt><dd>${s}</dd>
        <dt>Třída hvězdy</dt><dd><i class="dot" style="background:var(${l.info.color})"></i>${u}<br><span class="dim">${J(l.info.desc)}</span></dd>
        <dt>Hvězda</dt><dd>${d}</dd>
        ${n.vmag[a]==null?``:`<dt>Jasnost V</dt><dd>${K(n.vmag[a],2)} mag</dd>`}
        ${Na(t.pos,n.l[a],n.b[a],t.distLy)}
      </dl>
      ${Ps(this.systemSpec(t),`var(${l.info.color})`,n.rs[a])}
      <div class="tablewrap"><table class="planets">
        <thead><tr><th>Planeta</th><th title="poloměr v poloměrech Země">R⊕</th><th title="hmotnost v hmotnostech Země (nebo M·sin i)">M⊕</th>
        <th title="oběžná doba ve dnech">P [d]</th><th title="velká poloosa">a [au]</th><th title="rovnovážná teplota">T [K]</th><th>Objev</th></tr></thead>
        <tbody>${c}</tbody></table></div>
      <div class="src">Data: NASA Exoplanet Archive, PSCompPars (stav ${this.data.stazeno.slice(0,10)}). Parametry mohou pocházet z různých publikací.
      Poloha: RA/Dec → l, b (astropy), vzdálenost sy_dist.</div>`}};function Ws(e){return e===1?`planeta`:e>=2&&e<=4?`planety`:`planet`}var Gs=class{group=new ae;objects=[];filters=[];facets=[];inner=null;loading=null;time=0;filter=null;id;name;make;constructor(e,t,n,r){this.id=e,this.name=t,this.make=n,r.onclick=()=>{let e=r.textContent??``;r.textContent=e.replace(/vyp$/,`načítám…`),this.ensure().then(()=>r.click(),t=>{console.error(t),r.textContent=e})}}ensure(){return this.loading??=this.make().then(e=>(this.inner=e,this.group.add(e.group),this.objects.push(...e.objects),e.setTime?.(this.time),this.filter&&e.applyFilter(this.filter),e))}async searchMore(){return(await this.ensure()).objects}setFilter(){}applyFilter(e){this.filter=e,this.inner?.applyFilter(e)}labelCandidates(e){return this.inner?.labelCandidates(e)??[]}cardHtml(e){return this.inner.cardHtml(e)}kindName(e){return this.inner?.kindName?.(e)??this.name}skyPos(e){return this.inner?.skyPos?.(e)??null}flyDistance(e){return this.inner.flyDistance(e)}radiusLy(e){return this.inner?.radiusLy?.(e)??null}update(e){this.inner?.update?.(e)}detailLabel(e){return this.inner?.detailLabel?.(e)??null}openDetail(e){this.inner?.openDetail?.(e)}setTime(e){this.time=e,this.inner?.setTime?.(e)}onSelect(e){this.inner?.onSelect?.(e)}};function Ks(e,t,n){let r=e.drah.jd,i=e.drah.xyz;if(t<r[0])return!1;let a=r.length;if(t>=r[a-1]){let o=t-r[a-1];for(let t=0;t<3;t++)n[t]=i[a-1][t]+e.v_konec[t]*o;return!0}let o=0,s=a-1;for(;s-o>1;){let e=o+s>>1;r[e]<=t?o=e:s=e}let c=(t-r[o])/(r[s]-r[o]);for(let e=0;e<3;e++)n[e]=i[o][e]+(i[s][e]-i[o][e])*c;return!0}var qs=(e,t)=>t.set(e[0],e[2],-e[1]);function Js(e){let[t,n,r]=e.split(`-`).map(Number);return r?`${r}. ${n}. ${t}`:n?`${n}/${t}`:String(t)}var Ys=149597870.7,Xs=63241.077,Zs=e=>e*86400*365.25/Ys,Qs=2e4,$s=5e3,ec=60,tc=class{id=`sondy`;name=`Sondy`;group=new ae;objects;filters=[];facets=[];on=!0;near=!1;button;openSolar;data;constructor(e,t,n,r,i,a){this.data=e,this.button=i,this.openSolar=a,this.group.position.copy(t.sun),i.onclick=()=>this.toggle(),this.objects=e.sondy.map((e,i)=>{let[a,o,s]=e.dnes.xyz_gal_au,c=new W(a,s,-o).divideScalar(Xs),l=mt.dir(e.smer_gal.l,e.smer_gal.b),u=Zs(e.smer_gal.v_kms)/Xs,d=[],f=[];for(let e=0;e<=Qs;e+=$s/10){let t=c.clone().addScaledVector(l,e*u);d.push(t.x,t.y,t.z),e>0&&e%$s===0&&f.push(t.x,t.y,t.z)}let p=new B;p.setAttribute(`position`,new N(d,3)),this.group.add(new Oe(p,new Je({color:e.barva,transparent:!0,opacity:.8})));let m=new B;m.setAttribute(`position`,new N(f,3)),this.group.add(new S(m,new D({color:e.barva,size:5,sizeAttenuation:!1,map:r,transparent:!0,depthWrite:!1})));let h=c.clone().addScaledVector(l,Qs*u).add(t.sun),g=Number(e.dnes.datum.slice(0,4))+Qs;n.add(`${e.jmeno} · r. ${g.toLocaleString(`cs-CZ`)}`,h,`anno`,()=>this.on&&this.near,180);let _=c.clone().add(t.sun);return{layer:this.id,index:i,name:e.jmeno,pos:_,anchor:_,distLy:c.length(),color:e.barva,aliases:[`sonda`,`sondy`],probe:e,tip:h}})}toggle(){this.on=!this.on,ca(this.button,`Sondy`,this.on)}update(e){this.near=e.camera.position.distanceTo(this.group.position)<ec,this.group.visible=this.on&&this.near}setFilter(){}applyFilter(){}labelCandidates(){return[]}kindName(){return`vesmírná sonda`}flyDistance(){return 1.6}detailLabel(){return`Dráha ve Sluneční soustavě ▸`}openDetail(e){this.openSolar(e.name)}cardHtml(e){let t=e.probe,n=t.dnes.r_au,r=n*Ys/299792.458/3600,i=Zs(t.smer_gal.v_kms),a=i*Qs/Xs,o=Js(t.dnes.datum),s=t.udalosti.map(([e,t])=>`<li><b>${J(Js(e))}</b> – ${J(t)}</li>`).join(``);return`<div class="kind" style="color:${J(t.barva)}">Vesmírná sonda</div>
      <h3>${J(t.jmeno)}</h3>
      <dl>
        <dt>Od Slunce</dt><dd>${K(n,1)} au <span class="dim">(k ${o})</span> · ${K(n/Xs,4)} ly<br>
          <span class="dim">signál ke Slunci letí ${K(r,1)} h</span></dd>
        <dt>Rychlost vůči Slunci</dt><dd>${K(t.dnes.v_kms,1)} km/s <span class="dim">(k ${o})</span><br>
          <span class="dim">na konci efemeridy JPL ${K(t.smer_gal.v_kms,1)} km/s = ${K(i,2)} au za rok</span></dd>
        <dt>Míří</dt><dd>gal. l ${K(t.smer_gal.l,1)}° · b ${t.smer_gal.b>=0?`+`:``}${K(t.smer_gal.b,1)}°<br>
          <span class="dim">za ${Qs.toLocaleString(`cs-CZ`)} let urazí asi ${K(a,2)} ly (přímka v mapě, tečky po ${$s.toLocaleString(`cs-CZ`)} letech)</span></dd>
        <dt>Start</dt><dd>${J(t.start)}</dd>
        ${t.hmotnost_kg==null?``:`<dt>Hmotnost</dt><dd>${t.hmotnost_kg} kg</dd>`}
      </dl>
      <h4>Z historie mise</h4>
      <ul class="events">${s}</ul>
      <p class="dim">${J(t.pozn)} Přímka za koncem efemeridy je jen prodloužení podle poslední rychlosti – bez gravitace Slunce
        a okolních hvězd, takže je orientační.</p>
      <div class="src">Dráha, poloha a časová osa: NASA/JPL Horizons (objekt ${J(t.horizons)}, staženo ${J(this.data.stazeno.slice(0,10))}).</div>`}},nc={pas:`#a89a82`,neo:`#ff7a59`,trojan:`#8fd46a`,kentaur:`#d99be0`,tno:`#6fa8ff`,kometa:`#7fe7ff`,mezihvezdne:`#ffd84a`},rc={IEO:`Atira – dráha celá uvnitř dráhy Země`,ATE:`Aten – blízkozemní, a < 1 au`,APO:`Apollo – kříží dráhu Země`,AMO:`Amor – přibližuje se k dráze Země zvenku`,MCA:`kříží dráhu Marsu`,IMB:`vnitřní hlavní pás`,MBA:`hlavní pás`,OMB:`vnější hlavní pás`,TJN:`trojan Jupiteru (body L4/L5)`,AST:`planetka (bez třídy)`,CEN:`kentaur – mezi Jupiterem a Neptunem`,TNO:`transneptunické těleso`,HYA:`hyperbolická dráha`,PAA:`parabolická dráha`,ETc:`kometa Enckeho typu`,JFc:`kometa Jupiterovy rodiny`,JFC:`kometa Jupiterovy rodiny`,CTc:`kometa Chironova typu`,HTC:`kometa Halleyova typu`,PAR:`parabolická kometa`,HYP:`hyperbolická kometa`,COM:`kometa (dlouhoperiodická)`},ic=(e,t,n,r)=>e===1?t:e>=2&&e<=4?n:r;function ac(e,t){let n=e.sloupce,r=n.a[t],i=n.e[t],a=n.jmeno[t],o=r*(1-i),s=[e.skupiny[n.skupina[t]],rc[n.trida[t]]??n.trida[t]];if(n.pha[t]&&s.push(`potenciálně nebezpečná planetka (PHA)`),s.push(`q ${K(o,3)} au`),i<1){let e=360/n.n[t];s.push(`a ${K(r,3)} au`,`e ${K(i,3)}`,`oběh ${e>3650?`${K(e/365.25,0)} let`:`${K(e/365.25,2)} ${ic(Math.round(e/365.25),`rok`,`roky`,`let`)}`}`)}else s.push(`e ${K(i,3)} (neuzavřená dráha)`);s.push(`sklon ${K(n.i[t],1)}°`),n.H[t]==null?n.M1[t]!=null&&s.push(`M1 ${K(n.M1[t],1)} mag`):s.push(`H ${K(n.H[t],1)} mag`),n.d_km[t]!=null&&s.push(`průměr ${K(n.d_km[t],1)} km`);let c=new Date((n.epocha[t]-2440587.5)*864e5).toLocaleDateString(`cs-CZ`);return s.push(n.zdroj[t]===`h`?`dráha: JPL Horizons k ${c}`:`dráha: JPL SBDB k ${c}`),{name:a,label:sc(a),kind:`small`,imgKey:a,a:r,e:i,inc:n.i[t],node:n.om[t],w:n.w[t],epoch:n.epocha[t],m0:n.m0[t],n:n.n[t],p:i<1?360/n.n[t]:1/0,r:n.d_km[t]==null?null:n.d_km[t]/2/6371,color:nc[n.skupina[t]],info:s.join(` · `),link:{href:oc(a),text:`JPL SBDB`}}}function oc(e){let t=e.match(/^(\d+) /)??e.match(/^(\d+[PDI])\//)??e.match(/^([PCDXAI]\/\d{4} [A-Z]{1,2}\d*(?:-[A-Z])?)/),n=t?t[1]:sc(e).replace(/ \(.*\)$/,``);return`https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=${encodeURIComponent(n)}`}function sc(e){let t=e.match(/^(\d+ \S.*?) \([^)]*\)$/);return t?t[1]:e.replace(/^\((.*)\)$/,`$1`)}var cc={"H ≤ 17,75 (průměr zhruba nad 1 km)":`H ≤ 17.75 (diameter roughly over 1 km)`,"H ≤ 5,5":`H ≤ 5.5`,"všechny číslované bez úlomků":`all numbered ones without fragments`},lc=(e,t=!1)=>{let n=e.pocty,r=Object.values(n).reduce((e,t)=>e+t,0),i=e=>cc[e]??e;return t?[`Asteroids and comets (${K(r,0).replace(/\s/g,`,`)}): <b>only a sample</b> from JPL SBDB – main belt and Trojans ${i(e.vyber.pas)}, near-Earth ${i(e.vyber.neo)},
     Centaurs ${i(e.vyber.kentaur)}, trans-Neptunian objects ${i(e.vyber.tno)}, comets ${i(e.vyber.kometa)}, plus mission targets and famous comets.
     More than 1.5 million small bodies are known.`,`Their positions come from an orbit at a single epoch (two bodies, no perturbations). Around 2026 they match JPL Horizons to within a few minutes
     (checked on 14 bodies). Decades away they drift by degrees, and completely for bodies after a close planetary flyby
     (Apophis after 2029, comet 67P). Far from today on the slider, take them as an illustration.`,`Click a point or search to select a body: its orbit and data will be shown.`]:[`Planetky a komety (${K(r,0)}): <b>jen vzorek</b> z JPL SBDB – hlavní pás a trojáni ${e.vyber.pas}, blízkozemní ${e.vyber.neo},
     kentauři ${e.vyber.kentaur}, transneptunická tělesa ${e.vyber.tno}, komety ${e.vyber.kometa}, navíc cíle sond a slavné komety.
     Známých malých těles je přes 1,5 milionu.`,`Jejich polohy jsou z dráhy k jediné epoše (dvě tělesa, bez poruch). Kolem roku 2026 sedí s JPL Horizons do několika minut
     (ověřeno na 14 tělesech). O desítky let dál se rozcházejí o stupně a u těles po blízkém průletu kolem planety úplně
     (Apophis po roce 2029, kometa 67P). Na posuvníku daleko od dneška je ber jako ilustraci.`,`Klepnutím na bod nebo hledáním se těleso vybere: ukáže se jeho dráha a údaje.`]},uc=`Povrch: umělecké ztvárnění – zatím ho nikdo nesnímkoval, barvy a skvrny jsou smyšlené.`,dc=(e,t,n)=>{let r=Math.cbrt(e*n*t);return[e/r,t/r,n/r]},fc={Haumea:{key:`haumea`,axes:dc(1161,513,852),ring:[2252,2322],credit:`Tvar: trojosý elipsoid s poloosami 1 161 × 852 × 513 km a prstenec o poloměru ~2 287 km (šířka ~70 km) v rovině rovníku – Ortiz et al. 2017, Nature 550, 219. Rotace se nekreslí. ${uc}`},Makemake:{key:`makemake`,axes:dc(751,715,751),credit:`Tvar: přibližně – mírně zploštělá koule podle promítnutých os 1 430 × 1 502 km ze zákrytu hvězdy (Ortiz et al. 2012, Nature 491, 566); skutečný 3D tvar není známý. ${uc}`},Eris:{key:`eris`,axes:[1,1,1],credit:`Tvar: koule o poloměru 1 163 km ze zákrytu hvězdy (Sicardy et al. 2011, Nature 478, 493). ${uc}`}};function pc(e,t,n,r){let i=e*374761393+t*668265263+n*2147483647+r*1274126177|0;return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967295}function mc(e,t,n,r){let i=Math.floor(e),a=Math.floor(t),o=Math.floor(n),s=e-i,c=t-a,l=n-o,u=s*s*(3-2*s),d=c*c*(3-2*c),f=l*l*(3-2*l),p=(e,t,n)=>e+(t-e)*n,m=(e,t,n)=>pc(i+e,a+t,o+n,r);return p(p(p(m(0,0,0),m(1,0,0),u),p(m(0,1,0),m(1,1,0),u),d),p(p(m(0,0,1),m(1,0,1),u),p(m(0,1,1),m(1,1,1),u),d),f)}function hc(e,t,n,r,i){let a=.5,o=1,s=0,c=0;for(let l=0;l<i;l++)s+=a*mc(e*o,t*o,n*o,r+l),c+=a,a*=.5,o*=2.03;return s/c}var gc=(e,t,n)=>[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n],_c=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function vc(e,t,n,r){if(e===`haumea`){let e=hc(t*3,n*3,r*3,11,6),i=hc(t*9,n*9,r*9,23,4),a=gc([196,204,214],[246,248,252],_c(.3,.7,e));a=gc(a,[170,182,198],.35*_c(.55,.8,i));let o=Math.max(0,1-Math.hypot(t-.55,n-.15,r-.8)/.45);return gc(a,[150,98,88],.6*_c(0,.6,o*(.7+.6*e)))}if(e===`makemake`){let e=hc(t*2.5,n*2.5,r*2.5,31,6),i=hc(t*8,n*8,r*8,47,4),a=gc([150,92,66],[214,160,122],_c(.25,.75,e));return a=gc(a,[236,214,190],.55*_c(.6,.85,i)),gc(a,[120,70,52],.4*_c(.65,.9,hc(t*5,n*5,r*5,59,3)))}let i=hc(t*3,n*3,r*3,71,6),a=hc(t*12,n*12,r*12,83,3);return gc(gc([214,210,204],[250,248,244],_c(.3,.7,i)),[196,190,184],.3*_c(.6,.85,a))}function yc(e,t=1024){let n=t/2,r=document.createElement(`canvas`);r.width=t,r.height=n;let i=r.getContext(`2d`),a=i.createImageData(t,n);for(let r=0;r<n;r++){let i=Math.PI/2-(r+.5)/n*Math.PI,o=Math.cos(i),s=Math.sin(i);for(let n=0;n<t;n++){let i=(n+.5)/t*2*Math.PI-Math.PI,[c,l,u]=vc(e,o*Math.cos(i),s,o*Math.sin(i)),d=(r*t+n)*4;a.data[d]=c,a.data[d+1]=l,a.data[d+2]=u,a.data[d+3]=255}}return i.putImageData(a,0,0),r}var bc=Math.PI/180,xc=23.4392911*bc;function Sc(e,t,n){if(!t)return;let r=t.rozmery_km.map(e=>e<10?e.toLocaleString(`cs-CZ`,{maximumFractionDigits:2}):Math.round(e)).join(` × `),i;if(i=t.osa===`iau`?`Natočení k datu podle IAU`:t.osa===`pol`?`Osa a perioda ${Cc(t.perioda_h)} podle JPL SBDB, natočení kolem osy orientační`:t.osa===`draha`?`Perioda ${Cc(t.perioda_h)} podle JPL SBDB, osa neznámá (kreslí se kolmo k dráze)`:`Rotace neznámá, natočení orientační`,t.slozita_rotace&&(i+=`; ve skutečnosti se převaluje (rotace kolem více os)`),e.shape={url:n+t.soubor,scale:t.meritko,rKm:t.r_km,credit:`3D tvar ${r} km: ${t.autor}, ${t.licence}. ${i}.`},e.r=t.r_km/6371,t.mapa&&!e.tex&&(e.tex=t.mapa),!e.rot){if(t.rot)e.rot=t.rot;else if(t.osa===`pol`)e.rot={ra:[t.pol[0],0],dec:[t.pol[1],0],pm:[0,360/(t.perioda_h/24)]};else{let n=(e.inc??0)*bc,r=(e.node??0)*bc,i=Math.sin(n)*Math.sin(r),a=-Math.sin(n)*Math.cos(r),o=Math.cos(n),s=a*Math.cos(xc)-o*Math.sin(xc),c=a*Math.sin(xc)+o*Math.cos(xc);e.rot={ra:[Math.atan2(s,i)/bc,0],dec:[Math.asin(c)/bc,0],pm:[0,t.perioda_h?360/(t.perioda_h/24):0]}}}}var Cc=e=>e>=48?`${(e/24).toLocaleString(`cs-CZ`,{maximumFractionDigits:1})} d`:`${e.toLocaleString(`cs-CZ`,{maximumFractionDigits:2})} h`;async function wc(e){let t=await wt(e.url),n=new DataView(t.buffer,t.byteOffset,t.byteLength),r=n.getUint32(0,!0),i=n.getUint32(4,!0),a=new Int16Array(t.buffer.slice(t.byteOffset+8,t.byteOffset+8+r*6)),o=new Uint16Array(t.buffer.slice(t.byteOffset+8+r*6,t.byteOffset+8+r*6+i*2)),s=e.scale/e.rKm,c=new Float32Array(r*3);for(let e=0;e<c.length;e++)c[e]=a[e]*s;let l=new B;return l.setAttribute(`position`,new F(c,3)),l.setIndex(new F(o,1)),l.computeVertexNormals(),l.computeBoundingSphere(),l}var Tc=149597870.7,Ec=6371,Dc={Merkur:`#a9a39b`,Venuše:`#e8d3a0`,Země:`#5b9bff`,Mars:`#e0714b`,Jupiter:`#d9b38c`,Saturn:`#e6cf8b`,Uran:`#8fe3e8`,Neptun:`#5a7dff`,Pluto:`#d8c2a8`},Oc={Merkur:{orbit:1},Venuše:{orbit:-1},Země:{ra:0,dec:90},Mars:{ra:317.7,dec:52.9},Jupiter:{ra:268.1,dec:64.5},Saturn:{ra:40.6,dec:83.5},Uran:{ra:77.3,dec:15.2},Neptun:{ra:299.8,dec:43.1}};function kc(e){let t=e-1,n=Math.floor(t/100),r=2-n+Math.floor(n/4);return Math.floor(365.25*(t+4716))+428+1+r-1524.5}var Ac=e=>e.replace(/^S(\d{4})_([A-Z])_(\d+)$/,`S/$1 $2 $3`);function jc(e,t,n=!1){let r=n?e.a/Tc:e.a,i=Ac(e.jmeno);return{name:e.en===e.jmeno||t!==`moon`?i:`${i} (${e.en})`,label:i,kind:t,imgKey:e.en,a:r,e:e.e,inc:e.i,node:e.om,w:e.w,epoch:e.epocha,m0:e.m0,n:e.n,p:360/Math.abs(e.n),r:e.r_km==null?null:e.r_km/Ec,color:Dc[e.jmeno]??(t===`moon`?`#b9b3a8`:t===`dwarf`?`#c8b6a0`:void 0),rates:{a:n?void 0:e.da,e:e.de,inc:e.di,node:e.dom,w:e.dw}}}function Mc(e,t=null,n=null,r=null,i=``,a=null,o=null,s=null){let c=e=>e?{hi:i+e[`2k`],lo:i+e[`1k`]}:void 0,l=e.planety.map(e=>jc(e,`planet`));for(let e of l){e.pole=Oc[e.label];let t=c(r?.planety[e.label]);t&&(e.tex={...t,credit:r?`Textura: ${r.autor}, ${r.licence}. ${r.poznamka}`:void 0},e.label===`Země`&&(e.tex.clouds=c(r?.planety[`Země-mraky`]),e.tex.night=c(r?.planety[`Země-noc`]))),e.label===`Saturn`&&r?.prstence&&(e.rings={png:i+r.prstence.png,r0:r.prstence.r0_km,r1:r.prstence.r1_km})}let u=e.trpaslici.map(e=>jc(e,`dwarf`));for(let e of u){let t=fc[e.label];t&&!r?.mesice?.[e.label]&&(e.art=t,e.tex={hi:`proc:${t.key}`,lo:`proc:${t.key}`,credit:t.credit})}let d=[...l,...u],f=new Map(d.map(e=>[e.label,e])),p=new Map;for(let t of e.mesice){let e=f.get(t.planeta);if(!e)continue;let n=jc(t,`moon`,!0),r=t.kod.length>3;n.note=[r?`zatím jen předběžné označení, bez trvalého čísla IAU`:null,t.presnost===`tabulka`?`poloha méně přesná (Horizons těleso nezná)`:null].filter(Boolean).join(`; `)||void 0,(e.children??=[]).push(n),r&&p.set(e,(p.get(e)??0)+1)}for(let[e,t]of p)e.note=`z toho ${t} jen s předběžným označením S/… (bez trvalého čísla IAU)`;for(let e of d)e.children?.sort((e,t)=>e.a-t.a);for(let e of[...d,...d.flatMap(e=>e.children??[])]){let t=r?.mesice?.[e.label];t&&(e.tex={...c(t),credit:`Mapa: ${t.autor}, ${t.licence}. ${t.poznamka}`});let n=a?.telesa[e.label];n&&(e.rot=n),e.kind===`moon`&&Sc(e,o?.telesa[e.label],i)}for(let[e,t]of Object.entries(o?.telesa??{})){let n=r?.mesice?.[e];n&&(t.mapa={...c(n),credit:`Mapa: ${n.autor}, ${n.licence}. ${n.poznamka}`})}let[m,h]=e.platnost,g=e.mesice.length,_=e.mesice.filter(e=>e.kod.length<=3).length;return{name:`Sluneční soustava`,star:{cls:{info:ds.G,estimated:!1},rs:e.slunce.r_km/695700,teff:null,label:`Slunce`,spType:`G2 V`},bodies:d,skipped:[],dated:{min:kc(m),max:kc(h+1)-1},notes:[`Polohy jsou k vybranému datu a spočítané z drah (Keplerovy rovnice), ne z přesných efemerid.`,`Planety: elementy JPL (Standish) platné ${m}–${h}; oproti přesné efemeridě JPL Horizons se k 30. 9. 2026 liší nejvýš o ~4′ (Saturn), ostatní pod 2′.`,`Měsíce (${g}, z toho ${_} s trvalým číslem IAU, ostatní jen s předběžným označením S/…): počet = řádky tabulky JPL včetně měsíců, které zatím nemají trvalé číslo IAU (pozná se podle kódu NAIF). Dráhy z JPL Horizons k 1. 1. 2026 a 2027. Kolem roku 2026 sedí poloha na dráze obvykle do několika stupňů; malé vnější (nepravidelné) měsíce, které silně ruší Slunce, se s odstupem let rozcházejí i o desítky stupňů.`,`Trpasličí planety: oskulační elementy z JPL SBDB. Poloměr Eris, Haumey a Makemake JPL neuvádí – je ze zákrytů hvězd (Sicardy 2011, Ortiz 2017, 2012); Haumea se kreslí jako protáhlý elipsoid (poloosy 1 161 × 852 × 513 km) s prstencem (Ortiz 2017), Makemake mírně zploštělá; povrch Haumey, Makemake a Eris je umělecké ztvárnění.`,`Měsíce se ukážou po přiblížení k planetě; klepnutím na jméno se na těleso přeletí a kamera ho sleduje.`,`„Skutečné velikosti“ kreslí tělesa v měřítku drah (většinou jen jako tečky). Jinak jsou zvětšená.`,`Planeta „Země“ je ve skutečnosti těžiště soustavy Země–Měsíc (liší se o ~4 700 km).`,...r?[`Planety zblízka: textury ${r.autor} (${r.licence}) podle dat NASA, barvy mírně zesílené a mezery doplněné smyšleným terénem. Světlo jde ze Slunce, noční strana je tmavá, na Zemi svítí města. Měsíce, Pluto s Charonem a Ceres: mapy NASA, USGS, DLR a LPI (volné dílo); nesnímkované oblasti jsou vyplněné jednolitou barvou.`]:[],...a?[`Natočení těles k datu (osa i otočení kolem ní) podle modelu IAU WGCCRE 2015 (NAIF pck00011): Země je ke Slunci správnou stranou, Měsíc a velké měsíce mají vázanou rotaci (k planetě stále stejnou stranou). U Jupiteru, Saturnu, Urana a Neptunu udává model rotaci vnitřku; oblaka se proti ní posouvají, takže skvrny a pásy jsou natočené jen orientačně.`]:r?[`Sklon os podle JPL; natočení kolem osy zatím jen ilustrativní.`]:[],...t?lc(t):[],...o?[`3D tvary (${Object.keys(o.telesa).length} těles – planetky, komety a malé měsíce jako Phobos, Pan či Hyperion) ze skutečných tvarových modelů NASA PDS (sondy NEAR, Hayabusa, OSIRIS-REx, Dawn, Rosetta, Deep Impact, Stardust, New Horizons, Cassini a radar Arecibo/Goldstone); ukážou se po přiblížení. Natočení k datu podle IAU, kde ho IAU stanovila, jinak jen orientační. Phobos, Deimos, Phoebe, Vesta a Bennu mají mapu povrchu ze sond (podle zeměpisné délky a šířky bodu na povrchu); ostatní jsou jednotně šedé – skutečná tělesa jsou tmavší (komety odrážejí jen ~4 % světla).`]:[],...s?[`Plný katalog (${s.dlazdice.reduce((e,t)=>e+t.pocet,0).toLocaleString(`cs-CZ`)} planetek a komet z JPL SBDB, stav ${s.stazeno.slice(0,10)}) se načte tlačítkem v panelu Planetky a komety – ${Math.round(s.dlazdice.reduce((e,t)=>e+t.mb,0))} MB, hlavní pás od nejjasnějších. Jen uzavřené dráhy; polohy počítá grafická karta ze dvou těles k 1. 1. 2026, takže platí totéž co pro vzorek: kolem roku 2026 přesné, o desítky let dál jen orientační. Klepnutím na bod se těleso vybere.`]:[],...t?[`Ohony komet jsou ilustrace: směr sedí (iontový ohon míří přímo od Slunce, prachový se stáčí za kometou), délka a jas jsou jen odhad podle vzdálenosti od Slunce (od ~5 au) a absolutní jasnosti komety. Skutečná aktivita komety se z dráhy spočítat nedá. Ve zvětšeném režimu jsou ohony prodloužené, aby byly vidět.`]:[],...n?[`Sondy (${n.sondy.length}): dráhy z JPL Horizons (stav ${n.stazeno.slice(0,10)}), zjednodušené na odchylku do 0,01 au; poloha mezi body dopočtená lineárně. Pioneery a New Horizons mají efemeridu do 2050, Voyagery do 2100 (předpověď JPL).`]:[]],notesEn:[`Positions are for the selected date and computed from orbits (Kepler's equation), not from precise ephemerides.`,`Planets: JPL elements (Standish) valid ${m}–${h}; compared with the precise JPL Horizons ephemeris on 30 Sep 2026 they differ by at most ~4′ (Saturn), the others below 2′.`,`Moons (${g}, of which ${_} have a permanent IAU number, the rest only a provisional S/… designation): count = rows of the JPL table including moons that do not yet have a permanent IAU number (recognisable by the NAIF code). Orbits from JPL Horizons for 1 Jan 2026 and 2027. Around 2026 the position on the orbit is usually right to within a few degrees; small outer (irregular) moons, strongly perturbed by the Sun, drift apart by tens of degrees over the years.`,`Dwarf planets: osculating elements from JPL SBDB. JPL does not give the radius of Eris, Haumea and Makemake – it comes from stellar occultations (Sicardy 2011, Ortiz 2017, 2012); Haumea is drawn as an elongated ellipsoid (semi-axes 1,161 × 852 × 513 km) with a ring (Ortiz 2017), Makemake slightly flattened; the surfaces of Haumea, Makemake and Eris are artist's impressions.`,`Moons appear when you get close to a planet; clicking a name flies to the body and the camera follows it.`,`"Real sizes" draws the bodies at the scale of the orbits (mostly just as dots). Otherwise they are enlarged.`,`The planet "Earth" is actually the barycentre of the Earth–Moon system (they differ by ~4,700 km).`,...r?[`Planets close up: textures ${r.autor} (${r.licence}) based on NASA data, colours slightly enhanced and gaps filled with made-up terrain. Light comes from the Sun, the night side is dark, cities glow on Earth. Moons, Pluto with Charon and Ceres: maps by NASA, USGS, DLR and LPI (public domain); unimaged areas are filled with a uniform colour.`]:[],...a?[`Orientation of the bodies for the date (axis and rotation about it) after the IAU WGCCRE 2015 model (NAIF pck00011): Earth faces the Sun with the correct side, the Moon and large moons rotate synchronously (always the same side to the planet). For Jupiter, Saturn, Uranus and Neptune the model gives the rotation of the interior; the clouds drift against it, so spots and bands are oriented only roughly.`]:r?[`Axial tilts from JPL; rotation about the axis only illustrative for now.`]:[],...t?lc(t,!0):[],...o?[`3D shapes (${Object.keys(o.telesa).length} bodies – asteroids, comets and small moons such as Phobos, Pan or Hyperion) from real NASA PDS shape models (the NEAR, Hayabusa, OSIRIS-REx, Dawn, Rosetta, Deep Impact, Stardust, New Horizons and Cassini missions and Arecibo/Goldstone radar); they appear when you get close. Orientation for the date after the IAU where the IAU has set it, otherwise only approximate. Phobos, Deimos, Phoebe, Vesta and Bennu have surface maps from spacecraft (by the longitude and latitude of a point on the surface); the others are uniformly grey – the real bodies are darker (comets reflect only ~4 % of light).`]:[],...s?[`The full catalogue (${s.dlazdice.reduce((e,t)=>e+t.pocet,0).toLocaleString(`en-GB`)} asteroids and comets from JPL SBDB, as of ${s.stazeno.slice(0,10)}) loads with the button in the Asteroids and comets panel – ${Math.round(s.dlazdice.reduce((e,t)=>e+t.mb,0))} MB, the main belt from the brightest. Closed orbits only; the graphics card computes positions from two bodies at 1 Jan 2026, so the same applies as for the sample: accurate around 2026, only approximate decades away. Click a point to select a body.`]:[],...t?[`Comet tails are illustrations: the direction is right (the ion tail points straight away from the Sun, the dust tail curves behind the comet), length and brightness are only an estimate from the distance from the Sun (from ~5 au) and the comet's absolute brightness. A comet's real activity cannot be computed from its orbit. In enlarged mode the tails are lengthened so they can be seen.`]:[],...n?[`Probes (${n.sondy.length}): trajectories from JPL Horizons (as of ${n.stazeno.slice(0,10)}), simplified to a deviation of up to 0.01 au; the position between points is interpolated linearly. The Pioneers and New Horizons have an ephemeris until 2050, the Voyagers until 2100 (JPL prediction).`]:[]],small:t??void 0,shapes:o?.telesa,full:s??void 0,shapeBase:i,probes:n?.sondy,texCredit:r?`Textura: ${r.autor}, ${r.licence}. ${r.poznamka}`:void 0,source:`Data: NASA/JPL Solar System Dynamics – přibližné polohy planet, SBDB, Horizons, parametry měsíců (stav ${e.stazeno.slice(0,10)}).`,sourceEn:`Data: NASA/JPL Solar System Dynamics – approximate planetary positions, SBDB, Horizons, moon parameters (as of ${e.stazeno.slice(0,10)}).`}}var Nc=[`Slunce`,`planety`,`měsíce`,`planetky`,`komety`,`sondy`,`Oortův oblak`,`Hillsův oblak`],Pc={pas:`planetka`,neo:`blízkozemní planetka`,trojan:`trojan Jupiteru`,kentaur:`kentaur`,tno:`transneptunické těleso`,kometa:`kometa`,mezihvezdne:`mezihvězdné těleso`},Fc=class{id=`slunecni-soustava`;name=`Sluneční soustava`;group=new ae;objects;filters=[];facets=[];data=null;targets=new Map;frame;probesUrl=null;texUrl=null;texBase=``;tex=null;rotUrl=null;rot=null;shapesUrl=null;shapes=null;fullUrl=null;full=null;smallUrl;smallMeta;meta;url;view;constructor(e,t,n,r,i=null){this.meta=t,this.frame=e,this.smallMeta=i?.meta??null,this.smallUrl=i?.url??null,this.url=n,this.view=r,this.objects=[{layer:this.id,index:0,name:`Sluneční soustava`,pos:e.sun.clone(),anchor:e.sun.clone(),distLy:0,color:`var(--sun)`,aliases:Nc}]}setFilter(){}applyFilter(e=Ko){}labelCandidates(){return[]}flyDistance(){return 40}detailLabel(e){return e&&this.targets.has(e)?`Ukázat ve Sluneční soustavě ▸`:`Otevřít Sluneční soustavu ▸`}load(){let e=e=>fetch(e).then(e=>{if(!e.ok)throw Error(`HTTP ${e.status}`);return e.json()});return this.data??=Promise.all([e(this.url),this.smallUrl?e(this.smallUrl).catch(e=>(console.warn(`planetky a komety:`,e),null)):Promise.resolve(null),this.probesUrl?e(this.probesUrl).catch(e=>(console.warn(`sondy:`,e),null)):Promise.resolve(null)]),this.data.catch(()=>this.data=null),this.data}searchMore(){return this.more??=this.buildMore(),this.more.catch(()=>this.more=null),this.more}more=null;async buildMore(){let[e,t]=await this.load(),n=this.frame.sun,r=[],i=(e,t,i,a,o)=>{let s={layer:this.id,index:this.objects.length+r.length,name:e,pos:n.clone(),anchor:n.clone(),distLy:0,color:i,aliases:t.filter(t=>t&&t!==e),imgName:a,searchOnly:!0};this.targets.set(s,o),r.push(s)};for(let t of Mc(e).bodies){i(t.label??t.name,[t.name,t.imgKey??``],t.color??`var(--sun)`,t.imgKey,{body:t});for(let e of t.children??[])i(e.label??e.name,[e.name,e.imgKey??``],e.color??`#b9b3a8`,e.imgKey,{body:e,parent:t.label??t.name})}return this.smallData=t,t&&t.sloupce.jmeno.forEach((e,n)=>i(sc(e),[e],nc[t.sloupce.skupina[n]]??`#aaa`,e,{small:n})),r}openDetail(e,t){let n=e&&this.targets.get(e),r=e=>fetch(e).then(e=>e.ok?e.json():null);return this.tex??=this.texUrl?r(this.texUrl).catch(e=>(console.warn(`textury:`,e),null)):Promise.resolve(null),this.rot??=this.rotUrl?r(this.rotUrl).catch(e=>(console.warn(`rotace:`,e),null)):Promise.resolve(null),this.shapes??=this.shapesUrl?r(this.shapesUrl).catch(e=>(console.warn(`tvary:`,e),null)):Promise.resolve(null),this.full??=this.fullUrl?r(this.fullUrl).catch(e=>(console.warn(`plný katalog:`,e),null)):Promise.resolve(null),Promise.all([this.load(),this.tex,this.rot,this.shapes,this.full]).then(async([[e,r,i],a,o,s,c])=>{await this.view.open(Mc(e,r,i,a,this.texBase,o,s,c)),t?this.view.focusProbe(t):n&&`small`in n?this.view.selectSmall(n.small):n&&this.view.focusBody(n.body.name)}).catch(e=>{this.data=null,alert(`Data Sluneční soustavy se nepodařilo načíst: ${e.message}`)})}kindName(e){let t=e&&this.targets.get(e);if(!t)return`Naše planetární soustava`;if(`small`in t)return this.smallKind(t.small);let n=t.body;return n.kind===`moon`?`měsíc (${t.parent})`:n.kind===`dwarf`?`trpasličí planeta`:n.name===`Země`?`naše planeta`:`planeta Sluneční soustavy`}smallData=null;smallKind(e){let t=this.smallData?.sloupce.skupina[e];return t&&Pc[t]||`malé těleso`}cardHtml(e){let t=e&&this.targets.get(e);return t?this.bodyCard(e,t):`<div class="kind" style="color:var(--sun)">Naše planetární soustava</div>
      <h3>Sluneční soustava</h3>
      <p>Slunce (hvězda třídy G2 V), 8 planet, 5 trpasličích planet a jejich měsíce – celkem ${J(String(this.meta.objektu??`?`))} těles
      s drahami a polohou k libovolnému datu ${J((this.meta.platnost??[1800,2050]).join(`–`))}${this.smallMeta?`,
      k tomu vzorek ${J(String(this.smallMeta.objektu??`?`))} planetek a komet`:``}.</p>
      <p><b>Oortův oblak</b> kolem Slunce (do ~100 000 au, 1,6 ly) je v mapě i v pohledu Soustava jen <b>ilustrace</b> – nikdy nebyl
      pozorován, jeho existenci prozrazují dráhy dlouhoperiodických komet. Rozsahy: vnitřní (Hillsův) oblak ~3 000–20 000 au,
      vnější 20 000–100 000 au (Morbidelli 2005, NASA); obě hranice jsou nejisté.</p>
      <div class="src">Data: ${J(this.meta.zdroj)} (stav ${J((this.meta.stazeno??``).slice(0,10))}).</div>`}bodyCard(e,t){let n;if(`small`in t)n=this.smallData?J(ac(this.smallData,t.small).info??``):``;else{let e=t.body,r=[];e.kind===`moon`?r.push(`vzdálenost od planety ${K(e.a*149597870.7,0)} km`):r.push(`vzdálenost od Slunce ${K(e.a,3)} au`);let i=Math.abs(e.p);r.push(`oběh ${i>730?`${K(i/365.25,1)} roku`:`${K(i,i<10?2:1)} dne`}`),e.r!=null&&r.push(`poloměr ${K(e.r*6371,0)} km`),n=J(r.join(` · `))}return`<div class="kind" style="color:${J(e.color)}">${J(this.kindName(e))} · Sluneční soustava</div>
      <h3>${J(e.name)}</h3>
      <p>${n}</p>
      <p class="dim">V mapě Galaxie splývá se Sluncem; dráhu a polohu k datu ukáže pohled Sluneční soustava.</p>
      <div class="src">Data: NASA/JPL Solar System Dynamics (SBDB, Horizons).</div>`}},Ic=e=>e,Lc=e=>({...e,extra:!0}),Rc=[`hvezdy`,`hvezdokupy`,`mlhoviny`,`mracna`,`masery`,`cefeidy`,`trpaslici`,`neutronove-hvezdy`],zc=(e,t)=>e.built.get(t),Bc=(e,t,n,r)=>Ic({id:e,button:t,needs:[e],make:(t,i)=>new Gs(e,n,()=>t.data(e).then(e=>r(t,e,i)),i)}),Vc=[Lc({id:`gaia-ramena`,button:`gaiaArms`,needs:[`gaia-ramena`],make:(e,t)=>new Xa(e.url(`gaia-ramena`),e.stage.scene,e.frame.sun,t)}),Lc({id:`prach`,button:`dust`,needs:[`prach`],make:(e,t)=>new Dt(e.url(`prach`),e.stage.scene,e.frame.sun,t)}),Lc({id:`kulisa-mlhovin`,button:`nebGlow`,needsAny:[`mlhoviny`,`mracna`],make:(e,t)=>new So(e.stage,e.frame,t,e.file(`mlhoviny`)?e.url(`mlhoviny`):null,e.file(`mracna`)?e.url(`mracna`):null,!0)}),Ic({id:`slunecni-soustava`,needs:[`slunecni-soustava`],make:e=>{let t=t=>e.manifest.katalogy.find(e=>e.id===t),n=t(`mala-telesa`),r=new Fc(e.frame,t(`slunecni-soustava`),e.url(`slunecni-soustava`),e.systemView,n?{meta:n,url:e.url(`mala-telesa`)}:null);return e.file(`sondy`)&&(r.probesUrl=e.url(`sondy`)),r.texBase=e.base,e.file(`textury`)&&(r.texUrl=e.url(`textury`)),e.file(`rotace`)&&(r.rotUrl=e.url(`rotace`)),e.file(`tvary`)&&(r.shapesUrl=e.url(`tvary`)),e.file(`planetky`)&&(r.fullUrl=e.url(`planetky`)),r}}),Ic({id:`exoplanety`,needs:[`exoplanety`],prefetch:[`exoplanety`],make:async e=>{let t=new Us(await e.data(`exoplanety`),e.frame,e.stage.glow,e.css);return t.systemView=e.systemView,t}}),Ic({id:`cerne-diry`,needs:[`cerne-diry`],prefetch:[`cerne-diry`],extraButtons:[`bhGaiaLabels`],make:async e=>{let t=new es(await e.data(`cerne-diry`),e.frame,e.stage,e.css),n=document.getElementById(`bhGaiaLabels`);return n&&(n.onclick=()=>{t.gaiaLabels=!t.gaiaLabels,n.setAttribute(`aria-pressed`,String(t.gaiaLabels)),n.textContent=`Popisky kandidátů Gaia: ${t.gaiaLabels?`zap`:`vyp`}`}),t}}),Ic({id:`gaia100`,button:`gaia100`,needs:[`gaia100`],make:(e,t)=>new Ba(e.url(`gaia100`),e.frame.sun,e.stage.glow,t)}),Ic({id:`gaia500`,button:`gaia500`,needs:[`gaia500`],force:!1,make:(e,t)=>new Ja(e.dev?e.dataBase+`gaia500/`:`https://azuregroove.github.io/galaxie-data/gaia500/`,e.frame.sun,e.stage.glow,t,()=>{let t=zc(e,`gaia100`),n=zc(e,`gaiaAll`);t&&!t.active&&t.toggle(),n?.active&&n.toggle()})}),Ic({id:`gaiaAll`,button:`gaiaAll`,extraButtons:[`gaiaErr`],make:async(e,t)=>{let n=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)?new URLSearchParams(location.search).get(`gaia`)?.split(`,`)??[`gaia-vse2`,`gaia-vse`]:[],r=null;for(let e of n)if(await fetch(`${e}/index.json`,{method:`HEAD`}).then(e=>e.ok&&(e.headers.get(`content-type`)??``).includes(`json`)).catch(()=>!1)){r=e;break}if(!r)return null;let i=new Ja(`${r}/`,e.frame.sun,e.stage.glow,t,()=>{let t=zc(e,`gaia100`),n=zc(e,`gaia500`);t&&!t.active&&t.toggle(),n?.active&&n.toggle()},Ha);t.hidden=!1,e.dev&&(window.__gaiaAll=i);let a=document.getElementById(`gaiaErr`);if(a&&r.startsWith(`gaia-vse2`)){a.hidden=!1;let e=[[.5,`do 50 %`],[.2,`do 20 %`],[99,`vše`]];a.onclick=()=>{let t=(e.findIndex(([e])=>e===i.maxErr)+1)%e.length;i.maxErr=e[t][0],a.textContent=`Nejistota vzdálenosti: ${e[t][1]}`}}else a?.remove();return i}}),Ic({id:`startrek`,button:`startrek`,needs:[`startrek`],prefetch:[`startrek`],extraButtons:[`trekCat`,`voyage`],make:async e=>new No(await e.data(`startrek`),e.frame.sun,e.stage.glow,e.dataBase)}),Ic({id:`okoli`,button:`local`,needs:[`okoli`],prefetch:[`okoli`],make:async(e,t)=>new eo(await e.data(`okoli`),e.frame.sun,e.labels,t)}),Ic({id:`stred`,button:`center`,make:(e,t)=>new ga(e.frame.r0Ly,e.frame.sun,e.labels,t)}),Bc(`proudy`,`streams`,`Hvězdné proudy v halu`,(e,t,n)=>Ft(async()=>{let{StreamsLayer:e}=await import(`./streams-CHXTZEqC.js`);return{StreamsLayer:e}},__vite__mapDeps([9,10,11]),import.meta.url).then(({StreamsLayer:r})=>new r(t,e.frame.sun,e.labels,n))),Bc(`prulety`,`encounters`,`Blízké průlety hvězd`,(e,t,n)=>Ft(async()=>{let{EncounterLayer:e}=await import(`./encounters-Bx4c-LW9.js`);return{EncounterLayer:e}},__vite__mapDeps([12,10,11]),import.meta.url).then(({EncounterLayer:r})=>new r(t,e.frame.sun,e.stage,e.labels,n))),Bc(`souhvezdi`,`constellations`,`Souhvězdí`,(e,t,n)=>Ft(async()=>{let{ConstellationLayer:e}=await import(`./constellations-ObLP_dlj.js`);return{ConstellationLayer:e}},__vite__mapDeps([13,10,14,11]),import.meta.url).then(({ConstellationLayer:r})=>new r(t,e.frame.sun,e.labels,n))),Ic({id:`sondy`,button:`probes`,needs:[`sondy`],prefetch:[`sondy`],make:async(e,t)=>new tc(await e.data(`sondy`),e.frame,e.labels,e.stage.glow,t,t=>e.built.get(`slunecni-soustava`)?.openDetail(void 0,t))}),Ic({id:`sloupy`,needs:[`sloupy`],prefetch:[`sloupy`],make:async e=>new Do(await e.data(`sloupy`),e.dataBase,e.frame.sun,e.stage.glow,e.stage)}),Ic({id:`magellan`,needs:[`galaxie-lv`],make:async e=>{let{MagellanLayer:t}=await Ft(async()=>{let{MagellanLayer:e}=await import(`./magellan-Cmj4N7pp.js`);return{MagellanLayer:e}},__vite__mapDeps([15,10,14,11,16,17]),import.meta.url);return new t(await e.data(`galaxie-lv`),e.frame,e.stage.glow,e.stage,`galaxie-foto/`)}}),...Rc.map(e=>Ic({id:e,needs:[e],prefetch:[e],make:async t=>new ls(await t.data(e),t.manifest.katalogy.find(t=>t.id===e),t.frame,t.stage.glow,t.css)}))];function Hc(e,t,n){let r={build:[],skip:[],prefetch:[]},i=new Set;for(let a of e){if(i.has(a.id))throw Error(`registr vrstev: id „${a.id}“ je dvakrát`);if(i.add(a.id),a.button&&!n(a.button)){r.skip.push({def:a,reason:`button`});continue}let e=(a.needs??[]).every(t),o=!a.needsAny||a.needsAny.some(t);if(!a.force&&!(e&&o))r.skip.push({def:a,reason:`data`});else{r.build.push(a);for(let e of a.prefetch??[])t(e)&&!r.prefetch.includes(e)&&r.prefetch.push(e)}}return r}async function Uc(e,t,n=new Map){let r=e=>e?document.getElementById(e):null,i=e=>{for(let t of[e.button,...e.extraButtons??[]])r(t)?.remove()};for(let{def:t}of e.skip)i(t);let a={layers:[],built:n,failed:[]};for(let o of e.build){let e=r(o.button),s=null;try{s=await o.make(t,e)}catch(e){console.error(`vrstva ${o.id}:`,e),a.failed.push(o.id)}s==null?i(o):(n.set(o.id,s),o.extra||a.layers.push(s))}return a}function Wc(){let e=document.getElementById(`timeT`),t=document.getElementById(`timeVal`),n=document.getElementById(`timePlay`),r=document.getElementById(`timeNow`);if(!e||!t)return;let i=e=>e*e*e*rs,a=e=>Math.cbrt(e/rs),o=0,s=0,c=0,l=n=>{t.textContent=as(n),document.activeElement!==e&&(e.value=String(a(n))),r?.toggleAttribute(`disabled`,n===0),document.querySelector(`[data-menu=popTime]`)?.classList.toggle(`live`,n!==0)};is.on(l),l(is.t),e.addEventListener(`input`,()=>is.set(i(parseFloat(e.value))));let u=()=>{cancelAnimationFrame(o),o=0,n&&(n.textContent=`▶`,n.setAttribute(`aria-pressed`,`false`))},d=e=>{let t=s?Math.min(.1,(e-s)/1e3):0;s=e,c=Math.min(1,c+t/20);let n=i(c);if(is.set(n),n>=2e3)return u();o=requestAnimationFrame(d)};n?.addEventListener(`click`,()=>{if(o)return u();is.t>=2e3&&is.set(-rs),c=a(is.t),s=0,n.textContent=`❚❚`,n.setAttribute(`aria-pressed`,`true`),o=requestAnimationFrame(d)}),r?.addEventListener(`click`,()=>{u(),is.set(0)})}var Gc=4,Kc=class{items=[];lines;open=!1;hud;stage;frame;layers;button;constructor(e,t,n,r,i){this.hud=e,this.stage=t,this.frame=n,this.layers=r,this.button=i,this.lines=new Fe(new B,new Je({color:16773544,transparent:!0,opacity:.75,blending:2,depthWrite:!1})),this.lines.frustumCulled=!1,this.lines.renderOrder=5,t.scene.add(this.lines),e.objectCardHooks.push((e,t)=>this.cardButton(e,t)),e.cardCloseHandlers.push(()=>{this.open=!1}),i.onclick=()=>this.show(),is.on(()=>{this.drawLines(),this.open&&this.show()}),this.label()}label(){this.button.textContent=this.items.length?`Porovnat (${this.items.length}) ▸`:`Porovnat ▸`}has(e){return this.items.some(t=>t===e||t.layer===e.layer&&t.name===e.name)}cardButton(e,t){if(t.searchOnly)return;let n=document.createElement(`button`);n.className=`btn detail`;let r=()=>{let e=this.items.length;n.textContent=this.has(t)?`✓ V porovnání (${e}) – otevřít ▸`:e>=Gc?`Porovnání je plné (${Gc}) – otevřít ▸`:`＋ Porovnat`};n.onclick=()=>{if(this.has(t)||this.items.length>=Gc)return this.show();this.items.push(t),this.changed(),r(),this.hud.toastPublic(this.items.length>1?`${t.name} přidáno do porovnání (${this.items.length})`:`${t.name} přidáno do porovnání – vyber další objekt`)},r(),e.querySelector(`.btn.detail:last-of-type, h3`)?.after(n)}changed(){this.label(),this.drawLines()}drawLines(){let e=[],t=this.items.map(e=>e.pos).filter(e=>!!e);for(let n=0;n<t.length;n++)for(let r=n+1;r<t.length;r++)e.push(...t[n].toArray(),...t[r].toArray());this.lines.geometry.dispose();let n=new B;n.setAttribute(`position`,new N(e,3)),this.lines.geometry=n}kind(e){let t=this.layers.find(t=>t.id===e.layer);return t?.kindName?.(e)??t?.name??e.layer}show(){this.hud.showPanel(e=>this.render(e)),this.open=!0}render(e){let t=this.items,n=this.frame.sun,r=document.createElement(`div`),i=is.t,a=e=>t.map(t=>`<td>${e(t)}</td>`).join(``),o=t.length?`
      <tr><th>Typ</th>${a(e=>J(this.kind(e)))}</tr>
      <tr><th>Od Slunce${i?` (v čase)`:``}</th>${a(e=>e.pos?`${q(e.pos.distanceTo(n))}<br><span class="dim">${gt(e.pos.distanceTo(n))}</span>`:`neznámá`)}</tr>
      <tr><th>Výška nad rovinou</th>${a(e=>{let t=e.pos?lt.fromScene(e.pos).y:null;return t==null?`–`:`${t>=0?`+`:`−`}${q(Math.abs(t))}`})}</tr>
      <tr><th>Od centra Galaxie</th>${a(e=>e.pos?q(e.pos.length()):`–`)}</tr>
      <tr><th>Směr (gal. souřadnice)</th>${a(e=>{let t=(e.pos??e.anchor).clone().sub(n),r=(Math.atan2(-t.z,t.x)*180/Math.PI+360)%360,i=Math.asin(t.y/Math.max(t.length(),1e-9))*180/Math.PI;return`l ${r.toFixed(1).replace(`.`,`,`)}° · b ${i>=0?`+`:`−`}${Math.abs(i).toFixed(1).replace(`.`,`,`)}°`})}</tr>
      <tr><th>Poloměr</th>${a(e=>{let t=this.layers.find(t=>t.id===e.layer)?.radiusLy?.(e);return t?q(t):`–`})}</tr>`:``,s=``;for(let e=0;e<t.length;e++)for(let n=e+1;n<t.length;n++){let r=t[e].pos,i=t[n].pos;if(!r||!i)continue;let a=r.distanceTo(i);s+=`<tr><td>${J(t[e].name)} ↔ ${J(t[n].name)}</td><td>${q(a)} · ${gt(a)}</td>
        <td class="dim">${a<1?`světlo za méně než rok`:`světlo letí ${q(a).replace(/ ly$/,``)} let`}</td></tr>`}r.innerHTML=`<div class="kind">Porovnání objektů</div><h3 id="cardTitle" tabindex="-1">Porovnání (${t.length} z ${Gc})</h3>
      ${t.length<2?`<p>${t.length?`Přidej další objekt`:`Vyber objekt na mapě nebo v Seznamu a přidej ho`} tlačítkem <b>＋ Porovnat</b> v jeho kartě (nejvýš ${Gc}).</p>`:``}
      ${t.length?`<div class="tablewrap"><table class="planets compare"><thead><tr><th></th>${t.map((e,t)=>`<th>
        <button class="linkish" data-sel="${t}">${J(e.name)}</button>
        <button class="btn small" data-del="${t}" aria-label="Odebrat ${J(e.name)}">×</button></th>`).join(``)}</tr></thead>
        <tbody>${o}</tbody></table></div>`:``}
      ${s?`<h4>Vzájemné vzdálenosti</h4><div class="tablewrap"><table class="planets"><tbody>${s}</tbody></table></div>`:``}
      ${t.length?`<p><button class="btn" data-a="fit">Ukázat všechny na mapě</button> <button class="btn" data-a="clear">Vyprázdnit</button></p>`:``}
      <p class="dim">Čáry mezi porovnávanými objekty jsou na mapě vidět i po zavření panelu.${i?` Polohy hvězd jsou posunuté podle posuvníku času.`:``}
        Další parametry (hmotnost, teplota, typ…) jsou v kartě každého objektu.</p>`,e.querySelector(`.close`).after(r),r.querySelectorAll(`[data-sel]`).forEach(e=>e.onclick=()=>this.hud.select(t[Number(e.dataset.sel)],!0)),r.querySelectorAll(`[data-del]`).forEach(e=>e.onclick=()=>{t.splice(Number(e.dataset.del),1),this.changed(),this.show()}),r.querySelector(`[data-a="fit"]`)?.addEventListener(`click`,()=>this.fit()),r.querySelector(`[data-a="clear"]`)?.addEventListener(`click`,()=>{this.items=[],this.changed(),this.show()})}fit(){let e=this.items.map(e=>e.pos??e.anchor);if(!e.length)return;let t=new he().setFromPoints(e);this.stage.flyTo(t.center,Math.max(t.radius*3,10))}},qc={innerMin:3e3,split:2e4,outerMax:1e5,flatTo:7e3},Jc=63241.077,Yc=`Oortův oblak je ILUSTRACE – nikdy nebyl pozorován. Rozsahy podle Morbidelli 2005 a NASA, nejisté (vnitřní okraj 2 000–5 000 au, vnější 10 000–100 000 au).`;function Xc(e,t){let n=12345,r=()=>(n=n*1103515245+12345&2147483647)/2147483647,i=(e,t,n)=>{let i=new Float32Array(e*3);for(let a=0;a<e;a++){let e=t*(n/t)**+r(),o=e<=qc.flatTo?.5:e>=qc.split?1:.5+.5*((e-qc.flatTo)/(qc.split-qc.flatTo)),s=(2*r()-1)*o,c=Math.sqrt(1-s*s),l=r()*Math.PI*2;i.set([e*c*Math.cos(l),e*s,e*c*Math.sin(l)],a*3)}return i};return{inner:i(e,qc.innerMin,qc.split),outer:i(t,qc.split,qc.outerMax)}}var Zc={inner:`#9fc4ff`,outer:`#c9b8ff`};function Qc(e,t,n,r,i,a){let o=new ae,{inner:s,outer:c}=Xc(n,r);for(let[t,n]of[[s,Zc.inner],[c,Zc.outer]]){let r=new B;r.setAttribute(`position`,new N(t.map(t=>t*e),3));let s=new S(r,new D({color:new V(n),size:i,sizeAttenuation:!1,transparent:!0,opacity:a,depthWrite:!1,blending:2}));s.frustumCulled=!1,o.add(s)}return o.quaternion.copy(new P().setFromUnitVectors(new W(0,1,0),t.clone().normalize())),o}var $c=class{group;constructor(e,t,n){let r=mt.dir(96.385,29.806);this.group=Qc(1/Jc,r,6e3,9e3,1.6,.5),this.group.position.copy(t),this.group.visible=!1,e.scene.add(this.group);let i=this.group.children.map(e=>e.material),a=()=>this.group.visible&&e.camera.position.distanceTo(t)<12,o=qc.outerMax/Jc,s=qc.split/Jc,c=new W().crossVectors(r,new W(0,1,0)).normalize();n.add(`Oortův oblak · ILUSTRACE, nikdy nepozorován`,t.clone().addScaledVector(r,o*1.05),`anno`,a,300),n.add(`vnější oblak · 20 000–100 000 au (do ~1,6 ly)`,t.clone().addScaledVector(c,o*.85),`anno`,a,250),n.add(`vnitřní (Hillsův) oblak · ~3 000–20 000 au`,t.clone().addScaledVector(c,-s*1.1),`anno`,()=>a()&&e.camera.position.distanceTo(t)<4,250),e.onFrame(()=>{let n=e.camera.position.distanceTo(t);if(this.group.visible=n<150,!this.group.visible)return;let r=Math.min(1,Math.max(0,(150-n)/140));for(let e of i)e.opacity=.12+.5*r})}},el=330,tl=`https://commons.wikimedia.org/w/api.php`,nl=null,rl=``,il=new Map;function al(n){rl=n,t()===`en`&&cl().then(sl),e(e=>{e===`en`&&cl().then(sl)})}var ol=!1;function sl(e){if(!e||ol)return;ol=!0;let t={};for(let n of Object.values(e.vrstvy))for(let[e,r]of Object.entries(n)){let n=r[2],i=r[4];if(!i||e!==n)continue;let a=i.replace(/ \((star|moon|planet|dwarf planet|galaxy|nebula|star cluster|cluster|satellite|spacecraft|space probe|asteroid|comet)\)$/i,``),o=e.match(/ ([A-D])$/);o&&!a.endsWith(` ${o[1]}`)&&(a+=` ${o[1]}`),a!==e&&(t[e]=a)}n(t)}function cl(){return nl??=rl?fetch(rl).then(e=>e.ok?e.json():null).catch(()=>null):Promise.resolve(null),nl}function ll(e){return e?(new DOMParser().parseFromString(e,`text/html`).body.textContent??``).replace(/\s+/g,` `).trim():``}function ul(e){let t=il.get(e);if(!t){let n=new URLSearchParams({action:`query`,titles:`File:${e}`,prop:`imageinfo`,iiprop:`url|extmetadata`,iiurlwidth:String(el),iiextmetadatalanguage:`cs`,format:`json`,origin:`*`});t=fetch(`${tl}?${n}`).then(e=>e.ok?e.json():null).then(e=>{let t=(e&&Object.values(e.query?.pages??{})[0])?.imageinfo?.[0];if(!t?.thumburl)return null;let n=t.extmetadata??{},r=ll(n.Artist?.value)||ll(n.Credit?.value),i=ll(n.LicenseShortName?.value)||ll(n.UsageTerms?.value);return!r||!i?null:{thumb:t.thumburl,page:t.descriptionurl,author:r,license:i,licenseUrl:n.LicenseUrl?.value??null,desc:ll(n.ImageDescription?.value)}}).catch(()=>null),il.set(e,t)}return t}function dl(e,t){let n=`${e} ${t}`;return/artist|concept|impression|illustration|rendering|umělecká|představa/i.test(n)?`umělecká představa, ne fotografie`:/light ?curve/i.test(n)?`světelná křivka (graf jasnosti)`:/constellation|IAU\.svg|star ?chart|\bmap\b|location of/i.test(n)?`mapa – poloha na obloze`:/diagram|comparison|compare|sizes/i.test(n)?`schéma nebo srovnání`:null}var fl=`CDS/P/DSS2/color`,pl=`Digitized Sky Survey – STScI/NASA, obarveno CDS`,ml=`https://alasky.cds.unistra.fr/hips-image-services/hips2fits`,hl=`if(!this.dataset.bis){this.dataset.bis='1';this.src=this.src.replace('//alasky.','//alaskybis.')}else{this.closest('figure').outerHTML='<span class=dim>Výřez oblohy se nepodařilo načíst.</span>'}`;function gl(e){let[t,n]=ut(e.l,e.b),r=e.fovDeg,i=new URLSearchParams({hips:fl,ra:t.toFixed(5),dec:n.toFixed(5),fov:r.toFixed(4),width:String(el),height:String(el),projection:`TAN`,format:`jpg`}),a=`https://aladin.cds.unistra.fr/AladinLite/?${new URLSearchParams({target:`${t.toFixed(5)} ${n>=0?`+`:``}${n.toFixed(5)}`,fov:r.toFixed(3),survey:fl})}`,o=r>=1?`${K(r,1)}°`:`${K(r*60,0)}′`;return`<div class="imgBox"><figure class="sky">
      <a href="${J(a)}" target="_blank" rel="noopener"><img src="${J(`${ml}?${i}`)}" alt="Výřez oblohy kolem objektu" loading="lazy"
        onerror="${hl}"></a>
      <figcaption><span class="imgKind">výřez z přehlídky oblohy (fotka tohoto objektu není)</span><br>
        Pole ${o}, střed = poloha objektu, sever nahoře. Snímek: ${J(pl)} ·
        služba <a href="https://alasky.cds.unistra.fr/hips-image-services/hips2fits" target="_blank" rel="noopener">hips2fits (CDS)</a> ·
        <a href="${J(a)}" target="_blank" rel="noopener">otevřít v Aladin Lite</a></figcaption>
    </figure></div>`}var _l=(e,t)=>e.length>t?`${e.slice(0,t-1).trimEnd()}…`:e,vl=(e,t)=>`https://${e}.wikipedia.org/wiki/${encodeURIComponent(t.replace(/ /g,`_`))}`,yl=`https://cs.wikipedia.org/api/rest_v1/page/summary/`,bl=900,xl=new Map;function Sl(e,t=`cs`){let n=`${t}:${e}`,r=xl.get(n);return r||(r=fetch(yl.replace(`cs.`,`${t}.`)+encodeURIComponent(e.replace(/ /g,`_`))).then(e=>e.ok?e.json():null).then(n=>!n||n.type!==`standard`||typeof n.extract!=`string`||!n.extract.trim()?null:{title:n.title??e,extract:n.extract.trim(),page:n.content_urls?.desktop?.page??vl(t,e)}).catch(()=>null),xl.set(n,r)),r}function Cl(e){let t=new URLSearchParams({action:`query`,prop:`langlinks`,lllang:`en`,titles:e,redirects:`1`,format:`json`,origin:`*`});return fetch(`https://cs.wikipedia.org/w/api.php?${t}`).then(e=>e.ok?e.json():null).then(e=>{let t=e?.query?.pages??{};for(let e in t){let n=t[e].langlinks?.[0]?.[`*`];if(n)return n}return null}).catch(()=>null)}function wl(e){return e.replace(/\(\s*[,;]?\s*\)/g,``).replace(/[ \t\u00a0]+([,.;:])/g,`$1`).replace(/([,;:])[ \t]*\n+\s*/g,`$1 `).replace(/[ \t]{2,}/g,` `).trim()}function Tl(e,t){if(e.length<=t)return e;let n=e.slice(0,t),r=Math.max(n.lastIndexOf(`. `),n.lastIndexOf(`.
`));return r>t/3?n.slice(0,r+1):`${n.trimEnd()}…`}async function El(e,n,r,i=()=>!0){let a=(await cl())?.vrstvy[n]?.[r]?.[3];if(!a||!i())return;e.innerHTML=`<p class="dim">Načítám popis z Wikipedie…</p>`;let o=t()===`en`?await Cl(a):null,s=o?`en`:`cs`,c=await Sl(o??a,s);if(!i())return;if(!c){e.innerHTML=``;return}let l=`https://${s}.wikipedia.org/w/index.php?${new URLSearchParams({title:c.title,action:`history`})}`,u=Tl(wl(c.extract),bl).split(/\n+/).map(e=>`<p>${J(e)}</p>`).join(``),d=`<a href="${J(c.page)}" target="_blank" rel="noopener">${J(c.title)}</a>`,f=`<a href="${J(l)}" target="_blank" rel="noopener">`;e.innerHTML=s===`en`?`<h4 data-no-i18n>From Wikipedia</h4><div data-no-i18n>${u}</div>
    <div class="src" data-no-i18n>Text: article ${d} from the English Wikipedia (${f}authors</a>), licence
      <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener">CC BY-SA 4.0</a>; may be shortened.</div>`:`<h4>Z Wikipedie</h4><div data-no-i18n>${u}</div>
    <div class="src">Text: článek ${d} z české Wikipedie
      (${f}autoři</a>), licence
      <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.cs" target="_blank" rel="noopener">CC BY-SA 4.0</a>; může být zkrácený.</div>`}async function Dl(e,t,n,r=()=>!0,i=null){let a=(await cl())?.vrstvy[t]?.[n];if(!r())return;if(!a){i&&(e.innerHTML=gl(i));return}let[o,s,c,l,u]=a,d=[l?`<a href="${vl(`cs`,l)}" target="_blank" rel="noopener">Wikipedie (česky)</a>`:null,!l&&u?`<a href="${vl(`en`,u)}" target="_blank" rel="noopener">Wikipedie (anglicky)</a>`:null,`<a href="https://www.wikidata.org/wiki/${o}" target="_blank" rel="noopener">Wikidata</a>`].filter(Boolean).join(` · `),f=c&&c.toLowerCase()!==n.toLowerCase()?`<div class="imgName">česky: <b data-no-i18n>${J(c)}</b></div>`:``;if(!s){e.innerHTML=`${f}${i?gl(i):``}<div class="imgLinks">${d}</div>`;return}e.innerHTML=`${f}<div class="imgBox dim">Načítám obrázek…</div><div class="imgLinks">${d}</div>`;let p=await ul(s);if(!r())return;let m=e.querySelector(`.imgBox`);if(!p){m.innerHTML=`<a href="${`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(s.replace(/ /g,`_`))}`}" target="_blank" rel="noopener">Obrázek na Wikimedia Commons</a> (náhled se nepodařilo načíst)`;return}let h=p.licenseUrl?`<a href="${J(p.licenseUrl)}" target="_blank" rel="noopener">${J(p.license)}</a>`:J(p.license),g=dl(s,p.desc);m.className=`imgBox`,m.innerHTML=`<figure>
      <a href="${J(p.page)}" target="_blank" rel="noopener"><img src="${J(p.thumb)}" alt="${J(_l(p.desc||n,120))}" loading="lazy"></a>
      <figcaption>${g?`<span class="imgKind">${J(g)}</span><br>`:``}${p.desc?`<span class="imgDesc">${J(_l(p.desc,160))}<br></span>`:``}Autor: ${J(_l(p.author,120))} · Licence: ${h} ·
        <a href="${J(p.page)}" target="_blank" rel="noopener">Wikimedia Commons</a></figcaption>
    </figure>`}function Ol(e,t){for(let n of e)if(n.layer===`exoplanety`){let e=t.exoplanety[n.name];if(!e)continue;e.iau&&(n.nick=e.iau),n.planetNames=e.planety,n.aliases=[...n.aliases??[],...e.iau?[e.iau]:[],...Object.values(e.planety??{})]}else{let e=t.cs[n.layer]?.[n.name];if(!e)continue;let r=e.find(e=>!/^M\d+$/.test(e));r&&(n.nick=r,n.label=r),n.aliases=[...n.aliases??[],...e]}}var kl=120/3600*(Math.PI/180),Al=5/3600*(Math.PI/180),jl=.25;function Ml(e,t,n){let r=t.flatMap(e=>{let t=n(e);return t?[{o:e,d:t}]:[]}),i=0;for(let t of e){let e=n(t);if(!e)continue;let a=null,o=1/0;for(let n of r){let r=e.angleTo(n.d);if(r>=o||r>kl)continue;let i=t.distLy,s=n.o.distLy;(i!=null&&s!=null?Math.abs(i-s)/Math.max(i,s)<=jl:r<=Al)&&!n.o.twin&&(a=n.o,o=r)}a&&(t.twin=a,t.secondary=!0,a.twin=t,a.searchNames=[t.name,...t.aliases??[]],t.searchNames=[a.name,...a.aliases??[]],!a.nick&&!a.label&&(a.label=t.label??t.name),i++)}return i}function Nl(e){let t=e.twin;return!t||t.hidden||!t.pos?!1:!!e.secondary||!e.pos}var Pl=e=>(Math.abs(e)>=100?e.toFixed(1):e.toFixed(3)).replace(/\.?0+$/,``),Fl=e=>String(+e.toPrecision(4));function Il(e,t){e.dist&&t.set(`d`,`${Fl(e.dist[0])}-${Number.isFinite(e.dist[1])?Fl(e.dist[1]):``}`);for(let[n,r]of Object.entries(e.ranges))r&&t.set(n,`${r[0]}-${r[1]}`);for(let[n,r]of Object.entries(e.checks))r&&t.set(n,r.join(`.`))}function Ll(e,t){let n=structuredClone(Ko),r=e=>{let t=e?.match(/^([\d.]*)-([\d.]*)$/);if(!t)return null;let n=t[1]?+t[1]:0,r=t[2]?+t[2]:1/0;return Number.isNaN(n)||Number.isNaN(r)?null:[n,r]},i=r(e.get(`d`));n.dist=i&&i[0]<=i[1]&&(i[0]>0||Number.isFinite(i[1]))?i:null;for(let i of t)for(let t of i.facets)if(t.kind===`range`){let i=r(e.get(t.id)),a=i?Math.max(t.min,i[0]):t.min,o=i?Math.min(t.max,i[1]):t.max;n.ranges[t.id]=a<=o&&(a>t.min||o<t.max)?[a,o]:null}else{let r=new Set(t.options.map(e=>e.value)),i=(e.get(t.id)??``).split(`.`).filter(Boolean).map(Number).filter(e=>r.has(e));n.checks[t.id]=i.length&&i.length<r.size?i:null}return n}var Rl=class{last=``;scale=null;onScale=null;stage;hud;layers;tours;constructor(e,t,n,r=null){this.stage=e,this.hud=t,this.layers=n,this.tours=r,addEventListener(`hashchange`,()=>this.apply(location.hash,!0)),setInterval(()=>this.write(),500)}current(){let e=new URLSearchParams,t=this.hud.selection;t&&e.set(`o`,`${t.layer}:${t.name}`);let{camera:n,controls:r}=this.stage;e.set(`c`,[...n.position.toArray(),...r.target.toArray()].map(Pl).join(`,`)),Il(this.hud.filters.current,e),is.t&&e.set(`t`,String(Math.round(is.t*1e4)/1e4));let i=this.scale?.();i&&i!==`galaxie`&&e.set(`m`,i);let a=this.tours?.current;return a&&(e.set(`vylet`,a.id),e.set(`krok`,String(a.step+1))),`#`+e.toString().replace(/%2C/g,`,`).replace(/%3A/g,`:`)}write(){let e=this.current();e!==this.last&&(this.last=e,history.replaceState(null,``,e))}apply(e,t=!1){if(!e||e===`#`||e===this.last)return!1;let n=new URLSearchParams(e.slice(1));this.hud.filters.set(Ll(n,this.layers));let r=parseFloat(n.get(`t`)??`0`);is.set(Number.isFinite(r)?r:0);let i=n.get(`m`);(i===`vesmir`||i===`soustava`)&&this.onScale?.(i);let a=n.get(`c`)?.split(`,`).map(Number),o=a&&a.length===6&&a.every(Number.isFinite)?a:null;if(o){let e=new W(o[3],o[4],o[5]),n=new W(o[0],o[1],o[2]);t?this.stage.flyTo(e,n.distanceTo(e),n.clone().sub(e)):this.stage.jumpTo(e,n.sub(e))}let s=n.get(`vylet`);if(s&&this.tours){let t=Math.max(1,parseInt(n.get(`krok`)??`1`,10)||1)-1;return this.tours.start(s,t),this.last=e,!0}let c=n.get(`o`),l;if(c){let t=c.indexOf(`:`),n=c.slice(t+1),r=this.layers.find(e=>e.id===c.slice(0,t));l=r?.objects.find(e=>e.name===n);let i=l||r instanceof Gs?null:r?.searchMore?r.searchMore().then(e=>e.find(e=>e.name===n)??null):r&&/^gaia/i.test(r.id)&&this.hud.gaiaLookup&&/^Gaia DR3 \d+$/.test(n)?this.hud.gaiaLookup(n.slice(9)):null;if(i)return this.hud.deselect(),i.then(e=>{e&&!this.hud.selection&&this.hud.select(e,!o)}).catch(e=>console.warn(`kotva:`,e)),this.last=e,!0;if(!l&&r instanceof Gs)return r.ensure().then(()=>{let e=r.objects.find(e=>e.name===c.slice(t+1));e&&!this.hud.selection&&this.hud.select(e,!o)}),this.last=e,!0}return l?this.hud.select(l,!o):this.hud.deselect(),this.last=this.current(),!!(o||l)}},zl=e=>document.getElementById(e),Bl=100,Vl=5,Hl=e=>10**(e/Bl*Vl),Ul=e=>Math.round(Math.log10(Math.max(1,e))/Vl*Bl),Wl=class{state=structuredClone(Ko);refresh=[];onChange;constructor(e,t){this.onChange=t;let n=zl(`filters`);n.appendChild(this.distBlock());for(let t of e)for(let e of t.facets)n.appendChild(this.facetBlock(t,e));let r=document.createElement(`button`);r.className=`btn small`,r.textContent=`Zrušit filtry`,r.onclick=()=>this.set(structuredClone(Ko)),n.appendChild(r);let i=zl(`filtersToggle`);i.onclick=()=>{n.hidden=!n.hidden,i.setAttribute(`aria-expanded`,String(!n.hidden))},this.updateBadge()}get current(){return this.state}get active(){let e=this.state;return!!e.dist||Object.values(e.checks).some(Boolean)||Object.values(e.ranges).some(Boolean)}set(e){this.state=e,this.refresh.forEach(e=>e()),this.emit()}emit(){this.updateBadge(),this.onChange(this.state)}updateBadge(){zl(`filtersToggle`).classList.toggle(`on`,this.active)}distBlock(){let e=Gl(`Vzdálenost od Slunce`,`Objekty bez známé vzdálenosti se při omezení skryjí.`),t=Kl(0,Bl,`Nejmenší vzdálenost`),n=Kl(0,Bl,`Největší vzdálenost`),r=document.createElement(`div`);r.className=`fval`;let i=()=>{let e=+t.value,i=+n.value;r.textContent=`${e===0?`0`:q(Hl(e))} – ${i===Bl?`∞`:q(Hl(i))}`},a=ql(t,n,()=>{let e=+t.value,r=+n.value;this.state.dist=e===0&&r===Bl?null:[e===0?0:Hl(e),r===Bl?1/0:Hl(r)],i(),this.emit()});return this.refresh.push(()=>{let e=this.state.dist;t.value=String(e&&e[0]>0?Ul(e[0]):0),n.value=String(e&&Number.isFinite(e[1])?Ul(e[1]):Bl),i(),a.paint()}),this.refresh.at(-1)(),e.append(r,a.el),e}facetBlock(e,t){let n=Gl(`${t.name} · ${e.name.toLowerCase()}`,t.kind===`checks`?`Čísla udávají počet planet. Systém se ukáže, když vyhoví aspoň jedna jeho planeta.`:``);if(t.kind===`checks`){let e=t.options.map(e=>e.value),r=t.options.map(e=>{let t=document.createElement(`label`);return t.className=`fcheck`,t.innerHTML=`<input type="checkbox" checked value="${e.value}"><span>${J(e.label)}</span><span class="dim">${_t(e.count)}</span>`,n.appendChild(t),t.querySelector(`input`)}),i=()=>{let n=r.filter(e=>e.checked).map(e=>+e.value);this.state.checks[t.id]=n.length===e.length?null:n,this.emit()};r.forEach(e=>e.onchange=i),this.refresh.push(()=>{let e=this.state.checks[t.id];r.forEach(t=>t.checked=!e||e.includes(+t.value))})}else{let e=Kl(t.min,t.max,`${t.name} od`),r=Kl(t.min,t.max,`${t.name} do`),i=document.createElement(`div`);i.className=`fval`;let a=()=>i.textContent=`${e.value} – ${r.value}`,o=ql(e,r,()=>{let n=+e.value,i=+r.value;this.state.ranges[t.id]=n===t.min&&i===t.max?null:[n,i],a(),this.emit()});this.refresh.push(()=>{let n=this.state.ranges[t.id];e.value=String(n?n[0]:t.min),r.value=String(n?n[1]:t.max),a(),o.paint()}),this.refresh.at(-1)(),n.append(i,o.el)}return n}};function Gl(e,t){let n=document.createElement(`fieldset`);return n.className=`fblock`,n.innerHTML=`<legend>${J(e)}</legend>${t?`<p class="dim">${J(t)}</p>`:``}`,n}function Kl(e,t,n){let r=document.createElement(`input`);return r.type=`range`,r.min=String(e),r.max=String(t),r.step=`1`,r.setAttribute(`aria-label`,n),r}function ql(e,t,n){let r=document.createElement(`div`);r.className=`fdual`;let i=document.createElement(`div`);i.className=`fill`,r.append(i,e,t);let a=+e.min,o=+e.max-a||1,s=()=>{i.style.left=`${(+e.value-a)/o*100}%`,i.style.right=`${100-(+t.value-a)/o*100}%`,e.style.zIndex=+e.value>a+o/2?`2`:``};return e.oninput=()=>{+e.value>+t.value&&(e.value=t.value),s(),n()},t.oninput=()=>{+t.value<+e.value&&(t.value=e.value),s(),n()},s(),{el:r,paint:s}}var Jl=class{open=null;btn=null;onNarrowOpen=null;constructor(){document.querySelectorAll(`[data-menu]`).forEach(e=>{let t=document.getElementById(e.dataset.menu);e.onclick=()=>this.open===t?this.close():this.show(t,e),t.querySelector(`.popClose`).onclick=()=>this.close(!0),t.addEventListener(`click`,e=>{let t=e.target.closest(`button`);!t||t.classList.contains(`popClose`)||t.hasAttribute(`aria-pressed`)||t.hasAttribute(`aria-expanded`)||t.hasAttribute(`data-keep`)||t.closest(`.legend`)||this.close()})}),addEventListener(`keydown`,e=>{e.key===`Escape`&&this.open&&!e.defaultPrevented&&(e.preventDefault(),this.close(!0))}),document.getElementById(`stage`).addEventListener(`pointerdown`,()=>{this.open&&Yl()&&this.close()}),addEventListener(`resize`,()=>this.place()),document.getElementById(`listToggle`).addEventListener(`click`,()=>requestAnimationFrame(()=>this.place())),new ResizeObserver(()=>this.place()).observe(document.getElementById(`bar`))}get isOpen(){return this.open!=null}show(e,t){this.close(),this.open=e,this.btn=t,e.hidden=!1,t.setAttribute(`aria-expanded`,`true`),Yl()&&this.onNarrowOpen?.(),this.place(),e.querySelector(`h2`)?.setAttribute(`tabindex`,`-1`),matchMedia(`(pointer: coarse)`).matches||e.querySelector(`h2`)?.focus({preventScroll:!0})}close(e=!1){if(!this.open)return;let t=this.open,n=this.btn,r=t.contains(document.activeElement);t.hidden=!0,n.setAttribute(`aria-expanded`,`false`),this.open=this.btn=null,(e||r)&&n.focus({preventScroll:!0})}place(){let e=this.open;if(!e)return;if(Yl()){e.style.left=``;return}let t=document.getElementById(`listPanel`),n=!t.classList.contains(`closed`)&&getComputedStyle(t).display!==`none`?t.getBoundingClientRect().right+10:12,r=e.getBoundingClientRect().width,i=Math.min(Math.max(this.btn.getBoundingClientRect().left,n),innerWidth-r-12);e.style.left=`${Math.max(12,i)}px`}},Yl=()=>matchMedia(`(max-width:760px)`).matches;function Xl(e,t,n,r=`closed`,i=!0){let a=i&&matchMedia(`(max-width:760px)`).matches;try{let e=localStorage.getItem(`galaxie.panel.${n}`);e!=null&&(a=e===`1`)}catch{}let o=()=>{t.classList.toggle(r,a),e.setAttribute(`aria-expanded`,String(!a)),e.setAttribute(`aria-pressed`,String(!a))};o(),e.addEventListener(`click`,()=>{a=!a,o();try{localStorage.setItem(`galaxie.panel.${n}`,a?`1`:`0`)}catch{}})}function Zl(e,t){let n=()=>document.documentElement.style.setProperty(t,`${Math.ceil(e.getBoundingClientRect().height)}px`);new ResizeObserver(n).observe(e),n()}var Ql=150,$=e=>document.getElementById(e),$l=e=>e===1?`objekt`:e>=2&&e<=4?`objekty`:`objektů`,eu=e=>e.normalize(`NFD`).replace(/\p{Diacritic}/gu,``).toLowerCase(),tu=class{selected=null;showLabels=!0;query=``;all=[];index=new Map;marker;filters;toastTimer=0;rows=new Map;cardExtra=null;objectCardHooks=[];legendSync=new Map;legendCounts=new Map;menus=new Jl;extraPick=null;gaiaLookup=null;cardCloseHandlers=[];views;stage;frame;layers;overlays;manifest;labels;constructor(t,n,r,i,a,o){e(()=>{let e=this.selected,t=$(`card`),n=t.querySelector(`.desc`);e&&n&&!t.hidden&&El(n,e.layer,e.name,()=>this.selected===e&&!t.hidden)}),this.stage=t,this.frame=n,this.layers=r,this.overlays=i,this.manifest=o,this.labels=a;for(let e of r)for(let t of e.objects)this.all.push(t),this.index.set(t,eu([t.name,...t.aliases??[],...t.searchNames??[]].join(` `)));this.all.sort((e,t)=>(e.distLy??0xe8d4a51000)-(t.distLy??0xe8d4a51000)),a.setProvider(()=>this.labelList()),i.sunLabel.pick=this.all.find(e=>e.layer===`slunecni-soustava`),this.marker=new O(new ge({map:t.glow,color:16777215,transparent:!0,depthWrite:!1,blending:2,opacity:.9})),this.marker.visible=!1,t.scene.add(this.marker);let s=n.sun;this.views={close:()=>t.flyTo(s,30,new W(-.35,.75,.55)),near:()=>t.flyTo(s,250,new W(-.35,.75,.55)),sun:()=>t.flyTo(s,14e3,new W(-.35,.75,.55)),top:()=>t.flyTo(new W,125e3,new W(1e-4,1,.02)),edge:()=>t.flyTo(new W,95e3,new W(.02,.04,1)),gc:()=>t.flyTo(new W,2e4,new W(-.6,.5,.6))},this.filters=new Wl(r,e=>{r.forEach(t=>t.applyFilter(e)),this.afterVisibilityChange()}),this.buildLegend(),this.buildBar(),this.buildSearch(),this.buildPicking(),this.buildMobile(),this.buildKeys(),this.renderList(),t.onFrame(()=>{if(r.forEach(e=>e.update?.(t)),this.updateScale(),this.selected&&this.marker.visible){let e=ru()?0:.15*Math.sin(performance.now()/300),n=t.camera.position.distanceTo(this.selected.anchor)*.035*(1+e);this.marker.scale.set(n,n,1)}}),this.updateCounts()}labelList(){if(!this.showLabels)return[];let e=[],t=e=>e.pos?e.label??e.name:`${e.label??e.name} (jen směr)`;this.selected&&e.push({key:this.selected,text:t(this.selected),pos:this.selected.anchor,priority:1e3});for(let n of this.layers)n.labelCandidates(this.stage).forEach((n,r)=>{n===this.selected||n.twin===this.selected||Nl(n)||e.push({key:n,text:t(n),pos:n.anchor,priority:(n.major?600:300)-r*.01})});return e}buildLegend(){let e=$(`legend`);for(let t of this.layers){if(!t.filters.length)continue;let n=document.createElement(`div`);n.className=`legRow`;let r=document.createElement(`div`);r.className=`legHead`;let i=document.createElement(`div`);i.className=`legChips`,i.id=`leg-${t.id}`,i.hidden=!0;let a=document.createElement(`button`);a.className=`legName`;let o=t.filters.length>1||!!t.legendExtra;a.innerHTML=o?`<span class="arr" aria-hidden="true">▸</span>${J(t.name)}`:J(t.name),o?(a.setAttribute(`aria-expanded`,`false`),a.setAttribute(`aria-controls`,i.id),a.title=`Ukázat typy`,a.onclick=()=>{i.hidden=!i.hidden,a.setAttribute(`aria-expanded`,String(!i.hidden))}):a.disabled=!0;let s=document.createElement(`span`);s.className=`legCnt`,this.legendCounts.set(t,s);let c=document.createElement(`button`);c.className=`legSw`,c.setAttribute(`aria-label`,`${t.name}: celá skupina`),c.title=`Zapnout / vypnout celou skupinu`;let l=[],u=()=>{let e=t.filters.some(e=>e.on);c.setAttribute(`aria-pressed`,String(e)),c.textContent=e?`zap`:`vyp`,n.classList.toggle(`off`,!e),n.hidden=t.id===`startrek`&&!e};c.onclick=()=>{let e=!t.filters.some(e=>e.on);for(let[n,r]of l)t.setFilter(r.key,e),n.setAttribute(`aria-pressed`,String(e));u(),this.afterVisibilityChange()},r.append(a,s,c);for(let e of t.filters){let n=document.createElement(`button`);n.className=`chip`,n.setAttribute(`aria-pressed`,String(e.on)),n.innerHTML=`<i style="background:var(${e.color})"></i>${J(e.name)}`,n.onclick=()=>{t.setFilter(e.key,!e.on),n.setAttribute(`aria-pressed`,String(e.on)),u(),this.afterVisibilityChange()},i.appendChild(n),l.push([n,e])}let d=t.legendExtra?.();d&&i.appendChild(d),n.append(r,i),e.appendChild(n),u(),this.legendSync.set(t.id,()=>{for(let[e,t]of l)e.setAttribute(`aria-pressed`,String(t.on));u()})}let t=document.querySelector(`header.hud`),n=()=>document.documentElement.style.setProperty(`--header-h`,`${t.getBoundingClientRect().bottom}px`);new ResizeObserver(n).observe(t),n();let r=$(`galInfoBtn`);r.onclick=()=>{let e=!t.classList.contains(`collapsed`);e||this.fillHead(),t.classList.toggle(`collapsed`,e),r.setAttribute(`aria-expanded`,String(!e))}}syncLayer(e){this.legendSync.get(e)?.(),this.afterVisibilityChange()}afterVisibilityChange(){this.selected?.hidden?this.closeCard():this.selected&&this.select(this.selected,!1),this.renderList(),this.updateCounts()}updateCounts(){for(let[e,t]of this.legendCounts){let n=e.objects.filter(e=>!e.hidden),r=t=>e.countNum?.(t)??t.length,i=r(n),a=r(e.objects);t.textContent=this.filters.active&&i<a?`${_t(i)} z ${_t(a)}`:_t(i),t.title=e.countText?.(e.objects.filter(e=>!e.hidden),this.filters.active)??``}}fillHead(){let e=this.manifest.r0_pc,t=(e,t)=>_t(Math.round(e*Y/t)*t);$(`galInfo`).innerHTML=`Naše Galaxie: disk o průměru ~87 000 ly, Slunce ~${t(e,100)} ly od centra
      (R₀ = ${(e/1e3).toLocaleString(`cs-CZ`)} kpc, ${J(this.manifest.r0_zdroj)}) a ~${t(20.8,1)} ly nad rovinou disku
      (Bennett &amp; Bovy 2019). Spirální ramena podle Reid et al. 2019.`,$(`galSrc`).textContent=`Zobrazeno: ${this.summary()}. Zdroje a licence katalogů: ⋯ → Zdroje.`}summary(){return this.layers.filter(e=>e.filters.some(e=>e.on)).map(e=>{let t=e.objects.filter(e=>!e.hidden);if(e.countText)return`${e.name}: ${e.countText(t,this.filters.active)}`;let n=t.length;return this.filters.active?`${e.name}: ${_t(n)} z ${_t(e.objects.length)}`:`${e.name}: ${_t(n)}`}).join(` · `)}moreLoading=!1;loadMore(){if(!this.moreLoading){this.moreLoading=!0;for(let e of this.layers)e.searchMore?.().then(e=>{for(let t of e)this.all.push(t),this.index.set(t,eu([t.name,...t.aliases??[],...t.searchNames??[]].join(` `)));this.query&&this.renderList()}).catch(t=>console.warn(`hledání (${e.name}):`,t))}}buildSearch(){let e=$(`search`);e.addEventListener(`input`,()=>{this.query=eu(e.value.trim()),this.query&&this.loadMore(),this.renderList()}),e.addEventListener(`keydown`,t=>{t.key===`Enter`&&$(`list`).querySelector(`.row`)?.click(),t.key===`ArrowDown`&&(t.preventDefault(),$(`list`).querySelector(`.row`)?.focus()),t.key===`Escape`&&(e.value=``,this.query=``,this.renderList(),e.blur())}),Xl($(`listToggle`),$(`listPanel`),`seznam`),$(`list`).addEventListener(`keydown`,t=>{let n=[...this.rows.keys()],r=n.indexOf(document.activeElement);if(r<0)return;let i={ArrowDown:r+1,ArrowUp:r-1,PageDown:r+10,PageUp:r-10,Home:0,End:n.length-1}[t.key];i!=null&&(t.preventDefault(),i<0?e.focus():this.focusRow(n[Math.min(i,n.length-1)]))})}focusRow(e){for(let t of this.rows.keys())t.tabIndex=t===e?0:-1;e.focus()}describe(e,t){let n=this.layers.find(t=>t.id===e.layer),r=n?.kindName?.(e)??n?.name??``,i=e.distLy!=null&&e.distLy>0?`${ht(e.distLy)} od Slunce`:e.layer===`slunecni-soustava`?``:`vzdálenost neznámá, na mapě jen směr`;return[e.name+(e.nick&&e.nick!==t?` (${e.nick})`:``),t,r,i].filter(Boolean).join(`, `)}announce(e){let t=$(`announce`);t.textContent=``,requestAnimationFrame(()=>t.textContent=e)}renderList(){let e=$(`list`),t=this.rows.get(document.activeElement);e.textContent=``,this.rows.clear();let n=this.query,r=this.all.filter(e=>!e.hidden&&!Nl(e)&&(n?this.index.get(e).includes(n):!e.searchOnly));if(n){let e=e=>eu(e.name)===n?0:[...e.aliases??[],...e.searchNames??[]].some(e=>eu(e)===n)?1:2;r.sort((t,n)=>e(t)-e(n))}let i=document.createDocumentFragment(),a=this.gaiaLookup?ra($(`search`).value):null;a&&i.appendChild(this.gaiaRow(a));for(let e of r.slice(0,Ql)){let t=document.createElement(`button`);t.className=`row`+(e===this.selected?` on`:``);let r=n&&!eu(e.name).includes(n)?[...e.aliases??[],...e.searchNames??[]].find(e=>eu(e).includes(n)):void 0,a=e.nick??(e.label&&e.label!==e.name?e.label:void 0),o=r&&r!==a?r:a;t.innerHTML=`<i style="background:${e.color}"></i><span class="nm">${J(e.name)}${o?` <span class="dim">· ${J(o)}</span>`:``}</span><span class="ds">${e.searchOnly?`Sl. soustava`:e.distLy==null?`?`:q(e.distLy)}</span>`,t.setAttribute(`aria-label`,this.describe(e,o)),e===this.selected&&t.setAttribute(`aria-current`,`true`),t.tabIndex=-1,t.onclick=()=>this.select(e,!0),i.appendChild(t),this.rows.set(t,e)}e.appendChild(i);let o=[...this.rows.keys()],s=o.find(e=>this.rows.get(e)===(t??this.selected))??o[0];s&&(s.tabIndex=0),t&&(s&&this.rows.get(s)===t?s.focus({preventScroll:!1}):$(`search`).focus()),$(`listCount`).textContent=r.length>Ql?`${_t(Ql)} nejbližších z ${_t(r.length)}`:`${_t(r.length)} ${$l(r.length)}`}gaiaRow(e){let t=document.createElement(`button`);t.className=`row`;let n=`Najít hvězdu Gaia DR3 ${e}`;return t.innerHTML=`<i style="background:var(--fg)"></i><span class="nm">${J(n)}</span><span class="ds">VizieR</span>`,t.setAttribute(`aria-label`,`${n} – poloha se zjistí dotazem do katalogu VizieR`),t.tabIndex=-1,t.onclick=async()=>{let n=t.querySelector(`.nm`);n.textContent=`Hledám Gaia DR3 ${e}…`;try{let t=await this.gaiaLookup(e);t?this.select(t,!0):n.textContent=`Gaia DR3 ${e}: v mapě není`}catch(t){console.error(t),n.textContent=`Gaia DR3 ${e}: ${t.message}`}},this.rows.set(t,null),t}select(e,t){this.selected=e,this.layers.forEach(t=>t.onSelect?.(e));let n=this.layers.find(t=>t.id===e.layer),r=$(`card`);if(r.innerHTML=`<button class="close" aria-label="Zavřít kartu">×</button>${n.cardHtml(e)}`,r.querySelector(`h3`)?.setAttribute(`id`,`cardTitle`),e.nick){let t=document.createElement(`div`);t.className=`nick`,t.innerHTML=e.layer===`exoplanety`?`Jméno hvězdy schválené IAU: <b>${J(e.nick)}</b>`:`Česky: <b>${J(e.nick)}</b>`,r.querySelector(`h3`)?.after(t)}r.hidden=!1,r.scrollTop=0,r.querySelector(`.close`).onclick=()=>this.closeCard();let i=n.detailLabel?.(e);if(i&&n.openDetail){let t=document.createElement(`button`);t.className=`btn detail`,t.textContent=i,t.onclick=()=>n.openDetail(e),r.querySelector(`h3`)?.after(t)}if(e.twin){let t=e.twin,n=this.layers.find(e=>e.id===t.layer),i=document.createElement(`p`);i.className=`twin`,i.innerHTML=`Táž hvězda ve vrstvě ${J(n?.name??t.layer)}: <button class="linkish">${J(t.name)}</button>`,i.querySelector(`button`).onclick=()=>this.select(t,!1),r.querySelector(`.nick, h3`)?.after(i)}if(e.pos&&(e.distLy??0)>0){let t=document.createElement(`button`);t.className=`btn detail`,t.textContent=`Pohled odtud ke Slunci ▸`,t.title=`Kamera se přesune do objektu a podívá se k nám`,t.onclick=()=>this.lookFrom(e),r.querySelector(`.btn.detail, h3`)?.after(t)}this.cardExtra?.(r);for(let t of this.objectCardHooks)t(r,e);let a=document.createElement(`div`);a.className=`desc`,r.appendChild(a),El(a,n.id,e.name,()=>this.selected===e&&!r.hidden);let o=document.createElement(`div`);o.className=`imgs`,r.appendChild(o),Dl(o,n.id,e.imgName??e.name,()=>this.selected===e&&!r.hidden,n.skyPos?.(e)??null),this.marker.position.copy(e.anchor),this.marker.visible=!0,this.fitCenter(),this.renderList(),t&&this.announce(`Vybráno: ${this.describe(e)}. Podrobnosti jsou v kartě objektu.`),t&&this.stage.flyTo(e.anchor,n.flyDistance(e))}lookFrom(e){let t=this.frame.sun,n=e.anchor.clone().sub(t);this.marker.visible=!1,matchMedia(`(max-width:760px)`).matches&&this.closeCard(),this.stage.flyTo(t,n.length(),n),this.toast(`Pohled z ${e.label??e.name} ke Slunci (${q(e.distLy??n.length())})`)}get selection(){return this.selected}closePanel(){$(`card`).hidden||this.closeCard()}deselect(){this.selected&&this.closeCard()}fitCenter(){let e=$(`card`);if(e.hidden||!matchMedia(`(max-width:760px)`).matches){this.stage.setCenterShift(0);return}this.menus.close();let t=(document.querySelector(`header.hud`).getBoundingClientRect().bottom+e.getBoundingClientRect().top)/2;this.stage.setCenterShift(Math.max(0,this.stage.height/2-t))}closeCard(){let e=$(`card`),t=this.selected,n=e.contains(document.activeElement),r=!e.hidden;if(e.hidden=!0,this.layers.forEach(e=>e.onSelect?.(null)),this.stage.setCenterShift(0),this.selected=null,this.marker.visible=!1,this.renderList(),n){let e=[...this.rows].find(([,e])=>e===t)?.[0];e?this.focusRow(e):$(`search`).focus()}r&&this.cardCloseHandlers.forEach(e=>e())}showPanel(e){e&&!$(`card`).hidden&&this.cardCloseHandlers.forEach(e=>e()),this.selected=null,this.layers.forEach(e=>e.onSelect?.(null)),this.marker.visible=!1;let t=$(`card`);return t.innerHTML=`<button class="close" aria-label="Zavřít kartu">×</button>`,t.querySelector(`.close`).onclick=()=>this.closeCard(),t.hidden=!1,t.scrollTop=0,e?e(t):this.cardExtra?.(t),this.fitCenter(),this.renderList(),t}showAbout(){$(`card`).hidden||this.cardCloseHandlers.forEach(e=>e()),this.selected=null,this.marker.visible=!1;let e=$(`card`),t=this.manifest,n=t.katalogy.map(e=>`<h4>${J(e.nazev)}</h4>
      <p>${J(e.zdroj)}${e.url?` · <a href="${J(e.url)}" target="_blank" rel="noopener">web</a>`:``}<br>
      <span class="dim">Licence: ${J(e.licence)}${e.stazeno?` · staženo ${J(e.stazeno.slice(0,10))}`:``}${e.vyrez?` · <b>jen testovací výřez</b>`:``}</span></p>
      ${e.poznamka?`<p class="dim">${J(e.poznamka)}</p>`:``}
      ${e.citace?`<p class="cite">${J(e.citace)}</p>`:``}`).join(``);e.innerHTML=`<button class="close" aria-label="Zavřít kartu">×</button>
      <div class="kind">O mapě</div><h3 id="cardTitle" tabindex="-1">Zdroje dat</h3>
      <p>Poloha objektů je vůči Slunci. Vzdálenost Slunce od centra Galaxie R₀ = ${(t.r0_pc/1e3).toLocaleString(`cs-CZ`)} kpc
      (${J(t.r0_zdroj)}); Slunce leží 20,8 ± 0,3 pc nad střední rovinou disku (Bennett &amp; Bovy 2019, MNRAS 482, 1417),
      centrum je v poloze Sgr A*, proto jsou rovina disku, ramena a mřížka vůči galaktickým souřadnicím natočené o ~0,15°. Spirální ramena podle Reid et al. 2019 (ApJ 885, 131, tab. 2; parametry
      přes knihovnu SpiralMap, MIT); ztlumené úseky jsou mimo rozsah modelu, doložené jen masery. Příčka a výplň disku
      jsou schematické.</p>
      <p class="dim">Zobrazeno: ${J(this.summary())}${t.katalogy.some(e=>e.vyrez)?` <span class="warn" title="Data jsou jen testovací výřez katalogu. Spusť pipeline/exoplanety.py.">výřez dat</span>`:``}</p>${n}`,e.hidden=!1,e.querySelector(`.close`).onclick=()=>this.closeCard(),this.fitCenter(),e.querySelector(`h3`).focus()}buildBar(){document.querySelectorAll(`[data-view]`).forEach(e=>e.onclick=()=>this.views[e.dataset.view]()),document.querySelectorAll(`[data-tog]`).forEach(e=>e.onclick=()=>{let t=e.dataset.tog,n=t===`labels`?this.showLabels=!this.showLabels:this.overlays.toggle(t);e.setAttribute(`aria-pressed`,String(n))}),$(`about`).onclick=()=>this.showAbout(),$(`share`).onclick=()=>this.share()}async share(){let e=location.href,t=this.selected?`${this.selected.name} · Mapa Mléčné dráhy`:`Mapa Mléčné dráhy`;if(navigator.share&&matchMedia(`(pointer: coarse)`).matches)try{await navigator.share({title:t,url:e});return}catch(e){if(e.name===`AbortError`)return}try{await navigator.clipboard.writeText(e),this.toast(`Odkaz na tento pohled je ve schránce`)}catch{prompt(`Zkopíruj odkaz:`,e)}}toastPublic(e){this.toast(e)}toast(e){let t=$(`toast`);t.textContent=e,t.hidden=!1,clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>t.hidden=!0,Math.max(2500,e.length*50))}updateScale(){let{height:e}=this.stage,t=2*this.stage.viewDistance*Math.tan(_o.FOV*Math.PI/360)/e,n=t*130,r=10**Math.floor(Math.log10(n)),i=[5,2,1].map(e=>e*r).find(e=>e<=n)??r;$(`scaleLine`).style.width=`${(i/t).toFixed(0)}px`,$(`scaleTxt`).textContent=`${q(i)} · ${gt(i)}`,$(`readout`).textContent=`střed pohledu: ${q(this.stage.controls.target.distanceTo(this.frame.sun))} od Slunce`}buildMobile(){let e=$(`card`),t=null;e.addEventListener(`touchstart`,n=>{t=e.scrollTop<=0?n.touches[0].clientY:null},{passive:!0}),e.addEventListener(`touchmove`,n=>{if(t==null)return;let r=Math.max(0,n.touches[0].clientY-t);e.style.transition=`none`,e.style.transform=r?`translateY(${r}px)`:``},{passive:!0}),e.addEventListener(`touchend`,n=>{if(t==null)return;let r=n.changedTouches[0].clientY-t;e.style.transition=``,e.style.transform=``,t=null,r>80&&this.closeCard()}),addEventListener(`resize`,()=>this.fitCenter());let n=()=>matchMedia(`(max-width:760px)`).matches;this.menus.onNarrowOpen=()=>{$(`listPanel`).classList.contains(`closed`)||$(`listToggle`).click(),$(`card`).hidden||this.closeCard()},$(`listToggle`).addEventListener(`click`,()=>{n()&&!$(`listPanel`).classList.contains(`closed`)&&this.menus.close()}),Zl($(`bar`),`--bar-h`);let r=$(`touchHint`),i=!1;try{i=localStorage.getItem(`galaxie.touchHint`)===`1`}catch{}matchMedia(`(pointer: coarse)`).matches&&!i&&(r.hidden=!1,r.querySelector(`button`).onclick=()=>{r.hidden=!0;try{localStorage.setItem(`galaxie.touchHint`,`1`)}catch{}})}buildKeys(){let e=e=>e instanceof HTMLElement&&(e.tagName===`INPUT`||e.tagName===`TEXTAREA`||e.isContentEditable);addEventListener(`keydown`,t=>{t.defaultPrevented||this.stage.paused||t.ctrlKey||t.metaKey||t.altKey||(t.key===`/`&&!e(t.target)?(t.preventDefault(),$(`listPanel`).classList.contains(`closed`)&&$(`listToggle`).click(),$(`search`).focus(),$(`search`).select()):t.key===`Escape`&&!$(`card`).hidden&&!e(t.target)&&(t.preventDefault(),this.closeCard()))}),$(`skip`).onclick=()=>{$(`listPanel`).classList.contains(`closed`)&&$(`listToggle`).click(),$(`search`).focus()}}buildPicking(){let e=this.stage.renderer.domElement,t=null,n=null,r=0,i=new W,a=(e,t,n,r)=>{let a=null,o=n;for(let n of this.all){if(n.hidden||n.listOnly||n.searchOnly||Nl(n)||(i.copy(n.anchor).project(this.stage.camera),i.z>1))continue;let s=Math.hypot((i.x+1)/2*r.width-e,(1-i.y)/2*r.height-t);s<o&&(o=s,a=n)}return a},o=e=>{let t=this.labels.hitTest(e.clientX,e.clientY);return t&&this.all.includes(t)?t:null};e.addEventListener(`pointerdown`,e=>t=[e.clientX,e.clientY]),e.addEventListener(`pointermove`,t=>{t.pointerType!==`mouse`||t.buttons||(e.style.cursor=o(t)?`pointer`:``)}),e.addEventListener(`pointerup`,i=>{if(!t||Math.hypot(i.clientX-t[0],i.clientY-t[1])>6)return;let s=e.getBoundingClientRect(),c=i.clientX-s.left,l=i.clientY-s.top,u=performance.now();if(n&&u-n[0]<350&&Math.hypot(c-n[1],l-n[2])<40)clearTimeout(r),n=null,this.stage.zoomAt(c,l);else if(n=[u,c,l],i.pointerType===`touch`){clearTimeout(r);let e=o(i);r=window.setTimeout(()=>{let t=e??a(c,l,32,s);t?this.select(t,!0):this.extraPick?.(c,l,24,s)},300)}else{let e=o(i)??a(c,l,20,s);(e||this.extraPick?.(c,l,12,s))&&(e&&this.select(e,!0),n=null)}})}},nu=matchMedia(`(prefers-reduced-motion: reduce)`),ru=()=>nu.matches,iu=8,au={obj:[(e,t,n,r)=>[e+iu,t-r/2,n,r],(e,t,n,r)=>[e-iu-n,t-r/2,n,r],(e,t,n,r)=>[e-n/2,t-r-4,n,r],(e,t,n,r)=>[e-n/2,t+4,n,r]],sun:[(e,t,n,r)=>[e+iu,t-r/2,n,r],(e,t,n,r)=>[e-iu-n,t-r/2,n,r]],anno:[(e,t,n,r)=>[e-n/2,t-r/2,n,r]],ecl:[(e,t,n,r)=>[e-n/2,t-r/2,n,r]],ring:[(e,t,n,r)=>[e+4,t-r,n,r]]},ou=80,su=5,cu=class{items=[];slots=[];widths=new Map;lastPlace=new Map;provider=()=>[];tmp=new W;obstacles=[];frameNo=0;shown=0;hiddenByCollision=0;hitRects=[];root;stage;constructor(e,t){this.root=e,this.stage=t,t.onFrame(()=>this.update()),document.fonts?.ready.then(()=>this.widths.clear())}add(e,t,n,r=()=>!0,i=400){let a=this.makeEl(n);a.textContent=e;let o={el:a,pos:t,kind:n,priority:i,visible:r};return this.items.push(o),o}setProvider(e){this.provider=e}makeEl(e){let t=document.createElement(`div`);return t.className=`lbl ${e}`,t.style.display=`none`,this.root.appendChild(t),t}width(e,t,n,r){let i=n+`|`+t,a=this.widths.get(i);if(a===void 0){let n=e.style.display;e.style.display=``,r&&r.text!==t&&(e.textContent=t,r.text=t),a=e.offsetWidth,e.style.display=n,a>0&&this.widths.set(i,a)}return a}update(){let{camera:e,width:t,height:n}=this.stage,r=[];for(let e of this.items)e.visible()&&r.push({pos:e.pos,kind:e.kind,priority:e.priority,text:``,key:e,stat:e});let i=new Set;for(let e of this.provider())i.has(e.key)||(i.add(e.key),r.push({pos:e.pos,kind:`obj`,priority:e.priority,text:e.text,key:e.key}));r.sort((e,t)=>t.priority-e.priority),this.frameNo++%30==0&&this.measureObstacles();let a=[...this.obstacles],o=e=>e[0]<2||e[1]<2||e[0]+e[2]>t-2||e[1]+e[3]>n-2||a.some(t=>Tt(e,t)),s=new Set,c=new Map;this.hiddenByCollision=0;let l=r.map(r=>(this.tmp.copy(r.pos).project(e),kt(this.tmp.x,this.tmp.y,this.tmp.z,t,n,1.2))),u=new Map,d=new Map;for(let e of this.slots)d.set(e.key,e);let f=new Set(r.map(e=>e.key));r.forEach((e,t)=>{let n=l[t];if(!n)return;let r,i=e.text,p;if(e.stat)r=e.stat.el,i=r.textContent??``;else{if(s.size>=ou)return;p=d.get(e.key),(!p||s.has(p))&&(p=this.freeSlot(s,f)),r=p.el}let m=this.width(r,i,e.kind,p),h=e.kind===`ring`?12:14,g=au[e.kind],_=[this.lastPlace.get(e.key)??0,...g.keys()].filter((e,t,n)=>n.indexOf(e)===t&&e<g.length);for(let t of _){let r=g[t](n[0],n[1],m,h);if(!o(r)){a.push(r),(e.kind===`obj`||e.kind===`sun`)&&a.push([n[0]-su,n[1]-su,10,10]),c.set(e,[r,t]),p&&(p.key=e.key,s.add(p),u.set(e,p));return}}this.hiddenByCollision++});let p=new Map;this.lastPlace.clear(),this.hitRects=[];for(let[e,[t,n]]of c){let r=e.stat?e.stat.pick:e.key;r!==void 0&&(e.kind===`obj`||e.kind===`sun`)&&this.hitRects.push([t,r]);let i=u.get(e);i&&i.text!==e.text&&(i.el.textContent=e.text,i.text=e.text),p.set(i?i.el:e.stat.el,`translate(${t[0].toFixed(1)}px,${t[1].toFixed(1)}px)`),this.lastPlace.set(e.key,n)}for(let e of[...this.items.map(e=>e.el),...this.slots.map(e=>e.el)]){let t=p.get(e);t===void 0?lu(e):(e.style.display===`none`&&(e.style.display=``),e.style.transform=t)}this.shown=c.size}hitTest(e,t,n=4){for(let r=this.hitRects.length-1;r>=0;r--){let[i,a]=this.hitRects[r];if(e>=i[0]-n&&e<=i[0]+i[2]+n&&t>=i[1]-n&&t<=i[1]+i[3]+n)return a}}measureObstacles(){this.obstacles=[],document.querySelectorAll(`.hud`).forEach(e=>{if(e.hidden)return;let t=e.getBoundingClientRect();t.width>0&&t.height>0&&this.obstacles.push([t.left,t.top,t.width,t.height])})}freeSlot(e,t){let n;for(let r of this.slots)if(!e.has(r)){if(!t.has(r.key))return r;n??=r}if(n&&this.slots.length>=ou)return n;let r={el:this.makeEl(`obj`),text:``,key:null};return this.slots.push(r),r}};function lu(e){e.style.display!==`none`&&(e.style.display=`none`)}var uu=class{data=null;tours=[];state=null;get busy(){return this.state!=null}own=!1;url;hud;stage;layers;constructor(t,n,r,i){this.url=t,this.hud=n,this.stage=r,this.layers=i,n.cardExtra=e=>this.render(e),n.cardCloseHandlers.push(()=>this.state=null),e(()=>{let e=document.getElementById(`card`);this.state&&!e.hidden&&(e.querySelector(`.tour`)?.remove(),this.own=!0,this.render(e),this.own=!1)}),addEventListener(`keydown`,e=>{if(this.state?.mode!==`tour`||e.defaultPrevented||this.stage.paused||e.ctrlKey||e.metaKey||e.altKey)return;let t=e.target;if(t.tagName!==`INPUT`&&t.tagName!==`TEXTAREA`){if(e.key===`ArrowRight`)this.go(this.state.step+1);else if(e.key===`ArrowLeft`)this.go(this.state.step-1);else return;e.preventDefault()}})}get current(){return this.state?.mode===`tour`?{id:this.state.tour.id,step:this.state.step}:null}load(){return this.data??=fetch(this.url).then(e=>{if(!e.ok)throw Error(`HTTP ${e.status}`);return e.json()}).then(e=>this.tours=e.vylety.map(e=>({...e,zastavky:e.zastavky.filter(t=>this.checkStop(e,t))}))).catch(e=>{throw this.data=null,e}),this.data}checkStop(e,t){return t.o&&!this.find(t.o)?(console.warn(`výlet ${e.id}: objekt ${t.o} v datech není, zastávku vynechávám`),!1):t.pohled&&!this.hud.views[t.pohled]?(console.warn(`výlet ${e.id}: neznámý pohled ${t.pohled}`),!1):!0}find(e){let t=e.indexOf(`:`);return this.layers.find(n=>n.id===e.slice(0,t))?.objects.find(n=>n.name===e.slice(t+1))}async menu(){try{await this.load()}catch(e){alert(`Výlety se nepodařilo načíst: ${e.message}`);return}this.state={mode:`menu`},this.own=!0;let e=this.hud.showPanel();this.own=!1,e.querySelector(`.tourMenu button`)?.focus()}async start(e,t=0){let n=(await this.load().catch(()=>[])).find(t=>t.id===e);return!n||!n.zastavky.length?!1:(this.state={mode:`tour`,tour:n,step:0},this.go(Math.max(0,Math.min(t,n.zastavky.length-1))),!0)}go(e){let t=this.state;if(t?.mode!==`tour`||e<0||e>=t.tour.zastavky.length)return;let n=document.getElementById(`card`),r=document.activeElement?.closest(`.tour`)?document.activeElement.dataset.t??`next`:null;t.step=e;let i=t.tour.zastavky[e],a=i.o?this.find(i.o):null;if(this.own=!0,a?this.hud.select(a,!1):this.hud.showPanel(),this.own=!1,i.pohled)this.hud.views[i.pohled]();else if(a){let e=this.layers.find(e=>e.id===a.layer),t=i.smer?new W(...i.smer):void 0;this.stage.flyTo(a.anchor,i.vzdalenost??e.flyDistance(a),t)}this.hud.announce(`Zastávka ${e+1} z ${t.tour.zastavky.length}: ${fu(i,`nadpis`)}. ${du(fu(i,`text`),a)}`),r&&(n.querySelector(`.tour [data-t="${r}"]:not(:disabled)`)??n.querySelector(`.tour [data-t="next"]:not(:disabled), .tour [data-t="end"]`))?.focus()}render(e){let t=this.state;if(t?.mode===`menu`&&!this.own){this.state=null;return}if(!t)return;let n=document.createElement(`div`);if(n.className=`tour`,t.mode===`menu`){n.innerHTML=`<div class="kind">Výlety s komentářem</div><h3 id="cardTitle">Kam se vydáme?</h3>
          <div class="tourMenu">${this.tours.map(e=>`<button class="btn" data-id="${J(e.id)}">
            <b>${J(fu(e,`nazev`))}</b><span class="dim">${e.zastavky.length} zastávek · ${J(fu(e,`popis`))}</span></button>`).join(``)}</div>
          <p class="dim">Mezi zastávkami přepínáš tlačítky nebo šipkami ← →, kamerou můžeš na každé zastávce volně otáčet.</p>`,n.querySelectorAll(`[data-id]`).forEach(e=>e.onclick=()=>void this.start(e.dataset.id)),e.querySelector(`.close`).after(n);return}let{tour:r,step:i}=t,a=r.zastavky[i],o=a.o?this.find(a.o)??null:null,s=r.zastavky.length,c=o?`<h4>${J(fu(a,`nadpis`))}</h4>`:`<h3 id="cardTitle">${J(fu(a,`nadpis`))}</h3>`;n.setAttribute(`role`,`group`),n.setAttribute(`aria-label`,`Výlet ${fu(r,`nazev`)}, zastávka ${i+1} z ${s}`),n.innerHTML=`<div class="tourHead"><span class="kind">Výlet · ${J(fu(r,`nazev`))}</span><span class="tourStep">${i+1}/${s}</span></div>
      ${c}
      <div class="tourText" data-no-i18n>${pu(du(fu(a,`text`),o))}</div>
      <div class="src">Zdroj: ${J(fu(a,`zdroj`))}</div>
      <div class="tourNav">
        <button class="btn" data-t="prev"${i===0?` disabled`:``}>‹ Zpět</button>
        <button class="btn" data-t="next"${i===s-1?` disabled`:``}>Další ›</button>
        <button class="btn" data-t="end">${i===s-1?`Dokončit`:`Ukončit`}</button>
      </div>`,n.querySelector(`[data-t="prev"]`).onclick=()=>this.go(i-1),n.querySelector(`[data-t="next"]`).onclick=()=>this.go(i+1),n.querySelector(`[data-t="end"]`).onclick=()=>this.end(),e.querySelector(`.close`).after(n)}end(){this.state=null,document.getElementById(`card`).querySelector(`.close`)?.click()}};function du(e,n){let i=n?.distLy;if(i==null||!(i>0))return e;let a=n.pos?.y,o=t()===`en`,s=e=>o?r(e):e;return a!=null&&(e=e.replaceAll(`{z}`,o?`${s(q(Math.abs(a)))} ${a>=0?`above`:`below`} the Galactic plane`:`${q(Math.abs(a))} ${a>=0?`nad`:`pod`} rovinou Galaxie`)),e.replaceAll(`{d}`,s(q(i))).replaceAll(`{pc}`,s(gt(i))).replaceAll(`{voyager}`,s(ja(Aa(i,Oa))))}function fu(e,n){let r=t()===`en`?e[`${n}_en`]:null;return typeof r==`string`?r:String(e[n])}function pu(e){return e.split(/\n\s*\n/).map(e=>`<p>${J(e.trim())}</p>`).join(``)}var mu=63241.077,hu=15,gu=26e4,_u=.12,vu=5200,yu=380,bu={vesmir:`Vesmír`,galaxie:`Mléčná dráha`,soustava:`Sluneční soustava`},xu=class{busyFlag=!1;deps;uni=null;bar;edge;fadeEl;edgeTo=null;constructor(e){this.deps=e,this.bar=document.getElementById(`scales`),this.edge=document.getElementById(`scaleEdge`),this.fadeEl=document.getElementById(`scaleFade`),this.bar.addEventListener(`click`,e=>{let t=e.target.closest(`[data-scale]`);t&&this.go(t.dataset.scale)}),this.edge.onclick=()=>{this.edgeTo&&this.go(this.edgeTo)},addEventListener(`keydown`,e=>{let t=e.target;if(e.ctrlKey||e.metaKey||e.altKey||t.tagName===`INPUT`||t.tagName===`TEXTAREA`||t.tagName===`SELECT`||t.isContentEditable)return;let n={1:`vesmir`,2:`galaxie`,3:`soustava`}[e.key];n&&(e.preventDefault(),this.go(n))}),setInterval(()=>this.sync(),250),this.sync()}get busy(){return this.busyFlag}current(){return this.uni?.isOpen?`vesmir`:this.deps.peekSys()?.isSolar?`soustava`:`galaxie`}async go(e){let t=this.current();if(!this.busyFlag){if(e===t)e===`galaxie`&&this.deps.peekSys()?.close();else{this.busyFlag=!0,this.sync();try{t===`soustava`?await this.leaveSystem(e===`galaxie`):t===`vesmir`?await this.leaveUniverse(e===`galaxie`):this.deps.peekSys()?.close(),e===`soustava`?await this.enterSystem():e===`vesmir`&&await this.enterUniverse()}catch(e){console.error(e),await this.fade(!1)}finally{this.busyFlag=!1,this.sync()}}}}async jump(e){let t=this.current();if(!(this.busyFlag||e===t)){this.busyFlag=!0;try{this.uni?.close(),this.deps.peekSys()?.close(),e===`vesmir`?(await this.universe()).open():e===`soustava`&&await this.deps.openSolar()}finally{this.busyFlag=!1,this.sync()}}}async enterUniverse(){let{stage:e}=this.deps;await this.flyStage(new W,Math.max(gu,e.viewDistance));let t=await this.universe();await this.fade(!0),t.open({pos:e.camera.position,target:e.controls.target}),await this.fade(!1),await t.flyTo(new W,2.5,7200)}async leaveUniverse(e){let t=this.uni;await t.flyTo(new W,Math.min(gu/1e6,t.viewDistance),vu);let n=t.viewLy();await this.fade(!0),t.close(),this.deps.stage.jumpTo(n.target,n.pos.sub(n.target)),await this.fade(!1),e&&await this.flyStage(this.deps.home.target,this.deps.home.dist)}async enterSystem(){let{stage:e,sun:t}=this.deps;await this.flyStage(t,hu);let n=e.camera.position.clone().sub(e.controls.target).normalize();await this.fade(!0,`Načítám Sluneční soustavu…`),await this.deps.openSolar(),this.deps.peekSys()?.enter(pt(n),hu*mu),await this.fade(!1)}async leaveSystem(e){let t=this.deps.peekSys();await t.flyOut(hu*mu,vu);let n=dt(t.viewDir());await this.fade(!0),t.close();let{stage:r,sun:i}=this.deps;r.jumpTo(i,n.multiplyScalar(hu)),await this.fade(!1),e&&await this.flyStage(i,80)}universe(){return this.deps.universe().then(e=>(this.uni||(this.uni=e,e.onExit=()=>void this.go(`galaxie`)),e))}flyStage(e,t){let{stage:n}=this.deps;return n.flyTo(e,t,void 0,vu).then(()=>void 0)}fade(e,t=``){let n=this.fadeEl;n.querySelector(`span`).textContent=t,n.classList.toggle(`on`,e);let r=matchMedia(`(prefers-reduced-motion: reduce)`).matches;return new Promise(e=>setTimeout(e,r?0:yu))}sync(){let e=this.current();document.body.dataset.scale=e;for(let t of this.bar.querySelectorAll(`[data-scale]`))t.setAttribute(`aria-pressed`,String(t.dataset.scale===e)),t.disabled=this.busyFlag;let t=null,{stage:n,sun:r}=this.deps,i=this.deps.peekSys();this.busyFlag||(e===`vesmir`?t=this.uni.viewDistance<_u&&this.uni.targetFromCenter<.15?`galaxie`:null:e===`soustava`?t=i.viewDistance>.4*hu*mu?`galaxie`:null:i?.isOpen||n.driver||n.flying||(n.viewDistance>.8*gu?t=`vesmir`:n.viewDistance<45&&n.controls.target.distanceTo(r)<45&&(t=`soustava`))),this.edgeTo=t,this.edge.hidden=!t,t&&(this.edge.textContent=t===`galaxie`?`Do Mléčné dráhy ▸`:`Pokračovat: ${bu[t]} ▸`)}},Su=`false`,Cu=`false`,wu=Su===`true`,Tu=Cu===`true`;function Eu(e={}){let{immediate:t=!1,onNeedReload:n,onNeedRefresh:r,onOfflineReady:i,onRegistered:a,onRegisteredSW:o,onRegisterError:s}=e,c,l,u,d=async(e=!0)=>{await l,wu||u?.()};async function f(){if(`serviceWorker`in navigator){if(c=await Ft(async()=>{let{Workbox:e}=await import(`./workbox-window.prod.es5-Bd17z0YL.js`);return{Workbox:e}},[],import.meta.url).then(({Workbox:e})=>new e(`./sw.js`,{scope:`./`,type:`classic`})).catch(e=>{s?.(e)}),!c)return;if(u=()=>{c?.messageSkipWaiting()},!Tu){if(wu)c.addEventListener(`activated`,e=>{(e.isUpdate||e.isExternal)&&(n?n():window.location.reload())}),c.addEventListener(`installed`,e=>{e.isUpdate||i?.()});else{let e=!1,t=()=>{e=!0,c?.addEventListener(`controlling`,e=>{e.isUpdate&&(n?n():window.location.reload())}),r?.()};c.addEventListener(`installed`,n=>{n.isUpdate===void 0?n.isExternal===void 0?!e&&i?.():n.isExternal?t():!e&&i?.():n.isUpdate||i?.()}),c.addEventListener(`waiting`,t)}}c.register({immediate:t}).then(e=>{o?o(`./sw.js`,e):a?.(e)}).catch(e=>{s?.(e)})}}return l=f(),d}var Du=[],Ou=36e5;function ku(){if(!(`serviceWorker`in navigator))return;let e=document.getElementById(`update`),t=!1,n=()=>Du.some(e=>e()),r=Eu({onNeedRefresh(){if(!n())return void r(!0);if(t)return;t=!0,e.hidden=!1;let i=setInterval(()=>{n()||(clearInterval(i),r(!0))},3e3)},onOfflineReady(){let e=document.getElementById(`toast`);e.textContent=`Mapa je uložená a funguje i bez internetu`,e.hidden=!1,setTimeout(()=>e.hidden=!0,3500)},onRegisteredSW(e,t){t&&setInterval(async()=>{!t.installing&&navigator.onLine&&(await fetch(e,{cache:`no-store`,headers:{"cache-control":`no-cache`}}).catch(()=>null))?.status===200&&await t.update()},Ou)}});e.querySelector(`[data-act=reload]`).onclick=()=>r(!0),e.querySelector(`[data-act=later]`).onclick=()=>e.hidden=!0}var Au=e=>getComputedStyle(document.documentElement).getPropertyValue(e).trim(),ju=`./data/`;async function Mu(e){let t=await fetch(ju+e);if(!t.ok)throw Error(`${e}: HTTP ${t.status}`);return t.json()}async function Nu(){let e=document.getElementById(`status`);try{let t=await Mu(`manifest.json`),n=e=>t.katalogy.find(t=>t.id===e)?.soubor,r=Hc(Vc,e=>!!n(e),e=>!!document.getElementById(e)),i=new Map,a=e=>{let t=i.get(e);if(!t){let r=n(e);t=r?Mu(r):Promise.reject(Error(`${e}: soubor není v manifestu`)),t.catch(()=>{}),i.set(e,t)}return t};for(let e of[...r.prefetch,...n(`jmena`)?[`jmena`]:[]])a(e);let o=new mt(t.r0_pc),s=new _o(document.getElementById(`stage`),Au(`--void`)),c=Bo(s.glow);c.quaternion.copy(lt.q),s.scene.add(c),Pu(c.material.uniforms.armGain);let l=new cu(document.getElementById(`labels`),s),u=new Go(s,o,l,Au);new $c(s,o.sun,l);let d=new W(-23e3,52e3,42e3);s.jumpTo(o.sun.clone().add(new W(9e3,0,0)),d),s.start(),n(`obrazky`)&&al(ju+n(`obrazky`));let f=n(`jmena`)?await a(`jmena`).catch(()=>null):null,p=c.material.uniforms.armGain;c.renderOrder=-3;for(let e of Po){let t=(e.betaMin+e.betaMax)/2,[n,r]=Lo(Io(e,t),t,Y*1e3);l.add(e.name,lt.toScene(new W(n,400,r)),`anno`,()=>p.value>0&&s.viewDistance>12e3,200)}let m=null,h=null,g=()=>m??=Ft(async()=>{let{SystemView:e}=await import(`./view-ByhhOa91.js`);return{SystemView:e}},__vite__mapDeps([18,19,20,10,11,17]),import.meta.url).then(({SystemView:e})=>h=new e(s,s.glow)),_={open:e=>g().then(t=>t.open(e)),focusProbe:e=>void g().then(t=>t.focusProbe(e)),focusBody:e=>void g().then(t=>t.focusBody(e)),selectSmall:e=>void g().then(t=>t.selectSmall(e))},v=new Map,{layers:y,failed:b}=await Uc(r,{manifest:t,file:n,url:e=>ju+n(e),data:a,dataBase:ju,base:`./`,dev:!1,frame:o,stage:s,labels:l,css:Au,systemView:_,built:v},v),x=y,S=e=>v.get(e)??null,C=S(`slunecni-soustava`),w=S(`gaia100`),T=S(`gaia500`),E=S(`gaiaAll`),ee=S(`startrek`),D=document.getElementById(`startrek`),O=S(`prach`),k=v.has(`exoplanety`)?await a(`exoplanety`):null;x.forEach(e=>s.scene.add(e.group)),f&&Ol(x.flatMap(e=>e.objects),f);let A=x.find(e=>e.id===`hvezdy`),j=x.find(e=>e.id===`exoplanety`);A&&j&&Ml(A.objects,j.objects,e=>{let t=(e.layer===`hvezdy`?A:j).skyPos?.(e);return t?mt.dir(t.l,t.b):null});let M=new tu(s,o,x,u,l,t);b.length&&M.toastPublic(`Některé vrstvy se nepodařilo načíst: ${b.join(`, `)}`),O&&(O.onLegend=e=>M.toastPublic(e)),is.on(e=>x.forEach(t=>t.setTime?.(e))),Wc();let N=document.getElementById(`compare`);if(N&&new Kc(M,s,o,x,N),ee&&D){let e=ee,t=()=>{D.textContent=e.anyOn?`Star Trek: zap`:`Star Trek: vyp`,D.setAttribute(`aria-pressed`,String(e.anyOn))};D.onclick=()=>{let n=!e.anyOn;e.setAll(n),M.syncLayer(e.id),t(),n&&M.toastPublic(`Star Trek: fanouškovská vrstva, fikce – polohy jsou extrapolace z Memory Alpha a Memory Beta`)},document.getElementById(`legend`).addEventListener(`click`,()=>queueMicrotask(t));let r=document.getElementById(`trekCat`);if(r&&n(`startrek-katalog`)){let i=null,a=()=>i??=Ft(async()=>{let{TrekCatalog:e}=await import(`./trekCatalog-D_qQi6sG.js`);return{TrekCatalog:e}},__vite__mapDeps([21,11]),import.meta.url).then(({TrekCatalog:r})=>new r(ju+n(`startrek-katalog`),M,n=>{let r=e.reveal(n);r&&(M.syncLayer(e.id),t(),M.select(r,!0))},t=>e.powerColor(t)));r.onclick=()=>void a().then(e=>e.show()),document.getElementById(`card`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-trekcat]`);t&&a().then(e=>e.show(t.dataset.trekcat))})}else r?.remove();let i=document.getElementById(`voyage`);if(i){let e=null;Du.push(()=>e?.busy??!1),i.onclick=()=>void Ft(async()=>{let{Voyage:e}=await import(`./voyage-CNJXnkgZ.js`);return{Voyage:e}},__vite__mapDeps([22,23,10,11,17,24]),import.meta.url).then(({Voyage:t})=>{e??=new t(s,M,o,x),e.open()})}}else document.getElementById(`trekCat`)?.remove(),document.getElementById(`voyage`)?.remove();(w||T||E)&&(M.extraPick=(e,t,n,r)=>{let i=w?.pickAt(e,t,n,r,s)??null;if(i!=null)return w.star(i).then(e=>M.select(e,!0)).catch(e=>console.error(e)),!0;for(let i of[T,E]){let a=i?.pickAt(e,t,n,r,s)??null;if(a!=null)return i.star(a).then(e=>M.select(e,!0)).catch(e=>console.error(e)),!0}return!1});let te=new Map,ne=v.has(`hvezdy`)?(await a(`hvezdy`)).objekty.x.gaia:void 0;if(A&&ne)for(let e of A.objects){let t=ne[e.index];typeof t==`string`&&te.set(t,e)}for(let e of[w,T,E])e&&(e.twinOf=e=>te.get(e));(w||T||E)&&(M.gaiaLookup=async e=>{let t=await oa(e).catch(()=>{throw Error(`dotaz do katalogu VizieR selhal (je potřeba připojení)`)});if(!t)throw Error(`takové ID v katalogu Gaia DR3 není`);let n=async(e,t)=>(t&&!e.active&&await e.toggle(),t),r=null;if(w&&((t.plx??0)>7||(t.rgeo??1/0)<150)&&(r=await n(w,await w.findById(e,t.l,t.b))),!r&&E&&t.rgeo!=null&&(r=await n(E,await E.findById(e,sa(t,t.rgeo)))),!r&&T&&(t.plx??0)>2&&(r=await n(T,await T.findById(e,sa(t,1e3/t.plx)))),r)return r;let i=te.get(e);if(i)return i;throw Error(E?`hvězda nemá vzdálenost, v mapě není`:`v mapě není – vrstva Gaia 500 pc má jen hvězdy s paralaxou nad 2 mas a s chybou pod 10 %`)}),M.gaiaLookup&&ne&&M.objectCardHooks.push((e,t)=>{let n=t.layer===`hvezdy`?ne[t.index]:null;if(typeof n!=`string`)return;let r=document.createElement(`button`);r.className=`btn detail`,r.textContent=`Táž hvězda v datech Gaia ▸`,r.title=`Gaia DR3 ${n} – poloha a vzdálenost z Gaia místo Hipparcos`,r.onclick=async()=>{r.textContent=`Hledám v datech Gaia…`;try{let e=await M.gaiaLookup(n);e&&e!==t?M.select(e,!0):r.textContent=`V datech Gaia v mapě není`}catch(e){r.textContent=`Gaia: ${e.message}`}},e.querySelector(`.btn.detail, h3`)?.after(r)});let re=new uu(ju+`vylety.json`,M,s,x);Du.push(()=>re.busy),document.getElementById(`tours`).onclick=()=>void re.menu();let ie=document.getElementById(`timeline`);if(k){let e=null;ie.onclick=()=>void Ft(async()=>{let{Timeline:e}=await import(`./timeline-GASPnI2n.js`);return{Timeline:e}},__vite__mapDeps([25,11]),import.meta.url).then(({Timeline:t})=>{e??=new t(k,M,M.filters),e.show()})}else ie.remove();let ae=null,oe=new xu({stage:s,sun:o.sun,home:{target:o.sun.clone().add(new W(9e3,0,0)),dist:d.length()},peekSys:()=>h,openSolar:()=>C?C.openDetail():Promise.resolve(),universe:()=>Ft(async()=>{let{UniverseView:e}=await import(`./view-DIzZEXwv.js`);return{UniverseView:e}},__vite__mapDeps([26,20,10,11,14,16,17,19,23,24]),import.meta.url).then(({UniverseView:e})=>(ae??=new e(s,s.glow,c.material.uniforms.armGain,o.sun,n(`galaxie-lv`)?ju+n(`galaxie-lv`):null,n(`pavucina`)?ju+n(`pavucina`):null,ju),ae))});Du.push(()=>oe.busy);let P=new Rl(s,M,x,re);P.scale=()=>oe.current(),P.onScale=e=>void oe.jump(e),P.apply(location.hash),e.remove(),ku(),window.galaxie={stage:s,hud:M,layers:x,frame:o,anchor:P,scales:oe}}catch(t){console.error(t),e.textContent=`Nepodařilo se načíst data: ${t.message}`,ku(),e.classList.add(`error`)}}function Pu(e){let t=document.getElementById(`armGain`),n=document.getElementById(`armGainVal`);if(!t)return;let r=zo;try{let e=parseFloat(localStorage.getItem(`galaxie.armGain`)??``);e>=0&&e<=7.5&&(r=e)}catch{}let i=r=>{e.value=r,t.value=String(r),n&&(n.textContent=r===0?`vyp`:`${Math.round(r*100)} %`)};i(r),t.addEventListener(`input`,()=>{let e=parseFloat(t.value);i(e);try{localStorage.setItem(`galaxie.armGain`,String(e))}catch{}})}Nu();export{ho as C,fn as D,ca as E,ta as O,Bo as S,Ta as T,ks as _,Yc as a,is as b,wc as c,oc as d,sc as f,Ks as g,Js as h,Zc as i,Ft as k,yc as l,qs as m,Dl as n,Qc as o,ac as p,qc as r,Sc as s,Zl as t,nc as u,bs as v,Na as w,Ro as x,as as y};