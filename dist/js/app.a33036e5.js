(function(t){function e(e){for(var o,n,i=e[0],l=e[1],c=e[2],h=0,p=[];h<i.length;h++)n=i[h],r[n]&&p.push(r[n][0]),r[n]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(t[o]=l[o]);u&&u(e);while(p.length)p.shift()();return a.push.apply(a,c||[]),s()}function s(){for(var t,e=0;e<a.length;e++){for(var s=a[e],o=!0,i=1;i<s.length;i++){var l=s[i];0!==r[l]&&(o=!1)}o&&(a.splice(e--,1),t=n(n.s=s[0]))}return t}var o={},r={app:0},a=[];function n(e){if(o[e])return o[e].exports;var s=o[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=o,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(s,o,function(e){return t[e]}.bind(null,o));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;a.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("cadf"),s("551c"),s("f751"),s("097d");var o=s("2b0e"),r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"container",attrs:{id:"app"}},[o("h1",{attrs:{align:"center"}},[t._v("Vue Heroes App")]),o("center",[o("img",{attrs:{alt:"Vue logo",src:s("cf05")}})]),o("div",[o("ul",{staticClass:"nav nav-tabs"},[o("li",{staticClass:"nav-item"},[o("router-link",{staticClass:"nav-link",attrs:{to:"/heroes"}},[t._v("Lista bohaterów")])],1),o("li",{staticClass:"nav-item"},[o("router-link",{staticClass:"nav-link",attrs:{to:{name:"new_hero"}}},[t._v("Dodaj bohatera")])],1)])]),o("br"),o("router-view")],1)},a=[],n={},i=n,l=s("2877"),c=Object(l["a"])(i,r,a,!1,null,null,null),u=c.exports,h=s("8c4f"),p=s("2f62"),d=(s("4989"),s("ab8b"),s("bc3a")),f=s.n(d),v=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"list_of_heroes"},[s("div",{staticClass:"container"},[s("h3",[t._v("Lista bohaterów")]),s("br"),s("div",{staticClass:"row"},[s("ul",{staticClass:"list-group"},t._l(t.$store.state.heroes,function(e){return s("li",{key:e.ID,staticClass:"list-group-item"},[s("h2",[t._v(t._s(e.Name))]),t._v("\n          "+t._s(e.Desc)+"\n          "),s("p"),s("p",{attrs:{align:"left"}},[s("router-link",{staticClass:"btn btn-primary",attrs:{to:{name:"edit_hero",params:{id:e.ID}}}},[t._v("Edycja bohatera")])],1),s("p",{attrs:{align:"right"}},[s("button",{staticClass:"btn btn-outline-danger btn-sm",staticStyle:{width:"100px"},attrs:{type:"button"},on:{click:function(s){return t.Usun(e.ID)}}},[t._v("Usuń")])])])}),0)])])])},m=[],b={created:function(){var t=this;console.log("Created ListOfHeroes "),f.a.get("http://localhost:8090/api/v1/heroes").then(function(e){return t.$store.state.heroes=e.data}),console.log(this.$store.state.heroes)},methods:{Usun:function(t){var e=this;console.log("Usunięto "+t),f.a.delete("http://localhost:8090/api/v1/heroes/"+t),f.a.get("http://localhost:8090/api/v1/heroes").then(function(t){return e.$store.state.heroes=t.data})}}},g=b,_=Object(l["a"])(g,v,m,!1,null,null,null),y=_.exports,$=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"single_hero"},["new_hero"==t.$route.name?s("h3",[t._v("Edycja nowego bohatera")]):s("h3",[t._v("Edycja bohatera "+t._s(t.$store.state.heroes[this.index].Name))]),s("br"),s("div",{staticClass:"form-group"},[s("label",[t._v("Nazwa bohatera")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.hero.Name,expression:"$store.state.hero.Name"}],staticClass:"form-control",domProps:{value:t.$store.state.hero.Name},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.Zapis(e)},input:function(e){e.target.composing||t.$set(t.$store.state.hero,"Name",e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",[t._v("Opis bohatera")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.hero.Desc,expression:"$store.state.hero.Desc"}],staticClass:"form-control",domProps:{value:t.$store.state.hero.Desc},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.Zapis(e)},input:function(e){e.target.composing||t.$set(t.$store.state.hero,"Desc",e.target.value)}}})]),s("p",{attrs:{align:"right"}},[s("button",{staticClass:"btn btn-secondary",staticStyle:{"margin-left":"20px",width:"100px"},attrs:{type:"button"},on:{click:t.Anuluj}},[t._v("Anuluj")]),s("button",{staticClass:"btn btn-success",staticStyle:{"margin-left":"20px",width:"100px"},attrs:{type:"button"},on:{click:t.Zapis}},[t._v("Zapis")])])])},w=[],x=(s("20d6"),s("7f7f"),{data:function(){return{index:0}},created:function(){var t=this;"new_hero"==this.$route.name?(this.index=0,this.$store.state.hero.ID=0,this.$store.state.hero.Name="",this.$store.state.hero.Desc=""):(this.index=this.$store.state.heroes.findIndex(function(e){return e.ID===t.$route.params.id}),this.$store.state.hero.ID=this.$store.state.heroes[this.index].ID,this.$store.state.hero.Name=this.$store.state.heroes[this.index].Name,this.$store.state.hero.Desc=this.$store.state.heroes[this.index].Desc),console.log("Created SingleHero "+this.index+" "+this.$route.name)},methods:{Anuluj:function(){history.back()},Zapis:function(){"new_hero"==this.$route.name?(f.a.post("http://localhost:8090/api/v1/heroes",this.$store.state.hero),console.log("Zapis nowego "+this.$store.state.hero.name)):(f.a.put("http://localhost:8090/api/v1/heroes/"+this.$store.state.hero.ID,this.$store.state.hero),console.log("Zapis starego "+this.$store.state.hero.ID)),history.back()}}}),k=x,C=Object(l["a"])(k,$,w,!1,null,null,null),D=C.exports;o["a"].config.productionTip=!1,o["a"].use(h["a"]),o["a"].use(p["a"]);var j=[],O={ID:0,Name:"",Desc:""};j[0]=O;var N=[{path:"/",name:"main",component:y},{path:"/heroes",name:"list_of_heroes",component:y},{path:"/hero/:id",name:"edit_hero",component:D},{path:"/hero/new_hero",name:"new_hero",component:D}],I=new h["a"]({mode:"history",routes:N}),S=new p["a"].Store({state:{heroes:j,hero:O}});console.log("App Start..."),new o["a"]({render:function(t){return t(u)},router:I,store:S,axios:f.a}).$mount("#app")},cf05:function(t,e,s){t.exports=s.p+"img/logo.82b9c7a5.png"}});
//# sourceMappingURL=app.a33036e5.js.map