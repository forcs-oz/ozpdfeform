(function(){var fK6=function(){if(this.uCi){this.uCi();return;}var Zi=fK6.prototype;Zi.uCi=function(){this.u_R="";this.LKM="";};Zi.setServerURL=function(AZ){
this.u_R=AZ;};Zi.setServerIP=function(TTf){this.LKM=TTf;};Zi.createSecureOutputStream=function(AR,J2){var pCi=new ByteArray();var Dv=0;var Ewi;
for(Ewi in J2){Dv++;}pCi.writeInt(Dv);for(Ewi in J2){var DuG=J2[Ewi];this.JC(pCi,Ewi);this.JC(pCi,DuG);}var XCL=new ByteArray();var if6=new this.rkM("forcs@#$",XCL);
if6.write(AR,0,AR.length);pCi.writeBytes(XCL,0,XCL.length);pCi.position=0;return pCi;};Zi.createSecureInputStream=function(AR,J2){var size=AR.readInt();
for(var i=0; i<size; i++){var Ewi=this.Jj(AR);var DuG=this.Jj(AR);J2[Ewi]=DuG;}var pCi=new ByteArray();var JrM=new this.EkM("forcs@#$",AR);var NBC=new ByteArray();
JrM.read(NBC,0,AR.length-AR.position);pCi.writeBytes(NBC,0,NBC.length);pCi.position=0;return pCi;};Zi.JC=function(AR,Zs){var i;var vys=Zs.length;
AR.writeInt(vys);var v;for(i=0; i<vys; i++){v=Zs.charCodeAt(i);AR.writeByte((v>>>8)&255);AR.writeByte((v>>>0)&255);}};Zi.Jj=function(AR){var vys;
var UGf,hSf;vys=AR.readInt();if(vys==-1){return "<NULL>";}else{if(vys<-1){throw new Error("A malformed string has been read in a data input stream.");
}}var Zs="";var position=AR.position;for(var i=0; i<vys; i++){UGf=AR[position+i*2];hSf=AR[position+i*2+1];if((UGf|hSf)<0){throw new Error("A malformed string has been read in a data input stream.");
}Zs+=String.fromCharCode((UGf<<8)+(hSf<<0));}AR.position+=vys*2;return Zs;};var EkM=function(Lu,qrj){if(this.YRv){this.YRv(Lu,qrj);return;}var FhG=EkM.prototype;
FhG.YRv=function(Lu,qrj){this.vZJ=Lu;this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.Ms=0;this.EjR=0;this.mc=0;this.i=0;this.KAi=0;this.DJs=new Array();
this.gXM=0;this.kXM=0;this.EFG=0;this.Xw=qrj;this.aNs=new ByteArray();this.aNs.setLength(17);var AUi=new ByteArray();AUi.writeMultiByte(Lu,"iso-8859-1");
this.aNs.writeBytes(AUi,0,AUi.length>16?16:AUi.length);this.aNs.set(16,0);this.clear();};FhG.clear=function(){this.ax=0;this.bx=0;this.cx=0;this.dx=0;
this.si=0;this.Ms=0;this.EjR=0;this.mc=0;this.i=0;this.KAi=0;this.gXM=0;this.kXM=0;this.EFG=0;for(var i=0; i<8; i++){this.DJs[i]=0;}};FhG.rZv=function(){
var c=this.Xw.readByte();if(c==-1){return -1;}this.Ew6();this.gXM=this.KAi>>>8;this.kXM=this.KAi&255;c=c^(this.gXM^this.kXM);for(this.EFG=0; this.EFG<=15; this.EFG++){
this.aNs.set(this.EFG,this.aNs.get(this.EFG)^c);}return c;};FhG.read=function(b,off,Vc,hkG){if(b===undefined){b=null;}if(off===undefined){off=-1;
}if(Vc===undefined){Vc=-1;}if(hkG===undefined){hkG=-1;}if((b==null)||this.Xw==null){zzR("Null point exception");return -1;}if(Vc<1){return 0;
}this.Xw.readBytes(b,off,Vc);var rt=Vc;if(rt<=0){return rt;}var c=0;var i=0;for(i=0; i<rt; i++){this.Ew6();this.gXM=this.KAi>>>8;this.kXM=this.KAi&255;
c=b.get(i+off);c=c^(this.gXM^this.kXM);for(var j=0; j<16; j++){this.aNs.set(j,this.aNs.get(j)^c);}b.set(i+off,c);}return rt;};FhG.WU=function(){
return 0;};FhG.IIv=function(){this.dx=this.EjR+this.i;this.ax=this.DJs[this.i];this.cx=346;this.bx=20021;this.Ms=this.ax;this.ax=this.si;this.si=this.Ms;
this.Ms=this.ax;this.ax=this.dx;this.dx=this.Ms;this.ax=this.ax*this.bx&65535;this.Ms=this.ax;this.ax=this.cx;this.cx=this.Ms;if(this.ax!=0){
this.ax=(this.ax*this.si)&65535;this.cx=(this.ax+this.cx)&65535;}this.Ms=this.ax;this.ax=this.si;this.si=this.Ms;this.ax=(this.ax*this.bx)&65535;
this.dx=(this.cx+this.dx)&65535;this.ax=this.ax+1;this.EjR=this.dx;this.DJs[this.i]=this.ax;this.mc=this.ax^this.dx;this.i=this.i+1;};FhG.Ew6=function(){
this.DJs[0]=(this.aNs.get(0)*256)+this.aNs.get(1);this.IIv();this.KAi=this.mc;this.DJs[1]=this.DJs[0]^((this.aNs.get(2)*256)+this.aNs.get(3));
this.IIv();this.KAi=this.KAi^this.mc;this.DJs[2]=this.DJs[1]^((this.aNs.get(4)*256)+this.aNs.get(5));this.IIv();this.KAi=this.KAi^this.mc;this.DJs[3]=this.DJs[2]^((this.aNs.get(6)*256)+this.aNs.get(7));
this.IIv();this.KAi=this.KAi^this.mc;this.DJs[4]=this.DJs[3]^((this.aNs.get(8)*256)+this.aNs.get(9));this.IIv();this.KAi=this.KAi^this.mc;this.DJs[5]=this.DJs[4]^((this.aNs.get(10)*256)+this.aNs.get(11));
this.IIv();this.KAi=this.KAi^this.mc;this.DJs[6]=this.DJs[5]^((this.aNs.get(12)*256)+this.aNs.get(13));this.IIv();this.KAi=this.KAi^this.mc;this.DJs[7]=this.DJs[6]^((this.aNs.get(14)*256)+this.aNs.get(15));
this.IIv();this.KAi=this.KAi^this.mc;this.i=0;};this.YRv(Lu,qrj);};Zi.EkM=EkM;var rkM=function(Lu,uNx){if(this.iRv){this.iRv(Lu,uNx);return;}
var FhG=rkM.prototype;FhG.iRv=function(Lu,uNx){this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.Ms=0;this.EjR=0;this.mc=0;this.i=0;this.KAi=0;
this.DJs=new Array();this.gXM=0;this.kXM=0;this.EFG=0;this.SZ=uNx;this.DJs.length=8;this.aNs=new ByteArray();this.aNs.setLength(17);var AUi=new ByteArray();
AUi.writeMultiByte(Lu,"iso-8859-1");this.aNs.writeBytes(AUi,0,AUi.length>16?16:AUi.length);this.aNs.set(16,0);this.clear();};FhG.clear=function(){
this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.Ms=0;this.EjR=0;this.mc=0;this.i=0;this.KAi=0;this.gXM=0;this.kXM=0;this.EFG=0;for(var i=0; i<8; i++){
this.DJs[i]=0;}};FhG.d6i=function(b){this.Ew6();this.gXM=this.KAi>>>8;this.kXM=this.KAi&255;for(this.EFG=0; this.EFG<=15; this.EFG++){this.aNs.set(this.EFG,this.aNs.get(this.EFG)^b);
}b=b^(this.gXM^this.kXM);this.SZ.writeByte(b);};FhG.write=function(b,off,Vc){if(b===undefined){b=null;}if(off===undefined){off=-1;}if(Vc===undefined){
Vc=-1;}if((b==null)||this.SZ==null){zzR("Null point exception");return;}if(Vc<1){return;}var c=0;var QJD=new ByteArray();QJD.setLength(Vc);for(var i=0; i<Vc; i++){
this.Ew6();this.gXM=this.KAi>>>8;this.kXM=this.KAi&255;c=b.get(i+off);for(var j=0; j<16; j++){this.aNs.set(j,this.aNs.get(j)^c);}c=c^(this.gXM^this.kXM);
QJD.set(i,c);}this.SZ.writeBytes(QJD,0,Vc);QJD=null;};FhG.flush=function(){};FhG.close=function(){};FhG.IIv=function(){this.dx=this.EjR+this.i;
this.ax=this.DJs[this.i];this.cx=346;this.bx=20021;this.Ms=this.ax;this.ax=this.si;this.si=this.Ms;this.Ms=this.ax;this.ax=this.dx;this.dx=this.Ms;
this.ax=this.ax*this.bx&65535;this.Ms=this.ax;this.ax=this.cx;this.cx=this.Ms;if(this.ax!=0){this.ax=(this.ax*this.si)&65535;this.cx=(this.ax+this.cx)&65535;
}this.Ms=this.ax;this.ax=this.si;this.si=this.Ms;this.ax=(this.ax*this.bx)&65535;this.dx=(this.cx+this.dx)&65535;this.ax=this.ax+1;this.EjR=this.dx;
this.DJs[this.i]=this.ax;this.mc=this.ax^this.dx;this.i=this.i+1;};FhG.Ew6=function(){this.DJs[0]=(this.aNs.get(0)*256)+this.aNs.get(1);this.IIv();
this.KAi=this.mc;this.DJs[1]=this.DJs[0]^((this.aNs.get(2)*256)+this.aNs.get(3));this.IIv();this.KAi=this.KAi^this.mc;this.DJs[2]=this.DJs[1]^((this.aNs.get(4)*256)+this.aNs.get(5));
this.IIv();this.KAi=this.KAi^this.mc;this.DJs[3]=this.DJs[2]^((this.aNs.get(6)*256)+this.aNs.get(7));this.IIv();this.KAi=this.KAi^this.mc;this.DJs[4]=this.DJs[3]^((this.aNs.get(8)*256)+this.aNs.get(9));
this.IIv();this.KAi=this.KAi^this.mc;this.DJs[5]=this.DJs[4]^((this.aNs.get(10)*256)+this.aNs.get(11));this.IIv();this.KAi=this.KAi^this.mc;this.DJs[6]=this.DJs[5]^((this.aNs.get(12)*256)+this.aNs.get(13));
this.IIv();this.KAi=this.KAi^this.mc;this.DJs[7]=this.DJs[6]^((this.aNs.get(14)*256)+this.aNs.get(15));this.IIv();this.KAi=this.KAi^this.mc;this.i=0;
};this.iRv(Lu,uNx);};Zi.rkM=rkM;this.uCi();};return fK6;})();
