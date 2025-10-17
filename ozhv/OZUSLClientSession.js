(function(){var EuG=function(){if(this.M2F){this.M2F();return;}var SF=EuG.prototype;SF.M2F=function(){this.ZkL="";this.AZn="";};SF.setServerURL=function(Hp){
this.ZkL=Hp;};SF.setServerIP=function(SLE){this.AZn=SLE;};SF.createSecureOutputStream=function(Us,zS){var i4F=new ByteArray();var KA=0;var e3F;
for(e3F in zS){KA++;}i4F.writeInt(KA);for(e3F in zS){var eOB=zS[e3F];this.Kk(i4F,e3F);this.Kk(i4F,eOB);}i4F.writeBytes(Us,0,Us.length);i4F.position=0;
return i4F;};SF.createSecureInputStream=function(Us,zS){var size=Us.readInt();for(var i=0; i<size; i++){var e3F=this.cU(Us);var eOB=this.cU(Us);
zS[e3F]=eOB;}var i4F=new ByteArray();i4F.writeBytes(Us,Us.position,Us.length-Us.position);i4F.position=0;return i4F;};SF.Kk=function(Us,dF){var i;
var fC9=dF.length;Us.writeInt(fC9);var v;for(i=0; i<fC9; i++){v=dF.charCodeAt(i);Us.writeByte((v>>>8)&255);Us.writeByte((v>>>0)&255);}};SF.cU=function(Us){
var fC9;var bFE,keE;fC9=Us.readInt();if(fC9==-1){return "<NULL>";}else{if(fC9<-1){throw new Error("A malformed string has been read in a data input stream.");
}}var dF="";var position=Us.position;for(var i=0; i<fC9; i++){bFE=Us[position+i*2];keE=Us[position+i*2+1];if((bFE|keE)<0){throw new Error("A malformed string has been read in a data input stream.");
}dF+=String.fromCharCode((bFE<<8)+(keE<<0));}Us.position+=fC9*2;return dF;};this.M2F();};return EuG;})();
