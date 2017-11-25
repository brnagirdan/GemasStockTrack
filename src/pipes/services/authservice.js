System.register(['angular2/core', 'angular2/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AuthService = (function () {
                function AuthService(http) {
                    this.http = http;
                }
                AuthService.prototype.loginfn = function (usercreds) {
                    var _this = this;
                    this.isLoggedin = false;
                    var headers = new http_1.Headers();
                    var creds = 'grant_type=password&username=' + usercreds.username + '&password=' + usercreds.password;
                    headers.append('Content-Type', 'application/X-www-form-urlencoded');
                    return new Promise(function (resolve) {
                        _this.http.post("http://localhost:60709/token", creds, { headers: headers }).subscribe(function (data) {
                            console.log("posttt iciiiii");
                            console.log(creds);
                            console.log(data.json());
                            console.log("token:" + data.json().access_token);
                            console.log("if------ic");
                            window.localStorage.setItem('auth_key', data.json().access_token);
                            _this.isLoggedin = true;
                            var key = window.localStorage.getItem('auth_key');
                            console.log("key:" + key);
                            resolve(_this.isLoggedin);
                        });
                    });
                };
                AuthService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=authservice.js.map