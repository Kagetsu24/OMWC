!function(t){function e(e){for(var s,r,l=e[0],c=e[1],u=e[2],d=e[3]||[],m=0,h=[];m<l.length;m++)r=l[m],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&h.push(n[r][0]),n[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);for(p&&p(e),o.push.apply(o,d);h.length;)h.shift()();return i.push.apply(i,u||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],s=!0,c=1;c<a.length;c++){var u=a[c];0!==n[u]&&(s=!1)}s&&(i.splice(e--,1),t=l(l.s=a[0]))}return 0===i.length&&(o.forEach((function(t){if(void 0===n[t]){n[t]=null;var e=document.createElement("link");l.nc&&e.setAttribute("nonce",l.nc),e.rel="prefetch",e.as="script",e.href=r(t),document.head.appendChild(e)}})),o.length=0),t}var s={},n={4:0},i=[],o=[];function r(t){return l.p+""+({0:"admin",1:"apps",2:"captain",3:"info",5:"results"}[t]||t)+".js"}function l(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,l),a.l=!0,a.exports}l.e=function(t){var e=[],a=n[t];if(0!==a)if(a)e.push(a[2]);else{var s=new Promise((function(e,s){a=n[t]=[e,s]}));e.push(a[2]=s);var i,o=document.createElement("script");o.charset="utf-8",o.timeout=120,l.nc&&o.setAttribute("nonce",l.nc),o.src=r(t);var c=new Error;i=function(e){o.onerror=o.onload=null,clearTimeout(u);var a=n[t];if(0!==a){if(a){var s=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+s+": "+i+")",c.name="ChunkLoadError",c.type=s,c.request=i,a[1](c)}n[t]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:o})}),12e4);o.onerror=o.onload=i,document.head.appendChild(o)}return Promise.all(e)},l.m=t,l.c=s,l.d=function(t,e,a){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},l.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(l.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)l.d(a,s,function(e){return t[e]}.bind(null,s));return a},l.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/js/",l.oe=function(t){throw console.error(t),t};var c=window.webpackJsonp=window.webpackJsonp||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var p=u,m=(i.push([43,6]),a());e([[],{},0,[3,5]])}({10:function(t,e,a){},23:function(t,e,a){"use strict";var s=a(8);a.n(s).a},24:function(t,e,a){"use strict";var s=a(9);a.n(s).a},41:function(t,e,a){"use strict";var s=a(10);a.n(s).a},42:function(t,e,a){},43:function(t,e,a){"use strict";a.r(e);var s=a(1);s.b.registerHooks(["beforeRouteEnter","beforeRouteLeave","beforeRouteUpdate"]);var n=a(0),i=a.n(n),o=a(11),r=a(6),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:"/"!==t.$route.path||t.user?"":"hero",attrs:{id:"app"}},[a("nav",{staticClass:"nav navbar navbar-expand-md navbar-dark",class:"/"!==t.$route.path||"/"===t.$route.path&&t.user?"navbar-triangles":""},[a("router-link",{staticClass:"navbar-brand p-0",attrs:{to:"/"}},[a("img",{staticClass:"d-inline-block mr-2",attrs:{src:"/img/logo.png",width:"36",height:"36",alt:"osu!BWC"}})]),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"collapse navbar-collapse",attrs:{id:"obwcNavbar"}},[a("ul",{staticClass:"navbar-nav mr-auto"},[a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[t._v("\n                        Home\n                    ")])],1),t._v(" "),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/info"}},[t._v("\n                        Information\n                    ")])],1),t._v(" "),t.hasMappersChoiceEnded?[a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/teams"}},[t._v("\n                            Teams\n                        ")])],1),t._v(" "),a("li",{staticClass:"nav-item dropdown"},[a("a",{staticClass:"nav-link dropdown-toggle",attrs:{href:"#","data-toggle":"dropdown"}},[t._v("\n                            Results\n                        ")]),t._v(" "),a("div",{staticClass:"dropdown-menu"},[a("router-link",{staticClass:"dropdown-item",attrs:{to:"/results/qualifiers"}},[t._v("\n                                Qualifiers\n                            ")]),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/results/elimination"}},[t._v("\n                                Eliminations\n                            ")])],1)])]:t._e(),t._v(" "),a("li",{staticClass:"nav-item"},[a("router-link",{staticClass:"nav-link",attrs:{to:"/staff"}},[t._v("\n                        Staff\n                    ")])],1),t._v(" "),t.user&&t.user.isStaff?a("li",{staticClass:"nav-item dropdown"},[a("a",{staticClass:"nav-link dropdown-toggle",attrs:{href:"#","data-toggle":"dropdown"}},[t._v("\n                        Admin\n                    ")]),t._v(" "),a("div",{staticClass:"dropdown-menu"},[a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/users/access"}},[t._v("\n                            Access Requests\n                        ")]),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/schedule"}},[t._v("\n                            Schedule\n                        ")]),t._v(" "),a("div",{staticClass:"dropdown-divider"}),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/captainChoice"}},[t._v("\n                            Captain Choice\n                        ")]),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/teamsChoice"}},[t._v("\n                            Teams Choice\n                        ")]),t._v(" "),a("div",{staticClass:"dropdown-divider"}),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/rounds"}},[t._v("\n                            Rounds\n                        ")]),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/submissions"}},[t._v("\n                            Submissions\n                        ")]),t._v(" "),a("div",{staticClass:"dropdown-divider"}),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/judging"}},[t._v("\n                            Judging List\n                        ")]),t._v(" "),a("div",{staticClass:"dropdown-divider"}),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/users/roles"}},[t._v("\n                            Edit User Role\n                        ")]),t._v(" "),a("router-link",{staticClass:"dropdown-item",attrs:{to:"/admin/logs"}},[t._v("\n                            Logs\n                        ")])],1)]):t._e()],2),t._v(" "),!t.user&&t.initialized?a("form",{staticClass:"form-inline my-2 my-lg-0 ml-3",attrs:{action:"/login",method:"get"}},[a("button",{staticClass:"btn btn-link",attrs:{type:"submit"}},[t._v("\n                    Verify your osu! account\n                ")])]):t._e()])],1),t._v(" "),a("loading-page",[a("transition",{attrs:{name:"route-transition",mode:"out-in"}},[a("router-view")],1)],1)],1)};l._withStripped=!0;var c=a(4),u=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.isLoading?e("div",{staticClass:"d-flex justify-content-center align-items-center loading-container opacity-transition"},[this._m(0)]):this._e(),this._v(" "),e("div",{staticClass:"opacity-transition",class:this.isLoading?"loading-content":""},[this._t("default")],2)])};u._withStripped=!0;var d=function(t,e,a,s){var n,i=arguments.length,o=i<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,a,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(i<3?n(o):i>3?n(e,a,o):n(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o},p=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let m=class extends i.a{};d([c.b,p("design:type",Boolean)],m.prototype,"isLoading",void 0),m=d([s.b],m);var h=m,v=(a(23),a(3)),f=Object(v.a)(h,u,[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"spinner-border",staticStyle:{height:"3rem",width:"3rem"},attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[this._v("Loading...")])])}],!1,null,null,null);f.options.__file="src/components/LoadingPage.vue";var g=f.exports,C=function(t,e,a,s){var n,i=arguments.length,o=i<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,a,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(i<3?n(o):i>3?n(e,a,o):n(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o},b=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let _=class extends i.a{get hasMappersChoiceEnded(){var t;return(null===(t=this.schedule)||void 0===t?void 0:t.mappersChoiceEndedAt)&&new Date(this.schedule.mappersChoiceEndedAt)<new Date}};C([c.b,b("design:type",Object)],_.prototype,"initialized",void 0),C([c.b,b("design:type",Object)],_.prototype,"user",void 0),C([c.b,b("design:type",Object)],_.prototype,"schedule",void 0),_=C([Object(s.b)({components:{LoadingPage:g}})],_);var w=_,y=(a(24),Object(v.a)(w,l,[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#obwcNavbar"}},[e("span",{staticClass:"navbar-toggler-icon"})])}],!1,null,null,null));y.options.__file="src/App.vue";var x=y.exports,k=a(5),D=a.n(k),R=function(t,e,a,s){return new(a||(a=Promise))((function(n,i){function o(t){try{l(s.next(t))}catch(t){i(t)}}function r(t){try{l(s.throw(t))}catch(t){i(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(o,r)}l((s=s.apply(t,e||[])).next())}))};var S={state:{initialized:!1,user:null,schedule:null,isLoading:!1,teams:[],criterias:[],judges:[],qualifier:null,eliminationRounds:[],currentRound:null},getters:{submissionsLength(t){var e,a,s;return null===(s=null===(a=null===(e=t.qualifier)||void 0===e?void 0:e.matches)||void 0===a?void 0:a[0].submissions)||void 0===s?void 0:s.length},nonFinals:t=>t.eliminationRounds.length?t.eliminationRounds.slice(0,t.eliminationRounds.length-1):[],finals:t=>t.eliminationRounds.length?t.eliminationRounds[t.eliminationRounds.length-1]:null},mutations:{setData(t,e){t.user=e.user,t.schedule=e.schedule,t.initialized=!0},updateUser(t,e){t.user=e},updateSchedule(t,e){t.schedule=e},updateLoadingState(t){t.isLoading=!t.isLoading},updateTeams(t,e){t.teams=e||[]},updateQualifier(t,e){t.criterias=e.criterias||[],t.judges=e.judges||[],t.qualifier=e.qualifier},updateEliminations(t,e){t.eliminationRounds=e.rounds||[],t.currentRound=e.currentRound}},actions:{getTeams({commit:t}){return R(this,void 0,void 0,(function*(){const e=yield D.a.get("/api/teams");t("updateTeams",e.data.teams)}))}}},j=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"container text-center"},[a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm"},[t.user?a("div",{staticClass:"header"},[a("img",{attrs:{src:"/img/logo.png",width:"60",heigth:"60"}}),t._v(" "),a("div",[a("h3",{staticClass:"ml-2 mb-0"},[t._v("\n                            Welcome\n                            "),a("b",[t._v(t._s(t.user.username))])]),t._v(" "),a("div",{staticClass:"d-flex ml-2 align-items-center"},[a("span",{staticClass:"ml-2"},[t._v("\n                                you're participating for "),a("b",[t._v(t._s(t.user.country.name))])])])])]):a("div",{staticClass:"my-4"},[a("img",{staticClass:"mt-2",attrs:{src:"/img/logo_large.png",width:"150",height:"150"}}),t._v(" "),a("h2",[t._v("\n                        osu! Beatmapping World Championship\n                    ")]),t._v(" "),a("h5",[t._v("\n                        from may 02 to october 17\n                    ")])])])])]),t._v(" "),a("div",{staticClass:"d-flex",staticStyle:{"background-color":"rgb(23, 26, 28)"}},[a("div",{staticClass:"container text-center",staticStyle:{"margin-top":"-30px"}},[a("home-nav",{attrs:{schedule:t.schedule,user:t.user}}),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm"},[a("div",{staticClass:"card"},[t._m(2),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm"},[a("schedule-date",{attrs:{collapse:"preparationCollapse","group-title":"Preparation phase",dates:t.preparationDates}}),t._v(" "),a("hr"),t._v(" "),a("schedule-date",{attrs:{collapse:"qualifiersCollapse","group-title":"Qualifiers",dates:t.qualifiersDates}}),t._v(" "),a("hr"),t._v(" "),a("schedule-date",{attrs:{collapse:"eliminationCollapse","group-title":"Head-to-head elimination",dates:t.eliminationDates}})],1)])])])])])],1)])])};j._withStripped=!0;var A=function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.showNav?a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[t.user.isBasicUser&&!t.hasCaptainVotingEnded?a("div",[t.requestingAccess||t.user.requestAccess?!t.requestingAccess&&t.user.requestAccess?a("a",{staticClass:"btn btn-secondary btn-block btn-lg disabled",attrs:{href:"#"}},[t._v("\n                        "+t._s("Rejected"==t.user.requestAccess.status?"Your request was rejected":"You've requested access ("+t.user.requestAccess.mapLink+")")+"\n                    ")]):[a("input",{directives:[{name:"model",rawName:"v-model",value:t.requestAccessLink,expression:"requestAccessLink"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Link a ranked GD"},domProps:{value:t.requestAccessLink},on:{input:function(e){e.target.composing||(t.requestAccessLink=e.target.value)}}}),t._v(" "),a("button",{staticClass:"btn btn-primary btn-block",on:{click:function(e){return t.requestAccess(e)}}},[t._v("\n                            Request\n                        ")]),t._v(" "),a("hr")]:a("button",{staticClass:"btn btn-primary btn-block btn-lg",on:{click:function(e){t.requestingAccess=!0}}},[t._v("\n                        Request elevated access\n                    ")]),t._v(" "),a("p",{staticClass:"small mt-1"},[t._v("\n                        You require this to apply as a captain and for voting the team captain\n                    ")])],2):t._e(),t._v(" "),t.hasApplicationsEnded?t._e():a("div",[t.user.isElevatedUser?a("div",[a("router-link",{staticClass:"btn btn-block btn-lg",class:t.getStateClassButton(t.schedule.applicationsStartedAt),attrs:{to:"/applications/captains"}},[t._v("\n                            "+t._s(t.user.captainApplication?"Edit your team captain application":"Apply for team captain")+"\n                        ")]),t._v(" "),a("p",{staticClass:"small"},[t._v("\n                            "+t._s(t.applicationsDateText)+"\n                        ")])],1):t._e(),t._v(" "),t.user.mapperApplication?a("a",{staticClass:"btn btn-secondary disabled btn-block btn-lg",attrs:{href:"#"}},[t._v("\n                        You've applied as a mapper\n                    ")]):[a("router-link",{staticClass:"btn btn-block btn-lg",class:t.getStateClassButton(t.schedule.applicationsStartedAt),attrs:{to:"/applications/mappers/"}},[t._v("\n                            Apply as a mapper\n                        ")]),t._v(" "),a("p",{staticClass:"small mt-1"},[t._v("\n                            "+t._s(t.applicationsDateText)+"\n                        ")])],t._v(" "),a("hr")],2),t._v(" "),t.user.isElevatedUser&&!t.hasCaptainVotingEnded?a("div",[a("router-link",{staticClass:"btn btn-block btn-lg",class:t.getStateClassButton(t.schedule.captainVotingStartedAt),attrs:{to:"/applications/voting"}},[t._v("\n                        Captain Voting\n                    ")]),t._v(" "),a("p",{staticClass:"small mt-1"},[t._v("\n                        "+t._s(t.votingDateText)+"\n                    ")])],1):t._e(),t._v(" "),t.user.isCaptain?[t.hasMappersChoiceEnded?t.user.country.wasConfirmed?a("router-link",{staticClass:"btn btn-primary btn-block btn-lg",attrs:{to:"/submissions"}},[t._v("\n                        .osz submissions\n                    ")]):t._e():a("div",[a("router-link",{staticClass:"btn btn-block btn-lg",class:t.getStateClassButton(t.schedule.mappersChoiceStartedAt),attrs:{to:"/applications/mappersChoice"}},[t._v("\n                            Mappers' Choice\n                        ")]),t._v(" "),a("p",{staticClass:"small mt-1"},[t._v("\n                            "+t._s(t.mappersChoiceDateText)+"\n                        ")])],1)]:t._e(),t._v(" "),t.user.isJudge?[a("router-link",{staticClass:"btn btn-primary btn-block btn-lg",attrs:{to:"/judging"}},[t._v("\n                        Judging\n                    ")])]:t._e()],2)])])]):t._e()};A._withStripped=!0;var T=function(t,e,a,s){var n,i=arguments.length,o=i<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,a,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(i<3?n(o):i>3?n(e,a,o):n(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o},E=function(t,e,a,s){return new(a||(a=Promise))((function(n,i){function o(t){try{l(s.next(t))}catch(t){i(t)}}function r(t){try{l(s.throw(t))}catch(t){i(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(o,r)}l((s=s.apply(t,e||[])).next())}))};let q=class extends i.a{constructor(){super(...arguments),this.requestingAccess=!1,this.requestAccessLink=null}get hasApplicationsEnded(){return this.schedule.applicationsEndedAt&&new Date(this.schedule.applicationsEndedAt)<new Date}get hasCaptainVotingEnded(){return this.schedule.captainVotingEndedAt&&new Date(this.schedule.captainVotingEndedAt)<new Date}get hasMappersChoiceEnded(){return this.schedule.mappersChoiceEndedAt&&new Date(this.schedule.mappersChoiceEndedAt)<new Date}get applicationsDateText(){return`from ${new Date(this.schedule.applicationsStartedAt).toLocaleString()}\n                to ${new Date(this.schedule.applicationsEndedAt).toLocaleString()}`}get votingDateText(){return`from ${new Date(this.schedule.captainVotingStartedAt).toLocaleString()}\n                to ${new Date(this.schedule.captainVotingEndedAt).toLocaleString()}`}get mappersChoiceDateText(){return`from ${new Date(this.schedule.mappersChoiceStartedAt).toLocaleString()}\n                to ${new Date(this.schedule.mappersChoiceEndedAt).toLocaleString()}`}get showNav(){return this.user&&!this.user.isRestricted&&!this.user.isStaff&&this.schedule&&(!this.hasMappersChoiceEnded||this.hasMappersChoiceEnded&&(this.user.isCaptain||this.user.isJudge))}requestAccess(t){return E(this,void 0,void 0,(function*(){yield this.postRequest("/api/users/requestAccess",{mapLink:this.requestAccessLink},t,t=>{this.requestingAccess=!1,this.requestAccessLink=null,this.$store.commit("updateUser",t.user),alert("Request submitted! An admin will evaluate it soon")})}))}getStateClassButton(t){return!t||t&&new Date(t)>new Date?"disabled btn-secondary":"btn-primary"}};q=T([Object(s.b)({props:{user:Object,schedule:Object}})],q);var O=q,L=Object(v.a)(O,A,[],!1,null,null,null);L.options.__file="src/components/index/HomeNav.vue";var U=L.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("h5",[a("a",{attrs:{"data-toggle":"collapse",href:"#"+t.collapse},on:{click:function(e){t.isExpanded=!t.isExpanded}}},[a("small",[a("i",{staticClass:"fas mr-2",class:t.isExpanded?"fa-chevron-down":"fa-chevron-right"})]),t._v("\n            "+t._s(t.groupTitle)+"\n        ")])]),t._v(" "),a("p",[t._v("\n        "+t._s(t._f("shortDateTimeString")(t.dates[0].from))+" -\n        "+t._s(t._f("shortDateTimeString")(t.dates[t.dates.length-1].to||t.dates[t.dates.length-2].to))+"\n    ")]),t._v(" "),a("div",{staticClass:"collapse",attrs:{id:t.collapse}},[a("div",{staticClass:"card card-body text-left"},t._l(t.dates,(function(e,s){return a("div",{key:s,staticClass:"row align-items-center",class:t.getRowClasses(s,e.from,e.to)},[a("div",{staticClass:"col-sm-3"},[a("div",[t._v("\n                        "+t._s(t._f("shortDateTimeString")(e.from))+"\n                    ")]),t._v(" "),e.to?a("div",[t._v("\n                        "+t._s(t._f("shortDateTimeString")(e.to))+"\n                    ")]):t._e()]),t._v(" "),a("div",{staticClass:"col-sm-9"},[t._v("\n                    "+t._s(e.text)+"\n                ")])])})),0)])])};B._withStripped=!0;var P=function(t,e,a,s){var n,i=arguments.length,o=i<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,a,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(i<3?n(o):i>3?n(e,a,o):n(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o};let W=class extends i.a{constructor(){super(...arguments),this.isExpanded=!1}getRowClasses(t,e,a){const s=new Date,n=[];return t!==this.dates.length-1&&n.push("mb-3"),a&&s>=e&&s<=a&&n.push("current-date"),n}};W=P([Object(s.b)({props:{collapse:{type:String,required:!0},groupTitle:{type:String,required:!0},dates:{type:Array,required:!0}}})],W);var M=W,$=(a(41),Object(v.a)(M,B,[],!1,null,null,null));$.options.__file="src/components/index/ScheduleDate.vue";var J=$.exports,V=function(t,e,a,s){var n,i=arguments.length,o=i<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,a):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,a,s);else for(var r=t.length-1;r>=0;r--)(n=t[r])&&(o=(i<3?n(o):i>3?n(e,a,o):n(e,a))||o);return i>3&&o&&Object.defineProperty(e,a,o),o},z=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};let N=class extends i.a{constructor(){super(...arguments),this.preparationCollapse=!1,this.qualifiersCollapse=!1,this.eliminationCollapse=!1,this.preparationDates=[{from:new Date("05/02/2020 UTC"),to:new Date("05/16/2020 UTC"),text:"Announcements and Registration phase (Team Captains and Contestants)"},{from:new Date("05/16/2020 UTC"),to:new Date("05/23/2020 UTC"),text:"Voting phase for each country's Team Captain"},{from:new Date("05/23/2020 UTC"),to:new Date("05/30/2020 UTC"),text:"Team Building phase"}],this.qualifiersDates=[{from:new Date("05/30/2020 UTC"),to:new Date("06/13/2020 UTC"),text:"Mapping Phase"},{from:new Date("06/14/2020 UTC"),to:new Date("06/28/2020 UTC"),text:"Judging Phase"}],this.eliminationDates=[{from:new Date("06/30/2020 UTC"),to:new Date("07/13/2020 UTC"),text:"Round of 16 - Mapping phase"},{from:new Date("07/14/2020 UTC"),to:new Date("07/22/2020 UTC"),text:"Round of 16 - Judging phase"},{from:new Date("07/24/2020 UTC"),to:new Date("08/08/2020 UTC"),text:"Quarter finals - Mapping phase"},{from:new Date("08/09/2020 UTC"),to:new Date("08/17/2020 UTC"),text:"Quarter finals - Judging phase"},{from:new Date("08/19/2020 UTC"),to:new Date("09/03/2020 UTC"),text:"Semi finals - Mapping phase"},{from:new Date("09/04/2020 UTC"),to:new Date("09/13/2020 UTC"),text:"Semi finals - Judging phase"},{from:new Date("09/15/2020 UTC"),to:new Date("09/30/2020 UTC"),text:"Finals - Mapping phase"},{from:new Date("10/01/2020 UTC"),to:new Date("10/09/2020 UTC"),text:"Finals - Judging phase"},{from:new Date("10/17/2020 UTC"),text:"Finals livestream"}]}};V([c.b,z("design:type",Object)],N.prototype,"user",void 0),V([c.b,z("design:type",Object)],N.prototype,"schedule",void 0),N=V([Object(s.b)({components:{HomeNav:U,ScheduleDate:J}})],N);var F=N,H=Object(v.a)(F,j,[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("div",{staticClass:"d-flex justify-content-around flex-wrap"},[a("a",{staticClass:"d-flex align-items-center mb-3 mb-sm-0",attrs:{href:"https://discord.gg/CZp4bNx",target:"__blank"}},[a("i",{staticClass:"fab fa-discord fa-3x text-white"}),t._v(" "),a("h4",{staticClass:"mx-3 mb-0"},[t._v("Join us!")])]),t._v(" "),a("a",{staticClass:"d-flex align-items-center mb-3 mb-sm-0",attrs:{href:"https://osu.ppy.sh/community/forums/topics/1060035",target:"__blank"}},[a("span",{staticClass:"country-flag",staticStyle:{"background-image":"url('/img/osu.png')",height:"50px",width:"50px"}}),t._v(" "),a("h4",{staticClass:"mx-3 mb-0"},[t._v("\n                                        Forum Post\n                                    ")])]),t._v(" "),a("a",{staticClass:"d-flex align-items-center mb-3 mb-sm-0",attrs:{href:"https://twitter.com/osubwc",target:"__blank"}},[a("i",{staticClass:"fab fa-twitter fa-3x text-white"}),t._v(" "),a("h4",{staticClass:"mx-3 mb-0"},[t._v("\n                                        Follow us!\n                                    ")])]),t._v(" "),a("a",{staticClass:"d-flex align-items-center mb-3 mb-sm-0",attrs:{href:"https://pickem.hwchr.com/tournaments/30",target:"__blank"}},[a("span",{staticClass:"country-flag",staticStyle:{"background-image":"url('/img/pickem.png')",height:"50px",width:"50px"}}),t._v(" "),a("h4",{staticClass:"ml-3 mb-0"},[t._v("\n                                        Pick'em\n                                    ")])])])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-header"},[a("h3",{staticClass:"mb-0"},[t._v("\n                                Prizes\n                            ")]),t._v(" "),a("small",[t._v("\n                                supporter tags are for each team member\n                            ")])]),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm"},[a("h5",{staticClass:"text-warning"},[a("i",{staticClass:"fas fa-crown mr-1"}),t._v("\n                                        1st place\n                                    ")]),t._v(" "),a("div",[a("img",{attrs:{src:"/img/badge_1.png",width:"100"}}),t._v(" "),a("p",{staticClass:"mt-1"},[a("small",[a("i",{staticClass:"fas fa-heart mr-1"})]),t._v("\n                                            8 months of osu!supporter\n                                        ")])]),t._v(" "),a("hr"),t._v(" "),a("h5",{staticClass:"text-info"},[a("i",{staticClass:"fas fa-crown mr-1"}),t._v("\n                                        2nd place\n                                    ")]),t._v(" "),a("div",[a("img",{attrs:{src:"/img/badge_2.png",width:"100"}}),t._v(" "),a("p",{staticClass:"mt-1"},[a("small",[a("i",{staticClass:"fas fa-heart mr-1"})]),t._v("\n                                            6 months of osu!supporter\n                                        ")])]),t._v(" "),a("hr"),t._v(" "),a("h5",{staticClass:"text-white-50"},[a("i",{staticClass:"fas fa-crown mr-1"}),t._v("\n                                        3rd place\n                                    ")]),t._v(" "),a("div",[a("img",{staticClass:"mr-2",attrs:{src:"/img/badge_3.png",width:"100"}}),t._v(" "),a("p",{staticClass:"mt-1"},[a("small",[a("i",{staticClass:"fas fa-heart mr-1"})]),t._v("\n                                            4 months of osu!supporter\n                                        ")])])])])])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-header"},[e("h3",{staticClass:"mb-0"},[this._v("\n                                Schedule\n                            ")]),this._v(" "),e("small",[this._v("dates are in your local timezone")])])}],!1,null,null,null);H.options.__file="src/views/Index.vue";const Q=()=>a.e(0).then(a.bind(null,64));var Y=[{path:"/",component:H.exports},{path:"/info",component:()=>a.e(3).then(a.bind(null,50)),meta:{title:"Information - osu!BWC"}},{path:"/staff",component:()=>a.e(3).then(a.bind(null,53)),meta:{title:"Staff - osu!BWC"}},{path:"/teams",component:()=>a.e(3).then(a.bind(null,54)),meta:{title:"Teams - osu!BWC"}},{path:"/results/qualifiers",component:()=>a.e(5).then(a.bind(null,55)),meta:{title:"Results - osu!BWC"}},{path:"/results/elimination",component:()=>a.e(5).then(a.bind(null,51)),meta:{title:"Results - osu!BWC"}},{path:"/submissions",component:()=>a.e(2).then(a.bind(null,60)),meta:{title:"Submissions - osu!BWC"}},{path:"/applications/captains",component:()=>a.e(1).then(a.bind(null,56)),meta:{title:"Captain Apps - osu!BWC"}},{path:"/applications/mappers",component:()=>a.e(1).then(a.bind(null,57)),meta:{title:"Mappers Apps - osu!BWC"}},{path:"/applications/voting",component:()=>a.e(1).then(a.bind(null,58)),meta:{title:"Captain Voting - osu!BWC"}},{path:"/applications/mappersChoice",component:()=>a.e(2).then(a.bind(null,59)),meta:{title:"Mappers Choice - osu!BWC"}},{path:"/admin/logs",component:()=>a.e(0).then(a.bind(null,68)),meta:{title:"Logs - osu!BWC"}},{path:"/admin/users/access",component:()=>a.e(0).then(a.bind(null,66)),meta:{title:"Access Requests - osu!BWC"}},{path:"/admin/users/roles",component:()=>a.e(0).then(a.bind(null,67)),meta:{title:"Manage Roles - osu!BWC"}},{path:"/admin/schedule",component:()=>a.e(0).then(a.bind(null,61)),meta:{title:"Schedule - osu!BWC"}},{path:"/admin/captainChoice",component:()=>a.e(0).then(a.bind(null,62)),meta:{title:"Captain Choice - osu!BWC"}},{path:"/admin/teamsChoice",component:()=>a.e(0).then(a.bind(null,63)),meta:{title:"Teams Choice - osu!BWC"}},{path:"/admin/rounds",component:()=>a.e(0).then(a.bind(null,65)),meta:{title:"Manage Rounds - osu!BWC"}},{path:"/admin/rounds/create",component:Q,meta:{title:"Manage Rounds - osu!BWC"}},{path:"/admin/rounds/:id(\\d+)",component:Q,meta:{title:"Manage Rounds - osu!BWC"}},{path:"/admin/rounds/:id(\\d+)/matches",component:()=>a.e(0).then(a.bind(null,52)),meta:{title:"Manage Rounds - osu!BWC"}},{path:"/admin/submissions",component:()=>a.e(0).then(a.bind(null,69)),meta:{title:"Manage Submissions - osu!BWC"}},{path:"/admin/judging",component:()=>a.e(0).then(a.bind(null,70)),meta:{title:"Judging - osu!BWC"}},{path:"*",redirect:"/"}],I=(a(42),function(t,e,a,s){return new(a||(a=Promise))((function(n,i){function o(t){try{l(s.next(t))}catch(t){i(t)}}function r(t){try{l(s.throw(t))}catch(t){i(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(o,r)}l((s=s.apply(t,e||[])).next())}))});function G(t,e,a){return I(this,void 0,void 0,(function*(){try{const s=yield t();return(s.data.error||s.data.success)&&alert(s.data.error||s.data.success),!a||s.data.error&&!s.data.success||a(s.data),s.data}catch(t){return console.log("Catch",t),void alert("Something went wrong!")}finally{e()}}))}var Z=i.a.extend({methods:{initialRequest(t,e){return this.$store.commit("updateLoadingState"),G(()=>D.a.get(t),()=>this.$store.commit("updateLoadingState"),e)},getRequest:(t,e,a)=>((null==e?void 0:e.target)&&(e.target.disabled=!0),G(()=>D.a.get(t),()=>{(null==e?void 0:e.target)&&(e.target.disabled=!1)},a)),postRequest:(t,e,a,s)=>((null==a?void 0:a.target)&&(a.target.disabled=!0),G(()=>D.a.post(t,e),()=>{(null==a?void 0:a.target)&&(a.target.disabled=!1)},s))}}),K=function(t,e,a,s){return new(a||(a=Promise))((function(n,i){function o(t){try{l(s.next(t))}catch(t){i(t)}}function r(t){try{l(s.throw(t))}catch(t){i(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof a?e:new a((function(t){t(e)}))).then(o,r)}l((s=s.apply(t,e||[])).next())}))};i.a.use(o.a),i.a.use(r.a);const X=new r.a.Store(S),tt=new o.a({mode:"history",routes:Y,linkExactActiveClass:"active"});tt.beforeEach((t,e,a)=>K(void 0,void 0,void 0,(function*(){if(document.title=t.meta.title||"osu! Beatmapping World Championship",!X.state.initialized){const t=yield D.a.get("/api/");X.commit("setData",t.data)}t.matched.some(t=>{var e,a,s,n,i,o,r;return t.path.startsWith("/admin")&&!(null===(e=X.state.user)||void 0===e?void 0:e.isStaff)||t.path.startsWith("/judging")&&!(null===(a=X.state.user)||void 0===a?void 0:a.isJudge)||t.path.startsWith("/applications/mappersChoice")&&!(null===(s=X.state.user)||void 0===s?void 0:s.isCaptain)||t.path.startsWith("/submissions")&&(!(null===(n=X.state.user)||void 0===n?void 0:n.isCaptain)||(null===(i=X.state.user)||void 0===i?void 0:i.isCaptain)&&!(null===(o=X.state.user)||void 0===o?void 0:o.country.wasConfirmed))||(t.path.startsWith("/applications/captains")||t.path.startsWith("/applications/voting"))&&!(null===(r=X.state.user)||void 0===r?void 0:r.isElevatedUser)})?a({path:"/"}):a()}))),i.a.filter("shortDateTimeString",t=>t?new Date(t).toLocaleString("en-US",{month:"long",day:"numeric",hour:"numeric"}):""),i.a.mixin(Z),new i.a({store:X,router:tt,render:t=>t(x)}).$mount("#app")},8:function(t,e,a){},9:function(t,e,a){}});