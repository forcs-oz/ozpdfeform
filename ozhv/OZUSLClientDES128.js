(function(){var uPJ=function(){if(this.kVr){this.kVr();return;}var fr=uPJ.prototype;fr.kVr=function(){this.RIa="";this.cgh="";};fr.setServerURL=function(kc){
this.RIa=kc;};fr.setServerIP=function(xaK){this.cgh=xaK;};fr.createSecureOutputStream=function(Ha,jH){var qyr=new ByteArray();var wK=0;var E0r;
for(E0r in jH){wK++;}qyr.writeInt(wK);for(E0r in jH){var YA3=jH[E0r];this.z_(qyr,E0r);this.z_(qyr,YA3);}var QI2=new ByteArray();var X3J=new this.Gxh("forcs@#$",QI2);
X3J.write(Ha,0,Ha.length);qyr.writeBytes(QI2,0,QI2.length);qyr.position=0;return qyr;};fr.createSecureInputStream=function(Ha,jH){var size=Ha.readInt();
for(var i=0; i<size; i++){var E0r=this.XW(Ha);var YA3=this.XW(Ha);jH[E0r]=YA3;}var qyr=new ByteArray();var D8h=new this.xxh("forcs@#$",Ha);var D1t=new ByteArray();
D8h.read(D1t,0,Ha.length-Ha.position);qyr.writeBytes(D1t,0,D1t.length);qyr.position=0;return qyr;};fr.z_=function(Ha,Rr){var i;var bL6=Rr.length;
Ha.writeInt(bL6);var v;for(i=0; i<bL6; i++){v=Rr.charCodeAt(i);Ha.writeByte((v>>>8)&255);Ha.writeByte((v>>>0)&255);}};fr.XW=function(Ha){var bL6;
var I6K,xnK;bL6=Ha.readInt();if(bL6==-1){return "<NULL>";}else{if(bL6<-1){throw new Error("A malformed string has been read in a data input stream.");
}}var Rr="";var position=Ha.position;for(var i=0; i<bL6; i++){I6K=Ha[position+i*2];xnK=Ha[position+i*2+1];if((I6K|xnK)<0){throw new Error("A malformed string has been read in a data input stream.");
}Rr+=String.fromCharCode((I6K<<8)+(xnK<<0));}Ha.position+=bL6*2;return Rr;};var xxh=function(LY,ZTW){if(this.GeB){this.GeB(LY,ZTW);return;}var S03=xxh.prototype;
S03.GeB=function(LY,ZTW){this.LMQ=LY;this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.S6=0;this.pta=0;this.iS=0;this.i=0;this.ljr=0;this.VQ6=new Array();
this.YVh=0;this.NVh=0;this.x43=0;this.DH=ZTW;this.UV6=new ByteArray();this.UV6.setLength(17);var hqr=new ByteArray();hqr.writeMultiByte(LY,"iso-8859-1");
this.UV6.writeBytes(hqr,0,hqr.length>16?16:hqr.length);this.UV6.set(16,0);this.clear();};S03.clear=function(){this.ax=0;this.bx=0;this.cx=0;this.dx=0;
this.si=0;this.S6=0;this.pta=0;this.iS=0;this.i=0;this.ljr=0;this.YVh=0;this.NVh=0;this.x43=0;for(var i=0; i<8; i++){this.VQ6[i]=0;}};S03.tTB=function(){
var c=this.DH.readByte();if(c==-1){return -1;}this.vmJ();this.YVh=this.ljr>>>8;this.NVh=this.ljr&255;c=c^(this.YVh^this.NVh);for(this.x43=0; this.x43<=15; this.x43++){
this.UV6.set(this.x43,this.UV6.get(this.x43)^c);}return c;};S03.read=function(b,off,XS,Ys3){if(b===undefined){b=null;}if(off===undefined){off=-1;
}if(XS===undefined){XS=-1;}if(Ys3===undefined){Ys3=-1;}if((b==null)||this.DH==null){rza("Null point exception");return -1;}if(XS<1){return 0;
}this.DH.readBytes(b,off,XS);var rt=XS;if(rt<=0){return rt;}var c=0;var i=0;for(i=0; i<rt; i++){this.vmJ();this.YVh=this.ljr>>>8;this.NVh=this.ljr&255;
c=b.get(i+off);c=c^(this.YVh^this.NVh);for(var j=0; j<16; j++){this.UV6.set(j,this.UV6.get(j)^c);}b.set(i+off,c);}return rt;};S03.Wq=function(){
return 0;};S03.GQB=function(){this.dx=this.pta+this.i;this.ax=this.VQ6[this.i];this.cx=346;this.bx=20021;this.S6=this.ax;this.ax=this.si;this.si=this.S6;
this.S6=this.ax;this.ax=this.dx;this.dx=this.S6;this.ax=this.ax*this.bx&65535;this.S6=this.ax;this.ax=this.cx;this.cx=this.S6;if(this.ax!=0){
this.ax=(this.ax*this.si)&65535;this.cx=(this.ax+this.cx)&65535;}this.S6=this.ax;this.ax=this.si;this.si=this.S6;this.ax=(this.ax*this.bx)&65535;
this.dx=(this.cx+this.dx)&65535;this.ax=this.ax+1;this.pta=this.dx;this.VQ6[this.i]=this.ax;this.iS=this.ax^this.dx;this.i=this.i+1;};S03.vmJ=function(){
this.VQ6[0]=(this.UV6.get(0)*256)+this.UV6.get(1);this.GQB();this.ljr=this.iS;this.VQ6[1]=this.VQ6[0]^((this.UV6.get(2)*256)+this.UV6.get(3));
this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[2]=this.VQ6[1]^((this.UV6.get(4)*256)+this.UV6.get(5));this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[3]=this.VQ6[2]^((this.UV6.get(6)*256)+this.UV6.get(7));
this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[4]=this.VQ6[3]^((this.UV6.get(8)*256)+this.UV6.get(9));this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[5]=this.VQ6[4]^((this.UV6.get(10)*256)+this.UV6.get(11));
this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[6]=this.VQ6[5]^((this.UV6.get(12)*256)+this.UV6.get(13));this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[7]=this.VQ6[6]^((this.UV6.get(14)*256)+this.UV6.get(15));
this.GQB();this.ljr=this.ljr^this.iS;this.i=0;};this.GeB(LY,ZTW);};fr.xxh=xxh;var Gxh=function(LY,Dyl){if(this.teB){this.teB(LY,Dyl);return;}
var S03=Gxh.prototype;S03.teB=function(LY,Dyl){this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.S6=0;this.pta=0;this.iS=0;this.i=0;this.ljr=0;
this.VQ6=new Array();this.YVh=0;this.NVh=0;this.x43=0;this.P8=Dyl;this.VQ6.length=8;this.UV6=new ByteArray();this.UV6.setLength(17);var hqr=new ByteArray();
hqr.writeMultiByte(LY,"iso-8859-1");this.UV6.writeBytes(hqr,0,hqr.length>16?16:hqr.length);this.UV6.set(16,0);this.clear();};S03.clear=function(){
this.ax=0;this.bx=0;this.cx=0;this.dx=0;this.si=0;this.S6=0;this.pta=0;this.iS=0;this.i=0;this.ljr=0;this.YVh=0;this.NVh=0;this.x43=0;for(var i=0; i<8; i++){
this.VQ6[i]=0;}};S03.QJr=function(b){this.vmJ();this.YVh=this.ljr>>>8;this.NVh=this.ljr&255;for(this.x43=0; this.x43<=15; this.x43++){this.UV6.set(this.x43,this.UV6.get(this.x43)^b);
}b=b^(this.YVh^this.NVh);this.P8.writeByte(b);};S03.write=function(b,off,XS){if(b===undefined){b=null;}if(off===undefined){off=-1;}if(XS===undefined){
XS=-1;}if((b==null)||this.P8==null){rza("Null point exception");return;}if(XS<1){return;}var c=0;var Vye=new ByteArray();Vye.setLength(XS);for(var i=0; i<XS; i++){
this.vmJ();this.YVh=this.ljr>>>8;this.NVh=this.ljr&255;c=b.get(i+off);for(var j=0; j<16; j++){this.UV6.set(j,this.UV6.get(j)^c);}c=c^(this.YVh^this.NVh);
Vye.set(i,c);}this.P8.writeBytes(Vye,0,XS);Vye=null;};S03.flush=function(){};S03.close=function(){};S03.GQB=function(){this.dx=this.pta+this.i;
this.ax=this.VQ6[this.i];this.cx=346;this.bx=20021;this.S6=this.ax;this.ax=this.si;this.si=this.S6;this.S6=this.ax;this.ax=this.dx;this.dx=this.S6;
this.ax=this.ax*this.bx&65535;this.S6=this.ax;this.ax=this.cx;this.cx=this.S6;if(this.ax!=0){this.ax=(this.ax*this.si)&65535;this.cx=(this.ax+this.cx)&65535;
}this.S6=this.ax;this.ax=this.si;this.si=this.S6;this.ax=(this.ax*this.bx)&65535;this.dx=(this.cx+this.dx)&65535;this.ax=this.ax+1;this.pta=this.dx;
this.VQ6[this.i]=this.ax;this.iS=this.ax^this.dx;this.i=this.i+1;};S03.vmJ=function(){this.VQ6[0]=(this.UV6.get(0)*256)+this.UV6.get(1);this.GQB();
this.ljr=this.iS;this.VQ6[1]=this.VQ6[0]^((this.UV6.get(2)*256)+this.UV6.get(3));this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[2]=this.VQ6[1]^((this.UV6.get(4)*256)+this.UV6.get(5));
this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[3]=this.VQ6[2]^((this.UV6.get(6)*256)+this.UV6.get(7));this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[4]=this.VQ6[3]^((this.UV6.get(8)*256)+this.UV6.get(9));
this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[5]=this.VQ6[4]^((this.UV6.get(10)*256)+this.UV6.get(11));this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[6]=this.VQ6[5]^((this.UV6.get(12)*256)+this.UV6.get(13));
this.GQB();this.ljr=this.ljr^this.iS;this.VQ6[7]=this.VQ6[6]^((this.UV6.get(14)*256)+this.UV6.get(15));this.GQB();this.ljr=this.ljr^this.iS;this.i=0;
};this.teB(LY,Dyl);};fr.Gxh=Gxh;this.kVr();};return uPJ;})();
