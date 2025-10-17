(function(){var kZs=function(){if(this.M2F){this.M2F();return;}var SF=kZs.prototype;SF.M2F=function(){this.ZkL="";this.AZn="";};SF.setServerURL=function(Hp){
this.ZkL=Hp;};SF.setServerIP=function(SLE){this.AZn=SLE;};SF.createSecureOutputStream=function(Us,zS){var i4F=new ByteArray();var KA=0;var e3F;
for(e3F in zS){KA++;}i4F.writeInt(KA);for(e3F in zS){var eOB=zS[e3F];this.Kk(i4F,e3F);this.Kk(i4F,eOB);}var vPA=new ByteArray();var OBs=new this.vhn("forcs@#$",vPA);
OBs.write(Us,0,Us.length);i4F.writeBytes(vPA,0,vPA.length);i4F.position=0;return i4F;};SF.createSecureInputStream=function(Us,zS){var size=Us.readInt();
for(var i=0; i<size; i++){var e3F=this.cU(Us);var eOB=this.cU(Us);zS[e3F]=eOB;}var i4F=new ByteArray();var iln=new this.Chn("forcs@#$",Us);var N7i=new ByteArray();
iln.read(N7i,0,Us.length-Us.position);i4F.writeBytes(N7i,0,N7i.length);i4F.position=0;return i4F;};SF.Kk=function(Us,dF){var i;var fC9=dF.length;
Us.writeInt(fC9);var v;for(i=0; i<fC9; i++){v=dF.charCodeAt(i);Us.writeByte((v>>>8)&255);Us.writeByte((v>>>0)&255);}};SF.cU=function(Us){var fC9;
var bFE,keE;fC9=Us.readInt();if(fC9==-1){return "<NULL>";}else{if(fC9<-1){throw new Error("A malformed string has been read in a data input stream.");
}}var dF="";var position=Us.position;for(var i=0; i<fC9; i++){bFE=Us[position+i*2];keE=Us[position+i*2+1];if((bFE|keE)<0){throw new Error("A malformed string has been read in a data input stream.");
}dF+=String.fromCharCode((bFE<<8)+(keE<<0));}Us.position+=fC9*2;return dF;};var Chn=function(Hb,sY4){if(this.nnd){this.nnd(Hb,sY4);return;}var e3B=Chn.prototype;
e3B.nnd=function(Hb,sY4){this.pKa=Hb;this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.f9=0;this.DjL=0;this.eE=0;this.i=0;this.tcF=0;this.dV9=new Array();
this.a2n=0;this.L2n=0;this.f5B=0;this.D3=sY4;this.k29=new ByteArray();this.k29.setLength(17);var xDF=new ByteArray();xDF.writeMultiByte(Hb,"iso-8859-1");
this.k29.writeBytes(xDF,0,xDF.length>16?16:xDF.length);this.k29.set(16,0);this.clear();};e3B.clear=function(){this.ax=0;this.bx=0;this.cx=0;this.dx=0;
this.si=0;this.f9=0;this.DjL=0;this.eE=0;this.i=0;this.tcF=0;this.a2n=0;this.L2n=0;this.f5B=0;for(var i=0; i<8; i++){this.dV9[i]=0;}};e3B.SYd=function(){
var c=this.D3.readByte();if(c==-1){return -1;}this.yvs();this.a2n=this.tcF>>>8;this.L2n=this.tcF&255;c=c^(this.a2n^this.L2n);for(this.f5B=0; this.f5B<=15; this.f5B++){
this.k29.set(this.f5B,this.k29.get(this.f5B)^c);}return c;};e3B.read=function(b,off,rE,qgB){if(b===undefined){b=null;}if(off===undefined){off=-1;
}if(rE===undefined){rE=-1;}if(qgB===undefined){qgB=-1;}if((b==null)||this.D3==null){RcL("Null point exception");return -1;}if(rE<1){return 0;
}this.D3.readBytes(b,off,rE);var rt=rE;if(rt<=0){return rt;}var c=0;var i=0;for(i=0; i<rt; i++){this.yvs();this.a2n=this.tcF>>>8;this.L2n=this.tcF&255;
c=b.get(i+off);c=c^(this.a2n^this.L2n);for(var j=0; j<16; j++){this.k29.set(j,this.k29.get(j)^c);}b.set(i+off,c);}return rt;};e3B.NR=function(){
return 0;};e3B.iVd=function(){this.dx=this.DjL+this.i;this.ax=this.dV9[this.i];this.cx=346;this.bx=20021;this.f9=this.ax;this.ax=this.si;this.si=this.f9;
this.f9=this.ax;this.ax=this.dx;this.dx=this.f9;this.ax=this.ax*this.bx&65535;this.f9=this.ax;this.ax=this.cx;this.cx=this.f9;if(this.ax!=0){
this.ax=(this.ax*this.si)&65535;this.cx=(this.ax+this.cx)&65535;}this.f9=this.ax;this.ax=this.si;this.si=this.f9;this.ax=(this.ax*this.bx)&65535;
this.dx=(this.cx+this.dx)&65535;this.ax=this.ax+1;this.DjL=this.dx;this.dV9[this.i]=this.ax;this.eE=this.ax^this.dx;this.i=this.i+1;};e3B.yvs=function(){
this.dV9[0]=(this.k29.get(0)*256)+this.k29.get(1);this.iVd();this.tcF=this.eE;this.dV9[1]=this.dV9[0]^((this.k29.get(2)*256)+this.k29.get(3));
this.iVd();this.tcF=this.tcF^this.eE;this.dV9[2]=this.dV9[1]^((this.k29.get(4)*256)+this.k29.get(5));this.iVd();this.tcF=this.tcF^this.eE;this.dV9[3]=this.dV9[2]^((this.k29.get(6)*256)+this.k29.get(7));
this.iVd();this.tcF=this.tcF^this.eE;this.dV9[4]=this.dV9[3]^((this.k29.get(8)*256)+this.k29.get(9));this.iVd();this.tcF=this.tcF^this.eE;this.dV9[5]=this.dV9[4]^((this.k29.get(10)*256)+this.k29.get(11));
this.iVd();this.tcF=this.tcF^this.eE;this.dV9[6]=this.dV9[5]^((this.k29.get(12)*256)+this.k29.get(13));this.iVd();this.tcF=this.tcF^this.eE;this.dV9[7]=this.dV9[6]^((this.k29.get(14)*256)+this.k29.get(15));
this.iVd();this.tcF=this.tcF^this.eE;this.i=0;};this.nnd(Hb,sY4);};SF.Chn=Chn;var vhn=function(Hb,JzU){if(this.gnd){this.gnd(Hb,JzU);return;}
var e3B=vhn.prototype;e3B.gnd=function(Hb,JzU){this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.f9=0;this.DjL=0;this.eE=0;this.i=0;this.tcF=0;
this.dV9=new Array();this.a2n=0;this.L2n=0;this.f5B=0;this.Ul=JzU;this.dV9.length=8;this.k29=new ByteArray();this.k29.setLength(17);var xDF=new ByteArray();
xDF.writeMultiByte(Hb,"iso-8859-1");this.k29.writeBytes(xDF,0,xDF.length>16?16:xDF.length);this.k29.set(16,0);this.clear();};e3B.clear=function(){
this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.f9=0;this.DjL=0;this.eE=0;this.i=0;this.tcF=0;this.a2n=0;this.L2n=0;this.f5B=0;for(var i=0; i<8; i++){
this.dV9[i]=0;}};e3B.OsF=function(b){this.yvs();this.a2n=this.tcF>>>8;this.L2n=this.tcF&255;for(this.f5B=0; this.f5B<=15; this.f5B++){this.k29.set(this.f5B,this.k29.get(this.f5B)^b);
}b=b^(this.a2n^this.L2n);this.Ul.writeByte(b);};e3B.write=function(b,off,rE){if(b===undefined){b=null;}if(off===undefined){off=-1;}if(rE===undefined){
rE=-1;}if((b==null)||this.Ul==null){RcL("Null point exception");return;}if(rE<1){return;}var c=0;var czG=new ByteArray();czG.setLength(rE);for(var i=0; i<rE; i++){
this.yvs();this.a2n=this.tcF>>>8;this.L2n=this.tcF&255;c=b.get(i+off);for(var j=0; j<16; j++){this.k29.set(j,this.k29.get(j)^c);}c=c^(this.a2n^this.L2n);
czG.set(i,c);}this.Ul.writeBytes(czG,0,rE);czG=null;};e3B.flush=function(){};e3B.close=function(){};e3B.iVd=function(){this.dx=this.DjL+this.i;
this.ax=this.dV9[this.i];this.cx=346;this.bx=20021;this.f9=this.ax;this.ax=this.si;this.si=this.f9;this.f9=this.ax;this.ax=this.dx;this.dx=this.f9;
this.ax=this.ax*this.bx&65535;this.f9=this.ax;this.ax=this.cx;this.cx=this.f9;if(this.ax!=0){this.ax=(this.ax*this.si)&65535;this.cx=(this.ax+this.cx)&65535;
}this.f9=this.ax;this.ax=this.si;this.si=this.f9;this.ax=(this.ax*this.bx)&65535;this.dx=(this.cx+this.dx)&65535;this.ax=this.ax+1;this.DjL=this.dx;
this.dV9[this.i]=this.ax;this.eE=this.ax^this.dx;this.i=this.i+1;};e3B.yvs=function(){this.dV9[0]=(this.k29.get(0)*256)+this.k29.get(1);this.iVd();
this.tcF=this.eE;this.dV9[1]=this.dV9[0]^((this.k29.get(2)*256)+this.k29.get(3));this.iVd();this.tcF=this.tcF^this.eE;this.dV9[2]=this.dV9[1]^((this.k29.get(4)*256)+this.k29.get(5));
this.iVd();this.tcF=this.tcF^this.eE;this.dV9[3]=this.dV9[2]^((this.k29.get(6)*256)+this.k29.get(7));this.iVd();this.tcF=this.tcF^this.eE;this.dV9[4]=this.dV9[3]^((this.k29.get(8)*256)+this.k29.get(9));
this.iVd();this.tcF=this.tcF^this.eE;this.dV9[5]=this.dV9[4]^((this.k29.get(10)*256)+this.k29.get(11));this.iVd();this.tcF=this.tcF^this.eE;this.dV9[6]=this.dV9[5]^((this.k29.get(12)*256)+this.k29.get(13));
this.iVd();this.tcF=this.tcF^this.eE;this.dV9[7]=this.dV9[6]^((this.k29.get(14)*256)+this.k29.get(15));this.iVd();this.tcF=this.tcF^this.eE;this.i=0;
};this.gnd(Hb,JzU);};SF.vhn=vhn;this.M2F();};return kZs;})();
