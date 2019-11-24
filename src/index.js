'use strict';

/*
TODO:
How roughset works
1. Import table / information system
2. Convert to comfort structure
3. Reduct inconsistent rows
4. Generate indiscernability relations
5. Set approximation (lower and higher)
6. Boundary region
7. Indispansable and dispansable Attributes (reduct)
8. Finding Core
 */

var RoughSetJs = function () {
    /**
     * Items in 2-d array
     * Ex: [[1,2,1,3,2,0],[3,2,3,1,2,1]]
     *
     * @type {Array}
     * @private
     */
    let items = [];

    /**
     * Conditional Attributes list
     * Ex: ['x1','x2','x3']
     *
     * @type {Array}
     * @private
     */
    let attributes = [];

    /**
     * Decision data in 0-based integer
     * Ex: 0
     *
     * @type {Array}
     * @private
     */
    let decisionIndex = 0;

    /**
     * Is items has non-numeric value?
     *
     * @type {boolean}
     * @private
     */
    let hasNonNumeric = false;

    /**
     * Dictionary for data converter
     * @type {Array}
     * @private
     */
    let dictionary = [];

    // Step 1 - Discretization
    let isDiscretization = false;
    let itemsDisc = [];

    // Step 2 - Indiscernibility Relations
    let isInd = false;
    let indiscernibility = [];

    function isValidItems(values) {
        if( !Array.isArray(values) ) {
            console.error('Items must be an Array!');
            return false
        } else if( values.length < 1 ) {
            console.error('Items cannot empty!');
            return false
        } else  {
            let obj = values[0];
            if( !Array.isArray(obj) ) {
                console.error('Items must be a matrix!');
                return false
            } else {
                let valid = true;
                for(let i = 0; i < values.length; i++) {
                    let o = values[i];
                    if( !Array.isArray(o) ) {
                        console.error('Items must be a matrix!');
                        valid = false;
                        break
                    } else if( o.length !== obj.length ) {
                        console.error('Each row must be has same length!');
                        valid = false;
                        break
                    }
                    if( !hasNonNumeric ) {
                        for(let j = 0; j < o.length; j++) {
                            if( typeof o[j] !== 'number' ) {
                                console.warn('Items is has non-numeric value!');
                                hasNonNumeric = true;
                                break
                            }
                        }
                    }
                }
                return valid
            }
        }
    }

    function isValidAttribues(values) {
        if( !Array.isArray(values) ) {
            console.error('Attributes must be an array!');
            return false
        } else if( values.length < 1 ) {
            console.error('Attributes cannot empty!');
            return false
        } else {
            let valid = true;
            for(let i = 0; i < values.length; i++) {
                if( typeof values[i] !== 'number' && typeof values[i] !== 'string' ) {
                    console.error('Attributes must be an string array or number array!');
                    break
                }
            }
            return valid
        }
    }

    function isValidDecisionIndex(index) {
        if( typeof index !== 'number' ) {
            console.error('Index must be a number!');
            return false
        } else if( index < 0 ) {
            console.error('Index must be positive number!');
            return false
        } else if(index >= attributes.length) {
            console.error('Index cannot equal or greater than ' + attributes.length + '!' );
            return false
        } else {
            return true
        }
    }

    function isValidInformationSystem(values) {
        if( typeof values !== 'object' ) {
            console.error('I must be an object!');
            return false
        } else if( Array.isArray(values) ) {
            console.error('I cannot be an array!');
            return false
        } else {
            if( values.U === undefined || values.U === null ) {
                console.error('I must have U key!');
                return false
            } else if( values.A === undefined || values.A === null ) {
                console.error('I must have A key!');
                return false
            } else {
                return isValidItems(values.U) && isValidAttribues(values.A)
            }
        }
    }

    function discretization() {
        let values = items;
        if( hasNonNumeric ) {
            for (let i = 0; i < values.length; i++) {
                for (let j = 0; j < values[i].length; j++) {
                    if( typeof values[i][j] !== 'number' ) {
                        if( dictionary[j] === undefined ) {
                            dictionary[j] = []
                        }
                        let key = dictionary[j].indexOf(values[i][j]);
                        if( key < 0) {
                            dictionary[j].push(values[i][j]);
                            key = dictionary[j].length-1
                        }
                        values[i][j] = key
                    }
                }
            }
        }
        itemsDisc = values
    }

    /**
     * Indiscernibility Relations by attributes selected.
     *
     *
     * @param values {Array} Attributes selected or empty for all attributes.
     * @returns {{keys: [], classes: [], conflicts: [], decisions: [], relations: []}}
     */
    function findIndiscernibility(values = []) {

        discretization();

        let results = {classes: [], keys: [], relations: [], decisions: [], conflicts: []};
        values = Array.isArray(values) ? values : [];

        itemsDisc[0].forEach((v,k) => {
            if( k !== decisionIndex && (values.length === 0 || values.indexOf(attributes[k]) >= 0) ) {
                results.keys.push(k)
            }
        });

        for (let i = 0; i < itemsDisc.length; i++) {
            let keyHash = 'R';
            itemsDisc[i].forEach((v,k) => {
                if( k !== decisionIndex && results.keys.indexOf(k) >= 0 ) {
                    keyHash += '_' + v;
                }
            });
            let idx = results.classes.indexOf(keyHash);
            if( idx < 0 ) {
                results.classes.push(keyHash);
                idx = results.classes.length-1;
                results.relations[idx] = [i]
            } else {
                results.relations[idx].push(i)
            }
            if( results.decisions[idx] === undefined ) {
                results.decisions.push(itemsDisc[i][decisionIndex])
            } else if( results.decisions[idx] !== itemsDisc[i][decisionIndex] ) {
                results.conflicts.push(idx)
            }
        }
        return results

    }

    this.getItems = function() {
        return items
    };

    this.setItems = function(values) {
        if( !isValidItems(values) ) {
            console.warn('Set Items to empty!');
            items = []
        } else {
            items = values;
        }
    };

    this.getAttributes = function() {
        return attributes
    };

    this.setAttributes = function(values) {
        if( !isValidAttribues(values) ) {
            console.warn('Set Attributes to empty!');
            attributes = [];
            decisionIndex = 0
        } else {
            attributes = values;
            decisionIndex = values.length-1
        }
    };

    this.getInformationSystem = function() {
        return { U: items, A: attributes }
    };

    this.setInformationSystem = function(values) {
        if( !isValidInformationSystem(values) ) {
            console.warn('Set Items to empty!');
            items = [];
            console.warn('Set Attributes to empty!');
            attributes = [];
            decisionIndex = 0
        } else {
            items = values.U;
            attributes = values.A;
            decisionIndex = values.A.length-1
        }
    };

    this.getDecisionIndex = function() {
        return decisionIndex
    };

    this.setDecisionIndex = function(values) {
        if( !isValidAttribues(decisionIndex) ) {
            decisionIndex = 0
        } else if( !isValidDecisionIndex(values) ) {
            decisionIndex = 0
        } else {
            decisionIndex = attributes.length-1
        }
    };

    this.hasNonNumeric = function () {
        return hasNonNumeric
    };

    this.getIndiscernibility = function(attr) {
        if( !isInd ) {
            indiscernibility = findIndiscernibility(attr);
            isInd = true
        }
        return indiscernibility
    };

};

export default RoughSetJs