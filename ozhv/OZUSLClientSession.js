(function(){var qi6=function(){if(this.uCi){this.uCi();return;}var Zi=qi6.prototype;Zi.uCi=function(){this.u_R="";this.LKM="";};Zi.setServerURL=function(AZ){
this.u_R=AZ;};Zi.setServerIP=function(TTf){this.LKM=TTf;};Zi.createSecureOutputStream=function(AR,J2){var pCi=new ByteArray();var Dv=0;var Ewi;
for(Ewi in J2){Dv++;}pCi.writeInt(Dv);for(Ewi in J2){var DuG=J2[Ewi];this.JC(pCi,Ewi);this.JC(pCi,DuG);}pCi.writeBytes(AR,0,AR.length);pCi.position=0;
return pCi;};Zi.createSecureInputStream=function(AR,J2){var size=AR.readInt();for(var i=0; i<size; i++){var Ewi=this.Jj(AR);var DuG=this.Jj(AR);
J2[Ewi]=DuG;}var pCi=new ByteArray();pCi.writeBytes(AR,AR.position,AR.length-AR.position);pCi.position=0;return pCi;};Zi.JC=function(AR,Zs){var i;
var vys=Zs.length;AR.writeInt(vys);var v;for(i=0; i<vys; i++){v=Zs.charCodeAt(i);AR.writeByte((v>>>8)&255);AR.writeByte((v>>>0)&255);}};Zi.Jj=function(AR){
var vys;var UGf,hSf;vys=AR.readInt();if(vys==-1){return "<NULL>";}else{if(vys<-1){throw new Error("A malformed string has been read in a data input stream.");
}}var Zs="";var position=AR.position;for(var i=0; i<vys; i++){UGf=AR[position+i*2];hSf=AR[position+i*2+1];if((UGf|hSf)<0){throw new Error("A malformed string has been read in a data input stream.");
}Zs+=String.fromCharCode((UGf<<8)+(hSf<<0));}AR.position+=vys*2;return Zs;};this.uCi();};return qi6;})();
