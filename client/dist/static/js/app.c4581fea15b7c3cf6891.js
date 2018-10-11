webpackJsonp([1],{"7zck":function(t,e){},EwVV:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("/5sW"),r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{staticStyle:{background:"transparent"}},[s("v-navigation-drawer",{attrs:{persistent:"","mini-variant":t.miniVariant,clipped:t.clipped,"enable-resize-watcher":"",fixed:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[s("v-list",[s("router-link",{attrs:{to:"/docs",tag:"div"}},t._l(t.items,function(e,a){return s("v-list-tile",{key:a,attrs:{value:"true"}},[s("v-list-tile-action",[s("v-icon",{domProps:{innerHTML:t._s(e.icon)}})],1),t._v(" "),s("v-list-tile-content",[s("v-list-tile-title",{domProps:{textContent:t._s(e.title)}})],1)],1)}))],1)],1),t._v(" "),s("v-toolbar",{attrs:{app:"","clipped-left":t.clipped,dark:"",color:"indigo darken-4"}},[s("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),t._v(" "),s("router-link",{staticStyle:{cursor:"pointer"},attrs:{to:"/",tag:"div"}},[s("v-toolbar-title",{domProps:{textContent:t._s(t.title)}})],1),t._v(" "),s("v-spacer"),t._v(" "),s("v-btn",{attrs:{flat:"",icon:"",color:"white",to:"/"}},[s("v-icon",[t._v("home")])],1)],1),t._v(" "),s("v-content",[s("v-slide-y-reverse-transition",{attrs:{mode:"out-in"}},[s("router-view")],1)],1)],1)},staticRenderFns:[]};var n=s("VU/8")({data:function(){return{clipped:!0,drawer:!1,fixed:!1,items:[{icon:"bubble_chart",title:"Nearby Health Centers"}],miniVariant:!1,right:!0,rightDrawer:!1,title:"Medix"}},name:"App"},r,!1,function(t){s("TayJ")},null,null).exports,i=s("/ocq"),o=s("mtWM"),c=s.n(o),l={data:function(){return{selectedSym:[],symptoms:[],diagnosing:!1,result:[],error:!1,loadingSymptoms:!1}},methods:{remove:function(t){var e=this.selectedSym.indexOf(t.ID);e>=0&&this.selectedSym.splice(e,1)},diagnose:function(){this.result=[],x.result=[],x.selectedSym=this.selectedSym;var t=this;this.diagnosing=!0,c.a.post("/api/diagnosis",{symptoms:t.selectedSym}).then(function(e){var s=e.data;t.diagnosing=!1,s.length>0?(t.error=!1,t.result=s,x.result=s):t.error=!0}).catch(function(){t.diagnosing=!1})},goToDisease:function(t){console.log(t),this.$router.push({name:"disease",params:{id:t.Issue.ID,title:t.Issue.Name}})}},computed:{resultPop:function(){return this.result.length>0}},created:function(){var t=this;if(!x.noSymptoms)return this.symptoms=x.symptoms,this.result=x.result,void(this.selectedSym=x.selectedSym);setTimeout(function(){t.loadingSymptoms=!0;var e=t;c()("/api/symptoms").then(function(t){var s=t.data;e.loadingSymptoms=!1,x.set(s),e.symptoms=s})},300)}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[s("v-layout",{attrs:{row:"",wrap:"","justify-center":""}},[s("v-flex",{attrs:{xs12:"",md8:""}},[s("v-card",[s("v-card-title",{staticClass:"headline",staticStyle:{background:"#ddd"},attrs:{"primary-title":""}},[s("div",[t._v("\n            How are you feeling ?\n          ")])]),t._v(" "),s("v-form",{on:{submit:function(t){t.preventDefault()}}},[s("v-container",[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-autocomplete",{attrs:{disabled:t.diagnosing,items:t.symptoms,chips:"",color:"blue-grey lighten-1",label:"Select Symptoms","item-text":"Name","item-value":"ID",multiple:""},scopedSlots:t._u([{key:"selection",fn:function(e){return[s("v-chip",{staticClass:"chip--select-multi",attrs:{selected:e.selected,close:""},on:{input:function(s){t.remove(e.item)}}},[t._v("\n                      "+t._s(e.item.Name)+"\n                    ")])]}},{key:"item",fn:function(e){return["object"!=typeof e.item?[s("v-list-tile-content",{domProps:{textContent:t._s(e.item)}})]:[s("v-list-tile-content",[s("v-list-tile-title",{domProps:{innerHTML:t._s(e.item.Name)}}),t._v(" "),s("v-list-tile-sub-title",{domProps:{innerHTML:t._s(e.item.ID)}})],1)]]}}]),model:{value:t.selectedSym,callback:function(e){t.selectedSym=e},expression:"selectedSym"}})],1)],1)],1)],1),t._v(" "),s("v-divider"),t._v(" "),s("v-card-actions",[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{loading:t.diagnosing,color:"info",depressed:""},on:{click:t.diagnose}},[t._v("\n            Diagnose\n          ")]),t._v(" "),s("v-btn",{attrs:{color:"success",to:"/docs"}},[t._v("See Nearby Doctors")])],1)],1)],1),t._v(" "),s("v-flex",{staticClass:"mt-3",attrs:{xs12:"",md8:""}},[s("v-slide-y-reverse-transition",[t.resultPop?s("v-card",[s("v-card-title",{staticClass:"headline",attrs:{"primary-title":""}},[t._v("\n            You might be suffering from ...\n          ")]),t._v(" "),s("v-expansion-panel",t._l(t.result,function(e,a){return s("v-expansion-panel-content",{key:a},[s("div",{attrs:{slot:"header"},slot:"header"},[s("h4",[t._v(t._s(e.Issue.Name))]),t._v(" "),s("p",[t._v(t._s(e.Issue.IcdName))])]),t._v(" "),s("v-card",[s("v-card-text",{staticClass:"grey lighten-3"},[t._v(t._s(e.desc))]),t._v(" "),s("v-card-actions",{staticClass:"pa-3"},[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{color:"success"},on:{click:function(s){t.goToDisease(e)}}},[t._v("Read More")])],1)],1)],1)}))],1):t._e()],1),t._v(" "),s("v-alert",{attrs:{type:"error",value:t.error,outline:"",transition:"slide-y-reverse-transition"}},[t._v("\n        Sorry couldn't find any conditions matching your symptoms.\n      ")])],1)],1),t._v(" "),s("v-snackbar",{attrs:{bottom:"","multi-line":"",right:""},model:{value:t.loadingSymptoms,callback:function(e){t.loadingSymptoms=e},expression:"loadingSymptoms"}},[s("v-progress-circular",{staticClass:"mr-3",attrs:{indeterminate:"",color:"red"}}),t._v("\n      Loading Symptoms\n      "),s("v-btn",{attrs:{color:"error",flat:"",timeout:"0"},on:{click:function(e){t.snackbar=!1}}},[t._v("\n        Close\n      ")])],1)],1)},staticRenderFns:[]},u=s("VU/8")(l,d,!1,null,null,null).exports,v={props:["id","title"],data:function(){return{diseaseData:{},descLoading:!1}},methods:{getDiseaseInfo:function(){c()("/api/disease/"+id).then()}},created:function(){this.descLoading=!0;var t=this;c()("/api/disease/"+this.id).then(function(e){var s=e.data;console.log(s),t.descLoading=!1,t.diseaseData=s})}},m={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{"grid-list-xs":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:""}},[s("v-card",[s("v-card-title",{staticClass:"headline",staticStyle:{background:"#cccccc"},attrs:{"primary-title":""}},[t._v("\n          "+t._s(t.title)+"\n        ")]),t._v(" "),s("v-card-text",[s("v-fade-transition",{attrs:{mode:"out-in"}},[t.descLoading?s("div",{key:"loader",staticClass:"flex-center"},[s("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):s("p",{key:"description"},[t._v("\n                "+t._s(t.diseaseData.description)+"\n            ")])])],1)],1)],1),t._v(" "),s("v-fade-transition",[t.descLoading?t._e():[s("v-container",{staticClass:"px-0",attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs12:"",md6:""}},[s("v-card",{staticClass:"px-0"},[s("v-card-title",{staticClass:"red darken-2 white--text",attrs:{"primary-title":""}},[s("h4",{staticClass:"headline"},[t._v("Treatment")])]),t._v(" "),s("v-divider",{attrs:{light:""}}),t._v(" "),s("v-card-text",[t._v("\n                    "+t._s(t.diseaseData.treatement)+"\n                  ")])],1)],1),t._v(" "),s("v-flex",{attrs:{xs12:"",md6:"","d-flex":""}},[s("v-card",{staticClass:"px-0"},[s("v-card-title",{staticClass:"red darken-2 white--text",attrs:{"primary-title":""}},[s("h4",{staticClass:"headline"},[t._v("Symptoms")])]),t._v(" "),s("v-divider",{attrs:{light:""}}),t._v(" "),s("v-card-text",[t._v("\n                    "+t._s(t.diseaseData.symptoms)+"\n                ")])],1)],1)],1)],1)]],2)],1)],1)},staticRenderFns:[]};var p=s("VU/8")(v,m,!1,function(t){s("EwVV")},"data-v-ade15bfc",null).exports,f={data:function(){return{map:null,placesService:null,currPos:null,places:[],markers:[],reducedMarkers:{},away:!1,currentMarker:null}},computed:{hasPlaces:function(){return this.places.length>0}},watch:{markers:function(){var t=this;this.markers.forEach(function(e){t.reducedMarkers[e.id]=e})}},methods:{resetMarker:function(){this.currentMarker&&(this.currentMarker.setIcon(""),this.currentMarker=null)},panToCurrPos:function(){this.away=!1,this.resetMarker(),this.map.panTo(this.currPos)},moveToMarker:function(t){this.$vuetify.goTo(0,{duration:400,offset:0,easing:"easeInOutCubic"}),this.resetMarker(),this.away=!0;var e=""+t,s=this.reducedMarkers[e].marker;this.currentMarker=s,s.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png"),s.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){s.setAnimation(null)},2e3);var a=s.position.lat(),r=s.position.lng();this.map.panTo(new google.maps.LatLng(a,r))},createMarker:function(t){var e=new google.maps.Marker({position:t.geometry.location,map:this.map});this.markers.push({id:t.place_id,marker:e})},searchNearbyDocs:function(){var t={location:this.currPos,radius:"2000",type:["doctor"]},e=this;this.placesService.nearbySearch(t,function(t,s){if(s==google.maps.places.PlacesServiceStatus.OK)for(var a=0;a<t.length;a++){var r={placeId:t[a].place_id,fields:["name","rating","formatted_phone_number","geometry","place_id","adr_address","opening_hours","website"]};e.placesService.getDetails(r,function(t,s){s==google.maps.places.PlacesServiceStatus.OK&&(e.places.push(t),e.createMarker(t))})}})}},mounted:function(){var t=this,e=this;navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(s){var a=s.coords,r=(a.longitude,a.latitude,s.coords,26.92207),n=75.778885,i=new google.maps.LatLng(r,n);e.currPos=i,e.map=new google.maps.Map(t.$refs.map,{center:i,zoom:15});new google.maps.Marker({position:i,map:e.map,icon:"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"});e.placesService=new google.maps.places.PlacesService(e.map),e.searchNearbyDocs()},function(t){console.log("Could not fetch location")})}},g={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:"","justify-center":""}},[s("v-flex",{attrs:{xs12:"",lg6:""}},[s("v-card",[s("v-card-title",{staticClass:"headline",attrs:{"primary-title":""}},[t._v("\n          Nearby Health Care Centers\n        ")]),t._v(" "),s("div",{ref:"map",attrs:{id:"map"}}),t._v(" "),s("v-card-actions",{staticClass:"pa-3"},[s("v-btn",{attrs:{color:"success",disabled:!t.away},on:{click:t.panToCurrPos}},[t._v("Current Location")])],1)],1)],1),t._v(" "),s("v-flex",{staticClass:"mt-3",attrs:{xs12:"",lg6:""}},[s("v-slide-y-transition",[t.hasPlaces?s("v-expansion-panel",{attrs:{popout:""}},t._l(t.places,function(e,a){return s("v-expansion-panel-content",{key:a},[s("div",{attrs:{slot:"header"},slot:"header"},[s("h4",[t._v(t._s(e.name))]),t._v(" "),e.rating?[s("v-flex",{attrs:{xs12:""}},[s("v-layout",{attrs:{row:"","align-center":""}},[s("v-rating",{attrs:{value:e.rating,small:"",color:"orange",readonly:""}}),t._v("\n                    ("+t._s(e.rating)+")\n                    "),s("v-spacer")],1)],1)]:t._e()],2),t._v(" "),s("v-card",[s("v-card-text",{staticClass:"grey lighten-3"},[s("div",{domProps:{innerHTML:t._s(e.adr_address)}}),t._v(" "),e.formatted_phone_number?s("div",[t._v("\n                  Contact Details: "+t._s(e.formatted_phone_number)+"\n                ")]):t._e()]),t._v(" "),s("v-card-actions",{staticClass:"pa-3"},[s("v-spacer"),t._v(" "),s("v-btn",{attrs:{color:"success"},on:{click:function(s){t.moveToMarker(e.place_id)}}},[t._v("See on Map")])],1)],1)],1)})):t._e()],1)],1)],1)],1)},staticRenderFns:[]};var h=s("VU/8")(f,g,!1,function(t){s("u2wu")},"data-v-61702af3",null).exports;a.default.use(i.a);var _=new i.a({mode:"history",routes:[{path:"/",name:"HelloWorld",component:u},{path:"/disease/:id/:title",component:p,props:!0,name:"disease"},{path:"/docs",component:h}]}),y=s("3EgV"),k=s.n(y);s("7zck");s.d(e,"symptomStore",function(){return x}),a.default.use(k.a,{theme:{primary:"#2196F3",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}),a.default.config.productionTip=!1;var x=new a.default({data:function(){return{symptoms:[],result:[],selectedSym:[]}},computed:{noSymptoms:function(){return!(this.symptoms.length>0)},noResult:function(){return!(this.result.length>0)}},methods:{set:function(t){this.symptoms=t},setResult:function(t){this.result=t},setSelSym:function(t){this.selectedSym=t}}});new a.default({el:"#app",router:_,render:function(t){return t(n)}})},TayJ:function(t,e){},u2wu:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c4581fea15b7c3cf6891.js.map