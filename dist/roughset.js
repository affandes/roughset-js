(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["roughsetJs"] = factory();
	else
		root["roughsetJs"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\n\r\n/*\r\nTODO:\r\nHow roughset works\r\n1. Import table / information system\r\n2. Convert to comfort structure\r\n3. Reduct inconsistent rows\r\n4. Generate indiscernability relations\r\n5. Set approximation (lower and higher)\r\n6. Boundary region\r\n7. Indispansable and dispansable Attributes (reduct)\r\n8. Finding Core\r\n */\r\n\r\nvar RoughSetJs = function () {\r\n    /**\r\n     * Items in 2-d array\r\n     * Ex: [[1,2,1,3,2,0],[3,2,3,1,2,1]]\r\n     *\r\n     * @type {Array}\r\n     * @private\r\n     */\r\n    let items = [];\r\n\r\n    /**\r\n     * Conditional Attributes list\r\n     * Ex: ['x1','x2','x3']\r\n     *\r\n     * @type {Array}\r\n     * @private\r\n     */\r\n    let attributes = [];\r\n\r\n    /**\r\n     * Decision data in 0-based integer\r\n     * Ex: 0\r\n     *\r\n     * @type {Array}\r\n     * @private\r\n     */\r\n    let decisionIndex = 0;\r\n\r\n    /**\r\n     * Is items has non-numeric value?\r\n     *\r\n     * @type {boolean}\r\n     * @private\r\n     */\r\n    let hasNonNumeric = false;\r\n\r\n    /**\r\n     * Dictionary for data converter\r\n     * @type {Array}\r\n     * @private\r\n     */\r\n    let dictionary = [];\r\n\r\n    // Step 1 - Discretization\r\n    let hasDiscretized = false;\r\n    let itemsDiscretized = [];\r\n\r\n    // Step 2 - Indiscernibility Relations\r\n    let indiscernibilityAll = null;\r\n    let indiscernibilitySubstract = [];\r\n\r\n    // Step 3 - Indispensable\r\n    let hasFindIndipensable = false;\r\n    let dispensable = [];\r\n    let indispensable = [];\r\n    let substractAttributes = [];\r\n\r\n    let hasFindReduct = false;\r\n    let reductList = [];\r\n\r\n    function isValidItems(values) {\r\n        if( !Array.isArray(values) ) {\r\n            console.error('Items must be an Array!');\r\n            return false\r\n        } else if( values.length < 1 ) {\r\n            console.error('Items cannot empty!');\r\n            return false\r\n        } else  {\r\n            let obj = values[0];\r\n            if( !Array.isArray(obj) ) {\r\n                console.error('Items must be a matrix!');\r\n                return false\r\n            } else {\r\n                let valid = true;\r\n                for(let i = 0; i < values.length; i++) {\r\n                    let o = values[i];\r\n                    if( !Array.isArray(o) ) {\r\n                        console.error('Items must be a matrix!');\r\n                        valid = false;\r\n                        break\r\n                    } else if( o.length !== obj.length ) {\r\n                        console.error('Each row must be has same length!');\r\n                        valid = false;\r\n                        break\r\n                    }\r\n                    if( !hasNonNumeric ) {\r\n                        for(let j = 0; j < o.length; j++) {\r\n                            if( typeof o[j] !== 'number' ) {\r\n                                console.warn('Items is has non-numeric value!');\r\n                                hasNonNumeric = true;\r\n                                break\r\n                            }\r\n                        }\r\n                    }\r\n                }\r\n                return valid\r\n            }\r\n        }\r\n    }\r\n\r\n    function isValidAttribues(values) {\r\n        if( !Array.isArray(values) ) {\r\n            console.error('Attributes must be an array!');\r\n            return false\r\n        } else if( values.length < 1 ) {\r\n            console.error('Attributes cannot empty!');\r\n            return false\r\n        } else {\r\n            let valid = true;\r\n            for(let i = 0; i < values.length; i++) {\r\n                if( typeof values[i] !== 'number' && typeof values[i] !== 'string' ) {\r\n                    console.error('Attributes must be an string array or number array!');\r\n                    break\r\n                }\r\n            }\r\n            return valid\r\n        }\r\n    }\r\n\r\n    function isValidDecisionIndex(index) {\r\n        if( typeof index !== 'number' ) {\r\n            console.error('Index must be a number!');\r\n            return false\r\n        } else if( index < 0 ) {\r\n            console.error('Index must be positive number!');\r\n            return false\r\n        } else if(index >= attributes.length) {\r\n            console.error('Index cannot equal or greater than ' + attributes.length + '!' );\r\n            return false\r\n        } else {\r\n            return true\r\n        }\r\n    }\r\n\r\n    function isValidInformationSystem(values) {\r\n        if( typeof values !== 'object' ) {\r\n            console.error('I must be an object!');\r\n            return false\r\n        } else if( Array.isArray(values) ) {\r\n            console.error('I cannot be an array!');\r\n            return false\r\n        } else {\r\n            if( values.U === undefined || values.U === null ) {\r\n                console.error('I must have U key!');\r\n                return false\r\n            } else if( values.A === undefined || values.A === null ) {\r\n                console.error('I must have A key!');\r\n                return false\r\n            } else {\r\n                return isValidItems(values.U) && isValidAttribues(values.A)\r\n            }\r\n        }\r\n    }\r\n\r\n    function discretization() {\r\n        let values = items;\r\n        if( items.length === 0 ) {\r\n            console.error('Please set items first!');\r\n            return\r\n        }\r\n        if( hasNonNumeric ) {\r\n            for (let i = 0; i < values.length; i++) {\r\n                for (let j = 0; j < values[i].length; j++) {\r\n                    if( typeof values[i][j] !== 'number' ) {\r\n                        if( dictionary[j] === undefined ) {\r\n                            dictionary[j] = []\r\n                        }\r\n                        let key = dictionary[j].indexOf(values[i][j]);\r\n                        if( key < 0) {\r\n                            dictionary[j].push(values[i][j]);\r\n                            key = dictionary[j].length-1\r\n                        }\r\n                        values[i][j] = key\r\n                    }\r\n                }\r\n            }\r\n        }\r\n        itemsDiscretized = values;\r\n        hasDiscretized = true;\r\n    }\r\n\r\n    /**\r\n     * Indiscernibility Relations by attributes selected.\r\n     *\r\n     *\r\n     * @param values {Array} Attributes selected or empty for all attributes.\r\n     * @returns {{keys: [], classes: [], conflicts: [], decisions: [], relations: []}}\r\n     */\r\n    function findIndiscernibility(values = []) {\r\n\r\n        let results = {classes: [], keys: [], relations: [], decisions: [], conflicts: []};\r\n        values = Array.isArray(values) ? values : [];\r\n\r\n        if( !hasDiscretized ) {\r\n            discretization();\r\n        }\r\n\r\n        itemsDiscretized[0].forEach((v,k) => {\r\n            if( k !== decisionIndex && (values.length === 0 || values.indexOf(attributes[k]) >= 0) ) {\r\n                results.keys.push(k)\r\n            }\r\n        });\r\n\r\n        for (let i = 0; i < itemsDiscretized.length; i++) {\r\n            let keyHash = 'R';\r\n            itemsDiscretized[i].forEach((v,k) => {\r\n                if( k !== decisionIndex && results.keys.indexOf(k) >= 0 ) {\r\n                    keyHash += '_' + v;\r\n                }\r\n            });\r\n            let idx = results.classes.indexOf(keyHash);\r\n            if( idx < 0 ) {\r\n                results.classes.push(keyHash);\r\n                idx = results.classes.length-1;\r\n                results.relations[idx] = [i]\r\n            } else {\r\n                results.relations[idx].push(i)\r\n            }\r\n            if( results.decisions[idx] === undefined ) {\r\n                results.decisions.push(itemsDiscretized[i][decisionIndex])\r\n            } else if( results.decisions[idx] !== itemsDiscretized[i][decisionIndex] ) {\r\n                results.conflicts.push(idx)\r\n            }\r\n        }\r\n        return results\r\n\r\n    }\r\n\r\n    function generateAttributeSubstract() {\r\n        let attr = attributes;\r\n        let results = [];\r\n        for (let i = 0; i < attr.length-1; i++) {\r\n            attr.forEach((v,k) => {\r\n                if( i !== k && decisionIndex !== k ) {\r\n                    if( results[i] === undefined ) {\r\n                        results[i] = [v];\r\n                    } else {\r\n                        results[i].push(v)\r\n                    }\r\n                }\r\n            })\r\n        }\r\n        return results;\r\n    }\r\n\r\n    function findIndispensable() {\r\n        if( !isValidInformationSystem({ U: items, A: attributes }) ) {\r\n            return\r\n        }\r\n\r\n        let attr = attributes;\r\n        let attrSubstract = generateAttributeSubstract();\r\n        substractAttributes = attrSubstract;\r\n        indiscernibilityAll = findIndiscernibility(attr);\r\n\r\n        dispensable = [];\r\n        indispensable = [];\r\n\r\n        for (let i = 0; i < attrSubstract.length; i++) {\r\n            let curr = findIndiscernibility(attrSubstract[i]);\r\n            let isIndispensable = false;\r\n            if( curr.conflicts.length > 0 ) {\r\n                if( curr.conflicts.length > indiscernibilityAll.conflicts.length ) {\r\n                    isIndispensable = true;\r\n                }\r\n            }\r\n            if( !isIndispensable ) {\r\n                dispensable.push(i)\r\n            } else {\r\n                indispensable.push(i)\r\n            }\r\n            indiscernibilitySubstract.push(curr)\r\n        }\r\n\r\n        hasFindIndipensable = true\r\n    }\r\n\r\n    function findReduct() {\r\n        if( !hasFindIndipensable ) {\r\n            findIndispensable()\r\n        }\r\n        let indipensableAttr = indispensable.map((x) => attributes[x]);\r\n\r\n        // Cek reduct for indispensable\r\n        let indiscernibilityIndispensable = findIndiscernibility(indipensableAttr);\r\n        let isReduct = indiscernibilityIndispensable.conflicts.length === 0;\r\n\r\n        if( isReduct ) {\r\n            reductList.push(indispensable);\r\n        } else {\r\n            let isReductFounds = false;\r\n            for (let i = 0; i < dispensable.length; i++) {\r\n                let reductCandidate = generateCandidate(dispensable.length, i+1, 0);\r\n                for (let j = 0; j < reductCandidate.length; j++) {\r\n                    let dispensableCandidate = reductCandidate[j].map((id) => {return dispensable[id]});\r\n                    let testIndex = indispensable.concat(dispensableCandidate);\r\n                    let testAttr = testIndex.map((id) => { return attributes[id] });\r\n                    let indiscernibilityCandidate = findIndiscernibility(testAttr);\r\n                    if( indiscernibilityCandidate.conflicts.length === 0 ) {\r\n                        reductList.push(testIndex);\r\n                        isReductFounds = true;\r\n                    }\r\n                }\r\n                if( isReductFounds ) {\r\n                    break\r\n                }\r\n            }\r\n        }\r\n\r\n        hasFindReduct = true;\r\n\r\n    }\r\n\r\n    function generateCandidate(totalData, pick, startFrom) {\r\n        let candidate = [];\r\n        for (let i = startFrom; i < totalData + 1 - pick; i++) {\r\n            if( pick <= 1 ) {\r\n                candidate.push([i])\r\n            } else {\r\n                let next = generateCandidate(totalData, pick-1, i+1);\r\n                next.forEach((v) => {\r\n                    candidate.push([i].concat(v))\r\n                });\r\n            }\r\n        }\r\n        return candidate;\r\n    }\r\n\r\n    this.getItems = function() {\r\n        return items\r\n    };\r\n\r\n    this.setItems = function(values) {\r\n        if( !isValidItems(values) ) {\r\n            console.warn('Set Items to empty!');\r\n            items = []\r\n        } else {\r\n            items = values;\r\n        }\r\n    };\r\n\r\n    this.getAttributes = function() {\r\n        return attributes\r\n    };\r\n\r\n    this.setAttributes = function(values) {\r\n        if( !isValidAttribues(values) ) {\r\n            console.warn('Set Attributes to empty!');\r\n            attributes = [];\r\n            decisionIndex = 0\r\n        } else {\r\n            attributes = values;\r\n            decisionIndex = values.length-1\r\n        }\r\n    };\r\n\r\n    this.getInformationSystem = function() {\r\n        return { U: items, A: attributes }\r\n    };\r\n\r\n    this.setInformationSystem = function(values) {\r\n        if( !isValidInformationSystem(values) ) {\r\n            console.warn('Set Items to empty!');\r\n            items = [];\r\n            console.warn('Set Attributes to empty!');\r\n            attributes = [];\r\n            decisionIndex = 0\r\n        } else {\r\n            items = values.U;\r\n            attributes = values.A;\r\n            decisionIndex = values.A.length-1\r\n        }\r\n    };\r\n\r\n    this.getDecisionIndex = function() {\r\n        return decisionIndex\r\n    };\r\n\r\n    this.setDecisionIndex = function(values) {\r\n        if( !isValidAttribues(decisionIndex) ) {\r\n            decisionIndex = 0\r\n        } else if( !isValidDecisionIndex(values) ) {\r\n            decisionIndex = 0\r\n        } else {\r\n            decisionIndex = attributes.length-1\r\n        }\r\n    };\r\n\r\n    this.getHasNonNumeric = function () {\r\n        return hasNonNumeric\r\n    };\r\n\r\n    this.getDictionary = function () {\r\n        return dictionary\r\n    };\r\n\r\n    this.getHasDiscretized = function () {\r\n        return hasDiscretized\r\n    };\r\n\r\n    this.getItemsDiscretized = function () {\r\n        return itemsDiscretized\r\n    };\r\n\r\n    this.getIndiscernibilityAll = function () {\r\n        return indiscernibilityAll\r\n    };\r\n\r\n    this.getIndiscernibilitySubstract = function () {\r\n        return indiscernibilitySubstract\r\n    };\r\n\r\n    this.getHasFindIndispensable = function () {\r\n        return hasFindIndipensable\r\n    };\r\n\r\n    this.getIndispensable = function() {\r\n        return indispensable\r\n    };\r\n\r\n    this.getDispensable = function() {\r\n        return dispensable\r\n    };\r\n\r\n    this.getSubstractAttributes = function () {\r\n        return substractAttributes\r\n    };\r\n\r\n    this.getHasFindReduct = function () {\r\n        return hasFindReduct\r\n    };\r\n\r\n    this.getReductList = function () {\r\n        return reductList\r\n    };\r\n\r\n    this.reduct = function () {\r\n        findReduct()\r\n    }\r\n\r\n};\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (RoughSetJs);\n\n//# sourceURL=webpack://roughsetJs/./src/index.js?");

/***/ })

/******/ });
});