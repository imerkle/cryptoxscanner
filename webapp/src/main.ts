// The MIT License (MIT)
//
// Copyright (c) 2018-2019 Cranky Kernel
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
// BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import "popper.js";
import "bootstrap";

import * as toastr from "toastr";

declare function require(name: string);

function loadTheme() {
    const requireStyles = () => {
        const themeName = localStorage.getItem("theme");
        switch (themeName) {
            case "dark":
                return require("./styles/theme-dark.scss");
            default:
                return require("./styles/theme-default.scss");
        }
    };

    const styles = requireStyles();

    const node = <HTMLElement>document.createElement("style");
    node.id = "theme";
    node.innerHTML = styles;
    document.body.appendChild(node);
}

if (environment.production) {
    enableProdMode();
}

toastr.options.preventDuplicates = true;

loadTheme();

platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.log(err));
