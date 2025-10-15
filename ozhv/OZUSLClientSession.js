(function(){var hFe=function(){if(this.kVr){this.kVr();return;}var fr=hFe.prototype;fr.kVr=function(){this.RIa="";this.cgh="";};fr.setServerURL=function(kc){
this.RIa=kc;};fr.setServerIP=function(xaK){this.cgh=xaK;};fr.createSecureOutputStream=function(Ha,jH){var qyr=new ByteArray();var wK=0;var E0r;
for(E0r in jH){wK++;}qyr.writeInt(wK);for(E0r in jH){var YA3=jH[E0r];this.z_(qyr,E0r);this.z_(qyr,YA3);}qyr.writeBytes(Ha,0,Ha.length);qyr.position=0;
return qyr;};fr.createSecureInputStream=function(Ha,jH){var size=Ha.readInt();for(var i=0; i<size; i++){var E0r=this.XW(Ha);var YA3=this.XW(Ha);
jH[E0r]=YA3;}var qyr=new ByteArray();qyr.writeBytes(Ha,Ha.position,Ha.length-Ha.position);qyr.position=0;return qyr;};fr.z_=function(Ha,Rr){var i;
var bL6=Rr.length;Ha.writeInt(bL6);var v;for(i=0; i<bL6; i++){v=Rr.charCodeAt(i);Ha.writeByte((v>>>8)&255);Ha.writeByte((v>>>0)&255);}};fr.XW=function(Ha){
var bL6;var I6K,xnK;bL6=Ha.readInt();if(bL6==-1){return "<NULL>";}else{if(bL6<-1){throw new Error("A malformed string has been read in a data input stream.");
}}var Rr="";var position=Ha.position;for(var i=0; i<bL6; i++){I6K=Ha[position+i*2];xnK=Ha[position+i*2+1];if((I6K|xnK)<0){throw new Error("A malformed string has been read in a data input stream.");
}Rr+=String.fromCharCode((I6K<<8)+(xnK<<0));}Ha.position+=bL6*2;return Rr;};this.kVr();};return hFe;})();
